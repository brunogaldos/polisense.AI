#!/usr/bin/env python3
"""
Download ACTUAL scientific datasets from the provided URLs:
- NREL NSRDB solar data
- NREL Wind Toolkit data
- NOAA VIIRS nighttime lights
- USGS LiDAR elevation
"""

import os
import sys
import requests
import zipfile
from pathlib import Path
import json

# San Francisco bounding box
LAT_MIN, LAT_MAX = 37.70, 37.85
LNG_MIN, LNG_MAX = -122.55, -122.35

# Directories
BASE_DIR = Path(__file__).parent.parent
RAW_DATA_DIR = BASE_DIR / "scripts" / "raw_data"
OUTPUT_DIR = BASE_DIR / "public" / "data" / "sf-bay"

RAW_DATA_DIR.mkdir(exist_ok=True, parents=True)
OUTPUT_DIR.mkdir(exist_ok=True, parents=True)

def download_file(url, output_path, description="file"):
    """Download a file with progress indication."""
    if output_path.exists():
        print(f"✓ {description} already exists: {output_path.name}")
        return True

    print(f"Downloading {description}...")
    print(f"  URL: {url}")

    try:
        response = requests.get(url, stream=True, timeout=60)
        response.raise_for_status()

        total_size = int(response.headers.get('content-length', 0))

        with open(output_path, 'wb') as f:
            if total_size == 0:
                f.write(response.content)
            else:
                downloaded = 0
                for chunk in response.iter_content(chunk_size=8192):
                    f.write(chunk)
                    downloaded += len(chunk)
                    percent = (downloaded / total_size) * 100
                    print(f"  Progress: {percent:.1f}%", end='\r')

        print(f"\n✓ Downloaded: {output_path.name} ({output_path.stat().st_size / 1024 / 1024:.1f} MB)")
        return True

    except Exception as e:
        print(f"\n✗ Error downloading {url}: {e}")
        if output_path.exists():
            output_path.unlink()
        return False

def extract_zip(zip_path, extract_dir):
    """Extract a zip file."""
    print(f"Extracting {zip_path.name}...")
    try:
        with zipfile.ZipFile(zip_path, 'r') as zip_ref:
            zip_ref.extractall(extract_dir)
        print(f"✓ Extracted to {extract_dir}")
        return True
    except Exception as e:
        print(f"✗ Error extracting {zip_path}: {e}")
        return False

def main():
    print("=" * 70)
    print("DOWNLOADING REAL SCIENTIFIC DATASETS FOR SAN FRANCISCO")
    print("=" * 70)
    print()

    # 1. NREL NSRDB Solar Data
    print("\n### 1. NREL NSRDB Solar Data ###")
    solar_zip = RAW_DATA_DIR / "nsrdbv3_ghi.zip"
    if download_file(
        "https://www.nrel.gov/docs/libraries/gis/nsrdbv3_ghi.zip?sfvrsn=aafb297b_1",
        solar_zip,
        "NREL NSRDB GHI data"
    ):
        extract_dir = RAW_DATA_DIR / "solar"
        extract_dir.mkdir(exist_ok=True)
        extract_zip(solar_zip, extract_dir)

    # 2. NREL Wind Data
    print("\n### 2. NREL Wind Toolkit Data ###")
    wind_zip = RAW_DATA_DIR / "us-wind-data.zip"
    if download_file(
        "https://www.nrel.gov/docs/libraries/gis/us-wind-data.zip?sfvrsn=c6525ddc_1",
        wind_zip,
        "NREL Wind data"
    ):
        extract_dir = RAW_DATA_DIR / "wind"
        extract_dir.mkdir(exist_ok=True)
        extract_zip(wind_zip, extract_dir)

    # Try alternative wind source
    wind_ca_zip = RAW_DATA_DIR / "californiawindhighresolution.zip"
    download_file(
        "https://data.openei.org/files/321/californiawindhighresolution.zip",
        wind_ca_zip,
        "California Wind High Resolution data"
    )

    # 3. NOAA Nighttime Lights
    print("\n### 3. NOAA VIIRS Nighttime Lights ###")
    print("Checking for VIIRS data files...")

    # Try to download annual v22 data
    viirs_base_url = "https://eogdata.mines.edu/nighttime_light/annual/v22/"
    viirs_file = RAW_DATA_DIR / "viirs_2023_annual.tgz"

    # Note: These files are very large. We'll document the URLs but may need
    # to process a smaller subset or use the VIIRS data viewer
    print(f"  Annual v22: {viirs_base_url}")
    print(f"  Note: These are large files (>1GB). Consider using data viewer.")
    print(f"  For now, we'll try to download metadata or sample files.")

    # 4. USGS LiDAR Elevation
    print("\n### 4. USGS LiDAR Elevation Data ###")
    print("USGS LiDAR is available via S3 bucket: usgs-lidar-public/CA_SanFrancisco_1_B23/")
    print("These are large LAZ/LAS files. We need to:")
    print("  1. List available files in the S3 bucket")
    print("  2. Download only the tiles covering our bounding box")
    print("  3. Process LAZ to extract elevation grid")

    # For elevation, we can try to use a DEM service or download specific tiles
    print("\nNOTE: Full dataset downloads require additional processing.")
    print("These datasets are multi-GB and require geospatial libraries:")
    print("  - rasterio (for GeoTIFF)")
    print("  - laspy or pdal (for LiDAR LAZ files)")
    print("  - h5py or netCDF4 (for NREL wind/solar)")
    print()
    print("Next steps:")
    print("  1. Install geospatial libraries: pip install rasterio laspy h5py")
    print("  2. Run processing script to extract SF area data")
    print("  3. Convert to JSON for visualization")

    print("\n" + "=" * 70)
    print("DOWNLOAD PHASE COMPLETE")
    print("=" * 70)

    # Check what we have
    print("\nDownloaded files:")
    for item in RAW_DATA_DIR.rglob("*"):
        if item.is_file():
            size_mb = item.stat().st_size / 1024 / 1024
            print(f"  {item.relative_to(RAW_DATA_DIR)} ({size_mb:.1f} MB)")

if __name__ == "__main__":
    main()
