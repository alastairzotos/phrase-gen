import { Body, Controller, Post } from "@nestjs/common";
import { LoginRequest } from '@bitmetro/phrase-gen-dtos';
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async loginWithGoogle(
    @Body() { code }: LoginRequest
  ) {
    return await this.authService.loginWithGoogle(code);
  }
}
