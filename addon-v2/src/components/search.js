import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import 'ember-power-select/styles';
import { debounce } from '@ember/runloop';
// import EmberArray from '@ember/array';
// import Ember from 'ember';
// import { get } from '@ember/object';


export default class SearchComponent extends Component {
  // @tracked allchoice = Object.keys(this.args.availablechoices[0]);
  @tracked allchoice = this.args.keyvalues;
  @tracked searchby = this.args.keyvalues[0];
  @tracked value="";

  constructor() {
    super(...arguments);
    // this.search('');
    this.args.setChildReference(this);
  }

  fromparent(){
    // this.value="";
    this.search(this.value);
  }

  @action
  searchfunc(event) {
    const value = event.target.value;
    debounce(this, this.search, value, 500);
    this.value=value;
  }

  search(value) {
    console.log('Searching for:', value);
    this.args.changebysearch(value, this.searchby);
  }
}
