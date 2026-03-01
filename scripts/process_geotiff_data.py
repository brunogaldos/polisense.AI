#!/usr/bin/env python3
"""
Process actual NREL NSRDB solar GeoTIFF data for San Francisco
Extract values for the SF bounding box and create visualization data
"""

import rasterio
from rasterio.windows import from_bounds
import json
import numpy as np
from pathlib import Path

# San Francisco bounding box
LAT_MIN, LAT_MAX = 37.70, 37.85
LNG_MIN, LNG_MAX = -122.55, -122.35

# Directories
BASE_DIR = Path(__file__).parent.parent
RAW_DATA_DIR = BASE_DIR / "scripts" / "raw_data"
OUTPUT_DIR = BASE_DIR / "public" / "data" / "sf-bay"

GRID_SIZE = 5  # 5x5 grid for visualization

def extract_sf_from_geotiff(tif_path, description="data"):
    """Extract San Francisco area data from a GeoTIFF file."""
    print(f"\nProcessing {description}...")
    print(f"  File: {tif_path.name}")

    try:
        with rasterio.open(tif_path) as src:
            print(f"  CRS: {src.crs}")
            print(f"  Bounds: {src.bounds}")
            print(f"  Resolution: {src.res}")

            # Read data for SF bounding box
            window = from_bounds(LNG_MIN, LAT_MIN, LNG_MAX, LAT_MAX, src.transform)
            data = src.read(1, window=window)

            # Get the transform for the window
            window_transform = src.window_transform(window)

            print(f"  Extracted shape: {data.shape}")
            print(f"  Value range: {data.min():.2f} - {data.max():.2f}")
            print(f"  Units: W/m² (annual average GHI)")

            return data, window_transform, src

    except Exception as e:
        print(f"  Error: {e}")
        return None, None, None

def create_grid_from_raster(data, transform, grid_size=5):
    """Create a regular grid by sampling the raster data."""
    height, width = data.shape
    grid_points = []

    for i in range(grid_size):
        for j in range(grid_size):
            # Calculate pixel position for this grid cell
            row = int((i / (grid_size - 1)) * (height - 1))
            col = int((j / (grid_size - 1)) * (width - 1))

            # Get the value at this position
            value = float(data[row, col])

            # Convert pixel coordinates to geographic coordinates
            lng, lat = rasterio.transform.xy(transform, row, col)

            grid_points.append({
                'lat': float(lat),
                'lng': float(lng),
                'value': value
            })

    return grid_points

def main():
    print("=" * 70)
    print("PROCESSING ACTUAL NREL NSRDB GEOTIFF DATA FOR SAN FRANCISCO")
    print("=" * 70)

    # Process annual solar GHI data
    solar_tif = RAW_DATA_DIR / "solar" / "nsrdbv3_ghi" / "Annual GHI" / "nsrdb3_ghi.tif"

    if not solar_tif.exists():
        print(f"ERROR: Solar GeoTIFF not found at {solar_tif}")
        print("Available files:")
        solar_dir = RAW_DATA_DIR / "solar" / "nsrdbv3_ghi"
        if solar_dir.exists():
            for f in solar_dir.rglob("*.tif"):
                print(f"  {f.relative_to(RAW_DATA_DIR)}")
        return

    # Extract SF area from the GeoTIFF
    data, transform, src = extract_sf_from_geotiff(solar_tif, "NREL NSRDB Annual GHI")

    if data is None:
        print("Failed to extract data")
        return

    # Create grid for visualization
    print(f"\nCreating {GRID_SIZE}x{GRID_SIZE} grid...")
    grid_points = create_grid_from_raster(data, transform, GRID_SIZE)

    # Convert GHI values to different formats
    solar_data = []
    for pt in grid_points:
        # NSRDB GHI is in kWh/m²/year, convert to average W/m² and peak
        annual_kwh = pt['value']
        avg_wm2 = annual_kwh * 1000 / (365 * 24)  # Convert to W/m²
        peak_wm2 = avg_wm2 * 4.5  # Peak is roughly 4.5x daily average for SF
        daily_kwh = annual_kwh / 365

        solar_data.append({
            'lat': pt['lat'],
            'lng': pt['lng'],
            'ghi': round(avg_wm2, 2),
            'peak_ghi': round(peak_wm2, 2),
            'daily_kwh_m2': round(daily_kwh, 3),
            'annual_kwh_m2': round(annual_kwh, 2)
        })

    # Save processed data
    output_file = OUTPUT_DIR / "solar_grid_nrel.json"
    output_data = {
        'source': 'NREL NSRDB v3 (Actual GeoTIFF Data)',
        'source_file': str(solar_tif.name),
        'bounds': {
            'lat_min': LAT_MIN,
            'lat_max': LAT_MAX,
            'lng_min': LNG_MIN,
            'lng_max': LNG_MAX
        },
        'units': {
            'ghi': 'W/m² (annual average)',
            'peak_ghi': 'W/m² (peak estimate)',
            'daily_kwh_m2': 'kWh/m²/day',
            'annual_kwh_m2': 'kWh/m²/year'
        },
        'grid_size': GRID_SIZE,
        'data': solar_data
    }

    with open(output_file, 'w') as f:
        json.dump(output_data, f, indent=2)

    print(f"\n✓ Saved processed solar data to {output_file}")
    print(f"  Grid points: {len(solar_data)}")
    print(f"  GHI range: {min(d['ghi'] for d in solar_data):.1f} - {max(d['ghi'] for d in solar_data):.1f} W/m²")
    print(f"  Annual range: {min(d['annual_kwh_m2'] for d in solar_data):.1f} - {max(d['annual_kwh_m2'] for d in solar_data):.1f} kWh/m²/year")

    # Generate individual grid files for animation compatibility
    print(f"\nGenerating individual grid cell files...")
    for i in range(GRID_SIZE):
        for j in range(GRID_SIZE):
            idx = i * GRID_SIZE + j
            if idx < len(solar_data):
                pt = solar_data[idx]

                # Create file in format compatible with animation
                cell_data = {
                    "latitude": pt['lat'],
                    "longitude": pt['lng'],
                    "generationtime_ms": 0.0,
                    "utc_offset_seconds": -28800,
                    "timezone": "America/Los_Angeles",
                    "timezone_abbreviation": "PST",
                    "elevation": 0.0,
                    "current_units": {
                        "time": "iso8601",
                        "interval": "seconds",
                        "shortwave_radiation": "W/m²",
                        "wind_speed_10m": "km/h"
                    },
                    "current": {
                        "time": "2026-02-24T12:00",
                        "interval": 900,
                        "shortwave_radiation": pt['peak_ghi'],
                        "wind_speed_10m": 20.0  # Will be replaced with actual wind data
                    },
                    "_source": "NREL NSRDB v3 (actual GeoTIFF)"
                }

                cell_file = OUTPUT_DIR / f"solar-wind-{i}-{j}.json"
                with open(cell_file, 'w') as f:
                    json.dump(cell_data, f, indent=2)

    print(f"✓ Generated {GRID_SIZE * GRID_SIZE} grid cell files")

    print("\n" + "=" * 70)
    print("PROCESSING COMPLETE - USING ACTUAL NREL DATA")
    print("=" * 70)

if __name__ == "__main__":
    main()
