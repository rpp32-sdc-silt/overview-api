const http = require('k6/http');
const { sleep } = require('k6');
export const options = {
  vus: 1000,
  duration: '60s'
};

export default function () {
  http.get('http://localhost:8080/products');
  // sleep(1);
}