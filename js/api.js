const apiURL = (endpoint) => {
  return "https://api.mercadolibre.com" + endpoint;
};

const search = (query,quantity) => {
  $.ajax({
    url: apiURL("/sites/MCO/search?q=" + query),
    type: "GET",
    crossDomain: true /* <-- set this attribute */,
    success: function (response) {
        for (let i = 0; i < quantity; i++){
            item = response.results[i];
            createCard(item.id,item.title,item.price,item.thumbnail);
        }
    },
  });
};
