import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { action } from '@ember/object';
import Fetchapi from '../utils/fetchapi.js';
import { tracked } from '@glimmer/tracking';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{#if this.apifetched}}\n<List  @fetch_api={{this.fetch_api}}/>\n{{/if}}\n{{yield}}\n\n\n\n<BasicDropdownWormhole />\n\n\n<BasicDropdownWormhole />");

// import Controller from '@ember/controller';
class StartComponent extends Component {
  static {
    g(this.prototype, "datatable", [inject]);
  }
  #datatable = (i(this, "datatable"), void 0);
  static {
    g(this.prototype, "apifetched", [tracked], function () {
      return false;
    });
  }
  #apifetched = (i(this, "apifetched"), void 0);
  constructor() {
    super(...arguments);
    this.fetch_api(1);
  }
  async fetch_api(pageno) {
    const apiUtil = new Fetchapi();
    // const apiUrl=`https://localhost:7225/Book/${limit}/${pageno}`;
    // const apiUrl=`https://api.publicapis.org/entries/${page}`;
    // const apiUrl ='https://datausa.io/api/data?drilldowns=Nation&measures=Population';
    const apiUrl = `https://0w8qg.wiremockapi.cloud/Page=${pageno}`;
    let data = await apiUtil.fetchData.perform(apiUrl);
    // data=data.entries.slice(0,50);
    // data=data.slice(0,20);
    // data = data.data;
    // data=data.entries;
    console.log(data);
    console.log(Object.keys(data[0]));
    for (let i = 0; i < data.length; i++) {
      data[i].id = i;
      data[i].setting = {};
      data[i].setting.visibility = true;
      data[i].setting.ischecked = false;
    }
    this.datatable.data = data;
    this.apifetched = true;
  }
  static {
    n(this.prototype, "fetch_api", [action]);
  }
}
setComponentTemplate(TEMPLATE, StartComponent);

export { StartComponent as default };
//# sourceMappingURL=start.js.map
