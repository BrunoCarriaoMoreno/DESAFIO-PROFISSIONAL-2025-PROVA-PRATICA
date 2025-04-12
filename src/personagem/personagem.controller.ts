import { Controller, Body, Post, Get, Param, Patch, Delete } from '@nestjs/common';
import { PersonagemService } from './personagem.service';
import { CreatePersonagemDto } from './dto/create-personagem.dto';
import { Personagem } from './schemas/personagem.schema';
import { UpdateNomeAventureiroDto } from './dto/update-personagem.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('personagem')
export class PersonagemController {
    constructor(private readonly personagemService: PersonagemService) {}

    @Post()
    create(@Body() dto: CreatePersonagemDto) {
        return this.personagemService.create(dto);
    }

    @Get()
    async findAll(): Promise<Personagem[]> {
        return this.personagemService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string): Promise<Personagem>{
        return this.personagemService.findById(id);
    }

    @Patch(':id/nome-aventureiro')
    async updateNomeAventureiro(
        @Param('id') id: string,
        @Body() body: UpdateNomeAventureiroDto,
    ): Promise<Personagem> {
        return this.personagemService.updateNomeAventureiro(id, body.nomeAventureiro);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.personagemService.remove(id);
    }

    @Patch(':id/item:itemId')
    @ApiOperation({ summary: 'Adicionar um item magico ao personagem' })
    async adcionarItemMagico(@Param('id') personagemId: string, @Param('itemId') itemId: string):Promise<Personagem> {
        return this.personagemService.adicionarItemMagico(personagemId, itemId);
    }
}
