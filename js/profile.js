$(document).ready(function () {
  if (isLoggedIn()) {
    const user = getCurrentUserInfo();
    $("#username").text(user.user);
    $("#email").text(user.email);
    $(".login").hide();
    $(".signup").hide();
  } else {
    document.location.href = "index.html";
  }
});
