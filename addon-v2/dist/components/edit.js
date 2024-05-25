import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{yield}}\r\n<div class=\"overlay\">\r\n<div class=\"edit-container\">\r\n<div class=\"edit-title\">\r\n<h4>Edit</h4>\r\n</div>\r\n<div class=\"edit-content\">\r\n\r\n\r\n {{#each-in (get @head this.editid) as |heads item-val|}} \r\n  {{#if (eq heads \'setting\')}}\r\n        {{else}}\r\n  <br>\r\n    <label>{{heads}}</label>\r\n  <br>  \r\n\r\n    <input value={{item-val}} id={{heads}}/>\r\n       {{/if}}\r\n  {{/each-in}}\r\n\r\n<div class=\"edit-submit-button\">\r\n<button onclick={{this.submitedit}} type=\"button\">Submit</button>\r\n\r\n</div>\r\n</div>\r\n</div>\r\n</div>\r\n");

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
