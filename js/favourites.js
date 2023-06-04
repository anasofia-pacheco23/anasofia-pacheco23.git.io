const createCard = (id, title, description, image) => {
  $("#list").append(
    $("<div></div>")
      .attr("data-id", id)
      .attr("data-title", title)
      .attr("data-price", description)
      .attr("data-image", image)
      .attr("class", "card")
      .attr("style", "width:18rem")
      .append($("<img></img>").attr("class", "card-img-top").attr("src", image))
      .append(
        $("<div></div>")
          .attr("class", "card-body")
          .append($("<h5></h5>").attr("class", "card-title").text(title))
          .append($("<p></p>").attr("class", "card-text").text(description))
          .append(
            $("<a></a>")
              .attr("class", "add-fav btn btn-primary")
              .text("Agregar a favoritos")
          )
      )
  );
};

$(document).ready(function () {
  if (isLoggedIn()) {
    $(".login").hide();
    $(".signup").hide();
    search("ropa", 12).then(function () {
      $(".add-fav").click((e) => {
        e.preventDefault();
        const data = e.currentTarget.offsetParent;
        setFavourite({
          id: data.getAttribute("data-id"),
          title: data.getAttribute("data-title"),
          price: data.getAttribute("data-price"),
          image: data.getAttribute("data-image"),
        });
      });
    });
  } else {
    window.location.href = "index.html";
  }
});
