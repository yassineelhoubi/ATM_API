import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    fName: string;

    @Prop({ required: true })
    lName: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    cin: string;

    @Prop({ required: true })
    phone: string;

    @Prop({ required: true })
    accountNumber: number;

    @Prop({ required: true })
    PIN: number;

    @Prop({ required: true })
    ccn: number;

    @Prop({ required: true })
    balance: number;
}

export const UserSchema = SchemaFactory.createForClass(User);