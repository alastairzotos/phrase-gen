import { UserDetails } from "@bitmetro/phrase-gen-dtos";
import { Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getUserByEmail(email: string) {
    return await this.usersRepository.getUserByEmail(email);
  }

  async createUser(details: UserDetails) {
    return await this.usersRepository.createUser(details);
  }
}
