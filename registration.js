

const form = document.querySelector('#registration-form');
const firstName = form.querySelector('#first-name');
const lastName = form.querySelector('#last-name');
const birthdate = form.querySelector('#birthdate');
const email = form.querySelector('#email');
const password = form.querySelector('#password');
const confirmPassword = form.querySelector('#confirm-password');

function showError(input, message) {
  const errorElement = input.parentElement.querySelector('.error-message');
  errorElement.innerText = message;
  return !message;
}

function validateName(input, field) {
  const value = input.value.trim();
  if (value.length < 2 || value.length > 25) {
    return showError(input, `${field} должно содержать от 2 до 25 символов`);
  } else {
    return showError(input, '');
  }
}

function validateBirthdate(input) {
  const value = input.value;
  if (!value || new Date(value) > new Date()) {
    return showError(input, 'Неверная дата рождения');
  } else {
    return showError(input, '');
  }
}

function validateEmail(input) {
  const value = input.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!regex.test(value)) {
    return showError(input, 'Введите корректный email');
  } else {
    return showError(input, '');
  }
}

function validatePassword(input) {
  const value = input.value.trim();
  const regex = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*?&]).{8,}$/;

  if (!regex.test(value)) {
    return showError(input, 'Пароль должен быть не менее 8 символов, содержать минимум 1 цифру, 1 символ в верхнем регистре и 1 специальный символ !@#$%');
  } else {
    return showError(input, '');
  }
}

function validateConfirmPassword(input, passwordInput) {
  const value = input.value.trim();

  if (!value || value !== passwordInput.value.trim()) {
    return showError(input, 'Пароли не совпадают');
  } else {
    return showError(input, '');
  }
}

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  const isValidForm =
  validateName(firstName, 'Имя') &&
  validateName(lastName, 'Фамилия') &&
  validateBirthdate(birthdate) &&
  validateEmail(email) &&
  validatePassword(password) &&
  validateConfirmPassword(confirmPassword, password)


  if (isValidForm) {
    const data = {
      firstName: firstName.value.trim(),
      lastName: lastName.value.trim(),
      birthdate: birthdate.value,
      email: email.value.trim(),
      password: password.value.trim(),
    };
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
      })
      const respData = await (response.json())
      console.log(respData);
    } catch (e) {
      console.log(e);
    }
  }
});