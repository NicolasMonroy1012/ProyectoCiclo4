const form_regF = document.getElementById("form_reg");
const form_siF = document.getElementById("form_si");
const user_name = document.getElementById("user_name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirm_password = document.getElementById("confirm_password");
const emailSI = document.getElementById("emailSI");
const passwordSI = document.getElementById("passwordSI");
let error = document.getElementById("error");
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});

form_reg.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputsReg();
});

function checkInputsReg() {
  const user_nameValue = user_name.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value;
  const confirm_passwordValue = confirm_password.value;

  if (user_nameValue === "" || user_nameValue === null) {
    setErrorFor(user_name, "El nombre de usuario no puede estar vacio");
  } else {
    setSuccessFor(user_name);
  }
  if (emailValue === "" || emailValue === null) {
    setErrorFor(email, "El email no puede estar vacio");
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, "El email no es valido");
  } else {
    setSuccessFor(email);
  }
  showPasswordErrors(passwordValue, confirm_passwordValue);
}

function setErrorFor(input, message) {
  const form_reg = input.parentElement;
  const small = form_reg.querySelector("small");
  small.innerText = message;
  form_reg.className = "form_reg error";
}
function setSuccessFor(input) {
  const form_reg = input.parentElement;
  form_reg.className = "form_reg success";
}
function isEmail(email) {
  const regExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regExp.test(String(email).toLowerCase());
}

let passwordValidDefinition = [
  {
    minLength: 6,
    ErrorMessage: "Tu contraseña debe tener como minimo 6 caracteres.",
  },
  {
    maxLength: 16,
    ErrorMessage: "Tu contraseña debe tener como maximo 16 caracteres.",
  },
  {
    regex: /.*\d/,
    ErrorMessage: "Tu contraseña debe contener al menos 1 digito.",
  },
  {
    regex: /.*[a-zA-Z]/,
    ErrorMessage: "Tu contraseña debe contener al menos 1 letra.",
  },
  {
    regex: /.*[!@#$%^&*() =+_-]/,
    ErrorMessage:
      "Tu contraseña debe contener al menos 1 simbolo de esta lista !@#$%^&*()=+_- o un espacio.",
  },
];
/**
 * Validate the passed password (and confirm Password for comparison) using the passed validator list.
 * The function will add any error messages it generates to the errorList parameter.
 *
 * @param {string} password - The password to validate.
 * @param {string} confirmPassword - The confirmation password (which must match the password, or an error is added to errorList).
 * @param {Object[]} passwordValidators - An array of validators. Each validator object has a test type and an error message when the test fails.
 * @param {string[]} errorList - An array to which we will append any validation failure text (provided on each validator).
 *
 * @return {bool} true if the password passed all of the validator tests.
 */
function ValidatePassword(
  password,
  confirmPassword,
  passwordValidators,
  errorList
) {
  let errors = [];

  for (let i = 0; i < passwordValidators.length; i++) {
    let validator = passwordValidators[i];
    let valid = true;

    if (validator.hasOwnProperty("regex")) {
      if (password.search(validator.regex) < 0) valid = false;
    }

    if (validator.hasOwnProperty("minLength")) {
      if (password.length < validator.minLength) valid = false;
    }

    if (validator.hasOwnProperty("maxLength")) {
      if (password.length > validator.maxLength) valid = false;
    }

    if (!valid) errors.push(validator.ErrorMessage);
  }

  if (errors.length > 0) {
    errorList.push(...errors);
    return false;
  }

  return true;
}

function showPasswordErrors(passwordC, confirm_passwordC) {
  let errorList = [];
  let msg = "";
  let msg2 = "";
  let i = 0;
  let valid = ValidatePassword(
    passwordC,
    confirm_passwordC,
    passwordValidDefinition,
    errorList
  );
  if (valid) {
    setSuccessFor(password);
    setSuccessFor(confirm_password);
  }
  if (passwordC !== confirm_passwordC) {
    msg = "La contraseña y la contraseña de confirmación no coinciden.";
    setErrorFor(password, msg);
    console.log(passwordC + " " + confirm_passwordC);
    i = 1;
  }
  if (passwordC === "" || passwordC === null) {
    msg = "El Campo de la contraseña esta vacio.";
    setErrorFor(password, msg);
    i = 1;
  }
  if (confirm_passwordC === "" || confirm_passwordC === null) {
    msg = "El Campo de la confirmación de la contraseña esta vacio.";
    msg2 = "El Campo de la confirmación de la contraseña esta vacio.";
    setErrorFor(confirm_password, msg);
    setErrorFor(confirm_password, msg2);
    i = 1;
  }
  if (i === 0 && valid === false) {
    setErrorFor(password, errorList);
    setErrorFor(confirm_password, errorList);
  }
  return valid;
}
