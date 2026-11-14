import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Client } from '@elastic/elasticsearch';

@Injectable()
export class ElasticConfig implements OnModuleInit {
    private readonly logger = new Logger(ElasticConfig.name);
    private client: Client;

    constructor() {
        this.client = new Client({
            node: process.env.ELASTICSEARCH_NODE || 'http://localhost:9200',
        });
    }

    async onModuleInit() {
        await this.connection();
    }

    async connection(): Promise<Client | undefined> {
        try {
            const health = await this.client.cluster.health();
            this.logger.log(
                `Conectado a Elasticsearch - Estado del cluster: ${health.status}`,
            );
            return this.client;
        } catch (error) {
            this.logger.error('connection', 'debbugError', { error });
        }
    }

    getClient(): Client {
        return this.client;
    }
}