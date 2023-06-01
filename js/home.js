$(document).ready(function () {
  // Inicilizar Carrusel
  const carElem = document.querySelector("#carousel");

  const carousel = new bootstrap.Carousel(carElem, {
    interval: 2000,
    touch: false,
  });

  if (isLoggedIn()) {
    $(".start").text("Comienza a explorar").attr("href", "#carousel");
    $("#user-favs").text(`Favoritas de ${getCookie("currentUser")}`);
    $(".login").hide();
    $(".signup").hide();
    $(".subtitulo").text(`Bienvenid@ ${getCookie("currentUser")}`);
    $(".logout").on("click", () => {
      setCookie("currentUser", "");
      location.reload();
    });
  } else {
    $("section").hide();
    $(".logout").hide();
  }
});
