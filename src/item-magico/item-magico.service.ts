import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateItemMagicoDto } from './dto/create-item-magico.dto';
import { ItemMagico, ItemMagicoDocument } from './schemas/item-magico.schema';

@Injectable()
export class ItemMagicoService {
    constructor(
        @InjectModel(ItemMagico.name)
        private readonly itemMagicoModel: Model<ItemMagicoDocument>,
    ) {}

    async create(dto: CreateItemMagicoDto): Promise<ItemMagico> {


        if (dto.forca === 0 && dto.defesa === 0) {
            throw new BadRequestException(
                'Força e defesa não podem estar ambos zerados',
            );
        }

        if (dto.tipo === 'Arma' && dto.defesa !== 0) {
            throw new BadRequestException(
                'Itens do tipo arma devem ter zero de defesa',
            );
        }

        const novoItem = new this.itemMagicoModel(dto);
        return await novoItem.save();
    }

    async findAll(): Promise<ItemMagico[]> {
        return this.itemMagicoModel.find().exec();
    }

    async findById(id: string): Promise<ItemMagico | null> {
        return this.itemMagicoModel.findById(id).exec();
    }

    async update(id: string, dto: CreateItemMagicoDto): Promise<ItemMagico> {
        const item = await this.itemMagicoModel.findByIdAndUpdate(id, dto, { new: true }).exec();
        if (!item) {
            throw new NotFoundException(`item magico com id ${id} não encontrado`);
        }
        return item;
    }

    async remove(id: string): Promise<void> {
        const result = await this.itemMagicoModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new NotFoundException(`item magico com ID ${id} não encontrado`);
        }
    }
}
