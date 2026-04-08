import { isEmail, isNotEmpty, IsString, IsOptional} from 'class-validator';
export class CreateContactDto {
    @IsString()
    @isNotEmpty()
    name: string;

    @IsString()
    @isNotEmpty()
    phone: string;

    @IsString()
    @isOptional()
    @isEmail()
    email?: string;
}