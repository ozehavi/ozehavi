const recommendations = [
    {
        text: `עברתי החלפת מפרק ירך כתוצאה מתאונה. מאיה העמידה אותי על הרגליים. טיפלה בי בהתמדה, במסירות ובסבלנות. התאימה את התרגילים למצבי השיקומי. ממצב בו התקשתי לקום מהמיטה, בזכותה של מאיה,  הכל כך מקצועית, היום אני מתפקדת תפקוד מלא ועושה פילאטיס מכשירים.`,
        stars: 5
    },
    {
        text: `עברתי ניתוח להחלפת ברך, מאיה הגיעה אליי,  הדריכה אותי איזה תרגילים אני צריכה לעשות כדי לחזק את שרירי הרגליים, הכניסה בי ביטחון, בכל יום יכולת התנועה שלי השתפרה. אני מודה מאוד למאיה על הטיפול שהיא נתנה לי.`,
        stars: 5
    },
    {
        text: `מאיה הפיזיותרפיסטית המקסימה 
תודה עבור הטיפול המסור לאחר קרע בהמסטרינג כתוצאה מנפילה.
יש לציין שכל תרגיל שנתת לי עשה פלאים בהמשך יש לך יכולת למקד את הטיפול והמגע שלך ומתן הדיקור בצורה מאוד מקצועית.`,
        stars: 5
    },
    {
        text: `התמודדתי עם קרע מלא ברצועה הצולבת וקרע במיניסקוס המידיאלי. בשבועות הראשונים מאיה שמה דגש יותר על החזרת טווח התנועה של כיפוף הברך ובהמשך התחלנו לעבוד על תרגילים מורכבים יותר להחזרת הרגל לתפקוד שהיה לה לפני הפציעה. עבדתי עם מאיה כ4 חודשים בהם עברתי ממצב בו אני לא יכול לקפל בכלל את הברך למצב בו אני רץ ריצות ארוכות ומרים משקלים כבדים עם הרגל הפצועה. ממליץ מאוד לכולם לעבוד עם מאיה, שכן עבדה באופן מקצועי, סבלני, ואמפתי. בעבודה מאיה שילבה הומור, הביאה טיפים לתרגול בבית ולתרגול בשלבים מאוחרים יותר של השיקום, מה שנתן תחושה שבאמת אכפת לה ממני ושהשיקום שלי חשוב לה כמו שהוא היה חשוב לי.`,
        stars: 5
    },
    {
        text: `לפני שנה וחצי שברתי את צואר פרק הירך
כתוצאה מנפילה.
כמובן שלא יכולתי ללכת וכמובן כאבים. בעזרת מאיה והטיפול המסור שלה הצלחתי תוך זמן קצר יחסית להתנהל עם הליכון הטיפולים היו ערוכים
בצורה איטית ומתקדמת כך שלא היו לי כאבים וכמובן בעזרת התרגילים שקבלתי לעשות בעצמי וגם עשיתי התקדמתי יחסית מהר
והיום אני יכולה ללכת ללא עזרה אבל עדיין
ממשיכה בתרגילים לחיזוק השרירים ומקפידה ללא ליפול שנית. על כך אני אסירת תודה למאיה על הנחישות וההתמדה שהיא העבירה לי בצורה נעימה ומשכנעת.`,
        stars: 5
    }
];

const recommendationCards = document.getElementById('recommendationCards');
const template = document.getElementById('recommendationTemplate');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
let currentIndex = 0;

function isTextOverflowing(element) {
    return element.scrollHeight > element.clientHeight;
}

function createRecommendations() {
    recommendations.forEach((rec, index) => {
        const content = template.content.cloneNode(true);
        const card = content.querySelector('.recommendation');
        
        const textContainer = card.querySelector('.text-container');
        const textElement = textContainer.querySelector('p');
        textElement.textContent = rec.text;
        
        const starsContainer = card.querySelector('.stars');
        for (let i = 0; i < rec.stars; i++) {
            const star = document.createElement('i');
            star.className = 'fa fa-star';
            star.setAttribute('aria-hidden', 'true');
            starsContainer.appendChild(star);
        }

        if (index === 0) card.classList.add('active');
        recommendationCards.appendChild(card);

        createIndicators(card);

        setTimeout(() => {
            if (isTextOverflowing(textContainer)) {
                const expandButton = document.createElement('button');
                expandButton.textContent = 'קרא עוד';
                expandButton.className = 'expand-button';
                expandButton.addEventListener('click', () => expandText(card, textContainer, expandButton));
                card.insertBefore(expandButton, card.querySelector('.indicator-container'));
            }
        }, 0);
    });
}

function createIndicators(card) {
    const indicatorContainer = card.querySelector('.indicator-container');
    recommendations.forEach((_, index) => {
        const indicator = document.createElement('div');
        indicator.className = 'rec-indicator';
        if (index === 0) indicator.classList.add('active');
        indicator.addEventListener('click', () => {
            showRecommendation(index);
        });
        indicatorContainer.appendChild(indicator);
    });
}

function expandText(card, textContainer, button) {
    card.classList.toggle('expanded');
    if (card.classList.contains('expanded')) {
        button.textContent = 'קרא פחות';
        textContainer.style.height = 'auto';
    } else {
        button.textContent = 'קרא עוד';
        textContainer.style.height = '130px'; 
    }
}

function showRecommendation(index) {
    const cards = recommendationCards.querySelectorAll('.recommendation');
    cards.forEach((card, i) => {
        if (i === index) {
            card.classList.add('active');
        } else {
            card.classList.remove('active');
        }
    });
    updateIndicators(index);
}

function updateIndicators(index) {
    const cards = recommendationCards.querySelectorAll('.recommendation');
    cards.forEach((card) => {
        const indicators = card.querySelectorAll('.rec-indicator');
        indicators.forEach((indicator, i) => {
            if (i === index) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    });
}

function nextRecommendation() {
    currentIndex = (currentIndex + 1) % recommendations.length;
    showRecommendation(currentIndex);
}

function prevRecommendation() {
    currentIndex = (currentIndex - 1 + recommendations.length) % recommendations.length;
    showRecommendation(currentIndex);
}

prevBtn.addEventListener('click', () => {
    prevRecommendation();
});

nextBtn.addEventListener('click', () => {
    nextRecommendation();
});

createRecommendations();