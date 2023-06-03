const apiURL = (endpoint) => {
  return "https://api.mercadolibre.com" + endpoint;
};

$.get(apiURL("sites/MCO/search?q=Ropa%20Azul"), function (data) {
  console.log(data);
});
