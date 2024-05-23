import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Fetchapi from 'addon-v2/utils/fetchapi';

export default class DemotestComponent extends Component {
  @service datatable;
  @tracked data;
  @tracked a = [
    'Book No',
    'Book Name',
    'Author Name',
    'Type',
    'Date',
    'Time',
    'Name',
    'ID',
  ];

  constructor() {
    super(...arguments);
    this.showitem();
    // this.fetch_api(2,10);
  }

  showitem() {
    console.log(this.datatable.data);
  }

  @action
  async fetch_api(pageno) {
    const apiUtil = new Fetchapi();
    const apiUrl = `https://0w8qg.wiremockapi.cloud/Page=${pageno}`;
    this.data = await apiUtil.fetchData.perform(apiUrl);
  }
}
