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

function showCreateForm() {
  //$("#admonUsersBar").load("newUserForm.html");
  document.location.href = "newUserForm.html";
}
