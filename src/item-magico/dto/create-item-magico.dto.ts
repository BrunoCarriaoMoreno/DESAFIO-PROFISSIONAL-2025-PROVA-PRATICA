import { IsEnum, IsInt, IsNotEmpty, Max, Min } from "class-validator";
import { TipoItemMagico } from "../schemas/item-magico.schema";

export class CreateItemMagicoDto {
    @IsNotEmpty()
    nome: string;

    @IsEnum(TipoItemMagico)
    tipo: TipoItemMagico;

    @IsInt()
    @Min(0)
    @Max(10)
    forca: number;

    @IsInt()
    @Min(0)
    @Max(10)
    defesa: number;


}