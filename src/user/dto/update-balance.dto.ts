import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
export class UpdateBalanceDto extends PickType(UserDto, ["balance"]) {

}
