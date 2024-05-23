import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{yield}}\n\n\n<Search @changebysearch={{this.changebysearch}} @setChildReference={{this.setChildReference}} @availablechoices={{this.datatable.data}} @keyvalues={{this.keyvalues}}/>\n\n{{#if this.popup}}\n  <Edit @closepopup={{this.closepopup}} @head={{this.datatable.data}} @editid={{this.editid}}/>\n{{/if}}\n{{!-- @searchEnabled={{true}} --}}\n<br>\n<PowerSelectMultiple @options={{this.showitem}} @labelText=\"Show items:\"\n     @selected={{this.selectedItems}} @onChange={{this.onshowitemschange}} \n     @onClose={{this.checkclickoutside}}  as |option|>\n\n    {{option.name}}\n\n</PowerSelectMultiple>\n\n<br>\n\n{{#each this.trackedarray as |item index|}}\n {{#if (eq index 0)}}\n     <tr> \n\n      {{#each-in this.showitem as |key-item item-val|}}\n           {{#if item-val.visibility}}\n               <th>\n                <div class=\"header-content\">\n                <span class=\"header-text\">{{item-val.name}}</span>\n                <div class=\"sort-button\">\n                <button {{on \"click\" (fn this.sorting item-val.name true)}} type=\"button\">/\\</button><br>\n                <button {{on \"click\" (fn this.sorting item-val.name false)}} type=\"button\">\\/</button>\n                </div>\n                </div>\n               </th>  \n           {{/if}} \n      {{/each-in}}\n\n      <th>  <button {{on \"click\" this.delete}} type=\"button\" >Delete</button>\n          <button {{on \"click\" this.edit}} type=\"button\" >Edit</button>    </th>\n\n     </tr>\n    \n  {{/if}}\n\n  {{#if item.setting.visibility}}\n    <tr>\n      {{#each-in item as |cell value|}}\n        {{#each-in this.showitem as |key-item item-val|}}\n          {{#if (eq item-val.name cell)}}\n           {{#if item-val.visibility}}\n             <td>{{value}}</td>\n            {{/if}}\n            \n          {{/if}} \n   \n        {{/each-in}}\n       \n        \n      {{/each-in}} \n\n  <td>\n        <label>\n          <input type=\"checkbox\" checked={{item.setting.ischecked}} {{on \"change\" (fn this.togglecheckbox item)}}>\n        </label>\n    </td>\n\n    </tr>\n    {{/if}}\n{{/each}}\n\n<br>\n<label>Page size :\n<input type=\"text\" {{on \"input\" this.changelimit}} value={{this.limit}}>\n</label>\n<button {{on \"click\" this.previouspage}}  type = \"button\">previous</button>\n{{this.pageno}}\n<button {{on \"click\" this.nextpage}} type=\"button\">next</button>\n\n\n{{#if this.loadingfetch}}\n\n<div class=\"overlay\">\n<div class=\"edit-container\">\n<div class=\"edit-title\">\n\n<h2>Loading......</h2>\n\n</div>\n</div>\n</div>\n{{/if}}\n\n\n\n\n   ");

class ListComponent extends Component {
  static {
    g(this.prototype, "datatable", [inject]);
  }
  #datatable = (i(this, "datatable"), void 0);
  static {
    g(this.prototype, "elsewhere", [inject]);
  }
  #elsewhere = (i(this, "elsewhere"), void 0);
  static {
    g(this.prototype, "popup", [tracked], function () {
      return 0;
    });
  }
  #popup = (i(this, "popup"), void 0);
  static {
    g(this.prototype, "loadingfetch", [tracked], function () {
      return false;
    });
  }
  #loadingfetch = (i(this, "loadingfetch"), void 0);
  static {
    g(this.prototype, "editid", [tracked], function () {
      return 0;
    });
  }
  #editid = (i(this, "editid"), void 0);
  static {
    g(this.prototype, "keyvalues", [tracked], function () {
      return Object.keys(this.datatable.data[0]);
    });
  }
  #keyvalues = (i(this, "keyvalues"), void 0);
  static {
    g(this.prototype, "pageno", [tracked], function () {
      return 1;
    });
  }
  #pageno = (i(this, "pageno"), void 0);
  static {
    g(this.prototype, "showitem", [tracked], function () {
      return [];
    });
  }
  #showitem = (i(this, "showitem"), void 0);
  static {
    g(this.prototype, "selectedItems", [tracked], function () {
      return this.showitem;
    });
  }
  #selectedItems = (i(this, "selectedItems"), void 0);
  static {
    g(this.prototype, "trackedarray", [tracked]);
  }
  #trackedarray = (i(this, "trackedarray"), void 0);
  static {
    g(this.prototype, "limit", [tracked], function () {
      return 10;
    });
  }
  #limit = (i(this, "limit"), void 0);
  static {
    g(this.prototype, "keyname", [tracked], function () {
      return 'id';
    });
  }
  #keyname = (i(this, "keyname"), void 0);
  static {
    g(this.prototype, "oldkeyname", [tracked], function () {
      return 'id';
    });
  }
  #oldkeyname = (i(this, "oldkeyname"), void 0);
  static {
    g(this.prototype, "ascending", [tracked]);
  }
  #ascending = (i(this, "ascending"), void 0);
  constructor() {
    super(...arguments);
    // this.lastReachedCallback = this.lastReachedCallback.bind(this);
    this.trackedarray = this.datatable.data;
    this.createshowitem();
  }
  setChildReference(childReference) {
    set(this, 'myChild', childReference);
  }
  static {
    n(this.prototype, "setChildReference", [action]);
  }
  callChildFunction() {
    this.myChild.fromparent();
  }
  compare = (a, b) => {
    if (this.ascending) {
      if (a[this.keyname] < b[this.keyname]) return -1;
      if (a[this.keyname] > b[this.keyname]) return 1;
      return 0;
    } else {
      if (a[this.keyname] < b[this.keyname]) return 1;
      if (a[this.keyname] > b[this.keyname]) return -1;
      return 0;
    }
  };

  // @sort('trackedarray', function (a, b) {
  //   if (this.ascending) {
  //     if (a[this.keyname] < b[this.keyname]) {
  //       return -1;
  //     } else if (a[this.keyname] > b[this.keyname]) {
  //       return 1;
  //     } else {
  //       if (a[this.oldkeyname] < b[this.oldkeyname]) return -1;
  //       if (a[this.oldkeyname] > b[this.oldkeyname]) return 1;
  //       return a.id - b.id;
  //     }
  //   } else {
  //     if (a[this.keyname] < b[this.keyname]) {
  //       return 1;
  //     } else if (a[this.keyname] > b[this.keyname]) {
  //       return -1;
  //     } else {
  //       if (a[this.oldkeyname] < b[this.oldkeyname]) return 1;
  //       if (a[this.oldkeyname] > b[this.oldkeyname]) return -1;
  //       return b.id - a.id;
  //     }
  //   }
  // })
  // sortedItems;

  sorting(keyname, ascending) {
    this.oldkeyname = this.keyname;
    this.keyname = keyname;
    this.ascending = ascending;
    this.datatable.data.sort(this.compare);
    // this.trackedarray = this.sortedItems;
    // set(this, 'datatable.data', this.trackedarray);
  }
  static {
    n(this.prototype, "sorting", [action]);
  }
  createshowitem() {
    var a = {};
    for (let i = 0; i < this.keyvalues.length - 1; i++) {
      a['name'] = this.keyvalues[i];
      a['visibility'] = true;
      this.showitem[i] = a;
      a = {};
    }
  }
  checkclickoutside(option, event) {
    if (event instanceof PointerEvent) {
      return true;
    } else {
      return false;
    }
  }
  static {
    n(this.prototype, "checkclickoutside", [action]);
  }
  onshowitemschange(selectedItems) {
    if (selectedItems.length >= 2) {
      this.selectedItems.forEach(item => {
        set(item, 'visibility', false);
      });
      selectedItems.forEach(item => {
        set(item, 'visibility', true);
      });
      this.selectedItems = selectedItems;
    }
  }
  static {
    n(this.prototype, "onshowitemschange", [action]);
  }
  changelimit(event) {
    const value = event.target.value;
    debounce(this, this.limitchanged, value, 1000);
  }
  static {
    n(this.prototype, "changelimit", [action]);
  }
  limitchanged(value) {
    if (value != this.limit && value > 0) {
      this.limit = value;
      if (this.pageno * this.limit <= 20) {
        this.fetchdata();
      }
    }
  }
  static {
    n(this.prototype, "limitchanged", [action]);
  }
  previouspage() {
    if (this.pageno > 1) {
      console.log('previous');
      this.pageno = this.pageno - 1;
      this.fetchdata();
    }
  }
  static {
    n(this.prototype, "previouspage", [action]);
  }
  nextpage() {
    if (this.pageno * this.limit < 20) {
      console.log('next');
      this.pageno = this.pageno + 1;
      this.fetchdata();
    }
  }
  static {
    n(this.prototype, "nextpage", [action]);
  }
  async fetchdata() {
    this.loadingfetch = true;
    await this.args.fetch_api(this.pageno, this.limit);
    console.log('last changed');
    this.trackedarray = this.datatable.data;
    this.loadingfetch = false;
    this.callChildFunction();
  }
  showpopup() {
    this.popup = 1;
  }
  static {
    n(this.prototype, "showpopup", [action]);
  }
  async closepopup(arr) {
    this.popup = 0;
    arr.setting = this.datatable.data[this.editid].setting;
    console.log('arr', arr);
    set(this.datatable.data, this.editid, arr);
    this.trackedarray = this.datatable.data;
  }
  static {
    n(this.prototype, "closepopup", [action]);
  }
  togglecheckbox(products) {
    set(products.setting, 'ischecked', !products.setting.ischecked);
  }
  static {
    n(this.prototype, "togglecheckbox", [action]);
  }
  delete() {
    this.datatable.data = this.datatable.data.filter(item => !item.setting.ischecked);
    this.trackedarray = this.datatable.data;
  }
  static {
    n(this.prototype, "delete", [action]);
  }
  edit() {
    let count = this.datatable.data.filter(item => item.setting.ischecked);
    if (count.length == 1) {
      this.editid = this.datatable.data.indexOf(count[0]);
      set(this.datatable.data[this.editid], 'setting.ischecked', false);
      this.showpopup();
      console.log('pop up id', this.editid);
    }
  }
  static {
    n(this.prototype, "edit", [action]);
  }
  changebysearch(searchval, searchby) {
    this.datatable.data.forEach(item => {
      set(item, 'setting.visibility', false);
      if (item[searchby] && item[searchby].toString().includes(searchval)) {
        set(item, 'setting.visibility', true);
      }
    });
  }
  static {
    n(this.prototype, "changebysearch", [action]);
  }
}
setComponentTemplate(TEMPLATE, ListComponent);

export { ListComponent as default };
//# sourceMappingURL=list.js.map
