import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContactsModule } from './contacts/contacts.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://admin:secret@127.0.0.1:27017/contact-book?authSource=admin'
    ), // Connect to MongoDB
    ContactsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

// docker run -d \
//   --name mongodb \
//   -p 27017:27017 \
//   -e MONGO_INITDB_ROOT_USERNAME=admin \
//   -e MONGO_INITDB_ROOT_PASSWORD=secret \
//   mongo

// MongooseModule.forRoot(
//   'mongodb://admin:secret@127.0.0.1:27017/contact-book?authSource=admin'
// )
// ▶️ Now restart your app
// npm run start:dev