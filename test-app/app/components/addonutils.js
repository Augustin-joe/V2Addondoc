/* BEGIN-SNIPPET docs-demo-utils.js */

import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import Fetchapi from 'addon-v2/utils/fetchapi';

export default class DemotestComponent extends Component {
  @tracked data;

  constructor() {
    super(...arguments);
    this.fetch_api(2, 10);
  }

  @action
  async fetch_api(pageno) {
    const apiUtil = new Fetchapi();
    const apiUrl = `https://0w8qg.wiremockapi.cloud/Page=${pageno}`;
    this.data = await apiUtil.fetchData.perform(apiUrl);
  }
}

/* END-SNIPPET */
