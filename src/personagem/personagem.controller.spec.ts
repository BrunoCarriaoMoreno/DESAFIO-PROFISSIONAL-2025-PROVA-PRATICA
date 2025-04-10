import { Test, TestingModule } from '@nestjs/testing';
import { PersonagemController } from './personagem.controller';

describe('PersonagemController', () => {
  let controller: PersonagemController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonagemController],
    }).compile();

    controller = module.get<PersonagemController>(PersonagemController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
