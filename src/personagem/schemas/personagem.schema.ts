import mongoose, { Document, Types } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { ItemMagico } from "src/item-magico/schemas/item-magico.schema";
import { ref } from "process";

export enum ClassePersonagem {
    GUERREIRO = 'Guerreiro',
    MAGO = 'Mago',
    ARQUEIRO = 'Arqueiro',
    LADINO = 'Ladino',
    BARDO = 'Bardo',
}

@Schema()
export class Personagem {
    @Prop({ required: true })
    nome: string;

    @Prop({ required: true })
    nomeAventureiro: string;

    @Prop({ required: true, enum: ClassePersonagem })
    classe: ClassePersonagem;

// padrão começa no level 1
    @Prop({ default: 1 })
    level: number;

// aqui ta armazenando um array de IDs da coleção 'ItemMagico' do banco
    @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'ItemMagico' }],
    default: [],
})
itensMagicos: ItemMagico[];

@Prop({ required: true, min: 0, max: 10 })
forca: number;

@Prop({ required: true, min:0, max: 10 })
defesa: number;

}

export type PersonagemDocument = Personagem & Document;

export const PersonagemSchema = SchemaFactory.createForClass(Personagem);
