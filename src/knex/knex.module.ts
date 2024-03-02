import { Global, Module } from '@nestjs/common';
import { SMSProvider } from './SMSProvider';
import { ConfigModule } from '../config/config.module';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [SMSProvider],
  exports: [SMSProvider],
})
export class KnexModule {}
