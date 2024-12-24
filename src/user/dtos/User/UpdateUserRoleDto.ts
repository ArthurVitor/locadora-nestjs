import { ApiProperty } from '@nestjs/swagger';
import { RolesEnum } from 'src/user/enums/RolesEnum';

export class UpdateUserRoleDto {
  @ApiProperty()
  name: keyof typeof RolesEnum;
}
