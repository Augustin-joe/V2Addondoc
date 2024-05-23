import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{yield}}\n<div class=\"overlay\">\n<div class=\"edit-container\">\n<div class=\"edit-title\">\n<h4>Edit</h4>\n</div>\n<div class=\"edit-content\">\n\n\n {{#each-in (get @head this.editid) as |heads item-val|}} \n  {{#if (eq heads \'setting\')}}\n        {{else}}\n  <br>\n    <label>{{heads}}</label>\n  <br>  \n\n    <input value={{item-val}} id={{heads}}/>\n       {{/if}}\n  {{/each-in}}\n\n<div class=\"edit-submit-button\">\n<button onclick={{this.submitedit}} type=\"button\">Submit</button>\n\n</div>\n</div>\n</div>\n</div>\n");

class EditComponent extends Component {
  static {
    g(this.prototype, "datatable", [inject]);
  }
  #datatable = (i(this, "datatable"), void 0);
  static {
    g(this.prototype, "editid", [tracked], function () {
      return this.args.editid;
    });
  }
  #editid = (i(this, "editid"), void 0);
  submitedit() {
    let arr = {};
    for (let i = 0; i < Object.keys(this.args.head[0]).length - 1; i++) {
      let a = document.getElementById(Object.keys(this.args.head[0])[i]).value;
      arr[Object.keys(this.args.head[0])[i]] = a;
    }
    this.args.closepopup(arr);
  }
  static {
    n(this.prototype, "submitedit", [action]);
  }
}
setComponentTemplate(TEMPLATE, EditComponent);

export { EditComponent as default };
//# sourceMappingURL=edit.js.map
