function getCookie(name) {
  /*
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(";").shift();
  */
  return localStorage.getItem(name);
}

function setCookie(name, value) {
  localStorage.setItem(name, value);
  //document.cookie = `${name}=${value}`;
}

function createUser(user, email, password) {
  let users =
    getCookie("users") == "" || getCookie("users") == undefined
      ? {}
      : JSON.parse(getCookie("users"));
  // Verifica que las variables están con información
  if (user && password && email) {
    // Verifica si el usuario existe
    if (users[user]) {
      //Sí está creado, entonces sale de la función
      Swal.fire("El usuario ya existe");
    } else {
      //No está creado, entonces lo crea
      users[email] = {
        email: email,
        user: user,
        password: password,
        favourites: [],
      };
      setCookie("users", JSON.stringify(users));
      return true;
    }
  }
}

function login(email, password) {
  let users =
    getCookie("users") == "" || getCookie("users") == undefined
      ? {}
      : JSON.parse(getCookie("users"));
  //Valores booleanos (verdadero, falso // 1,0 // si,no)
  if (!getCookie("currentUser")) {
    // No hay una sesión iniciada
    // Verifica si el usuario existe
    if (users[email]) {
      if (users[email].password === password) {
        // Configura el usuario como la sesión actual
        setCookie("currentUser", users[email].user);
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
  return getCookie("currentUser") === "" ||
    getCookie("currentUser") === undefined ||
    getCookie("currentUser") === null
    ? false
    : true;
}

function setFavourite(object) {
  if (isLoggedIn()) {
    let users =
      getCookie("users") == "" || getCookie("users") == undefined
        ? {}
        : JSON.parse(getCookie("users"));


    // Ir por los usuarios hasta encotnrar el usuario en sesión
    
    Object.values(users).forEach(function (user) {
      
      if (getCookie("currentUser") == user.user) {
        //Buscar si el usuario tiene el item en lista
        let itemExists = false;

        Object.values(user.favourites).forEach(function (fav) {
          if (fav.id === object.id) {
            itemExists = true;
          }
        });

        if (!itemExists) {
          user.favourites.push({
            id: object.id,
            title: object.title,
            price: object.price,
            image: object.image,
          });
          users[user.email] = user;
          setCookie("users", JSON.stringify(users));
          Swal.fire("Artículo agregado a tus favoritos")
        } else {
          Swal.fire("Ya tienes agregado ese artículo en tus favoritos")
        }
      }
    });
  }
}

function getCurrentUserInfo() {
  if (isLoggedIn()) {
    let userInfo;
    let users =
      getCookie("users") == "" || getCookie("users") == undefined
        ? {}
        : JSON.parse(getCookie("users"));
    // Ir por los usuarios hasta encotnrar el usuario en sesión
    Object.values(users).forEach(function (user) {
      if (getCookie("currentUser") == user.user) {
        userInfo = user;
      }
    });
    return userInfo;  
  }
  
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
