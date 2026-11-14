import { Controller, Logger } from '@nestjs/common';
import { SearchService } from 'src/search/service/search/search.service';

@Controller('search')
export class SearchController {
    private readonly logger = new Logger(SearchController.name)
    constructor(
        private readonly searchService: SearchService
    ) { }
}
