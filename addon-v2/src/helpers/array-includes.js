import { helper } from '@ember/component/helper';

export default helper(function arrayIncludes([array, element]) {
  return array.includes(element);
});
