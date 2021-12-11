window.onload = () => {
  bringInfoTable("usersTable");
  bringInfoTable("productsTable");
  const tab_switchers = document.querySelectorAll("[data-switcher]");

  for (let i = 0; i < tab_switchers.length; i++) {
    const tab_switcher = tab_switchers[i];
    const page_id = tab_switcher.dataset.tab;

    tab_switcher.addEventListener("click", () => {
      document
        .querySelector(".tabs .tab.is-active")
        .classList.remove("is-active");
      tab_switcher.parentNode.classList.add("is-active");
      switchPage(page_id);
    });
  }
};

function switchPage(page_id) {
  //  console.log(page_id)
  const current_page = document.querySelector(".pages .page.is-active");
  current_page.classList.remove("is-active");

  const next_page = document.querySelector(
    `.pages .page[data-page="${page_id}"]`
  );
  next_page.classList.add("is-active");
}
//-------------------Functions for table managing------------------------------

function btCloseEdit(num) {
  if (num === 1) {
    document.querySelector(".popup").style.display = "none";
  }
  if (num === 2) {
    document.querySelector(".popupUC").style.display = "none";
  }
}

function bringInfoTable(formName) {
  if (formName == "usersTable") {
    $("#table_modelU").empty();
    $.ajax({
      url: "http://localhost:8080/api/user/all",
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        items = respuesta;
        table_modelU.innerHTML = "";
        for (i = 0; i < items.length; i++) {
          table_modelU.innerHTML += `
                        <tr>
                            <td> ${items[i].identification}</td>
                            <td> ${items[i].name}</td>
                            <td> ${items[i].address}</td>
                            <td> ${items[i].cellPhone}</td>
                            <td> ${items[i].email}</td>
                            <td> ${items[i].password}</td>
                            <td> ${items[i].zone}</td>
                            <td> ${items[i].type}</td>
                            <td><button type='button' class='btModel' id='btEdit' onclick='bringData(\"usersTable\","${items[i].id}")'><span class='button__icon'><i class="far fa-edit"></i></span></button></td>
                            <td><button type='button' class='btModel' id='btDelete' onclick='deleteInfo(\"usersTable\"," ${items[i].id}")'> <span class='button__icon'><i class="far fa-trash-alt"></i></span></button></td>
                        </tr>
                    `;
        }
        $("#resultado").append("#tabla_modelU");
      },
    });
  }
  if (formName == "productsTable") {
    $("#table_model").empty();
    $.ajax({
      url: "http://localhost:8080/api/clothe/all",
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        items = respuesta;
        table_modelP.innerHTML = "";
        for (i = 0; i < items.length; i++) {
          table_modelP.innerHTML += `
                        <tr>
                            <td> ${items[i].reference}</td>
                            <td> ${items[i].category}</td>
                            <td> ${items[i].size}</td>
                            <td> ${items[i].description}</td>
                            <td> ${items[i].availability}</td>
                            <td> ${items[i].price}</td>
                            <td> ${items[i].quantity}</td>
                            <td> ${items[i].photography}</td>
                            <td><button type='button' class='btModel' onclick='bringData(\"productsTable\","${items[i].reference}")'><span class='button__icon'><i class="far fa-edit"></i></span></button></td>
                            <td><button type='button' class='btModel' onclick='deleteInfo(\"productsTable\","${items[i].reference}")'> <span class='button__icon'><i class="far fa-trash-alt"></i></span></button></td>
                        </tr>
                    `;
        }
        $("#resultado").append("#tabla_modelP");
      },
    });
  }
}

function bringData(formName, idElement) {
  if (formName == "usersTable") {
    console.log(idElement);
    $("#admonUsersBar").load("updateUserForm.html");
    $.ajax({
      url: "http://localhost:8080/api/user/" + idElement,
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        $("#idUser").val(respuesta.id);
        $("#identificacionU").val(respuesta.identification);
        $("#user_nameU").val(respuesta.name);
        $("#direccionU").val(respuesta.address);
        $("#cellPhoneU").val(respuesta.cellPhone);
        $("#emailU").val(respuesta.email);
        $("#passwordU").val(respuesta.password);
        $("#zoneU").val(respuesta.zone);
        $("#typeU").val(respuesta.type);
      },
    });
  }
  if (formName == "productsTable") {
    console.log(idElement);
    $("#admonUsersBar").load("updateProductForm.html");
    $.ajax({
      url: "http://localhost:8080/api/clothe/" + idElement,
      type: "GET",
      datatype: "JSON",
      success: function (respuesta) {
        $("#referenceU").val(respuesta.reference);
        $("#categoryU").val(respuesta.category);
        $("#sizeU").val(respuesta.size);
        $("#descriptionU").val(respuesta.description);
        $("#availabilityU").val(respuesta.availability);
        $("#priceU").val(respuesta.price);
        $("#quantityU").val(respuesta.quantity);
        $("#photographyU").val(respuesta.photography);
      },
    });
  }
}

