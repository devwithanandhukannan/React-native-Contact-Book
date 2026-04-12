import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ContactDocument = HydratedDocument<Contact>;

@Schema()
export class Contact {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  phone: string;

  @Prop({ required: false })
  email: string;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);