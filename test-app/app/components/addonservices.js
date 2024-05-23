/* BEGIN-SNIPPET docs-demo-service.js */

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class DemotestComponent extends Component {
  @service datatable;
}

/* END-SNIPPET */
