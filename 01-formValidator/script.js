const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const repeatPassword = document.getElementById("repeatPassword");

//functions
getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;

  setTimeout(() => {
    formControl.className = "form-control";
    small.innerText = "";
  }, 5000);
};

showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

checkEmail = (input) => {
  const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (emailRegex.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `Email is not valid.`);
  }
};

checkRequired = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} is required.`);
    } else {
      showSuccess(input);
    }
  });
};

checkLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters.`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters.`
    );
  } else {
    showSuccess(input);
  }
};

checkPasswordMatch = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, `Passwords don't match.`);
  } else {
    showSuccess(input1, input2);
  }
};

//event listeners
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkRequired([username, email, password, repeatPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 20);
  checkEmail(email);
  checkPasswordMatch(password, repeatPassword);
});
