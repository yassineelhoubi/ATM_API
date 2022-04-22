import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Bill extends Document {
    @Prop({ required: true })
    billNumber: number;

    @Prop({ required: true })
    company: string;

    @Prop({ required: true })
    amount: number;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
