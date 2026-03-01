#!/usr/bin/env python3
"""
Process NREL Wind Toolkit GeoTIFF with proper coordinate transformation
"""

import rasterio
from rasterio.warp import transform_bounds, reproject, Resampling
from rasterio.windows import from_bounds
import json
import numpy as np
from pathlib import Path

# San Francisco bounding box (WGS84)
LAT_MIN, LAT_MAX = 37.70, 37.85
LNG_MIN, LNG_MAX = -122.55, -122.35

# Directories
BASE_DIR = Path(__file__).parent.parent
RAW_DATA_DIR = BASE_DIR / "scripts" / "raw_data"
OUTPUT_DIR = BASE_DIR / "public" / "data" / "sf-bay"

GRID_SIZE = 5

def extract_wind_data():
    """Extract wind data with proper reprojection."""
    wind_tif = RAW_DATA_DIR / "wind" / "us-wind-data" / "wtk_conus_10m_mean_masked.tif"

    print("Processing NREL Wind Toolkit 10m data...")
    print(f"  File: {wind_tif.name}")

    try:
        with rasterio.open(wind_tif) as src:
            print(f"  Source CRS: {src.crs}")
            print(f"  Source bounds: {src.bounds}")

            # Transform SF bounds to source CRS
            sf_bounds_src = transform_bounds(
                'EPSG:4326',  # WGS84
                src.crs,      # Source CRS
                LNG_MIN, LAT_MIN, LNG_MAX, LAT_MAX
            )

            print(f"  SF bounds in source CRS: {sf_bounds_src}")

            # Read data for SF area
            window = from_bounds(*sf_bounds_src, src.transform)
            data = src.read(1, window=window)

            # Handle nodata
            if src.nodata is not None:
                data = np.where(data == src.nodata, np.nan, data)

            print(f"  Extracted shape: {data.shape}")

            # Sample grid points
            wind_data = []
            height, width = data.shape

            for i in range(GRID_SIZE):
                for j in range(GRID_SIZE):
                    # Sample position in extracted data
                    row = int((i / (GRID_SIZE - 1)) * (height - 1)) if height > 1 else 0
                    col = int((j / (GRID_SIZE - 1)) * (width - 1)) if width > 1 else 0

                    value = float(data[row, col])

                    if np.isnan(value) or value < 0:
                        continue

                    # Get coordinates in source CRS
                    x, y = rasterio.transform.xy(src.window_transform(window), row, col)

                    # Transform back to WGS84
                    from rasterio.warp import transform as warp_transform
                    lngs, lats = warp_transform(src.crs, 'EPSG:4326', [x], [y])

                    # Wind speed in m/s
                    wind_speed_ms = value
                    wind_speed_kmh = wind_speed_ms * 3.6

                    # Wind power density
                    air_density = 1.225
                    wind_power = 0.5 * air_density * (wind_speed_ms ** 3)

                    wind_data.append({
                        'lat': round(float(lats[0]), 5),
                        'lng': round(float(lngs[0]), 5),
                        'wind_speed_ms': round(wind_speed_ms, 2),
                        'wind_speed_kmh': round(wind_speed_kmh, 1),
                        'wind_power_density': round(wind_power, 1)
                    })

            print(f"  Extracted {len(wind_data)} wind points")
            if wind_data:
                speeds = [d['wind_speed_ms'] for d in wind_data]
                print(f"  Wind speed range: {min(speeds):.1f} - {max(speeds):.1f} m/s")

            return wind_data

    except Exception as e:
        print(f"  Error: {e}")
        import traceback
        traceback.print_exc()
        return []

def main():
    print("=" * 70)
    print("PROCESSING NREL WIND TOOLKIT DATA")
    print("=" * 70)

    wind_data = extract_wind_data()

    if wind_data:
        # Save wind grid
        output_file = OUTPUT_DIR / "wind_grid_nrel.json"
        with open(output_file, 'w') as f:
            json.dump({
                'source': 'NREL Wind Toolkit (Actual GeoTIFF Data)',
                'source_file': 'wtk_conus_10m_mean_masked.tif',
                'bounds': {'lat_min': LAT_MIN, 'lat_max': LAT_MAX, 'lng_min': LNG_MIN, 'lng_max': LNG_MAX},
                'units': {'wind_speed': 'm/s and km/h', 'wind_power_density': 'W/m²'},
                'grid_size': GRID_SIZE,
                'data': wind_data
            }, f, indent=2)

        print(f"\n✓ Saved wind data: {output_file}")

        # Update grid files with wind data
        print("\n✓ Updating grid cell files with wind data...")

        # Load solar data
        solar_file = OUTPUT_DIR / "solar_grid_nrel.json"
        with open(solar_file, 'r') as f:
            solar_json = json.load(f)
            solar_data = solar_json['data']

        # Update each grid file
        for i in range(GRID_SIZE):
            for j in range(GRID_SIZE):
                idx = i * GRID_SIZE + j
                cell_file = OUTPUT_DIR / f"solar-wind-{i}-{j}.json"

                if cell_file.exists() and idx < len(wind_data) and idx < len(solar_data):
                    with open(cell_file, 'r') as f:
                        cell_data = json.load(f)

                    # Update with actual wind data
                    cell_data['current']['wind_speed_10m'] = wind_data[idx]['wind_speed_kmh']
                    cell_data['_source'] = "NREL NSRDB + Wind Toolkit (actual GeoTIFF data)"

                    with open(cell_file, 'w') as f:
                        json.dump(cell_data, f, indent=2)

        print(f"✓ Updated {GRID_SIZE * GRID_SIZE} grid files with wind data")

    print("\n" + "=" * 70)
    print("✓ WIND DATA PROCESSING COMPLETE")
    print("=" * 70)

if __name__ == "__main__":
    main()
