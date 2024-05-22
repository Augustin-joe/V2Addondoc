import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { set } from '@ember/object';

export default class EditComponent extends Component {
  @service datatable;
  @tracked editid = this.args.editid;

  @action
  submitedit() {
    let arr = {};
    for (let i = 0; i < Object.keys(this.args.head[0]).length - 1; i++) {
      let a = document.getElementById(Object.keys(this.args.head[0])[i]).value;
      arr[Object.keys(this.args.head[0])[i]] = a;
    }
    this.args.closepopup(arr);
  }
}
