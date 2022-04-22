import { IsString, IsInt } from 'class-validator'
export class BillDto {
    @IsInt()
    billNumber: number;

    @IsString()
    company: string;

    @IsInt()
    amount: number;
}
