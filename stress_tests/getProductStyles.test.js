/*========== EXTERNAL MODULES ==========*/
import http from 'k6/http';
import {sleep} from 'k6';


/*========== EXPORTS ==========*/
export const options = {
  vus: 1000,
  duration: '30s',
};

export default function() {
  http.get('http://localhost:3000/products');
  sleep(1);
}