import { Body, Controller, Post } from "@nestjs/common";
import { FbLoginDetails, GoogleLoginRequest } from '@bitmetro/phrase-gen-dtos';
import { AuthService } from "./auth.service";


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('google')
  async loginWithGoogle(
    @Body() { code }: GoogleLoginRequest
  ) {
    return await this.authService.loginWithGoogle(code);
  }

  @Post('facebook')
  async loginWithFacebook(
    @Body() details: FbLoginDetails
  ) {
    return await this.authService.loginWithFacebook(details);
  }
}
