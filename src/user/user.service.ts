import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './dto/user.dto';
import { AuthUserDto } from './dto/auth-user.dto';
import { UpdateBalanceDto } from './dto/update-balance.dto';
import { MailService } from 'src/mail/mail.service';
@Injectable()
export class UserService {

  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private mailService: MailService
  ) { }

  create(createUserDto: CreateUserDto) {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();

  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findOne({ _id: id });
  }
  auth(body: AuthUserDto) {
    return this.userModel.findOne({ ccn: body.ccn, PIN: body.PIN });
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  // async updateBalance(id: string, body: UpdateBalanceDto) {
  //   try {
  //     if (body.actionType === 'deposit') {
  //       const { balance } = await this.userModel.findById(id).select('balance');
  //       const newBalance = balance + body.balance;
  //       return this.userModel.findByIdAndUpdate(id, { balance: newBalance }, { new: true });
  //     } else {
  //       const { balance } = await this.userModel.findById(id).select('balance');
  //       if (balance < body.balance) {
  //         throw new Error('Insufficient balance');
  //       }
  //       const newBalance = balance - body.balance;
  //       return this.userModel.findByIdAndUpdate(id, { balance: newBalance }, { new: true });
  //     }
  //   } catch (error) {
  //     return error.message;
  //   }

  // }

  async depositBalance(id: string, body: UpdateBalanceDto) {
    const { balance } = await this.userModel.findById(id).select('balance');
    const newBalance = balance + body.balance;
    return this.userModel.findByIdAndUpdate(id, { balance: newBalance }, { new: true });
  }

  async withdrawBalance(id: string, body: UpdateBalanceDto) {
    try {
      const { balance } = await this.userModel.findById(id).select('balance');
      if (balance < body.balance) {
        throw new Error('Insufficient balance');
      }
      const newBalance = balance - body.balance;
      return this.userModel.findByIdAndUpdate(id, { balance: newBalance }, { new: true });
    } catch (error) {
      return error.message;
    }
  }

  deductBalance(id: string, balance: number, amount: number) {
    const newBalance = balance - amount;
    return this.userModel.findByIdAndUpdate(id, { balance: newBalance }, { new: true });
  }
  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  
  async mobileRecharge(id: string, body: UpdateBalanceDto) {
    try {
      const userDoc = await this.userModel.findById(id);
      if (userDoc.balance < body.balance) {
        throw new Error('Insufficient balance');
      }
      const newBalance = userDoc.balance - body.balance;
      await this.mailService.sendMail(userDoc);
      return this.userModel.findByIdAndUpdate(id, { balance: newBalance }, { new: true });
    } catch (error) {
      return error.message;
    }
  }
}
