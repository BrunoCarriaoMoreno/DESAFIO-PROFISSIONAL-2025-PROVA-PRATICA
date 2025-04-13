import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Personagem, PersonagemDocument } from './schemas/personagem.schema';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { ItemMagico, ItemMagicoDocument, TipoItemMagico } from 'src/item-magico/schemas/item-magico.schema';


@Injectable()
export class PersonagemService {
    constructor(
        @InjectModel(Personagem.name)
        private readonly personagemModel: Model<Personagem>,

        @InjectModel(ItemMagico.name)
        private readonly itemMagicoModel: Model<ItemMagicoDocument>,
    ) {}

    async create(dto: CreatePersonagemDto): Promise<Personagem> {
        const totalPontos = dto.forca + dto.defesa;
      
        if (totalPontos > 10) {
          throw new BadRequestException('A soma de força e defesa não pode passar de 10 pontos.');
        }
      
        const novoPersonagem = new this.personagemModel({
          ...dto,
          itensMagicos: [],
        });
      
        return await novoPersonagem.save();
      }

      async findAll(): Promise<Personagem[]> {
        return this.personagemModel.find().exec();
      }

      async findById(id: string): Promise<Personagem> {
        const personagem = await this.personagemModel.findById(id).exec();

        if (!personagem) {
            throw new NotFoundException(`Personagem com ${id} não encontrado`);
        }

        return personagem;
      }

      async updateNomeAventureiro(id: string, nomeAventureiro: string): Promise<Personagem> {
        const personagem = await this.personagemModel.findByIdAndUpdate(
            id,
            { nomeAventureiro },
            { new: true }
        );

        if(!personagem) {
            throw new NotFoundException(`Personagem com ID ${id} não encontrado`);
        }

        return personagem;
      }

      async remove(id: string): Promise<void> {
        const result = await this.personagemModel.findByIdAndDelete(id);

        if(!result) {
            throw new NotFoundException(`Personagem com ID ${id} não encontrado`)
        }
      }


// vinculando o item magico ao personagem, dando nomes diferentes para os IDs
      async adicionarItemMagico(personagemId: string, itemId: string):Promise<Personagem> {
        // aqui utilizei o método .populate para que ao invés de trazer apenas o ID do item, trazer todos os dados dele
        const personagem = await this.personagemModel.findById(personagemId).populate('itensMagicos');
        if (!personagem) {
          throw new NotFoundException(`personagem com ID ${personagemId} não encontrado`)
        }
        
// busca o item que vai ser adicionado
        const item = await this.itemMagicoModel.findById(itemId);
        if (!item) {
          throw new NotFoundException(`item magico com ID ${itemId} não encontrado`);
        }

// regra para o item do tipo amuleto
        if(item.tipo === TipoItemMagico.AMULETO) {
          const JaPossuiAmuleto = personagem.itensMagicos.some((i: ItemMagico) => i.tipo === TipoItemMagico.AMULETO);
          if (JaPossuiAmuleto) {
            throw new NotFoundException(`personagem ja possui um amuleto`);
          }
        }
        personagem.itensMagicos.push(item);
        return personagem.save();
      }

      async listarItensDoPersonagem(personagemId: string): Promise<ItemMagico[]> {
        const personagem = await this.personagemModel.findById(personagemId).populate('itensMagicos');

        if(!personagem) {
          throw new NotFoundException('personagem não encontrado');
        }

        return personagem.itensMagicos;
      }

      async removerItemMagico(personagemId: string, itemId: string):Promise<Personagem> {
        const personagem = await this.personagemModel.findById(personagemId);

        if (!personagem) {
          throw new NotFoundException(`personagem com ID${personagemId} não encontrado`);
        }
// verifica se o itemId está no array de IDs (que são os itens)
        const index = personagem.itensMagicos.findIndex(
          (item) => item.toString() === itemId,
        );

        if (index === -1) {
          throw new NotFoundException('personagem não possui esse item')
        }

        personagem.itensMagicos.splice(index, 1);
        await personagem.save();

        return personagem;
      }
    }
