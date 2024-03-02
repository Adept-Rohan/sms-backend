/* eslint-disable @typescript-eslint/no-var-requires */
const yaml = require('js-yaml');
const { join } = require('path');
const { readFileSync } = require('fs');
const _ = require('lodash');

const YAML_CONFIG_FILENAME = 'config.yml';

const config = yaml.load(
  readFileSync(join(__dirname, 'src', YAML_CONFIG_FILENAME), 'utf8'),
);

const mapColNameToCamelCase = (row) =>
  _.mapKeys(row, (__, key) => _.camelCase(key));

/**
 * @type { import("knex").Knex.Config }
 */

module.exports = {
  ...config['database'],

  pool: {
    min: 2,
    max: 10,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: '/migrations',
  },
  seeds: {
    directory: '/seeds',
  },
  postProcessResponse(result) {
    if (Array.isArray(result)) {
      if (
        result.length == 2 &&
        Array.isArray(result[0]) &&
        Array.isArray(result[1])
      )
        return _.map(result[0], (row) => mapColNameToCamelCase(row));

      return _.map(result, (row) => mapColNameToCamelCase(row));
    }

    return _.mapKeys(result, (__, key) => _.camelCase(key));
  },
  wrapIdentifier: (value, origImpl) => origImpl(_.snakeCase(value)),
};
