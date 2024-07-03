const portfolio = document.querySelector('.portfolio');
const portfolioInner = portfolio.querySelector('.portfolio-inner');
const items = portfolio.querySelectorAll('.portfolio-item');
const prevImgBtn = portfolio.querySelector('.prev');
const nextImgBtn = portfolio.querySelector('.next');
const indicatorsContainer = portfolio.querySelector('.portfolio-indicators');

let currentImgIndex = 0;
const totalItems = items.length;
let startX, startY, currentX, currentY, isDragging = false;
let isMobile = window.innerWidth <= 600;
let isHorizontalDrag = false;

function createIndicators() {
    for (let i = 0; i < totalItems; i++) {
        const indicator = document.createElement('div');
        indicator.classList.add('indicator');
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
}

function updateIndicators() {
    const indicators = indicatorsContainer.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        if (index === currentImgIndex) {
            indicator.classList.add('active');
        } else {
            indicator.classList.remove('active');
        }
    });
}

function updatePortfolio(offset = 0) {
    const translateX = -currentImgIndex * 100 + offset;
    portfolioInner.style.transform = `translateX(${translateX}%)`;
    prevImgBtn.style.display = currentImgIndex === 0 && offset >= 0 ? 'none' : 'block';
    nextImgBtn.style.display = currentImgIndex === totalItems - 1 && offset <= 0 ? 'none' : 'block';
    updateIndicators();
}

function snapToNearestItem() {
    if (!isMobile) return;

    const itemWidth = portfolio.offsetWidth;
    const dragOffset = currentX - startX;
    const draggedItems = dragOffset / itemWidth;

    if (Math.abs(draggedItems) > 0.2) {
        currentImgIndex = Math.max(0, Math.min(totalItems - 1, currentImgIndex - Math.sign(draggedItems)));
    }

    portfolioInner.style.transition = 'transform 0.3s ease';
    updatePortfolio();
    setTimeout(() => {
        portfolioInner.style.transition = '';
    }, 300);
}

function handleStart(e) {
    if (!isMobile) return;
    isDragging = true;
    startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    startY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;
    currentX = startX;
    currentY = startY;
    portfolioInner.style.transition = 'none';
    isHorizontalDrag = false;
}

function handleMove(e) {
    if (!isMobile || !isDragging) return;
    currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
    currentY = e.type.includes('mouse') ? e.pageY : e.touches[0].pageY;

    const diffX = currentX - startX;
    const diffY = currentY - startY;

    if (!isHorizontalDrag && Math.abs(diffY) > Math.abs(diffX)) {
        isDragging = false; // Stop dragging for vertical movements
        return;
    }

    e.preventDefault();
    isHorizontalDrag = true;
    const dragOffset = (currentX - startX) / portfolio.offsetWidth * 100;
    updatePortfolio(dragOffset);
}

function handleEnd() {
    if (!isMobile || !isDragging) return;
    isDragging = false;
    snapToNearestItem();
}

prevImgBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentImgIndex > 0) {
        currentImgIndex--;
        updatePortfolio();
    }
});

nextImgBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (currentImgIndex < totalItems - 1) {
        currentImgIndex++;
        updatePortfolio();
    }
});

portfolio.addEventListener('mousedown', handleStart);
portfolio.addEventListener('touchstart', handleStart, { passive: true });

portfolio.addEventListener('mousemove', handleMove);
portfolio.addEventListener('touchmove', handleMove, { passive: false });

portfolio.addEventListener('mouseup', handleEnd);
portfolio.addEventListener('mouseleave', handleEnd);
portfolio.addEventListener('touchend', handleEnd);

window.addEventListener('resize', () => {
    isMobile = window.innerWidth <= 600;
});

function goToSlide(index) {
    currentImgIndex = index;
    updatePortfolio();
}

// Initial setup
createIndicators();
updatePortfolio();

