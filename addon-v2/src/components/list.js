import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { set } from '@ember/object';
import { debounce } from '@ember/runloop';
// import { sort } from '@ember/object/computed';

// import { sortBy } from '@ember/array';

export default class ListComponent extends Component {
  @service datatable;
  @service elsewhere;
  @tracked popup = 0;
  @tracked loadingfetch = false;
  @tracked editid = 0;
  @tracked keyvalues = Object.keys(this.datatable.data[0]);
  @tracked pageno = 1;
  @tracked showitem = [];
  @tracked selectedItems = this.showitem;
  @tracked trackedarray;
  @tracked limit = 10;
  @tracked keyname = 'id';
  @tracked oldkeyname = 'id';
  @tracked ascending;

  constructor() {
    super(...arguments);
    // this.lastReachedCallback = this.lastReachedCallback.bind(this);
    this.trackedarray = this.datatable.data;
    this.createshowitem();
  }

  @action
  setChildReference(childReference) {
    set(this, 'myChild', childReference);
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

  @action
  sorting(keyname, ascending) {
    this.oldkeyname = this.keyname;
    this.keyname = keyname;
    this.ascending = ascending;
    this.datatable.data.sort(this.compare);
    // this.trackedarray = this.sortedItems;
    // set(this, 'datatable.data', this.trackedarray);
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

  @action
  checkclickoutside(option, event) {
    if (event instanceof PointerEvent) {
      return true;
    } else {
      return false;
    }
  }

  @action
  onshowitemschange(selectedItems) {
    if (selectedItems.length >= 2) {
      this.selectedItems.forEach((item) => {
        set(item, 'visibility', false);
      });
      selectedItems.forEach((item) => {
        set(item, 'visibility', true);
      });
      this.selectedItems = selectedItems;
    }
  }

  @action
  changelimit(event) {
    const value = event.target.value;
    debounce(this, this.limitchanged, value, 1000);
  }
  @action
  limitchanged(value) {
    if (value != this.limit && value > 0) {
      this.limit = value;
      if (this.pageno * this.limit <= 20) {
        this.fetchdata();
      }
    }
  }

  @action
  previouspage() {
    if (this.pageno > 1) {
      console.log('previous');
      this.pageno = this.pageno - 1;
      this.fetchdata();
    }
  }

  @action
  nextpage() {
    if (this.pageno * this.limit < 20) {
      console.log('next');
      this.pageno = this.pageno + 1;
      this.fetchdata();
    }
  }
  async fetchdata() {
    this.loadingfetch = true;
    await this.args.fetch_api(this.pageno, this.limit);
    console.log('last changed');
    this.trackedarray = this.datatable.data;
    this.loadingfetch = false;
    this.callChildFunction();
  }

  @action
  showpopup() {
    this.popup = 1;
  }

  @action
  async closepopup(arr) {
    this.popup = 0;
    arr.setting = this.datatable.data[this.editid].setting;
    console.log('arr', arr);
    set(this.datatable.data, this.editid, arr);
    this.trackedarray = this.datatable.data;
  }

  @action
  togglecheckbox(products) {
    set(products.setting, 'ischecked', !products.setting.ischecked);
  }

  @action
  delete() {
    this.datatable.data = this.datatable.data.filter(
      (item) => !item.setting.ischecked,
    );
    this.trackedarray = this.datatable.data;
  }

  @action
  edit() {
    let count = this.datatable.data.filter((item) => item.setting.ischecked);
    if (count.length == 1) {
      this.editid = this.datatable.data.indexOf(count[0]);
      set(this.datatable.data[this.editid], 'setting.ischecked', false);
      this.showpopup();
      console.log('pop up id', this.editid);
    }
  }

  @action
  changebysearch(searchval, searchby) {
    this.datatable.data.forEach((item) => {
      set(item, 'setting.visibility', false);
      if (item[searchby] && item[searchby].toString().includes(searchval)) {
        set(item, 'setting.visibility', true);
      }
    });
  }
}
