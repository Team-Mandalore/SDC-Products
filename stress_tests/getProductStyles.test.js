/*========== EXTERNAL MODULES ==========*/
import http from 'k6/http';
import {sleep} from 'k6';


/*========== EXPORTS ==========*/
export const options = {
  stages: [
    {duration: '10s', target: 10},
    {duration: '10s', target: 100},
    {duration: '10s', target: 1000},
    {duration: '15s', target: 100},
    {duration: '15s', target: 1000},
    {duration: '20s', target: 10},
    {duration: '20s', target: 100},
    {duration: '20s', target: 1000},
    {duration: '30s', target: 1000},
    {duration: '30s', target: 100},
    {duration: '30s', target: 10},
    {duration: '60s', target: 0},
    // {duration: '5s', target: 5000},
    {duration: '10s', target: 100},
    {duration: '10s', target: 10},
    {duration: '15s', target: 0},
  ]
};

export default function() {
  let product_id = Math.floor(Math.random() * 999999);
  http.get(`http://localhost:3000/products/${product_id}/styles`);
  sleep(1);
}