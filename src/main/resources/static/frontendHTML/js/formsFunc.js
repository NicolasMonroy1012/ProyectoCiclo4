//-----------------------------Verificación de datos y creación de usuarios--------------------------

const identificacionUC = document.getElementById("identificacionUC");
const nameUC = document.getElementById("nameUC");
const direccionUC = document.getElementById("direccionUC");
const cellPhoneUC = document.getElementById("cellPhoneUC");
const emailUC = document.getElementById("emailUC");
const passwordUC = document.getElementById("passwordUC");
const confirmpasswordUC = document.getElementById("confirmpasswordUC");

function closeCreateForm() {
  document.location.href = "home.html";
}

function checkInputsNew(form_name) {
  if (form_name == "usersTable") {
    let identificacionUCValue = $("#identificacionUC").val();
    let nameUCValue = $("#nameUC").val();
    let direccionUCValue = $("#direccionUC").val();
    let cellPhoneUCValue = $("#cellPhoneUC").val();
    let emailUCValue = $("#emailUC").val();
    let passwordUCValue = $("#passwordUC").val();
    let confirm_passwordUCvalue = $("#confirmpasswordUC").val();

    if (identificacionUCValue === "" || identificacionUCValue === null) {
      setErrorFor(identificacionUC, "El email no puede estar vacio");
    }
    if (direccionUCValue === "" || direccionUCValue === null) {
      setErrorFor(direccionUC, "El email no puede estar vacio");
    }
    if (cellPhoneUCValue === "" || cellPhoneUCValue === null) {
      setErrorFor(cellPhoneUC, "El email no puede estar vacio");
    }
    if (emailUCValue === "" || emailUCValue === null) {
      setErrorFor(emailUC, "El email no puede estar vacio");
    }
    if (nameUCValue === "" || nameUCValue === null) {
      setErrorFor(nameUC, "El nombre no puede estar vacio");
    }
    if (!isEmail(emailUCValue)) {
      setErrorFor(emailUC, "El email no es valido");
    } else {
      setSuccessFor(emailUC);
    }
    showPasswordErrors(passwordUCValue, confirm_passwordUCvalue, form_name);
    if (
      showPasswordErrors(passwordUCValue, confirm_passwordUCvalue, form_name)
    ) {
      createNewUser(nameUCValue, emailUCValue, passwordUCValue, form_name);
    }
  }
}

function createNewUser(user_nameValue, emailValue, passwordValue, form_name) {
  console.log("ingrese a new user");
  if (emailVerification(emailValue)) {
    alert("El email ingresado ya existe");
    clearFields(form_name);
  } else {
    let myData = {
      identification: $("#identificacionUC").val(),
      name: $("#nameUC").val(),
      address: $("#direccionUC").val(),
      cellPhone: $("#cellPhoneUC").val(),
      email: $("#emailUC").val(),
      password: $("#passwordUC").val(),
      zone: $("#zoneUC").val(),
      type: $("#typeUC").val(),
    };
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: /*"http://144.22.57.223:8080/api/user/new"*/ "http://localhost:8080/api/user/new",
      type: "POST",
      data: dataToSend,
      contentType: "application/json; charset=utf-8",
      datatype: "JSON",
      success: function (answer) {
        alert("Se ha registrado con éxito");
        clearFields(form_name);
        resetStates(nameUC, form_name);
        resetStates(direccionUC, form_name);
        resetStates(cellPhoneUC, form_name);
        resetStates(emailUC, form_name);
        resetStates(passwordUC, form_name);
        resetStates(confirmpasswordUC, form_name);
      },
    });
  }
}

function userVerification(user) {
  let value;
  if (user.name === null) {
    value = false;
    alert("Usted no se encuentra registrado, por favor cree una cuenta");
  } else {
    value = true;
    alert("Bienvenido " + user.name);
  }
  console.log(value);
  if (value === true) {
    onClickFun();
  }
}

