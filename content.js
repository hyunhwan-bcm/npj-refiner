// Springer Nature Image Enhancer
// Replaces low-resolution image URLs with high-resolution versions

(function() {
  'use strict';

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

  console.log('Springer Nature Image Enhancer: Active');
})();
