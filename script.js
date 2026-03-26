<script>

(function() {
  // Notice text for product pages
  const productPageNoticeText = "All garments/products that are embellished with club logos, or other logos as required, are customised garments/products. The embellishment process starts at the point of order and therefore these garments/products are non-returnable unless faulty and orders cannot be cancelled or amended once placed.";
  // Notice text for side-cart
  const sideCartPageNoticeText = "Please note that any garments/products within this order that are embellished with club logos, or other logos as required, are customised garments/products. The embellishment process starts at the point of order and therefore these garments/products are non-returnable unless faulty and orders cannot be cancelled or amended once placed.";
  // Shared styling for notices
  const style = "font-weight:bold; color: #000000; border: 1px solid #000000; background-color: #78c8ec; padding:15px; margin:10px 0; border-radius:5px; line-height:1.5;";
 
  // Define notice locations and properties
  const notices = [
    { selector: 'div.form-action', id: 'custom-product-notice', position: 'before', desktopWidth: '520px' },
    { selector: 'li.previewCartTotals.grandTotal', id: 'custom-cart-total-notice', position: 'after' },
  ];

  function isMobile() {
    return window.innerWidth <= 768;
  }

  function computeNoticeWidth() {
    if (isMobile()) {
      const ref = document.querySelector('#form-action-addToCart');
      return (ref && ref.offsetWidth > 0) ? ref.offsetWidth + 'px' : null;
    }
    return '520px';
  }

  function getNoticeWidth() {
    const w = computeNoticeWidth();
    return w ? 'width:' + w + ';' : '';
  }

  var resizeTimeout;
  function updateProductNoticeWidth() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      const notice = document.getElementById('custom-product-notice');
      if (!notice) return;
      const w = computeNoticeWidth();
      if (w) notice.style.width = w;
    }, 100);
  }

  window.addEventListener('resize', updateProductNoticeWidth);

  function addNotices() {
    notices.forEach(({ selector, id, position, desktopWidth }) => {
      const target = document.querySelector(selector);
      // Only add notice if target exists and notice hasn't been added already
      if (target && !document.getElementById(id)) {
        const notice = document.createElement('div');
        notice.id = id;
        const widthStyle = desktopWidth ? getNoticeWidth() : '';
        notice.style.cssText = style + widthStyle;
       
        // Set the appropriate notice text based on the selector
        if (selector === 'div.form-action') {
          notice.textContent = productPageNoticeText;
        } else {
          notice.textContent = sideCartPageNoticeText;
        }
        
        // Insert notice at specified position
        if (position === 'before') target.parentNode.insertBefore(notice, target);
        else if (position === 'after') target.parentNode.insertBefore(notice, target.nextSibling);
        else {
          console.log('Script "Custom Product Notice" error - Invalid position specified for notice insertion.');
        }
      }
    });
  }

  // Call the function for product page on initial load
  addNotices();
  
  // Mutation observer required for loading content into the side-cart
  const observer = new MutationObserver(() => addNotices());
  observer.observe(document.body, { childList: true, subtree: true });
})();

</script>