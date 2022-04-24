import { PickType } from '@nestjs/mapped-types';
import { UserDto } from './user.dto';
import { IsString, IsEnum } from 'class-validator'
export class UpdateBalanceDto extends PickType(UserDto, ["balance"]) {
    @IsString()
    @IsEnum(['deposit', 'Withdraw'])
    actionType: string;
}
