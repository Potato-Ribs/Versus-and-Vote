import { Test, TestingModule } from '@nestjs/testing';
import { BalancesService } from './balances.service';

describe('BalancesService', () => {
  let service: BalancesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BalancesService],
    }).compile();

    service = module.get<BalancesService>(BalancesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
