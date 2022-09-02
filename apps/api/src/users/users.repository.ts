import { UserDetails } from "@bitmetro/phrase-gen-dtos";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { User } from "src/schemas/user.schema";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getUserByEmail(email: string) {
    return await this.userModel.findOne({ email });
  }

  async createUser(details: UserDetails) {
    return await this.userModel.create(details);
  }
}
