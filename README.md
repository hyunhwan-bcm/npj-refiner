# npj refiner

A Chrome extension that improves readability on Springer Nature websites with three key enhancements:
1. **High-resolution images** - Automatically loads full-quality images
2. **Better math rendering** - Forces MathJax to use HTML-CSS renderer
3. **Expanded tables** - Shows full tables inline without clicking "Full size table"

## Problems & Solutions

### 1. Low-Resolution Images
**Problem:** Nature.com serves low-resolution images with size parameters like `lw685`
```
https://media.springernature.com/lw685/springer-static/image/...
```

**Solution:** Automatically replaces with `full` for high-resolution
```
https://media.springernature.com/full/springer-static/image/...
```

### 2. Poor Math Rendering
**Problem:** MathJax defaults to "PlainSource" renderer (plain text)

**Solution:** Forces HTML-CSS renderer for high-quality equation display

### 3. Truncated Tables
**Problem:** Tables show only summaries, requiring clicks to see full data

**Solution:** Automatically fetches and displays full tables inline

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top-right corner
3. Click "Load unpacked"
4. Select the `nature-chrome-extension` folder
5. The extension is now installed and active

## Testing

Visit these articles to see the enhancements:
- Math & Images: https://www.nature.com/articles/s41586-025-09529-3
- Tables: https://www.nature.com/articles/s41746-025-02166-0

## How It Works

### Image Enhancement
- Scans all `<img>` and `<source>` elements
- Replaces URLs matching `/lw\d+/` with `/full/`
- Monitors for dynamically loaded images using MutationObserver

### Math Rendering
- Sets MathJax cookie to force HTML-CSS renderer
- Hooks into MathJax.Hub.Config before initialization
- Auto-switches and re-renders if MathJax is already loaded

### Table Expansion
- Finds all "Full size table" links
- Fetches full table pages in background
- Replaces summary tables with complete data
- Keeps "Full size table" button for opening in new tab

## Development

The extension consists of:
- `manifest.json` - Extension configuration (runs at document_start)
- `content.js` - Content script with three main modules:
  - `forceMathJaxRenderer()` - MathJax configuration
  - Image enhancement (src/srcset replacement)
  - `loadFullTable()` - Table expansion
- `icons/` - Extension icons (placeholder)

## Configuration

All enhancements are automatic. To modify:
- **Math renderer**: Change `'HTML-CSS'` to `'SVG'` or other renderers in content.js
- **Image quality**: Modify the `/full/` replacement pattern
- **Table delay**: Adjust `setTimeout` duration in `initTableExpansion()`
