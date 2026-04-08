import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactSchema } from './contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
    constructor(@InjectModel('Contact') private contactModel: Model<Contact>) {}

    //create a new contact
    async create(createContactDto: CreateContactDto): Promise<Contact> {
        const newContact = new this.contactModel(createContactDto);
        return newContact.save();
    }
    //get all contacts
    async findAll(): Promise<Contact[]> {
        return this.contactModel.find().exec();
    }

    //get a contact by id
    async findOne(id: string): Promise<Contact> {
        return this.contactModel.findById(id).exec();
    }
    
    async update(id: string, updateData: CreateContactDto): Promise<Contact> {
        return this.contactModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }

    async remove(id: string): Promise<Contact> {
        return this.contactModel.findByIdAndDelete(id).exec();
    }
    
}
