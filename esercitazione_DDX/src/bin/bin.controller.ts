import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, HttpStatus, HttpCode } from '@nestjs/common';
import { BinService } from './bin.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import { GetUser } from 'src/auth/decorator';
import { User } from '@prisma/client';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('bin')
export class BinController {
  constructor(private readonly binService: BinService) {}

  @Post()
  create(@Body() createBinDto: CreateBinDto, @GetUser() user: User) {
    return this.binService.create(createBinDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.binService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.binService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBinDto: UpdateBinDto, @GetUser() user: User) {
    return this.binService.update(+id, updateBinDto, user);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT) // 204
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.binService.remove(+id, user);
  }
}
