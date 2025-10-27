// src/user/user.controller.ts
import { Controller, Post, Body, ValidationPipe, UsePipes, HttpCode, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register') // 
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe()) // Tự động validate DTO
  async register(@Body() createUserDto: CreateUserDto) { // [cite: 14]
    const user = await this.userService.create(createUserDto);
    // Trả về response thành công, loại bỏ password
    const { password, ...result } = user.toObject();
    return {
      statusCode: HttpStatus.CREATED,
      message: 'Đăng ký thành công',
      data: result,
    }; // [cite: 18]
  }
}