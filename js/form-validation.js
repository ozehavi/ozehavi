$(document).ready(function(){
    // Add validation styles
    const style = document.createElement('style');
    style.textContent = `
        .validation-error {
            color: red;
            font-size: 0.875rem;
            margin-top: 0.25rem;
            margin-bottom: 0.5rem;
        }
        
        .form-control.error {
            border-color: red;
        }

        .form-control.valid {
            border-color: green;
        }
    `;
    document.head.appendChild(style);

    // Validation patterns
    const hebrewPattern = /^[\u0590-\u05FF\s]+$/;
    const phonePattern = /^\d{10}$/;
    const numbersOnlyPattern = /^\d*$/;

    // Track form validity state
    const formState = {
        full_name: false,
        phone: false,
        description: false
    };

    function isFormValid() {
        return formState.full_name && formState.phone && formState.description;
    }

    // Validation functions
    function validateHebrewText(value) {
        return value && hebrewPattern.test(value);
    }

    function validatePhone(value) {
        if (!value) return true; // Empty is handled separately
        if (!numbersOnlyPattern.test(value)) return false; // Non-numeric characters
        if (value.length > 10) return false; // Too long
        if (value.length === 10) return true; // Perfect length
        return true; // Still typing (length < 10)
    }

    function validatePhoneForSubmit(value) {
        return phonePattern.test(value);
    }

    function showError(element, message) {
        // Remove any existing error message
        removeError(element);
        
        const errorMessage = document.createElement('div');
        errorMessage.className = 'validation-error';
        errorMessage.textContent = message;
        element.parentNode.appendChild(errorMessage);
        element.classList.add('error');
        element.classList.remove('valid');

        // Update form state
        formState[element.id] = false;
    }

    function showSuccess(element) {
        removeError(element);
        element.classList.remove('error');
        element.classList.add('valid');

        // Update form state
        formState[element.id] = true;
    }

    function removeError(element) {
        const existingError = element.parentNode.querySelector('.validation-error');
        if (existingError) {
            existingError.remove();
        }
        element.classList.remove('error', 'valid');

        // Reset form state for this field
        formState[element.id] = false;
    }

    function debounce(func, wait) {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    }

    // Live validation for full name
    document.getElementById('full_name').addEventListener('input', 
        debounce(function() {
            if (this.value.trim() === '') {
                removeError(this);
            } else if (!validateHebrewText(this.value)) {
                showError(this, 'נא להזין שם בעברית בלבד');
            } else {
                showSuccess(this);
            }
        }, 300)
    );

    // Live validation for phone
    document.getElementById('phone').addEventListener('input', function() {
        if (this.value.trim() === '') {
            removeError(this);
        } else if (!validatePhone(this.value)) {
            if (!numbersOnlyPattern.test(this.value)) {
                showError(this, 'נא להזין ספרות בלבד');
            } else if (this.value.length > 10) {
                showError(this, 'מספר טלפון צריך להכיל 10 ספרות בדיוק');
            }
        } else if (this.value.length === 10) {
            showSuccess(this);
        } else {
            removeError(this);
        }
    });

    // Live validation for description
    document.getElementById('description').addEventListener('input', 
        debounce(function() {
            if (this.value.trim() === '') {
                removeError(this);
            } else if (!validateHebrewText(this.value)) {
                showError(this, 'נא לכתוב את ההודעה בעברית בלבד');
            } else {
                showSuccess(this);
            }
        }, 300)
    );

    // Form submission validation
    document.getElementById('contact_form').addEventListener('submit', function(event) {
        const fullName = document.getElementById('full_name');
        const phone = document.getElementById('phone');
        const textarea = document.getElementById('description');
        
        let hasError = false;

        // Validate full name
        if (fullName.value.trim() === '') {
            hasError = true;
            showError(fullName, 'נא להזין שם');
        } else if (!validateHebrewText(fullName.value)) {
            hasError = true;
            showError(fullName, 'נא להזין שם בעברית בלבד');
        }

        // Validate phone
        if (phone.value.trim() === '') {
            hasError = true;
            showError(phone, 'נא להזין מספר טלפון');
        } else if (!validatePhoneForSubmit(phone.value)) {
            hasError = true;
            showError(phone, 'נא להזין מספר טלפון תקין (10 ספרות)');
        }

        // Validate description
        if (textarea.value.trim() === '') {
            hasError = true;
            showError(textarea, 'נא להזין הודעה');
        } else if (!validateHebrewText(textarea.value)) {
            hasError = true;
            showError(textarea, 'נא לכתוב את ההודעה בעברית בלבד');
        }

        // Always prevent default if there are any errors
        if (hasError || !isFormValid()) {
            event.preventDefault();
            return false;
        }
    });
});