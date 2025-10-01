# Polisense.AI Landing Page - Complete Implementation Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [File Structure](#file-structure)
3. [Color Scheme & Design System](#color-scheme--design-system)
4. [HTML Structure](#html-structure)
5. [CSS Styling](#css-styling)
6. [JavaScript Functionality](#javascript-functionality)
7. [3D Map Implementation](#3d-map-implementation)
8. [Form Integration](#form-integration)
9. [Deployment Guide](#deployment-guide)
10. [Customization Guide](#customization-guide)

---

## 🎯 Project Overview

**Polisense.AI Landing Page** is a modern, interactive scrollytelling website that showcases AI-powered energy access solutions. The page features:

- **Interactive 3D Mapbox integration** with Arequipa, Peru as pilot city
- **Scrollytelling narrative** with 6 content panels
- **Responsive design** with mobile-first approach
- **Demo booking form** with email integration
- **Modern UI/UX** with turquoise and blue-gray color scheme

### Key Technologies
- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Map**: Mapbox GL JS v2.15.0
- **Form Service**: Formspree
- **Hosting**: GitHub Pages
- **Fonts**: Inter, Roboto, Montserrat

---

## 📁 File Structure

```
landing_page/
├── index.html                 # Main HTML file
├── styles/
│   └── main.css              # All CSS styling
├── scripts/
│   └── main.js               # JavaScript functionality
├── assets/
│   └── polisense_logo.svg    # Company logo
├── bbc_peru.webp             # BBC image for energy access
├── ninitos.png               # Children image for conclusion
├── polisense_logo.svg        # Footer logo
└── POLISENSE_LANDING_PAGE_GUIDE.md  # This guide
```

---

## 🎨 Color Scheme & Design System

### Primary Colors
```css
/* Turquoise - Primary accent color */
#4effd0

/* Blue-gray - Secondary/background color */
#44546a

/* Dark panels - Content backgrounds */
rgba(0, 0, 0, 0.85)

/* White text */
#ffffff

/* Progress bar background */
#717C7D
```

### Color Usage
- **Turquoise (`#4effd0`)**: Titles (h3), links, button text, progress bar, form highlights
- **Blue-gray (`#44546a`)**: Button backgrounds, footer background, "Explore More" heading
- **Dark panels (`rgba(0, 0, 0, 0.85)`)**: Content panel backgrounds, modal backgrounds
- **White (`#ffffff`)**: Body text, labels, general content

### Typography
```css
font-family: 'Inter', 'Roboto', 'Montserrat', 'Helvetica Neue', Arial, sans-serif;
```

---

## 🏗️ HTML Structure

### Main Layout
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Meta tags, fonts, stylesheets -->
</head>
<body>
    <!-- Loading screen -->
    <div id="loader" class="loader"></div>
    
    <!-- Progress bar -->
    <div class="progress-container">
        <div class="progress-bar" id="progressBar"></div>
    </div>
    
    <!-- Scrollytelling Section -->
    <div class="scrollytelling-section">
        <!-- Pinned Map -->
        <div id="map" class="pinned-map"></div>
        
        <!-- Content Panels -->
        <div class="scrolling-content">
            <!-- 6 content panels -->
        </div>
    </div>
    
    <!-- Post-scrollytelling content -->
    <main class="main-content">
        <!-- CTA buttons -->
    </main>
    
    <!-- Demo Form Modal -->
    <div id="demoModal" class="demo-modal"></div>
    
    <!-- Footer -->
    <footer id="footer" class="footer"></footer>
</body>
</html>
```

### Content Panels Structure
```html
<!-- Panel positioning classes -->
.panel-center    <!-- Centered panels -->
.panel-left      <!-- Left-aligned panels -->
.panel-right     <!-- Right-aligned panels -->

<!-- Panel content structure -->
<div class="content-panel panel-[position]" data-map-state="[state]">
    <div class="panel-content">
        <h3>Panel Title</h3>
        <!-- Content varies by panel -->
    </div>
</div>
```

### Panel Sequence
1. **Intro** (center) - `data-map-state="intro"`
2. **Cities on the Climate Frontline** (left) - `data-map-state="historical"`
3. **AI for Universal Energy Access** (right) - `data-map-state="architectural"`
4. **Powering Cities, Empowering People** (left) - `data-map-state="cultural"`
5. **Arequipa, Peru: Our first Pilot City** (left) - `data-map-state="data"`
6. **Bringing Energy, Changing Lives** (right) - `data-map-state="conclusion"`

---

## 🎨 CSS Styling

### Key CSS Classes

#### Panel Styling
```css
.panel-content {
    max-width: 400px;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(8px);
    border-radius: 12px;
    padding: 2rem;
    color: #fff;
    box-shadow: 0 8px 32px rgba(68, 84, 106, 0.3);
    border: 2px solid #ffffff;
}

.header-panel .panel-content {
    border: 2px solid #4effd0;
    box-shadow: 0 8px 32px rgba(68, 84, 106, 0.3), 
                0 0 20px rgba(78, 255, 208, 0.8), 
                0 0 40px rgba(78, 255, 208, 0.4);
}
```

#### Typography
```css
h3 {
    font-size: clamp(1.25rem, 3vw, 1.5rem);
    color: #4effd0;
    font-weight: 600;
}

p {
    font-size: clamp(1rem, 2vw, 1.25rem);
    line-height: 1.5;
    margin: 0 0 1rem 0;
}
```

#### Data Panel Styling
```css
.data-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.data-number {
    display: block;
    font-size: 2.5rem;
    font-weight: bold;
    color: #4effd0;
    margin-bottom: 0.5rem;
}

.data-number.solar-data {
    font-size: 1.8rem; /* Smaller for solar data */
}
```

#### Button Styling
```css
.cta-button {
    display: inline-block;
    padding: 1rem 2rem;
    background: #44546a;
    color: #4effd0;
    border: 2px solid #44546a;
    border-radius: 8px;
    font-weight: 600;
    transition: all 0.3s ease;
    text-decoration: none;
    cursor: pointer;
}

.cta-button:hover {
    background: #5a6b7a;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(68, 84, 106, 0.3);
}
```

#### Progress Bar
```css
.progress-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: #717C7D;
    z-index: 9998;
}

.progress-bar {
    height: 100%;
    background: #4effd0;
    width: 0%;
    transition: width 0.3s ease;
}
```

---

## ⚙️ JavaScript Functionality

### Main Classes

#### ArequipaScrollMap Class
```javascript
class ArequipaScrollMap {
    constructor() {
        this.map = null;
        this.mapContainer = null;
        this.isLoaded = false;
        this.currentState = null;
        this.contentPanels = [];
        this.currentPanelIndex = 0;
        
        // Map states for each panel
        this.mapStates = {
            'intro': { center: [0, 0], zoom: 3, pitch: 0, bearing: 0 },
            'historical': { center: [-71.5375, -16.4090], zoom: 6, pitch: 0, bearing: 0 },
            'architectural': { center: [-71.5375, -16.4090], zoom: 8, pitch: 15, bearing: 10 },
            'cultural': { center: [-71.5375, -16.4090], zoom: 9, pitch: 60, bearing: -30 },
            'data': { center: [-71.537, -16.399], zoom: 18, pitch: 60, bearing: 0 },
            'conclusion': { center: [-71.537, -16.399], zoom: 17, pitch: 60, bearing: 0 }
        };
    }
}
```

#### Key Methods
```javascript
// Initialize scrollytelling
setupScrollytelling() {
    this.contentPanels = Array.from(document.querySelectorAll('.content-panel'));
    
    const panelObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                this.updateActivePanel(entry.target);
            }
        });
    }, { threshold: 0.6 });
}

// Update map state
updateMapState(stateKey) {
    const mapState = this.mapStates[stateKey];
    this.map.easeTo({
        center: mapState.center,
        zoom: mapState.zoom,
        pitch: mapState.pitch,
        bearing: mapState.bearing,
        duration: 2000
    });
}

// Update progress bar
updateProgressBar() {
    const progressBar = document.getElementById('progressBar');
    const progress = (this.currentPanelIndex / (this.contentPanels.length - 1)) * 100;
    progressBar.style.width = progress + '%';
}
```

#### DemoFormHandler Class
```javascript
class DemoFormHandler {
    constructor() {
        this.modal = document.getElementById('demoModal');
        this.form = document.getElementById('demoForm');
    }
    
    async handleSubmit(e) {
        e.preventDefault();
        
        const response = await fetch('https://formspree.io/f/mldpgkdj', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                message: message,
                _replyto: email,
                _subject: 'New Demo Request from Polisense.AI Landing Page',
                _to: 'bruno.galdos@rwth-aachen.de'
            })
        });
    }
}
```

---

## 🗺️ 3D Map Implementation

### Mapbox Configuration
```javascript
// Mapbox token
const token = 'pk.eyJ1IjoibWF0dGVhOTkiLCJhIjoiY2xkY2V0eHF2MDhhYjNub2Jya2h0dHh5diJ9.fXChvC5vSrDhDaNNLLbb0w';

