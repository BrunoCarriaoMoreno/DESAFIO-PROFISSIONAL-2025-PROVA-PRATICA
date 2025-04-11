import { IsEnum, IsInt, IsNotEmpty, Max, Min, ValidateIf } from "class-validator";

export enum  ClassePersonagem {
    GUERREIRO = 'Guerreiro',
    MAGO = 'Mago',
    ARQUEIRO = 'Arqueiro',
    LADINO = 'Ladino',
    BARDO = 'Bardo',
}

export class CreatePersonagemDto {
    @IsNotEmpty()
    nome: string;

    @IsNotEmpty()
    nomeAventureiro: string;

    @IsEnum(ClassePersonagem)
    classe: ClassePersonagem;

    @IsInt()
    @Min(0)
    @Max(10)
    forca: number;

    @IsInt()
    @Min(0)
    @Max(10)
    defesa: number;

}