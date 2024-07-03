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
}