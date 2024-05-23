// import Controller from '@ember/controller';
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import Fetchapi from '../utils/fetchapi.js';
import { tracked } from '@glimmer/tracking';

export default class StartComponent extends Component {
  @service datatable;
  @tracked apifetched = false;

  constructor() {
    super(...arguments);
    this.fetch_api(1);
  }

  @action
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
}
