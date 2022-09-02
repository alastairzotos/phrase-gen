import { Module } from "@nestjs/common";
import { EnvModule } from "src/environment/environment.module";
import { UsersModule } from "src/users/users.module";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [EnvModule, UsersModule],
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
