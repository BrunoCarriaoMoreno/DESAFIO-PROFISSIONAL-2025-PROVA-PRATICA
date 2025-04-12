import { IsEnum, IsIn, IsInt, IsNotEmpty, IsString, Max, Min, ValidateIf } from "class-validator";
import { TipoItemMagico } from "../schemas/item-magico.schema";

export class CreateItemMagicoDto {

    @IsString()
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

    @ValidateIf((obj) => obj.tipo === 'Arma')
    @Min(0)
    @Max(0)
    forcaZeroSeArmadura() {
        return this.forca;
    }

    @ValidateIf((obj) => obj.forca === 0 && obj.defesa === 0)
    isValido() {
        throw new Error('força e defesa não podem estar ambos zerados.');
    }
}