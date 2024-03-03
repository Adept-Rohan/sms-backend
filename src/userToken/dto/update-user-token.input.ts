import { ApiProperty, OmitType, PartialType } from '@nestjs/swagger';
import { CreateUserTokenInput } from './create-user-token.input';

export class UpdateUserTokenInput extends PartialType(
  OmitType(
    CreateUserTokenInput,
    'id' as unknown as readonly (keyof CreateUserTokenInput)[],
  ),
) {
  @ApiProperty()
  id!: number;
}
