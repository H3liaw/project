import { IsNotEmpty, IsNumber } from "class-validator";

export class createAddressDto{

    @IsNumber()
    @IsNotEmpty()
    user_id:number
}