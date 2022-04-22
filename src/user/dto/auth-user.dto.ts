import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';

export class AuthUserDto extends PickType(UserDto, ['ccn', 'PIN'] as const) { }
