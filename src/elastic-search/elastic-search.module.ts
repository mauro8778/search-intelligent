import { Module } from '@nestjs/common';
import { ElasticSearchService } from './service/elastic-search/elastic-search.service';
import { ElasticConfig } from './elastic.config';

@Module({
  providers: [ElasticSearchService, ElasticConfig],
  exports: [ElasticSearchService, ElasticConfig],
})
export class ElasticSearchModule {}
