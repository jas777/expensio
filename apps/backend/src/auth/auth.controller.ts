import { Controller, Request, Post, UseGuards, Get, Body } from "@nestjs/common";
import { LocalAuthGuard } from '../shared/auth/LocalAuthGuard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../shared/auth/JwtAuthGuard';
import UserDTO from "../shared/entities/user.dto";

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() data: UserDTO) {
    return this.authService.register(data);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
