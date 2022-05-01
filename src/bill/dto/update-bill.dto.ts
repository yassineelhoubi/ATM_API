import { PickType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';
import { IsString } from 'class-validator'
export class UpdateBillDto extends PickType(CreateBillDto, ['status', 'billNumber']) {
    @IsString()
    userId: string
}
