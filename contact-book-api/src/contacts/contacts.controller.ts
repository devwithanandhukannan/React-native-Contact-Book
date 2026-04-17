import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';

import { ContactsService } from './contacts.service';
import { CreateContactDto } from './dto/create-contact.dto';

@Controller('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.contactsService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.contactsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactsService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateData: CreateContactDto,
  ) {
    return this.contactsService.update(id, updateData);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    console.log('🗑️ Deleting contact with ID:', id);
    const result = await this.contactsService.remove(id);
    console.log('✅ Contact deleted:', result);
    return { success: true, data: result };
  }
}