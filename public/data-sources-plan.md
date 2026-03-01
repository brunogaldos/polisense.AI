# REAL GEOSPATIAL DATA SOURCES - PLANNING DOCUMENT

## REQUIREMENT
Build a 5-layer animated visualization with REAL data for energy infrastructure planning:
1. Geography/Terrain base map
2. Solar irradiance data
3. Wind potential data
4. Electric grid infrastructure
5. Population density

## REAL DATA SOURCES AVAILABLE

### 1. BASE MAP / GEOGRAPHY
**Option A: OpenStreetMap (Free, no API key needed)**
- Tile server: `https://tile.openstreetmap.org/{z}/{x}/{y}.png`
- Shows roads, terrain, water bodies
- Slippy map tiles - zoom levels 0-19
- Use Leaflet.js or raw tile fetching

**Option B: Mapbox (Free tier: 50k requests/month)**
- API: `https://api.mapbox.com/styles/v1/{style}/tiles/{z}/{x}/{y}`
- Better terrain visualization
- Requires API key (need to sign up)
- Styles: satellite, terrain, streets

**Decision: Use OpenStreetMap - no API key needed, immediately available**

### 2. SOLAR IRRADIANCE DATA
**Option A: NASA POWER API (Free, no key needed for basic access)**
- API: `https://power.larc.nasa.gov/api/temporal/daily/point`
- Parameters: lat, lon, start date, end date
- Returns: Daily/monthly solar radiation (kWh/m²/day)
- Data: 1984-present, global coverage
- Example: `https://power.larc.nasa.gov/api/temporal/monthly/point?parameters=ALLSKY_SFC_SW_DWN&community=RE&longitude=36.8&latitude=-1.28&start=2023&end=2023&format=JSON`

**Option B: Global Solar Atlas (embeddable, but harder to extract data programmatically)**
- Website: https://globalsolaratlas.info/
- Has downloadable GeoTIFF files but requires processing
- Better for visualization than API access

**Decision: Use NASA POWER API - free, RESTful, returns JSON, no signup**

### 3. WIND POTENTIAL DATA
**Option A: Global Wind Atlas API**
- Website: https://globalwindatlas.info/
- Has API but requires registration and approval
- High quality data

**Option B: OpenWeatherMap Wind Data (Free tier: 60 calls/min)**
- API: `https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={key}`
- Returns current wind speed
- Requires free API key (easy signup)

**Option C: NOAA/NCEP Reanalysis data (Free but complex)**
- Requires downloading NetCDF files and processing
- Too complex for quick implementation

**Decision: Use OpenWeatherMap for current wind + static wind potential estimates from research papers**
Alternative: Use Global Wind Atlas visual data and manually digitize key values (not ideal but realistic for demo)

### 4. ELECTRIC GRID INFRASTRUCTURE
**Option A: OpenStreetMap Overpass API (Free, no key)**
- API: `https://overpass-api.de/api/interpreter`
- Query language to get power lines, substations
- Example query:
```
[out:json];
(
  way["power"="line"](bbox);
  node["power"="substation"](bbox);
);
out geom;
```
- Returns actual grid infrastructure from OSM contributors

**Option B: OpenInfraMap (Uses OSM data, better visualization)**
- Website: https://openinframap.org/
- Based on OSM but pre-styled for infrastructure
- Can extract OSM data behind it

**Decision: Use OpenStreetMap Overpass API - free, real data, programmable**

### 5. POPULATION DENSITY
**Option A: WorldPop API (Free for research/demo)**
- Website: https://www.worldpop.org/
- Downloadable GeoTIFF raster data
- 100m resolution population grids
- Requires download and processing (complex)

**Option B: Facebook Population Density Maps (Free)**
- Website: https://data.humdata.org/
- High resolution (30m) but requires download

**Option C: OpenStreetMap + Census Data Overlay**
- Use OSM boundaries + manual census integration
- Less precise but easier to implement

**Option D: Mapbox Population Density Tileset (If using Mapbox)**
- Built-in tilesets available

**Decision: For MVP - Use combination of:**
- OSM to identify city boundaries/neighborhoods
- Manually overlay known census figures for major areas
- OR use a simple population density GeoJSON if available for the region

## IMPLEMENTATION ARCHITECTURE

### Client-Side Approach (Simpler, direct API calls from browser)
```
1. Use Leaflet.js or Mapbox GL JS for base map
2. Fetch NASA POWER solar data for grid of points
3. Fetch OpenWeatherMap wind data for key locations
4. Query Overpass API for grid infrastructure
5. Render population density from pre-processed GeoJSON or static data
6. Layer everything with CSS 3D transforms
```

**Pros:**
- No backend needed
- Direct API access
- Easier to debug

**Cons:**
- API rate limits
- Slower for large data sets
- API keys exposed in client code

### Server-Side Approach (More robust)
```
1. Next.js API routes to fetch and cache data
2. Server fetches from NASA, Overpass, etc.
3. Cache results to avoid repeated API calls
4. Serve pre-processed GeoJSON to client
5. Client just renders the data
```

**Pros:**
- Can cache aggressively
- Hide API keys
- Pre-process complex data
- Faster for users

**Cons:**
- More setup required
- Need backend infrastructure

## RECOMMENDED APPROACH FOR THIS PROJECT

### Phase 1: Basic Implementation (Next 30 min)
1. **Base Map Layer**: Use OpenStreetMap tiles via Leaflet.js
   - Show real Nairobi terrain
   - No fake drawings

2. **Solar Layer**: Call NASA POWER API
   - Fetch real solar irradiance for 5-10 points in Nairobi
   - Create heat map overlay using real kWh/m²/day values

3. **Wind Layer**: Use static Global Wind Atlas values
   - Manually verified wind speeds from research
   - Overlay on map with proper attribution

4. **Grid Layer**: Query Overpass API
   - Get real power lines and substations from OpenStreetMap
   - Render actual infrastructure locations

5. **Population Layer**: Use OSM boundaries + Wikipedia census data
   - Real constituency boundaries
   - Verified population figures from Kenya census

### Phase 2: Polish (After MVP works)
- Add loading states
- Cache API responses
- Better error handling
- Smooth animations

## VALIDATION CHECKLIST
- [ ] Each data point can be traced to a specific API response
- [ ] All coordinates match real locations (verify in Google Maps)
- [ ] Data values match published sources (cross-reference with government data)
- [ ] Attribution for all data sources displayed
- [ ] Can demo by showing API responses in browser console

## RISKS & MITIGATION
1. **Risk**: API rate limits hit during development
   - **Mitigation**: Cache responses locally, use mock data during styling

2. **Risk**: Some APIs require signup/keys
   - **Mitigation**: Have fallback to free alternatives or static data

3. **Risk**: Data takes too long to load
   - **Mitigation**: Pre-fetch and cache, show loading indicators

4. **Risk**: Data doesn't exist for all layers in one location
   - **Mitigation**: Be transparent about data limitations in UI

## TIMELINE ESTIMATE
- Planning & Research: 10 min (this document)
- Setup Leaflet + base map: 5 min
- Integrate NASA POWER solar: 10 min
- Integrate Overpass grid data: 10 min
- Add wind + population layers: 10 min
- 3D animation integration: 10 min
- Testing & polish: 10 min

**Total: ~65 minutes for real implementation**

## NEXT STEPS
1. Set up Leaflet.js map with real OSM tiles
2. Test NASA POWER API call for Nairobi
3. Test Overpass API query for power infrastructure
4. Build layer rendering system
5. Integrate with 3D transforms
