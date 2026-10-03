/**
 * Pure Validation Functions for Autograder & CommonJS Export
 */

// Format: 24-1234-123 (Two digits, hyphen, four digits, hyphen, three digits)
function isValidStudentNumber(value) {
  if (typeof value !== 'string') return false;
  const trimmed = value.trim();
  const studentNumRegex = /^\d{2}-\d{4}-\d{3}$/;
  return studentNumRegex.test(trimmed);
}

// Password: >=8 chars, 1 uppercase, 1 digit, 1 special (@, $, !), no whitespace
function isValidPassword(value) {
  if (typeof value !== 'string') return false;
  if (/\s/.test(value)) return false;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!])[A-Za-z\d@$!]{8,}$/;
  return passwordRegex.test(value);
}

// Safe Node/CommonJS Export
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    isValidStudentNumber,
    isValidPassword
  };
}

/**
 * DOM & Browser Event Listeners
 */
if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const form = document.getElementById('registrationForm');
    const fullNameInput = document.getElementById('fullName');
    const studentNumberInput = document.getElementById('studentNumber');
    const emailInput = document.getElementById('email');
    const mobileNumberInput = document.getElementById('mobileNumber');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const courseSelect = document.getElementById('course');
    const termsCheckbox = document.getElementById('terms');

    // Error Elements
    const fullNameError = document.getElementById('fullNameError');
    const studentNumberError = document.getElementById('studentNumberError');
    const emailError = document.getElementById('emailError');
    const mobileNumberError = document.getElementById('mobileNumberError');
    const passwordError = document.getElementById('passwordError');
    const confirmPasswordError = document.getElementById('confirmPasswordError');
    const courseError = document.getElementById('courseError');
    const termsError = document.getElementById('termsError');

    // Feedback & Summary Elements
    const passwordFeedback = document.getElementById('passwordFeedback');
    const successMessage = document.getElementById('successMessage');
    const registrationSummary = document.getElementById('registrationSummary');
    const summaryName = document.getElementById('summaryName');
    const summaryStudentNumber = document.getElementById('summaryStudentNumber');
    const summaryEmail = document.getElementById('summaryEmail');
    const summaryMobileNumber = document.getElementById('summaryMobileNumber');
    const summaryCourse = document.getElementById('summaryCourse');

    // Helper: Set or Clear Errors
    function setError(inputEl, errorEl, message) {
      if (message) {
        if (errorEl) errorEl.textContent = message;
        if (inputEl) inputEl.setAttribute('aria-invalid', 'true');
      } else {
        if (errorEl) errorEl.textContent = '';
        if (inputEl) inputEl.setAttribute('aria-invalid', 'false');
      }
    }

    // 1. Validation Logic per Field
    function validateFullName() {
      const val = fullNameInput.value.trim();
      if (val === '') {
        setError(fullNameInput, fullNameError, 'Full name is required.');
        return false;
      } else if (val.length < 2) {
        setError(fullNameInput, fullNameError, 'Full name must be at least 2 characters.');
        return false;
      }
      setError(fullNameInput, fullNameError, '');
      return true;
    }

    function validateStudentNumber() {
      const val = studentNumberInput.value.trim();
      if (val === '') {
        setError(studentNumberInput, studentNumberError, 'Student number is required.');
        return false;
      } else if (!isValidStudentNumber(val)) {
        setError(studentNumberInput, studentNumberError, 'Enter a student number in the format 24-1234-123.');
        return false;
      }
      setError(studentNumberInput, studentNumberError, '');
      return true;
    }

    function validateEmail() {
      const val = emailInput.value.trim();
      // Rule: text before @, domain with dot, text after dot, no whitespace
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (val === '') {
        setError(emailInput, emailError, 'Email address is required.');
        return false;
      } else if (!emailRegex.test(val)) {
        setError(emailInput, emailError, 'Enter a valid email address.');
        return false;
      }
      setError(emailInput, emailError, '');
      return true;
    }

    function validateMobileNumber() {
      const val = mobileNumberInput.value.trim();
      // Rule: 09XXXXXXXXX or +639XXXXXXXXX (no spaces or hyphens)
      const mobileRegex = /^(09\d{9}|\+639\d{9})$/;
      if (val === '') {
        setError(mobileNumberInput, mobileNumberError, 'Mobile number is required.');
        return false;
      } else if (!mobileRegex.test(val)) {
        setError(mobileNumberInput, mobileNumberError, 'Enter a valid Philippine mobile number (e.g., 09123456789 or +639123456789).');
        return false;
      }
      setError(mobileNumberInput, mobileNumberError, '');
      return true;
    }

    function validatePassword() {
      const val = passwordInput.value; // DO NOT TRIM PASSWORDS
      if (val === '') {
        setError(passwordInput, passwordError, 'Password is required.');
        return false;
      } else if (!isValidPassword(val)) {
        setError(passwordInput, passwordError, 'Password must be at least 8 characters long and contain 1 uppercase letter, 1 digit, and 1 special character (@, $, !).');
        return false;
      }
      setError(passwordInput, passwordError, '');
      return true;
    }

    function validateConfirmPassword() {
      const pass = passwordInput.value;
      const confirmPass = confirmPasswordInput.value;
      if (confirmPass === '') {
        setError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password.');
        return false;
      } else if (confirmPass !== pass) {
        setError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match.');
        return false;
      }
      setError(confirmPasswordInput, confirmPasswordError, '');
      return true;
    }

    function validateCourse() {
      const val = courseSelect.value;
      if (val !== 'BSIT' && val !== 'BSCS') {
        setError(courseSelect, courseError, 'Please select a valid course (BSIT or BSCS).');
        return false;
      }
      setError(courseSelect, courseError, '');
      return true;
    }

    function validateTerms() {
      if (!termsCheckbox.checked) {
        setError(termsCheckbox, termsError, 'You must agree to the terms and conditions.');
        return false;
      }
      setError(termsCheckbox, termsError, '');
      return true;
    }

    // 2. Event Listeners (Part C Rules)
    
    // Blur event for full-name
    fullNameInput.addEventListener('blur', validateFullName);

    // Input event for live password feedback
    passwordInput.addEventListener('input', () => {
      const val = passwordInput.value;
      if (isValidPassword(val)) {
        passwordFeedback.textContent = 'Password meets all security criteria.';
        passwordFeedback.style.color = '#28a745';
      } else {
        passwordFeedback.textContent = 'Password needs at least 8 chars, 1 uppercase, 1 digit, and @, $, or !';
        passwordFeedback.style.color = '#17a2b8';
      }
    });

    // Change event for course and terms
    courseSelect.addEventListener('change', validateCourse);
    termsCheckbox.addEventListener('change', validateTerms);

    // Form Reset Handler
    form.addEventListener('reset', () => {
      // Clear errors
      const errorSpans = document.querySelectorAll('.error-msg');
      errorSpans.forEach(span => span.textContent = '');

      // Reset ARIA states
      const inputs = form.querySelectorAll('input, select');
      inputs.forEach(input => input.setAttribute('aria-invalid', 'false'));

      // Clear password feedback, success message, and summary output
      passwordFeedback.textContent = '';
      successMessage.textContent = '';
      registrationSummary.style.display = 'none';

      summaryName.textContent = '';
      summaryStudentNumber.textContent = '';
      summaryEmail.textContent = '';
      summaryMobileNumber.textContent = '';
      summaryCourse.textContent = '';
    });

    // Form Submission Handler
    form.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent page reload

      // Run all checks
      const isNameValid = validateFullName();
      const isStudentNumValid = validateStudentNumber();
      const isEmailValid = validateEmail();
      const isMobileValid = validateMobileNumber();
      const isPasswordValid = validatePassword();
      const isConfirmValid = validateConfirmPassword();
      const isCourseValid = validateCourse();
      const isTermsValid = validateTerms();

      const isFormValid = isNameValid && isStudentNumValid && isEmailValid && 
                          isMobileValid && isPasswordValid && isConfirmValid && 
                          isCourseValid && isTermsValid;

      if (isFormValid) {
        // Display Success Message
        successMessage.textContent = 'Registration details validated successfully!';

        // Populate Summary using textContent (Safe against XSS)
        summaryName.textContent = fullNameInput.value.trim();
        summaryStudentNumber.textContent = studentNumberInput.value.trim();
        summaryEmail.textContent = emailInput.value.trim();
        summaryMobileNumber.textContent = mobileNumberInput.value.trim();
        summaryCourse.textContent = courseSelect.value;

        // Display Summary
        registrationSummary.style.display = 'block';
      } else {
        // Clear success message and summary if submission fails validation
        successMessage.textContent = '';
        registrationSummary.style.display = 'none';
      }
    });
  });
}