import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MONGO } from './config/database.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [UserModule, MongooseModule.forRoot(MONGO.URI)],
})
export class AppModule {}