// Map initialization
this.map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-streets-v12', // Initial style
    center: this.mapStates.intro.center,
    zoom: this.mapStates.intro.zoom,
    interactive: false,
    attributionControl: true
});
```

### 3D Buildings Implementation
```javascript
configure3DBuildingsForStandardStyle() {
    this.map.setConfigProperty('basemap', 'show3dObjects', true);
    this.map.setConfigProperty('basemap', 'lightPreset', 'dusk');
}
```

### Map Styles by Panel
- **Intro, Historical, Architectural, Cultural**: `mapbox://styles/mapbox/satellite-streets-v12`
- **Data, Conclusion**: `mapbox://styles/mapbox/standard` (with 3D buildings)

### Lighting Configuration
- **Light Preset**: `'dusk'` for atmospheric appearance
- **3D Objects**: Enabled for data and conclusion panels
- **Custom Lighting**: Day lighting with `intensity: 1.0`

---

## 📧 Form Integration

### Formspree Setup
```javascript
// Endpoint
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mldpgkdj';

// Email configuration
{
    email: userEmail,
    message: userMessage,
    _replyto: userEmail,
    _subject: 'New Demo Request from Polisense.AI Landing Page',
    _to: 'bruno.galdos@rwth-aachen.de'
}
```

### Form Fields
- **Email** (required): `input[type="email"]`
- **Message** (optional): `textarea`
- **Captcha** (required): `input[type="checkbox"]` - "I am not a robot"

