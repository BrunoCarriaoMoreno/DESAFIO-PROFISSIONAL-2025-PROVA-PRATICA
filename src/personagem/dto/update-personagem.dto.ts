import { IsString, IsNotEmpty } from "class-validator";

export class UpdateNomeAventureiroDto {
    @IsString()
    @IsNotEmpty()
    nomeAventureiro: string;
}