$(document).ready(function () {
  if (isLoggedIn()) {
    $(".start").text("Comienza a explorar");
    $(".login").hide();
    $(".signup").hide();
    $(".logout").on("click", () => {
      setCookie("currentUser", "");
      location.reload();
    });
  } else {  
  $("#favourites").hide();
  $(section).hide();
  $(".logout").hide();
  }
});
