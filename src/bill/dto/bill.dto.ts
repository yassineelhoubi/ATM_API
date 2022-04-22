import { IsString, IsInt } from 'class-validator'
export class BillDto {
    @IsInt()
    billNumber: string;

    @IsString()
    company: string;

    @IsString()
    amount: string;
}
