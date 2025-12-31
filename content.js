// Springer Nature Image Enhancer
// Replaces low-resolution image URLs with high-resolution versions
// Forces MathJax to use HTML-CSS renderer for better quality

(function() {
  'use strict';

  // Force MathJax to use HTML-CSS renderer (MathJax 2.x)
  function forceMathJaxRenderer() {
    // Set MathJax renderer preference in cookie format for MathJax 2.x
    try {
      // MathJax 2.x stores settings in a cookie with this format
      document.cookie = 'mjx.menu=renderer:HTML-CSS; path=/; max-age=31536000';
      console.log('Set MathJax cookie to use HTML-CSS renderer');
    } catch (e) {
      console.warn('Could not set MathJax cookie:', e);
    }

    // Configure MathJax Hub before it loads
    window.MathJax = window.MathJax || {};
    window.MathJax.Hub = window.MathJax.Hub || {};
    window.MathJax.Hub.Config = window.MathJax.Hub.Config || function() {};

    // Set the renderer in the configuration
    const originalConfig = window.MathJax.Hub.Config;
    window.MathJax.Hub.Config = function(config) {
      config = config || {};
      config.menuSettings = config.menuSettings || {};
      config.menuSettings.renderer = 'HTML-CSS';
      return originalConfig.call(this, config);
    };

    // If MathJax is already loaded, change renderer and re-render
    if (window.MathJax && window.MathJax.Hub && window.MathJax.Hub.Queue) {
      setTimeout(function() {
        try {
          // Set the renderer
          window.MathJax.Hub.Queue(['setRenderer', window.MathJax.Hub, 'HTML-CSS']);
          // Reprocess all math on the page
          window.MathJax.Hub.Queue(['Typeset', window.MathJax.Hub]);
          console.log('Switched MathJax to HTML-CSS renderer and reprocessed equations');
        } catch (e) {
          console.warn('Could not switch MathJax renderer:', e);
        }
      }, 100);
    }
  }

  // Run MathJax configuration immediately
  forceMathJaxRenderer();

  // Function to enhance image URL
  function enhanceImageUrl(url) {
    if (!url) return url;

    // Pattern: https://media.springernature.com/lw685/springer-static/...
    // Replace: lw685 with full for high-resolution images
    const pattern = /\/lw\d+\//;

    if (pattern.test(url)) {
      const enhancedUrl = url.replace(pattern, '/full/');
      console.log('Enhanced image URL:', url, '->', enhancedUrl);
      return enhancedUrl;
    }

    return url;
  }

  // Function to process an image element
  function processImage(img) {
    const originalSrc = img.src;
    const enhancedSrc = enhanceImageUrl(originalSrc);

    if (enhancedSrc !== originalSrc) {
      img.src = enhancedSrc;
    }

    // Also update srcset if present
    if (img.srcset) {
      const originalSrcset = img.srcset;
      img.srcset = img.srcset.split(',').map(srcsetItem => {
        const parts = srcsetItem.trim().split(' ');
        parts[0] = enhanceImageUrl(parts[0]);
        return parts.join(' ');
      }).join(', ');

      if (img.srcset !== originalSrcset) {
        console.log('Enhanced img srcset');
      }
    }
  }

  // Function to process a source element
  function processSource(source) {
    // Update srcset attribute
    if (source.srcset) {
      const originalSrcset = source.srcset;
      source.srcset = source.srcset.split(',').map(srcsetItem => {
        const parts = srcsetItem.trim().split(' ');
        parts[0] = enhanceImageUrl(parts[0]);
        return parts.join(' ');
      }).join(', ');

      if (source.srcset !== originalSrcset) {
        console.log('Enhanced source srcset');
      }
    }
  }

  // Function to process all images and sources on the page
  function processAllImages() {
    const images = document.querySelectorAll('img');
    const sources = document.querySelectorAll('source');
    console.log(`Found ${images.length} images and ${sources.length} source elements on the page`);

    images.forEach(img => {
      processImage(img);
    });

    sources.forEach(source => {
      processSource(source);
    });
  }

  // Initialize image processing when DOM is ready
  function initImageProcessing() {
    // Process images on page load
    processAllImages();

    // Observe DOM changes for dynamically loaded images
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeName === 'IMG') {
            processImage(node);
          } else if (node.nodeName === 'SOURCE') {
            processSource(node);
          } else if (node.querySelectorAll) {
            const imgs = node.querySelectorAll('img');
            const sources = node.querySelectorAll('source');
            imgs.forEach(img => processImage(img));
            sources.forEach(source => processSource(source));
          }
        });
      });
    });

    // Start observing the document
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    console.log('Springer Nature Image Enhancer: Image processing active');
  }

  // Wait for DOM to be ready before processing images
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initImageProcessing);
  } else {
    // DOM is already ready
    initImageProcessing();
  }

  console.log('Springer Nature Image Enhancer: Active');
})();
