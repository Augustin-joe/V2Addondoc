import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import 'ember-power-select/styles';
import { debounce } from '@ember/runloop';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{yield}}\r\n<PowerSelect @options={{this.allchoice}} @labelText=\"Search By:\" @selected={{this.searchby}} @onChange={{fn (mut this.searchby)}} as |option|>\r\n    {{option}}\r\n</PowerSelect>\r\n<br>\r\n<label>Search :\r\n<input type=\"text\" value={{this.value}} {{on \"input\" this.searchfunc}} placeholder=\"Search...\">\r\n</label>\r\n<br>");

class SearchComponent extends Component {
  static {
    g(this.prototype, "allchoice", [tracked], function () {
      return this.args.keyvalues;
    });
  }
  #allchoice = (i(this, "allchoice"), void 0); // @tracked allchoice = Object.keys(this.args.availablechoices[0]);
  static {
    g(this.prototype, "searchby", [tracked], function () {
      return this.args.keyvalues[0];
    });
  }
  #searchby = (i(this, "searchby"), void 0);
  static {
    g(this.prototype, "value", [tracked], function () {
      return '';
    });
  }
  #value = (i(this, "value"), void 0);
  constructor() {
    super(...arguments);
    // this.search('');
    this.args.setChildReference(this);
  }
  fromparent() {
    // this.value="";
    this.search(this.value);
  }
  searchfunc(event) {
    const value = event.target.value;
    debounce(this, this.search, value, 500);
    this.value = value;
  }
  static {
    n(this.prototype, "searchfunc", [action]);
  }
  search(value) {
    console.log('Searching for:', value);
    this.args.changebysearch(value, this.searchby);
  }
}
setComponentTemplate(TEMPLATE, SearchComponent);

export { SearchComponent as default };
//# sourceMappingURL=search.js.map
