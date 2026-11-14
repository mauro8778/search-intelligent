export const regexSaludo = [
    {
        SALUDO: [
            'hola',
            'holaa',
            'holaaa',
            'holis',
            'buenas',
            'buen dia',
            'buenos dias',
            'buenas tardes',
            'buenas noches',
            'como estas',
            'como andas',
            'como va',
            'todo bien',
            'que tal',
            'hola que tal',
            'hola buenas',
            'hola buen dia',
            'hola buenas tardes',
            'hola buenas noches',
            'hola te hago una consulta',
            'hola una pregunta',
            'disculpa te consulto',
            'hay alguien',
            'estan atendiendo',
            'hola me podrias ayudar',
            'hello',
            'hi',
        ],
    },
    {
        DESPEDIDA: [
            'chau',
            'chao',
            'adios',
            'hasta luego',
            'nos vemos',
            'nos hablamos',
            'hasta pronto',
            'hasta manana',
            'que tengas buen dia',
            'buen finde',
            'buena semana',
            'buena jornada',
            'muchas gracias chau',
            'gracias por todo',
            'eso era todo',
            'eso es todo gracias',
            'no necesito nada mas',
            'listo gracias',
            'genial gracias',
            'cualquier cosa te aviso',
            'despues te escribo',
            'lo pienso y te aviso',
            'bye',
            'saludos',
        ],
    },
    {
        AGRADECIMIENTO_Y_CONFIRMACION: [
            'gracias',
            'muchas gracias',
            'mil gracias',
            'te agradezco',
            'genial',
            'perfecto',
            'barbaro',
            'joya',
            'de diez',
            'buenisimo',
            'excelente',
            'dale',
            'ok',
            'oka',
            'listo',
            'entendido',
            'me sirve',
            'claro',
        ],
    },
];

export enum INTENTION {
    BUSQUEDA_PASIVA = 'BUSQUEDA_PASIVA',
    BUSQUEDA_INMEDIATA = 'BUSQUEDA INMEDIATA',
    PAYMENT_FORM = 'PAYMENTS FORM',
    CREDITCARDS = 'CREDITCARDS',
    ENVIOS_Y_RETIROS = 'ENVIOS Y RETIROS',
    UBICACION_Y_HORARIOS = 'UBICACION Y HORARIOS',
    HUMANO_O_SOPORTE = 'HUMANO O SOPORTE',
    SALUDO = 'SALUDO',
    DESPEDIDA = 'DESPEDIDA',
    AGRADECIMIENTO_Y_CONFIRMACION = 'AGRADECIMIENTO Y CONFIRMACION',
    UNKNOWN = 'UNKNOWN',


}

export const regexSearch = [
    {
        'BUSQUEDA PASIVA': [
            'busco',
            'estoy buscando',
            'ando buscando',
            'necesito',
            'estoy necesitando',
            'quiero comprar',
            'quisiera comprar',
            'me interesa',
            'estoy interesado',
            'tenes stock',
            'tienen stock',
            'tienen disponible',
            'hay stock',
            'te queda',
            'les queda',
            'trabajan',
            'venden',
            'comercializan',
            'manejan',
            'estoy averiguando',
            'averiguo por',
            'precio de',
            'que precio tiene',
            'cuanto sale',
            'cuanto cuesta',
            'cuanto vale',
            'a cuanto esta',
            'me pasas info',
            'me das informacion',
            'tenes catalogo',
            'me mostras opciones',
            'que tenes de',
            'que modelos tienen',
            'buscaba algo como',
            'quiero ver',
            'me cotizas',
            'presupuesto de',
        ],
    },
    {
        'BUSQUEDA INMEDIATA': [
            'traemelo',
            'tramelo',
            'traeme',
            'tramee todo',
            'traeme todo',
            'traeme lo que tengas',
            'lo necesito ya',
            'lo necesito urgente',
            'lo necesito ahora',
            'necesito para hoy',
            'es una urgencia',
            'mandamelo ya',
            'enviamelo hoy',
            'lo quiero ya',
            'lo compro ya',
            'lo llevo',
            'me lo llevo',
            'dame uno',
            'dame dos',
            'agregame al carrito',
            'paso a buscarlo ahora',
            'voy para alla',
            'para retirar ya',
            'retiro hoy',
            'reservamelo',
            'separame uno',
            'guardamelo',
            'cerrame el pedido',
            'pasame el link de pago',
            'donde transfiero ya',
        ],
    },
];

