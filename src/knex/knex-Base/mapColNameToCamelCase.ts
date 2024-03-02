import _ = require('lodash');

export const mapColNameToCamelCase = (row: Record<string, never>) =>
  _.mapKeys(row, (__, key) => _.camelCase(key));
