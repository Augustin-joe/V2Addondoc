'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['addon-v2'],
    },
    'ember-cli-addon-docs': {
      documentingAddonAt: '../addon-v2',
    },
    minifyCSS: {
      options: {
        processImport: false
      }
    }
  });
  // app.import('addon-v2/styles/app.css');

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app);
};
