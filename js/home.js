$(document).ready(function () {
  // Inicilizar Carrusel
  $.ajax({
    url: apiURL("/sites/MCO/search?q=vestidos"),
    type: "GET",
    crossDomain: true,
    success: function (response) {
      for (let i = 0; i < 6; i++) {
        item = response.results[i];
        $("#portfolio .row").append(
          $("<div></div>")
            .attr("class", "col-lg-4 col-sm-6 mb-4")
            .append(
              $("<div></div>")
                .attr("class", "portfolio-item")
                .append(
                  $("<img></img>")
                    .attr("class", "img-fluid")
                    .attr("src", item.thumbnail)
                )
                .append(
                  $("<div></div>")
                    .attr("class", "card-body")
                    .append(
                      $("<h5></h5>")
                        .attr("class", "card-title")
                        .text(item.title)
                    )
                )
            )
        );
      }
    },
  });

  const carElem = document.querySelector("#carousel");

  const createCard = () => {
    user = getCurrentUserInfo().favourites;
    if (user.length > 0) {
      let first = 0;
      Object.values(user).forEach(function (item) {
        $(".carousel-inner").append(
          $("<div></div>")
            .attr("class", "carousel-item" + (first === 0 ? " active" : ""))
            .append(
              $("<div></div>")
                .attr("class", "card")
                .append(
                  $("<img></img>")
                    .attr("class", "card-img-top")
                    .attr("src", item.image)
                )
                .append(
                  $("<div></div>")
                    .attr("class", "card-body")
                    .append(
                      $("<h5></h5>")
                        .attr("class", "card-title")
                        .text(item.title)
                    )
                )
            )
        );
        first++;
      });
    } else {
      $("#carouselSec").hide();
    }
  };

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
    createCard();
  } else {
    $("nav .nav-item").hide();
    $("section").hide();
    $(".logout").hide();
  }
});
