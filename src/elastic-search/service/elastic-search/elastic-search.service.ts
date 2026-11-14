import { Injectable, Logger } from '@nestjs/common';
import { ElasticConfig } from '../../elastic.config';

@Injectable()
export class ElasticSearchService {
    private readonly logger = new Logger(ElasticSearchService.name);
    private readonly defaultIndex =
        process.env.ELASTICSEARCH_INDEX || 'products_index';

    constructor(private readonly elasticConfig: ElasticConfig) { }

    private get client() {
        return this.elasticConfig.getClient();
    }

    async search(
        input: string,
        isInmediate = false,
        index = this.defaultIndex,
        from = 0,
        size = 20,
    ) {
        try {
            const response = await this.client.search({
                index,
                from,
                size,
                query: {
                    multi_match: {
                        query: input,
                        fields: ['title^2', 'name^2', 'description', 'category'],
                        fuzziness: 'AUTO',
                        prefix_length: 1,
                        max_expansions: 50,
                    },
                },
            });

            return response.hits.hits.map((hit) => ({
                id: hit._id,
                score: hit._score,
                ...(hit._source as Record<string, any>),
            }));
        } catch (error) {
            this.logger.error('searchElastic', 'debbugError', { error });
            throw error;
        }
    }

    async createDocument(
        id: string,
        documentData: Record<string, any>,
        index = this.defaultIndex,
        refresh: boolean | 'wait_for' = false,
    ) {
        try {
            return await this.client.index({
                index,
                id,
                document: documentData,
                refresh,
            });
        } catch (error) {
            this.logger.error('createDocument', 'debbugError', { error });
            throw error;
        }
    }

    async updateDocument(
        id: string,
        partialData: Record<string, any>,
        index = this.defaultIndex,
        refresh: boolean | 'wait_for' = false,
    ) {
        try {
            return await this.client.update({
                index,
                id,
                doc: partialData,
                doc_as_upsert: true,
                refresh,
            });
        } catch (error) {
            this.logger.error('updateDocument', 'debbugError', { error });
            throw error;
        }
    }

    async removeFieldFromDocument(
        id: string,
        fieldName: string,
        index = this.defaultIndex,
        refresh: boolean | 'wait_for' = false,
    ) {
        try {
            return await this.client.update({
                index,
                id,
                script: {
                    source: `ctx._source.remove(params.field)`,
                    lang: 'painless',
                    params: { field: fieldName },
                },
                refresh,
            });
        } catch (error) {
            this.logger.error('removeFieldFromDocument', 'debbugError', { error });
            throw error;
        }
    }

    async deleteDocument(
        id: string,
        index = this.defaultIndex,
        refresh: boolean | 'wait_for' = false,
    ) {
        try {
            return await this.client.delete({
                index,
                id,
                refresh,
            });
        } catch (error) {
            this.logger.error('deleteDocument', 'debbugError', { error });
            throw error;
        }
    }
}