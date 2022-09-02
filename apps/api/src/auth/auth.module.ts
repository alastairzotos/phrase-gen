import { Module } from "@nestjs/common";
import { EnvModule } from "src/environment/environment.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [EnvModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
