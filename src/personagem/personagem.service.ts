import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Personagem, PersonagemDocument } from './schemas/personagem.schema';
import { CreatePersonagemDto } from './dto/create-personagem.dto';

@Injectable()
export class PersonagemService {
    constructor(
        @InjectModel(Personagem.name)
        private readonly personagemModel: Model<Personagem>
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
    }
