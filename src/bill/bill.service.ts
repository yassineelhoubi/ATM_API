import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from './bill.schema';
import { UserService } from 'src/user/user.service';
@Injectable()
export class BillService {

  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
    private readonly userService: UserService
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

  async update(id: string, updateBillDto: UpdateBillDto) {
    try {
      const { balance } = await this.userService.findOne(updateBillDto.userId).select('balance');
      const { amount } = await this.billModel.findById(id).select('amount');
      console.log(amount, balance);
      if (amount > balance) {
        throw new Error('Insufficient balance');
      }
      await this.userService.deductBalance(updateBillDto.userId, balance, amount);
      return this.billModel.findByIdAndUpdate(id, updateBillDto, { new: true });
    } catch (e) {
      return e.message;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