function isEmail(email) {
  const regExp =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return regExp.test(String(email).toLowerCase());
}

let passwordValidDefinition = [
  {
    minLength: 6,
    ErrorMessage: "Tu contraseña debe tener como minimo 6 caracteres",
  },
  {
    maxLength: 16,
    ErrorMessage: " Tu contraseña debe tener como maximo 16 caracteres",
  },
  {
    regex: /.*\d/,
    ErrorMessage: " Tu contraseña debe contener al menos 1 digito",
  },
  {
    regex: /.*[a-zA-Z]/,
    ErrorMessage: " Tu contraseña debe contener al menos 1 letra",
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

function showPasswordErrors(passwordC, confirm_passwordC, form_name) {
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
  if (form_name == "reg") {
    if (valid) {
      setSuccessFor(passwordUC);
      setSuccessFor(confirm_passwordUC);
    }
    if (passwordC !== confirm_passwordC) {
      msg = "La contraseña y la contraseña de confirmación no coinciden.";
      setErrorFor(passwordUC, msg);
      i = 1;
    }
    if (passwordC === "" || passwordC === null) {
      msg = "El Campo de la contraseña esta vacio.";
      setErrorFor(passwordUC, msg);
      i = 1;
    }
    if (confirm_passwordC === "" || confirm_passwordC === null) {
      msg = "El Campo de la confirmación de la contraseña esta vacio.";
      msg2 = "El Campo de la confirmación de la contraseña esta vacio.";
      setErrorFor(confirm_passwordUC, msg);
      setErrorFor(confirm_passwordUC, msg2);
      i = 1;
    }
    if (i === 0 && valid === false) {
      setErrorMessageFor(passwordUC, errorList);
      setErrorMessageFor(confirm_passwordUC, errorList);
      $("#password").val("");
      $("#confirm_password").val("");
    }
  } else {
    if (valid) {
      setSuccessFor(passwordUC);
    }
    if (passwordC === "" || passwordC === null) {
      msg = "El Campo de la contraseña esta vacio.";
      setErrorFor(passwordUC, msg);
      i = 1;
    }
    if (i === 0 && valid === false) {
      setErrorMessageFor(passwordUC, errorList);
      $("#password").val("");
      $("#confirm_password").val("");
    }
  }
  return valid;
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

function setErrorMessageFor(input, errorList) {
  const msg = input.parentElement;
  if (input == "passwordUC") {
    msg.className = "form_reg error";
  }
  msg.className = "form_reg error";
  $(".alert").removeClass("hide");
  $("#msg").text("" + errorList);
}

function resetStates(input, form_name) {
  if (form_name === "reg") {
    const form_reg = input.parentElement;
    form_reg.className = "form_reg";
  } else {
    const form_si = input.parentElement;
    form_si.className = "form_si";
  }
}

function emailVerification(email) {
  let emailComp = false;
  $.ajax({
    url:
      /*"http://144.22.57.223:8080/api/user/" +
      email +
      "" */ "http://localhost:8080/api/user/" + email + "",
    async: false,
    type: "GET",
    datatype: "JSON",
    //async: false,
    success: function (answer) {
      console.log(answer);
      emailComp = answer;
    },
  });
  return emailComp;
}

function clearFields(formName) {
  if (formName == "usersTable") {
    $("#idUser").val("");
    $("#identificacionUC").val("");
    $("#user_nameUC").val("");
    $("#direccionUC").val("");
    $("#cellPhoneUC").val("");
    $("#emailUC").val("");
    $("#passwordUC").val("");
    $("#zoneUC").val("");
    $("#typeUC").val("");
  }
  if (formName == "productsTable") {
    $("#referenceU").val("");
    $("#categoryU").val("");
    $("#sizeU").val("");
    $("#descriptionU").val("");
    $("#availabilityU").val("");
    $("#priceU").val("");
    $("#quantityU").val("");
    $("#photographyU").val("");
  }
}
