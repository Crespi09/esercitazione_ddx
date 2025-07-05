import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BinService } from './bin.service';
import { CreateBinDto } from './dto/create-bin.dto';
import { UpdateBinDto } from './dto/update-bin.dto';
import { GetUser } from 'src/auth/decorator';

@Controller('bin')
export class BinController {
  constructor(private readonly binService: BinService) {}

  @Post()
  create(@Body() createBinDto: CreateBinDto, @GetUser() user: any) {
    return this.binService.create(createBinDto, user);
  }

  @Get()
  findAll(@GetUser() user: any) {
    return this.binService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: any) {
    return this.binService.findOne(+id, user);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBinDto: UpdateBinDto, @GetUser() user: any) {
    return this.binService.update(+id, updateBinDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: any) {
    return this.binService.remove(+id, user);
  }
}
