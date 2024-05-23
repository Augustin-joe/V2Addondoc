import { task } from 'ember-concurrency';
import { inject } from '@ember/service';
import { g, i, n } from 'decorator-transforms/runtime';

class Fetchapi {
  static {
    g(this.prototype, "datatable", [inject]);
  }
  #datatable = (i(this, "datatable"), void 0);
  static {
    g(this.prototype, "store", [inject]);
  }
  #store = (i(this, "store"), void 0);
  *fetchData(url) {
    const response = yield fetch(url); // fetch(url, { headers: { range: 'bytes=0-480'} });
    const data = yield response.json();
    console.log(data);
    return data;
  }
  static {
    n(this.prototype, "fetchData", [task]);
  }
}

export { Fetchapi as default };
//# sourceMappingURL=fetchapi.js.map
