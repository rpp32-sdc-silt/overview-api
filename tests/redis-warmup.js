const http = require('k6/http');
const { sleep } = require('k6');
export const options = {
  vus: 1000,
  duration: '5m'
};


export default function () {
  var lowerVal = 1000011 * 0.9;
  var productId = Math.floor(Math.random() * (1000011 - lowerVal) + lowerVal);
  // var productId = Math.floor(Math.random() * 1000011);

  http.get(`http://localhost:8080/products/${productId}/styles`);
  sleep(1);
}