// const portfolio = document.querySelector('.portfolio');
//         const portfolioInner = portfolio.querySelector('.portfolio-inner');
//         const items = portfolio.querySelectorAll('.portfolio-item');
//         const prevImgBtn = portfolio.querySelector('.prev');
//         const nextImgBtn = portfolio.querySelector('.next');
//         const indicatorsContainer = portfolio.querySelector('.portfolio-indicators');

//         let currentImgIndex = 0;
//         const totalItems = items.length;
//         let startX, currentX, isDragging = false;
//         let isMobile = window.innerWidth <= 600;

//         function createIndicators() {
//             for (let i = 0; i < totalItems; i++) {
//                 const indicator = document.createElement('div');
//                 indicator.classList.add('indicator');
//                 indicator.addEventListener('click', () => goToSlide(i));
//                 indicatorsContainer.appendChild(indicator);
//             }
//         }

//         function updateIndicators() {
//             const indicators = indicatorsContainer.querySelectorAll('.indicator');
//             indicators.forEach((indicator, index) => {
//                 if (index === currentImgIndex) {
//                     indicator.classList.add('active');
//                 } else {
//                     indicator.classList.remove('active');
//                 }
//             });
//         }

//         function updatePortfolio(offset = 0) {
//             const translateX = -currentImgIndex * 100 + offset;
//             portfolioInner.style.transform = `translateX(${translateX}%)`;
//             prevImgBtn.style.display = currentImgIndex === 0 && offset >= 0 ? 'none' : 'block';
//             nextImgBtn.style.display = currentImgIndex === totalItems - 1 && offset <= 0 ? 'none' : 'block';
//             updateIndicators();
//         }

//         function snapToNearestItem() {
//             if (!isMobile) return;

//             const itemWidth = portfolio.offsetWidth;
//             const dragOffset = currentX - startX;
//             const draggedItems = dragOffset / itemWidth;

//             if (Math.abs(draggedItems) > 0.2) {
//                 currentImgIndex = Math.max(0, Math.min(totalItems - 1, currentImgIndex - Math.sign(draggedItems)));
//             }

//             portfolioInner.style.transition = 'transform 0.3s ease';
//             updatePortfolio();
//             setTimeout(() => {
//                 portfolioInner.style.transition = '';
//             }, 300);
//         }

//         function handleStart(e) {
//             if (!isMobile) return;
//             isDragging = true;
//             startX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
//             currentX = startX;
//             portfolioInner.style.transition = 'none';
//         }

//         function handleMove(e) {
//             if (!isMobile || !isDragging) return;
//             e.preventDefault();
//             currentX = e.type.includes('mouse') ? e.pageX : e.touches[0].pageX;
//             const dragOffset = (currentX - startX) / portfolio.offsetWidth * 100;
//             updatePortfolio(dragOffset);
//         }

//         function handleEnd() {
//             if (!isMobile || !isDragging) return;
//             isDragging = false;
//             snapToNearestItem();
//         }

//         prevImgBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             if (currentImgIndex > 0) {
//                 currentImgIndex--;
//                 updatePortfolio();
//             }
//         });

//         nextImgBtn.addEventListener('click', (e) => {
//             e.preventDefault();
//             if (currentImgIndex < totalItems - 1) {
//                 currentImgIndex++;
//                 updatePortfolio();
//             }
//         });

//         portfolio.addEventListener('mousedown', handleStart);
//         portfolio.addEventListener('touchstart', handleStart, { passive: true });

//         portfolio.addEventListener('mousemove', handleMove);
//         portfolio.addEventListener('touchmove', handleMove, { passive: false });

//         portfolio.addEventListener('mouseup', handleEnd);
//         portfolio.addEventListener('mouseleave', handleEnd);
//         portfolio.addEventListener('touchend', handleEnd);

//         window.addEventListener('resize', () => {
//             isMobile = window.innerWidth <= 600;
//         });

//         function goToSlide(index) {
//             currentImgIndex = index;
//             updatePortfolio();
//         }

//         // Initial setup
//         createIndicators();
//         updatePortfolio();