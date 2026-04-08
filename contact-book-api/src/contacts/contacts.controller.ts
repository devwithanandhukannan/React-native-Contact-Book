import { Controller } from '@nestjs/common';
import { ContactsService } from './contacts.service';

@Controller('contacts')
export class ContactsController {
    constructor(private readonly contactsService: ContactsService) {}
    @post()
    create(@Body() createContactDto: CreateContactDto) {
        return this.contactsService.create(createContactDto);
    }

    @get()
    findAll() {
        return this.contactsService.findAll();
    }

    @get(':id')
    findOne(@Param('id') id: string) {
        return this.contactsService.findOne(id);
    }
    
    @put(':id')
    update(@Param('id') id: string, @Body() updateData: CreateContactDto) {
        return this.contactsService.update(id, updateData);
    }
    @delete(':id')
    remove(@Param('id') id: string) {
        return this.contactsService.remove(id);
    }
}
