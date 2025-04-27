import { Injectable } from '@nestjs/common';
import { UserDto } from './user.dto';
import { UserEntity } from './user.entity';
import { UserMapper } from './user.mapper';
import { UsersRepository } from './users.repository';
import { ItineraryEntity } from 'src/itineraries/itinerary.entity';

@Injectable()
export class UsersService {
  constructor(
    private usersRepository: UsersRepository,
    private mapper: UserMapper,
  ) {}

  async getAllUsers(): Promise<UserDto[]> {
    const users: UserEntity[] = await this.usersRepository.getAllUsers();
    return users.map((user) => this.mapper.entityToDto(user));
  }

  async getUserById(id: string): Promise<UserDto> {
    const user: UserEntity = await this.usersRepository.getUserById(id);
    return this.mapper.entityToDto(user);
  }

  async getUserByAlias(alias: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByAlias(alias);
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.usersRepository.getUserByEmail(email);
  }

  async userAliasAlreadyExist(user: UserDto): Promise<number> {
    return await this.usersRepository.userAliasAlreadyExist(user);
  }

  async userEmailAlreadyExist(user: UserDto): Promise<number> {
    return await this.usersRepository.userEmailAlreadyExist(user);
  }

  async newUser(userDTO: UserDto): Promise<UserDto> {
    const newUser: UserEntity = await this.usersRepository.newUser(userDTO);
    return this.mapper.entityToDto(newUser);
  }

  async updateUser(id: string, userDTO: UserDto): Promise<UserDto> {
    const updateUser = await this.usersRepository.updateUser(id, userDTO);
    return this.mapper.entityToDto(updateUser);
  }

  async deleteUser(id: string): Promise<void> {
    await this.usersRepository.deleteUser(id);
  }

  async getItinerariesByUserId(userId: string): Promise<ItineraryEntity[]> {
    return await this.usersRepository.getItinerariesByUserId(userId);
  }
}
