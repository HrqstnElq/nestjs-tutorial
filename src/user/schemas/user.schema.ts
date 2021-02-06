import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as Bcrypt from 'bcrypt';

export type UserDocument = User & Document;

export enum ROLE {
  ADMIN,
  USER,
}

export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, type: ROLE })
  role: ROLE;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  try {
    if (this.isModified('password')) {
      this['password'] = await Bcrypt.hash(this['password'], 10);
    }

    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.static(
  'comparePassword',
  async function (user: User, password: string) {
    try {
      return await Bcrypt.compare(password, user.password);
    } catch (err) {
      return false;
    }
  },
);
