import http from 'k6/http';
import { check, sleep } from 'k6';

export let options = {
  vus: 10,
  duration: '10s',
};

export default function () {
  let res = http.get('http://[::1]:3000');

  check(res, {
    'status is 200': (r) => r.status === 200,
  });

  sleep(1);
}
