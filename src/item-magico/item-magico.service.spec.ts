import { Test, TestingModule } from '@nestjs/testing';
import { ItemMagicoService } from './item-magico.service';

describe('ItemMagicoService', () => {
  let service: ItemMagicoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ItemMagicoService],
    }).compile();

    service = module.get<ItemMagicoService>(ItemMagicoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
