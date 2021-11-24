let nombre = document.getElementById("user_name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let confirm_password = document.getElementById("confirm_password");
let error = document.getElementById("error");
error.style.color = "red";
const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const container = document.getElementById("container");

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
function enviarRegForm() {
  console.log("Enviando formulario...");
  let errorMsj = [];
  if (nombre.value === null || nombre.value === "") {
    errorMsj.push("Ingresa tu nombre");
  }
  if (email.value === null || email.value === "") {
    errorMsj.push("Ingresa tu e-mail");
  }
  if (password.value === null || nombre.value === "") {
    errorMsj.push("Ingresa tu contraseña");
  }
  if (confirm_password.value === null || confirm_password.value === "") {
    errorMsj.push("Ingresa la confirmación de tu contraseña");
  }
  if (
    confirm_password.value != password.value ||
    confirm_password.value != password.value
  ) {
    errorMsj.push(
      "La confirmación de tu contraseña y tu contraseña no coinciden"
    );
  }
  error.innerHTML = errorMsj.join(", ");
}

