import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ timestamps: true })
export class Bill extends Document {
    @Prop({ required: true })
    billNumber: string;

    @Prop({ required: true })
    company: string;
    
    @Prop({ required: true })
    amount: string;
}
