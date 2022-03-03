const http = require('k6/http');
const { sleep } = require('k6');
export const options = {
  vus: 1000,
  duration: '60s'
};


export default function () {
  var lowerVal = 1000011 * 0.9;
  var productId = Math.floor(Math.random() * (1000011 - lowerVal) + lowerVal);

  http.get(`http://localhost:8080/products/${productId}/styles`);
  sleep(1);
}