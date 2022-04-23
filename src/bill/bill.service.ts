import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from './bill.schema';
@Injectable()
export class BillService {

  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
  ) { }

  create(createBillDto: CreateBillDto) {
    const createdBill = new this.billModel(createBillDto);
    return createdBill.save();
  }

  findAll() {
    return `This action returns all bill`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bill`;
  }

  update(id: string, updateBillDto: UpdateBillDto) {
    return this.billModel.findByIdAndUpdate(id, updateBillDto, { new: true });
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
