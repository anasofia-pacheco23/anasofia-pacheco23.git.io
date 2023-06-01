function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(name, value) {
  document.cookie = `${name}=${value}`;
}

function createUser(user, email, password) {
  let users = getCookie("users") == "" || getCookie("users") == undefined ? {} : JSON.parse(getCookie("users"));
  // Verifica que las variables están con información
  if (user && password && email) {
    // Verifica si el usuario existe
    if (users[user]) {
      //Sí está creado, entonces sale de la función
      Swal.fire("El usuario ya existe");
    } else {
      //No está creado, entonces lo crea
      users[user] = { email: email, password: password };
      setCookie("users", JSON.stringify(users));
      return true;
    }
  }
}

function login(user, password) {
  let users = getCookie("users") == "" || getCookie("users") == undefined ? {} : JSON.parse(getCookie("users"));
  //Valores booleanos (verdadero, falso // 1,0 // si,no)
  if (!getCookie("currentUser")) {
    // No hay una sesión iniciada
    // Verifica si el usuario existe
    if (users[user]) {
      if (users[user].password === password) {
        // Configura el usuario como la sesión actual
        setCookie("currentUser", user);
        return true;
      } else {
        Swal.fire("Contraseña incorrecta");
      }
    } else {
      Swal.fire("El usuario no existe");
    }
  } else {
    // Ya hay una sesión existe
    Swal.fire("Ya hay un usuario conectado");
  }
}

function isLoggedIn() {
  return getCookie("currentUser") === "" || getCookie("currentUser") === undefined ? false : true;
}

$(document).ready(function () {
  $("#login-form").on("submit", function (e) {
    // e.preventDefault(); detiene el comportamiento normal
    e.preventDefault();
    // Objeto que contiene los datos del fomulario
    var formData = {};

    $("#login-form")
      // Convertir formulario a información manipulable (array)
      .serializeArray()
      //Conversión a nuevo objeto (formdata)
      .forEach((item) => {
        formData[item["name"]] = item["value"];
      });

    if (login(formData.username, formData.password)) {
      window.location.href = "index.html";
    }
  });

  $("#signup-form").on("submit", function (e) {
    e.preventDefault();
    var formData = {};
    $("#signup-form")
      .serializeArray()
      .forEach((item) => {
        formData[item["name"]] = item["value"];
      });
    if (createUser(formData.username, formData.email, formData.password)) {
      window.location.href = "login.html";
    }
  });
});
