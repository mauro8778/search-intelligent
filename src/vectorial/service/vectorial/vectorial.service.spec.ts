import { Test, TestingModule } from '@nestjs/testing';
import { VectorialService } from './vectorial.service';

describe('VectorialService', () => {
  let service: VectorialService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VectorialService],
    }).compile();

    service = module.get<VectorialService>(VectorialService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
