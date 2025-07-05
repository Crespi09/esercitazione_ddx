import { Injectable } from '@nestjs/common';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import { User } from '@prisma/client';

@Injectable()
export class BinService {
  create(createBinDto: CreateBinDto, user: User) {
    return 'This action adds a new bin';
  }

  findAll(user: User) {
    return `This action returns all bin for user ${user.id}`;
  }

  findOne(id: number, user: User) {
    return `This action returns a #${id} bin for user ${user.id}`;
  }

  update(id: number, updateBinDto: UpdateBinDto, user: User) {
    return `This action updates a #${id} bin for user ${user.id}`;
  }

  remove(id: number, user: User) {
    return `This action removes a #${id} bin for user ${user.id}`;
  }
}
