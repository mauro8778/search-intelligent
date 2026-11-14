import { Module } from '@nestjs/common';
import { AiModule } from 'src/ai/ai.module';
import { ElasticSearchModule } from 'src/elastic-search/elastic-search.module';
import { SearchService } from './service/search/search.service';
import { SearchController } from './controller/search/search.controller';

@Module({
  imports: [AiModule, ElasticSearchModule],
  providers: [SearchService],
  controllers: [SearchController],
  exports: [SearchService],
})
export class SearchModule {}
