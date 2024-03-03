import { Module } from '@nestjs/common';
import { UserTokenService } from './userToken.service';

@Module({
  providers: [UserTokenService],
  exports: [UserTokenService],
})
export class UserTokenModule {}
