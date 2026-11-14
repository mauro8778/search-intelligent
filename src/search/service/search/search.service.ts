import { Injectable, Logger } from '@nestjs/common';
import { AiService } from 'src/ai/service/ai.service';
import { ElasticSearchService } from 'src/elastic-search/service/elastic-search/elastic-search.service';
import { INTENTION } from 'src/regex/regexIntention';

@Injectable()
export class SearchService {
    private readonly logger = new Logger(SearchService.name)

    constructor(
        private readonly aiService: AiService,
        private readonly elastic: ElasticSearchService
    ) { }

    public async search(input: string, intention?: INTENTION, isInmediate: boolean = false) {
        try {
            const inputDepuration = await this.aiService.depurationInput(input)
            const searchDb = await this.elastic.search(inputDepuration.cleanInput, isInmediate)

        } catch (error) {
            this.logger.error('search', 'debbugServiceSearch', { error })
        }
    }

}