export const regexPayment = [
    {
        'PAYMENTS FORM': [
            'como son los medios de pago',
            'que metodos de pago tienen',
            'que medios de pago aceptan',
            'formas de pago',
            'opciones de pago',
            'como puedo pagar',
            'como se paga',
            'como lo abono',
            'con que se puede pagar',
            'aceptan efectivo',
            'pago en efectivo',
            'hay descuento en efectivo',
            'precio en efectivo',
            'aceptan transferencia',
            'pago por transferencia',
            'pasame el alias',
            'pasame el cbu',
            'aceptan mercado pago',
            'tienen mercadopago',
            'puedo pagar con qr',
            'aceptan modo',
            'aceptan cuenta dni',
            'aceptan debito',
            'tarjeta de debito',
            'aceptan dolares',
            'aceptan cripto',
            'hacen factura a',
        ],
    },
    {
        CREDITCARDS: [
            'aceptan visa',
            'aceptan mastercard',
            'aceptan master',
            'aceptan american express',
            'aceptan amex',
            'aceptan cabal',
            'aceptan naranja',
            'tarjeta naranja',
            'que tarjetas aceptan',
            'con que tarjetas trabajan',
            'que bancos tienen promocion',
            'puedo pagar con tarjeta de credito',
            'aceptan credito',
            'reciben tarjeta',
            'tienen cuotas',
            'hay cuotas sin interes',
            'en cuantas cuotas',
            'tienen 3 cuotas',
            'tienen 6 cuotas',
            'tienen 12 cuotas',
            'tienen cuota simple',
            'que recargo tiene con tarjeta',
            'precio de lista',
            'se puede financiar',
        ],
    },
];

export const regexLogistics = [
    {
        'ENVIOS Y RETIROS': [
            'hacen envios',
            'envian a domicilio',
            'cuanto sale el envio',
            'costo de envio',
            'envio gratis',
            'mandan por moto',
            'envian al interior',
            'mandan por correo',
            'correo argentino',
            'andreani',
            'via cargo',
            'cuando llega',
            'cuanto tarda el envio',
            'llega hoy',
            'puedo retirar en persona',
            'tienen punto de retiro',
        ],
    },
    {
        'UBICACION Y HORARIOS': [
            'donde estan',
            'donde quedan',
            'cual es la direccion',
            'por que zona estan',
            'tienen local a la calle',
            'tienen sucursal',
            'en que horario atienden',
            'a que hora abren',
            'a que hora cierran',
            'estan abiertos ahora',
            'abren los sabados',
            'horarios de atencion',
        ],
    },
    {
        'HUMANO O SOPORTE': [
            'quiero hablar con una persona',
            'pasame con un asesor',
            'hablar con un humano',
            'atencion al cliente',
            'tengo un problema con mi compra',
            'quiero hacer un reclamo',
            'necesito hacer un cambio',
            'tiene garantia',
            'devolucion',
        ],
    },
];

function normalize(text: string): string {
    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // saca tildes
        .replace(/[^a-z0-9\s]/g, ' ')    // saca signos (¿?¡!.,)
        .replace(/\s+/g, ' ')            // limpia espacios múltiples
        .trim();
}

const ALL_INTENTS = [
    ...regexSaludo,
    ...regexSearch,
    ...regexPayment,
    ...regexLogistics,
];

function escapeRegex(value: string): string {
    return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Precompile normalized intent matchers once at module load to avoid per-request allocations.
const COMPILED_INTENTS: Array<{ intentName: string; regexes: RegExp[] }> = ALL_INTENTS.map((group) => {
    const [intentName, phrases] = Object.entries(group)[0];
    const regexes = phrases
        .map((phrase) => normalize(phrase))
        .filter(Boolean)
        .map((cleanPhrase) => new RegExp(`\\b${escapeRegex(cleanPhrase)}\\b`, 'i'));
    return { intentName, regexes };
});

export function detectConversationalIntents(userMessage: string): string | undefined {
    const cleanMessage = normalize(userMessage);
    if (!cleanMessage) return undefined;

    for (const { intentName, regexes } of COMPILED_INTENTS) {
        for (const regex of regexes) {
            if (regex.test(cleanMessage)) {
                return intentName;
            }
        }
    }

    return undefined;
}

export function mapToIntentionEnum(rawResult: string | string[]): INTENTION[] {
    const values = Array.isArray(rawResult) ? rawResult : [rawResult];
    const enumByNormalizedKey = new Map<string, INTENTION>(
        Object.values(INTENTION).map((val) => [val.replace(/_/g, ' ').toUpperCase(), val]),
    );

    return values
        .map((val) => enumByNormalizedKey.get(val.trim().replace(/_/g, ' ').toUpperCase()))
        .filter((val): val is INTENTION => val !== undefined);
}

