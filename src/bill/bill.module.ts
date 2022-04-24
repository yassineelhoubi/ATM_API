import { Module } from '@nestjs/common';
import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bill, BillSchema } from './bill.schema';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
    UserModule
  ],
  controllers: [BillController],
  providers: [BillService],
})
export class BillModule { }
