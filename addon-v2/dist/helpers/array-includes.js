import { helper } from '@ember/component/helper';

var arrayIncludes = helper(function arrayIncludes([array, element]) {
  return array.includes(element);
});

export { arrayIncludes as default };
//# sourceMappingURL=array-includes.js.map
