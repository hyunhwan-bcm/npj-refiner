# Springer Nature Image Enhancer

A Chrome extension that improves image quality on Springer Nature websites by automatically loading high-resolution versions of images.

## Problem

Springer Nature websites (like nature.com) serve low-resolution images by default with URLs containing size parameters like `lw685`:
```
https://media.springernature.com/lw685/springer-static/image/art%3A10.1038%2Fs41586-025-09819-w/MediaObjects/41586_2025_9819_Fig1_HTML.png
```

## Solution

This extension automatically replaces the size parameter with `full` to load high-resolution images:
```
https://media.springernature.com/full/springer-static/image/art%3A10.1038%2Fs41586-025-09819-w/MediaObjects/41586_2025_9819_Fig1_HTML.png
```

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" using the toggle in the top-right corner
3. Click "Load unpacked"
4. Select the `nature-chrome-extension` folder
5. The extension is now installed and active

## Testing

Visit the test article to see the enhanced images:
https://www.nature.com/articles/s41586-025-09529-3

## How It Works

- The extension runs a content script on all nature.com pages
- It scans all images on the page and replaces URLs matching the pattern `/lw\d+/` with `/full/`
- It also monitors for dynamically loaded images using a MutationObserver
- All changes are logged to the browser console for debugging

## Development

The extension consists of:
- `manifest.json` - Extension configuration
- `content.js` - Content script that modifies image URLs
- `icons/` - Extension icons (placeholder)

## Future Enhancements

- Add more image quality improvements
- Improve page layout and typography
- Add user-configurable options
