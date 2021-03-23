var request = require('request');
var fs = require('fs');

var priceSet1 = 'https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=name&sort_dir=asc&appid=583950&norender=1&start=0&count=100'
var priceSet2 = 'https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=name&sort_dir=asc&appid=583950&norender=1&start=100&count=100'
var priceSet3 = 'https://steamcommunity.com/market/search/render/?search_descriptions=0&sort_column=name&sort_dir=asc&appid=583950&norender=1&start=200&count=37'
var set1
var set2
var set3

request(priceSet1, function (error, response, body) {
  auth: {
    bearer: '27F11A17C82B8BFE900D05B08C664610'
  }
  console.error('error:', error); // Print the error if one occurred
  set1 = JSON.parse(body);
  if(set2 && set3){updatePrices()};
});
request(priceSet2, function (error, response, body) {
  auth: {
    bearer: '27F11A17C82B8BFE900D05B08C664610'
  }
  console.error('error:', error); // Print the error if one occurred
  set2 = JSON.parse(body);
  if(set1 && set3){updatePrices()};
});
request(priceSet3, function (error, response, body) {
  auth: {
    bearer: '27F11A17C82B8BFE900D05B08C664610'
  }
  console.error('error:', error); // Print the error if one occurred
  set3 = JSON.parse(body);
  if(set1 && set2){updatePrices()};
});

function updatePrices(){
  set1 = set1.results;
  set2 = set2.results;
  set3 = set3.results;
  body = set1.concat(set2).concat(set3);
  var cards_data = body;
  var price_list = [];
  var i = 0;
  cards_data.forEach(function(card){
    obj = {name: card.name, price_text: card.sale_price_text, price: card.sell_price}
    price_list.push(obj);
  })
  var original_prices = fs.readFileSync('public/card_prices.json')
  original_prices = JSON.parse(original_prices);
  price_list = JSON.stringify(price_list);
  if(JSON.stringify(original_prices) != price_list){
    fs.writeFileSync('public/card_prices.json', price_list);
  }
}