### Form Styling
```css
.demo-modal-content {
    background: rgba(0, 0, 0, 0.95);
    border: 2px solid #4effd0;
    border-radius: 12px;
    max-width: 500px;
}

.form-group input,
.form-group textarea {
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(78, 255, 208, 0.3);
    color: #ffffff;
}

.btn-submit {
    background: #4effd0;
    color: #000000;
}
```

---

## 🚀 Deployment Guide

### GitHub Pages Setup

1. **Create Repository**
   ```bash
   # Create new repository on GitHub
   # Name: polisense-landing-page
   # Visibility: Public
   ```

2. **Upload Files**
   ```bash
   git clone https://github.com/username/polisense-landing-page.git
   cd polisense-landing-page
   # Copy all project files
   git add .
   git commit -m "Initial landing page"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: Deploy from branch
   - Branch: main / (root)
   - Save

4. **Access Site**
   - URL: `https://username.github.io/polisense-landing-page/`

### Custom Domain Setup (Optional)

#### DNS Records
```
Type: A, Name: @, Value: 185.199.108.153
Type: A, Name: @, Value: 185.199.109.153
Type: A, Name: @, Value: 185.199.110.153
Type: A, Name: @, Value: 185.199.111.153
Type: CNAME, Name: www, Value: username.github.io
```

#### GitHub Pages Configuration
- Custom domain: `polisense.ai`
- Enforce HTTPS: ✅

---

## 🛠️ Customization Guide

### Changing Colors

#### Primary Turquoise Color
```css
/* Find and replace #4effd0 with your color */
#4effd0 → #your-color

/* Update in these locations: */
- h3 titles
- Progress bar
- Button text
- Form highlights
- Links
```

