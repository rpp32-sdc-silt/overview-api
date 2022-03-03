const http = require('k6/http');
const { sleep } = require('k6');
export const options = {
  stages: [
    { duration: '20s', target: 1 },
    { duration: '20s', target: 10 },
    { duration: '20s', target: 100 },
    { duration: '20s', target: 1000 },
    { duration: '30s', target: 0 },
  ]
};

export default function () {
  var lowerVal = 1000011 * 0.9;
  var productId = Math.floor(Math.random() * (1000011 - lowerVal) + lowerVal);

  var base_url = 'http://localhost:8080';
  var response = http.batch([
    ['GET', `${base_url}/products`],
    // ['GET', `${base_url}/products/${productId}`],
    // ['GET', `${base_url}/products/${productId}/styles`],
  ])
}