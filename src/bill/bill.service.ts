import { Injectable } from '@nestjs/common';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update-bill.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill } from './bill.schema';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class BillService {

  constructor(
    @InjectModel(Bill.name) private readonly billModel: Model<Bill>,
    private readonly userService: UserService,
    private mailService: MailService
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

  async update(updateBillDto: UpdateBillDto) {
    try {
      const userDoc = await this.userService.findOne(updateBillDto.userId);
      const { amount, _id } = await this.billModel.findOne({ billNumber: updateBillDto.billNumber });
      if (amount > userDoc.balance) {
        throw new Error('Insufficient balance');
      }
      await this.userService.deductBalance(updateBillDto.userId, userDoc.balance, amount);
      await this.mailService.sendMail(userDoc);
      return this.billModel.findByIdAndUpdate(_id, updateBillDto, { new: true });
    } catch (e) {
      return e.message;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} bill`;
  }
}