function editInfo(formName) {
  if (formName == "usersTable") {
    let myData = {
      id: $("#idUser").val(),
      identification: $("#identificacionU").val(),
      name: $("#user_nameU").val(),
      address: $("#direccionU").val(),
      cellPhone: $("#cellPhoneU").val(),
      email: $("#emailU").val(),
      password: $("#passwordU").val(),
      zone: $("#zoneU").val(),
      type: $("#typeU").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({
      url: "http://localhost:8080/api/user/update",
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON; charset=utf-8",
      datatype: "JSON",
      success: function (respuesta) {
        bringInfoTable("usersTable");
        alert("Se ha actualizado la información de manera exitosa");
        clearFields("usersTable");
      },
    });
  }
  if (formName == "productsTable") {
    let myData = {
      reference: $("#referenceU").val(),
      category: $("#categoryU").val(),
      size: $("#sizeU").val(),
      description: $("#descriptionU").val(),
      availability: $("#availabilityU").val(),
      price: $("#priceU").val(),
      quantity: $("#quantityU").val(),
      photography: $("#photographyU").val(),
    };
    let dataToSend = JSON.stringify(myData);
    console.log(myData);
    $.ajax({
      url: "http://localhost:8080/api/clothe/update",
      type: "PUT",
      data: dataToSend,
      contentType: "application/JSON; charset=utf-8",
      datatype: "JSON",
      success: function (respuesta) {
        bringInfoTable("productsTable");
        alert("Se ha actualizado la información de manera exitosa");
        clearFields("productsTable");
      },
    });
  }
}
function deleteInfo(formName, idElement) {
  if (formName == "usersTable") {
    let myData = {
      id: idElement,
    };
    let id = idElement;
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "http://localhost:8080/api/user/" + id + "",
      //url: "http://150.230.86.149:80/api/user/" + id + "",
      type: "DELETE",
      data: dataToSend,
      contentType: "application/json; charset=utf-8",
      datatype: "JSON",
      success: function (answer) {
        bringInfoTable("usersTable");
        alert("Se ha borrado con éxito");
      },
    });
  }
  if (formName == "productsTable") {
    let myData = {
      id: idElement,
    };
    let id = idElement;
    let dataToSend = JSON.stringify(myData);
    $.ajax({
      url: "http://localhost:8080/api/clothe/" + id + "",
      //url: "http://150.230.86.149:80/api/user/" + id + "",
      type: "DELETE",
      data: dataToSend,
      contentType: "application/json; charset=utf-8",
      datatype: "JSON",
      success: function (answer) {
        bringInfoTable("productsTable");
        alert("Se ha borrado con éxito");
      },
    });
  }
}

function clearFields(formName) {
  if (formName == "usersTable") {
    $("#idUser").val("");
    $("#identificacionU").val("");
    $("#user_nameU").val("");
    $("#direccionU").val("");
    $("#cellPhoneU").val("");
    $("#emailU").val("");
    $("#passwordU").val("");
    $("#zoneU").val("");
    $("#typeU").val("");
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
//-----------------------------Verificación de datos y creación de usuarios--------------------------

const identificacionUC = document.getElementById("identificacionUC");
const direccionUC = document.getElementById("direccionUC");
const cellPhoneUC = document.getElementById("cellPhoneUC");
const emailUC = document.getElementById("emailUC");
const passwordUC = document.getElementById("passwordUC");

function showCreateForm() {
  $("#admonUsersBar").load("newUserForm.html");
}

function checkInputsNew() {
  let identificacionUCValue = $("#identificacionUC").val();
  let direccionUCValue = $("#direccionUC").val();
  let cellPhoneUCValue = $("#cellPhoneUC").val();
  let emailUCValue = $("#emailUC").val();
  let passwordUCValue = $("#passwordUC").val();

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
  if (!isEmail(emailUCValue)) {
    setErrorFor(emailUC, "El email no es valido");
  } else {
    setSuccessFor(emailUC);
  }
  showPasswordErrors(passwordUCValue, passwordSIValue, form_name);
  if (showPasswordErrors(passwordValue, confirm_passwordValue, form_name)) {
    createNewUser(user_nameValue, emailValue, passwordValue, form_name);
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

function setErrorFor(input, message) {
  const form_reg = input.parentElement;
  const small = form_reg.querySelector("small");
  small.innerText = message;
  form_reg.className = "form_si error";
}

function setSuccessFor(input) {
  const form_reg = input.parentElement;
  form_reg.className = "form_si success";
}

function setErrorMessageFor(input, errorList) {
  const msg = input.parentElement;
  if (input == "passwordSI") {
    msg.className = "form_si error";
  }
  msg.className = "form_si error";
  $(".alert").removeClass("hide");
  $("#msg").text("" + errorList);
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
      setSuccessFor(password);
      setSuccessFor(confirm_password);
    }
    if (passwordC !== confirm_passwordC) {
      msg = "La contraseña y la contraseña de confirmación no coinciden.";
      setErrorFor(password, msg);
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
      setErrorMessageFor(password, errorList);
      setErrorMessageFor(confirm_password, errorList);
      $("#password").val("");
      $("#confirm_password").val("");
    }
  } else {
    if (valid) {
      setSuccessFor(passwordSI);
    }
    if (passwordC === "" || passwordC === null) {
      msg = "El Campo de la contraseña esta vacio.";
      setErrorFor(passwordSI, msg);
      i = 1;
    }
    if (i === 0 && valid === false) {
      setErrorMessageFor(passwordSI, errorList);
      $("#password").val("");
      $("#confirm_password").val("");
    }
  }
  return valid;
}

function clearFields(form_name) {
  if (form_name === "reg") {
    $("#user_name").val("");
    $("#email").val("");
    $("#password").val("");
    $("#confirm_password").val("");
  } else {
    $("#emailSI").val("");
    $("#passwordSI").val("");
  }
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

function createNewUser(user_nameValue, emailValue, passwordValue, form_name) {
  console.log("ingrese a new user");
  if (emailVerification(emailValue)) {
    alert("El email ingresado ya existe");
    clearFields(form_name);
  } else {
    let myData = {
      name: $("#user_name").val(),
      email: $("#email").val(),
      password: $("#password").val(),
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
        resetStates(user_name, form_name);
        resetStates(email, form_name);
        resetStates(password, form_name);
        resetStates(confirm_password, form_name);
      },
    });
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
