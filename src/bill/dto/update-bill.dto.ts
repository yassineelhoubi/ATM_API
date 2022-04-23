import { PickType } from '@nestjs/mapped-types';
import { CreateBillDto } from './create-bill.dto';

export class UpdateBillDto extends PickType(CreateBillDto, ['status']) {

}
