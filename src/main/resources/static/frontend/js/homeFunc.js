window.onload = () => {
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
//-------------------Funciones para la tabla de usuario------------------------------
function traerInfoUsers() {
  $("#table_modelU").empty();
  $.ajax({
    url: "http://localhost:8080/api/user/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      items = respuesta;
      table_modelU.innerHTML = "";
      console.log(items.length);
      for (i = 0; i < items.length; i++) {
        console.log("Ingreso bucle Usuarios");
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
                            <td><button type='button' class='btModel' id='btEdit' onclick='edicionUser(${items[i].id})'><span class='button__icon'><i class="far fa-edit"></i></span></button></td>
                            <td><button type='button' class='btModel' id='btDelete' onclick='borrarInfoUser(${items[i].id})'> <span class='button__icon'><i class="far fa-trash-alt"></i></span></button></td>
                        </tr>
                    `;
      }
      $("#resultado").append("#tabla_modelU");
      showEditPopUp();
    },
  });
}

function btCloseEdit() {
  document.querySelector(".popup").style.display = "none";
}

function showEditPopUp() {
  document.getElementById("btEdit").addEventListener("click", function () {
    document.querySelector(".popup").style.display = "flex";
  });
}

function edicionUser(idE) {
  var id = idE;
  console.log(idE);
  $.ajax({
    url: "http://localhost:8080/api/user/" + idE,
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      $("#identificacion").val(respuesta.identification);
      $("#user_name").val(respuesta.name);
      $("#direccion").val(respuesta.address);
      $("#cellPhone").val(respuesta.cellPhone);
      $("#email").val(respuesta.email);
      $("#password").val(respuesta.password);
      $("#zone").val(respuesta.zone);
    },
  });
}

function editarInfoUser() {
  let myData = {
    identificacion: $("#identificacion").val(),
    user_name: $("#user_name").val(),
    direccion: $("#direccion").val(),
    cellPhone: $("#cellPhone").val(),
    email: $("#email").val(),
    password: $("#password").val(),
    zone: $("#zone").val(),

  };
  let dataToSend = JSON.stringify(myData);
  $.ajax({
    url: "http://localhost:8080/api/user/update",
    type: "PUT",
    data: dataToSend,
    contentType: "application/JSON",
    datatype: "JSON",
    success: function (respuesta) {
      $("#identificacion").val("");
        $("#user_name").val("");
        $("#direccion").val("");
        $("#cellPhone").val("");
        $("#email").val("");
        $("#password").val("");
        $("#zone").val("");
        traerInfoUsers();
      alert("Se ha actualizado la información de manera exitosa");
    },
  });
}

//-------------------Funciones para la tabla de Productos------------------------------
function traerInfoProductos() {
  $("#table_model").empty();
  $.ajax({
    url: "http://localhost:8080/api/clothe/all",
    type: "GET",
    datatype: "JSON",
    success: function (respuesta) {
      console.log(respuesta);
      items = respuesta;
      table_modelP.innerHTML = "";
      console.log(items.length);
      for (i = 0; i < items.length; i++) {
        console.log("Ingreso bucle Productos");
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
                            <td><button type='button' class='btModel' onclick='edicionSkate(${items[i].id})'><span class='button__icon'><i class="far fa-edit"></i></span></button></td>
                            <td><button type='button' class='btModel' onclick='borrarInfoSkate(${items[i].id})'> <span class='button__icon'><i class="far fa-trash-alt"></i></span></button></td>
                        </tr>
                    `;
      }
      $("#resultado").append("#tabla_modelP");
    },
  });
}
