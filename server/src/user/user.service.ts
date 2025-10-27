// src/user/user.service.ts
import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { email, password } = createUserDto;

    // 1. Kiểm tra email đã tồn tại chưa [cite: 16]
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new ConflictException('Email đã tồn tại'); // [cite: 18, 20]
    }

    // 2. Hash password [cite: 17]
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 3. Tạo user mới
    const createdUser = new this.userModel({
      email,
      password: hashedPassword,
    });

    // 4. Lưu vào DB
    try {
      return await createdUser.save();
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi tạo người dùng'); // [cite: 20]
    }
  }
}