#### Secondary Blue-gray Color
```css
/* Find and replace #44546a with your color */
#44546a → #your-color

/* Update in these locations: */
- Button backgrounds
- Footer background
- "Explore More" heading
```

### Updating Content

#### Panel Content
```html
<!-- Edit content in index.html -->
<div class="content-panel panel-left" data-map-state="historical">
    <div class="panel-content">
        <h3>Your Title</h3>
        <p>Your content...</p>
    </div>
</div>
```

#### Data Panel Statistics
```html
<!-- Update statistics in index.html -->
<div class="data-item">
    <span class="data-number">Your Number</span>
    <span class="data-label">Your Label</span>
</div>
```

#### Images
```html
<!-- Replace image sources -->
<img src="your-image.jpg" alt="Your description" class="visual-image">
```

### Map Customization

#### Coordinates
```javascript
// Update in main.js
this.mapStates = {
    'data': {
        center: [longitude, latitude], // Your coordinates
        zoom: 18,
        pitch: 60,
        bearing: 0
    }
};
```

#### Map Styles
```javascript
// Available Mapbox styles
'mapbox://styles/mapbox/streets-v12'
'mapbox://styles/mapbox/outdoors-v12'
'mapbox://styles/mapbox/light-v11'
'mapbox://styles/mapbox/dark-v11'
'mapbox://styles/mapbox/satellite-v9'
'mapbox://styles/mapbox/satellite-streets-v12'
'mapbox://styles/mapbox/standard'
```

### Form Configuration

#### Email Destination
```javascript
// Update in main.js
_to: 'your-email@domain.com'
```

#### Formspree Endpoint
```javascript
// Replace with your Formspree endpoint
const response = await fetch('https://formspree.io/f/your-form-id', {
```

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 768px) { }

/* Tablet */
@media (min-width: 769px) and (max-width: 1024px) { }

/* Desktop */
@media (min-width: 1025px) { }
```

---

## 📚 References & Resources

### External Libraries
- **Mapbox GL JS**: https://docs.mapbox.com/mapbox-gl-js/
- **Google Fonts**: https://fonts.google.com/
- **Formspree**: https://formspree.io/

### Key Files
- `index.html` - Main HTML structure
- `styles/main.css` - All styling (1929 lines)
- `scripts/main.js` - JavaScript functionality (1060 lines)
- `polisense_logo.svg` - Company logo
- `bbc_peru.webp` - Energy access image
- `ninitos.png` - Children impact image

### Contact & Links
- **LinkedIn**: https://www.linkedin.com/in/bruno-galdos-a25353a9/
- **Whitepaper**: https://drive.google.com/file/d/1vwmuLqFAROH7sFZpivGxETLkRhM5Nb44/view
- **Demo Document**: https://drive.google.com/file/d/1dF3iEp1KeLXI1MF_braaqAOx025GlElq/view

---

## 🔧 Troubleshooting

### Common Issues

#### Map Not Loading
- Check Mapbox token validity
- Verify internet connection
- Check browser console for errors

#### Form Not Sending
- Verify Formspree endpoint
- Check network requests in browser dev tools
- Ensure all required fields are filled

#### Styling Issues
- Check CSS file path
- Verify class names match HTML
- Clear browser cache

#### 3D Buildings Not Showing
- Ensure using Mapbox Standard style
- Check zoom level (minimum zoom 10)
- Verify 3D objects are enabled

### Performance Optimization
- Lazy load map when in viewport
- Use `prefers-reduced-motion` for animations
- Optimize images (WebP format)
- Minify CSS/JS for production

---

## 📝 Version History

- **v1.0** - Initial implementation with scrollytelling
- **v1.1** - Added 3D buildings with Standard style
- **v1.2** - Integrated Formspree email functionality
- **v1.3** - Updated color scheme and button styling
- **v1.4** - Added comprehensive documentation

---

*This guide covers the complete implementation of the Polisense.AI landing page. For questions or support, refer to the contact information in the footer.*
