import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Contact, ContactDocument } from './contact.schema';
import { CreateContactDto } from './dto/create-contact.dto';

@Injectable()
export class ContactsService {
  constructor(
    @InjectModel(Contact.name)
    private contactModel: Model<ContactDocument>,
  ) {}

  // create
  async create(createContactDto: CreateContactDto): Promise<Contact> {
    const newContact = new this.contactModel(createContactDto);
    return newContact.save();
  }

  // get all
  async findAll(): Promise<Contact[]> {
    return this.contactModel.find().exec();
  }

  // get by id
  async findOne(id: string): Promise<Contact> {
    const contact = await this.contactModel.findById(id).exec();
    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  // update
  async update(id: string, updateData: CreateContactDto): Promise<Contact> {
    const contact = await this.contactModel
      .findByIdAndUpdate(id, updateData, { new: true })
      .exec();

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }

  // delete
  async remove(id: string): Promise<Contact> {
    const contact = await this.contactModel.findByIdAndDelete(id).exec();

    if (!contact) {
      throw new NotFoundException('Contact not found');
    }
    return contact;
  }
}