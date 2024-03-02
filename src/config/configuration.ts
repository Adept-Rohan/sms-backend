import { join } from 'path';
import { Config, configSchema } from './configuration.validation';
import { readFileSync } from 'fs';
import * as yaml from 'js-yaml';

const YAML_CONFIG_FILENAME = 'config.yml';

export const loadAppConfiguration = () => {
  return configSchema.parse(
    yaml.load(
      readFileSync(join(__dirname, '../', YAML_CONFIG_FILENAME), 'utf8'),
    ) as Config,
  );
};
