import { Controller, Body, Get, Param, Post, Put } from '@nestjs/common';
import { ItemMagicoService } from './item-magico.service';
import { CreateItemMagicoDto } from './dto/create-item-magico.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('item-magico')
@Controller('item-magico')
export class ItemMagicoController {
    constructor(private readonly itemMagicoService: ItemMagicoService) {}


    @Post()
    @ApiOperation({ summary: 'Cadastrar um novo item mágico' })
    async create(@Body() dto: CreateItemMagicoDto) {
        return this.itemMagicoService.create(dto);
    }

    @Get()
    @ApiOperation({ summary: 'Listar todos os itens magicos' })
    async findAll() {
        return this.itemMagicoService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar um item magico por ID'})
    @ApiParam({ name: 'id', description: 'ID do item magic' })
    async findById(@Param('id') id: string) {
        return this.itemMagicoService.findById(id);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Atualizar um item magico'})
    @ApiParam({ name: 'id', description: 'ID do item magico' })
    async update(@Param('id') id: string, @Body() dto: CreateItemMagicoDto) {
        return this.itemMagicoService.update(id, dto);
    }
}
