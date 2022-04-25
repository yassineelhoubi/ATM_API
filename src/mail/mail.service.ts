import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../user/entities/user.entity';
@Injectable()
export class MailService {
    constructor(private mailerService: MailerService) { }

    async sendMail(user: User) {
        await this.mailerService.sendMail({
            to: user.email,
            subject: 'LHB Bank',
            template: 'alert',
            context: {
                fName: user.fName,
                lName: user.lName,
            }
        });
    };

}
