import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { MongooseModule, MongooseModuleOptions } from '@nestjs/mongoose';
import { ConfigModule } from '../config/config.module';
import { ConfigService } from '../config/config.service';
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const options: MongooseModuleOptions = {
          uri: configService.get('DATABASE_URI'),
        };
        return options;
      },
      inject: [ConfigService],
    }),
    UserModule
  ],
})
export class AppModule { }
