import { Module } from '@nestjs/common';
import { ConfigModule as NextConfigModule } from '@nestjs/config';
import { loadAppConfiguration } from './configuration';

@Module({
  imports: [
    NextConfigModule.forRoot({
      isGlobal: true,
      ignoreEnvFile: true,
      load: [loadAppConfiguration],
    }),
  ],
})
export class ConfigModule {}
