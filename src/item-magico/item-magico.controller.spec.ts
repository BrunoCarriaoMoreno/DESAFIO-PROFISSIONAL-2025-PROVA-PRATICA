import { Test, TestingModule } from '@nestjs/testing';
import { ItemMagicoController } from './item-magico.controller';

describe('ItemMagicoController', () => {
  let controller: ItemMagicoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ItemMagicoController],
    }).compile();

    controller = module.get<ItemMagicoController>(ItemMagicoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
