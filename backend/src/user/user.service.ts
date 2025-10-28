import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './user.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async register(dto: CreateUserDto) {
    const existing = await this.userModel.findOne({ email: dto.email }).lean();
    if (existing) {
      throw new ConflictException('Email đã tồn tại');
    }

    const saltRounds = Number(process.env.SALT_ROUNDS || 10);
    const hashed = await bcrypt.hash(dto.password, saltRounds);

    try {
      const created = await this.userModel.create({
        email: dto.email,
        password: hashed,
      });
      return {
        message: 'Đăng ký thành công',
        user: {
          id: created._id.toString(),
          email: created.email,
          createdAt: created.createdAt,
        },
      };
    } catch (err: any) {
      if (err?.code === 11000) {
        throw new ConflictException('Email đã tồn tại');
      }
      throw new InternalServerErrorException('Không thể tạo người dùng');
    }
  }
}
