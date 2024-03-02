import { mapColNameToCamelCase } from './mapColNameToCamelCase';
import _ = require('lodash');

export const processLocalDBResponse = (
  result:
    | Array<number | Record<string, never> | Array<Record<string, never>>>
    | Record<string, never>,
) => {
  if (Array.isArray(result)) {
    // If executing a insert query or update then return the result as it is
    if (result.length == 1 && typeof result[0] === 'number') return result;

    // If executing a raw query then only process the first array (which is the return data)
    if (
      result.length == 2 &&
      Array.isArray(result[0]) &&
      Array.isArray(result[1])
    )
      return _.map(result[0], (row) => mapColNameToCamelCase(row));

    // If executing a normal find all query then loop over the items in the object and process the items individually
    return _.map(result, (row) => mapColNameToCamelCase(row as never));
  }

  // if executing a find one query then directly process the result
  return _.mapKeys(result, (__, key) => _.camelCase(key));
};
