import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

export default class Fetchapi {
  @service datatable;
  @service store;

  @task
  *fetchData(url) {
    const response = yield fetch(url); // fetch(url, { headers: { range: 'bytes=0-480'} });
    const data = yield response.json();
    console.log(data);
    return data;
  }
}
