import { IsString, IsInt } from 'class-validator'

export class UserDto {
    @IsString()
    fName: string;

    @IsString()
    lName: string;

    @IsString()
    email: string;

    @IsString()
    cin: string;

    @IsString()
    phone: string;

    @IsInt()
    accountNumber: number;

    @IsInt()
    PIN: number;

    @IsInt()
    ccn: number;

    @IsInt()
    balance: number;
}