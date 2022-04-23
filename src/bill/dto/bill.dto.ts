import { IsString, IsInt, IsEnum } from 'class-validator'
export class BillDto {
    @IsInt()
    billNumber: number;

    @IsString()
    company: string;

    @IsInt()
    amount: number;

    @IsString()
    @IsEnum(['ongoing', 'paid'])
    status: string;
}
