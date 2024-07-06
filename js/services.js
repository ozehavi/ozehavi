function adjustRowHeights() {
    const rows = document.querySelectorAll('.service_area .row');
    
    rows.forEach(row => {
      const cards = row.querySelectorAll('.single_service');
      let maxExpandedHeight = 0;
      let maxCollapsedHeight = 0;
  
      cards.forEach(card => {
        card.style.height = 'auto';
        if (card.classList.contains('expanded')) {
          maxExpandedHeight = Math.max(maxExpandedHeight, card.offsetHeight);
        } else {
          maxCollapsedHeight = Math.max(maxCollapsedHeight, card.offsetHeight);
        }
      });
  
      cards.forEach(card => {
        if (card.classList.contains('expanded')) {
          card.style.height = `${maxExpandedHeight}px`;
        } else {
          card.style.height = `${maxCollapsedHeight}px`;
        }
      });
    });
  }
  
  function toggleDescription(card) {
    card.classList.toggle('expanded');

    const description = card.querySelector('.service-card-description');
    const toggleIcon = card.querySelector('.toggle-icon');
    if (card.classList.contains('expanded')) {
        description.style.display = 'block';
        toggleIcon.textContent = '-';
    } else {
        description.style.display = 'none';
        toggleIcon.textContent = '+';
    }

    adjustRowHeights();
  }
  
  window.addEventListener('load', adjustRowHeights);
  window.addEventListener('resize', adjustRowHeights);