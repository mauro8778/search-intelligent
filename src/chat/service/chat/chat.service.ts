import { Injectable, Logger } from '@nestjs/common';
import { AiService } from 'src/ai/service/ai.service';
import { detectConversationalIntents, INTENTION, mapToIntentionEnum } from 'src/regex/regexIntention'
import { SearchService } from 'src/search/service/search/search.service';
import { VectorialService } from 'src/vectorial/service/vectorial/vectorial.service';
import { detectedIntencionVectorial } from 'src/vectorial/vectorialIntention';

@Injectable()
export class ChatService {
    private readonly logger = new Logger(ChatService.name)
    constructor(
        private readonly vectorialService: VectorialService,
        private readonly searchService: SearchService,
        private readonly iaService: AiService
    ) { }

    public async messageClient(body: any) {
        try {

            const { input } = body

            const intentionDetected = await this.intentionDetected(body.input)
            if (intentionDetected) {
                const matrizDesicion = this.matrizDesicion(input, intentionDetected)
            }
        } catch (error) {
            this.logger.error('messageClient', 'errorDebbug', { error })

        }
    }

    private async intentionDetected(message: string): Promise<INTENTION | undefined> {
        try {
            const regexDetected = detectConversationalIntents(message);
            if (regexDetected && regexDetected.length > 0) {
                return mapToIntentionEnum(regexDetected)[0];
            }

            const vectorialDetected = await this.vectorialService.searchIntentVectorial(message);
            if (vectorialDetected && vectorialDetected.length > 0) {
                return mapToIntentionEnum(vectorialDetected)[0];
            }

            const aiDetected = await this.iaService.intentionDetected(message);
            if (aiDetected && aiDetected.length > 0) {
                return mapToIntentionEnum(aiDetected)[0];
            }
        } catch (error) {
            this.logger.error('intentionDetected', 'errorDebbug', { error });
        }
    }


    private async matrizDesicion(input: string, intention: INTENTION) {
        try {

            switch (intention) {
                case INTENTION.AGRADECIMIENTO_Y_CONFIRMACION:

                    break;

                case INTENTION.BUSQUEDA_INMEDIATA:
                    await this.searchService.search(input, intention, true)
                    break;

                case INTENTION.BUSQUEDA_PASIVA:
                    await this.searchService.search(input, intention)

                    break;
                case INTENTION.CREDITCARDS:
                    break;
                case INTENTION.DESPEDIDA:
                    break;
                case INTENTION.ENVIOS_Y_RETIROS:
                    break;
                case INTENTION.HUMANO_O_SOPORTE:
                    break;

                case INTENTION.PAYMENT_FORM:
                    break;
                case INTENTION.SALUDO:
                    break;
                case INTENTION.UBICACION_Y_HORARIOS:
                    break;
                default:
                    this.iaService.detectionMatrizRoute(input)
                    break;

            }

        } catch (error) {
            this.logger.error('matrizDesicion', 'errorDebbug', { error })

        }
    }

}
