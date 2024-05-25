import Component from '@glimmer/component';
import { inject } from '@ember/service';
import { set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { debounce } from '@ember/runloop';
import { precompileTemplate } from '@ember/template-compilation';
import { g, i, n } from 'decorator-transforms/runtime';
import { setComponentTemplate } from '@ember/component';

var TEMPLATE = precompileTemplate("{{yield}}\r\n\r\n\r\n<Search @changebysearch={{this.changebysearch}} @setChildReference={{this.setChildReference}} @availablechoices={{this.datatable.data}} @keyvalues={{this.keyvalues}}/>\r\n\r\n{{#if this.popup}}\r\n  <Edit @closepopup={{this.closepopup}} @head={{this.datatable.data}} @editid={{this.editid}}/>\r\n{{/if}}\r\n{{!-- @searchEnabled={{true}} --}}\r\n<br>\r\n<PowerSelectMultiple @options={{this.showitem}} @labelText=\"Show items:\"\r\n     @selected={{this.selectedItems}} @onChange={{this.onshowitemschange}} \r\n     @onClose={{this.checkclickoutside}}  as |option|>\r\n\r\n    {{option.name}}\r\n\r\n</PowerSelectMultiple>\r\n\r\n<br>\r\n\r\n{{#each this.trackedarray as |item index|}}\r\n {{#if (eq index 0)}}\r\n     <tr> \r\n\r\n      {{#each-in this.showitem as |key-item item-val|}}\r\n           {{#if item-val.visibility}}\r\n               <th>\r\n                <div class=\"header-content\">\r\n                <span class=\"header-text\">{{item-val.name}}</span>\r\n                <div class=\"sort-button\">\r\n                <button {{on \"click\" (fn this.sorting item-val.name true)}} type=\"button\">/\\</button><br>\r\n                <button {{on \"click\" (fn this.sorting item-val.name false)}} type=\"button\">\\/</button>\r\n                </div>\r\n                </div>\r\n               </th>  \r\n           {{/if}} \r\n      {{/each-in}}\r\n\r\n      <th>  <button {{on \"click\" this.delete}} type=\"button\" >Delete</button>\r\n          <button {{on \"click\" this.edit}} type=\"button\" >Edit</button>    </th>\r\n\r\n     </tr>\r\n    \r\n  {{/if}}\r\n\r\n  {{#if item.setting.visibility}}\r\n    <tr>\r\n      {{#each-in item as |cell value|}}\r\n        {{#each-in this.showitem as |key-item item-val|}}\r\n          {{#if (eq item-val.name cell)}}\r\n           {{#if item-val.visibility}}\r\n             <td>{{value}}</td>\r\n            {{/if}}\r\n            \r\n          {{/if}} \r\n   \r\n        {{/each-in}}\r\n       \r\n        \r\n      {{/each-in}} \r\n\r\n  <td>\r\n        <label>\r\n          <input type=\"checkbox\" checked={{item.setting.ischecked}} {{on \"change\" (fn this.togglecheckbox item)}}>\r\n        </label>\r\n    </td>\r\n\r\n    </tr>\r\n    {{/if}}\r\n{{/each}}\r\n\r\n<br>\r\n<label>Page size :\r\n<input type=\"text\" {{on \"input\" this.changelimit}} value={{this.limit}}>\r\n</label>\r\n<button {{on \"click\" this.previouspage}}  type = \"button\">previous</button>\r\n{{this.pageno}}\r\n<button {{on \"click\" this.nextpage}} type=\"button\">next</button>\r\n\r\n\r\n{{#if this.loadingfetch}}\r\n\r\n<div class=\"overlay\">\r\n<div class=\"edit-container\">\r\n<div class=\"edit-title\">\r\n\r\n<h2>Loading......</h2>\r\n\r\n</div>\r\n</div>\r\n</div>\r\n{{/if}}\r\n\r\n\r\n\r\n\r\n   ");

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
