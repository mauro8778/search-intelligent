# Search Intelligent

Motor de búsqueda inteligente de productos para chat con IA, construido con **NestJS**, **TypeScript**, **PostgreSQL (Prisma ORM 7)**, **Elasticsearch** y **Google Gemini**.

## Características principales

- **Depuración estructurada de consultas con IA (`AiModule`)**:
  - Utiliza **Gemini Flash-Lite** (`gemini-2.5-flash-lite` por defecto) para transformar consultas en lenguaje natural (ej. `"nesecito una honda crv 750"`) en:
    - `filters`: arreglo estructurado `{ attribute, value }[]` listo para persistir o consultar filtros (ej. Redis).
    - `cleanInput`: texto limpio para búsqueda `multi_match` en Elasticsearch.
  - Validación estricta con **Zod** (`Zod.validateDepurationInput`).
  - Arquitectura desacoplada siguiendo **SOLID** (puertos en `src/ai/ports/`, configuración tipada en `src/ai/config/`, prompts en `src/ai/prompts/`, esquemas en `src/ai/schemas/` y casos de uso en `src/ai/service/`).
- **Esquema de base de datos normalizado (EAV + Catálogo)**:
  - Modelos en `prisma/schema.prisma`: `Product`, `ProductImage` (galería y portada), `Category` (árbol jerárquico), `ProductCategory`, `ProductPrice` (listas de precios y vigencia), `ProductStock` (múltiples depósitos), `Attribute`, `AttributeValue`, `AttributeValueTranslation` (`ES` / `EN`) y `ProductAttribute`.
- **Búsqueda en Elasticsearch (`ElasticSearchModule`)**:
  - Cliente configurado en `ElasticConfig` y operaciones de búsqueda e indexación en `ElasticSearchService`.

## Estructura del proyecto

```text
src/
├── ai/                  # Módulo de IA (config, ports, prompts, schemas, Zod, InputDepurationService)
├── chat/                # Módulo de chat
├── elastic-search/      # Configuración y servicio de Elasticsearch
├── prisma/              # PrismaService y PrismaModule
├── regex/               # Detección de intenciones por expresiones regulares
├── search/              # Orquestación de búsqueda (IA + Elasticsearch)
└── vectorial/           # Módulo de intención / búsqueda vectorial
prisma/
└── schema.prisma        # Esquema PostgreSQL (Prisma 7)
```

## Requisitos previos

- **Node.js** `>= 20` (recomendado `>= 22`)
- **PostgreSQL**
- **Elasticsearch**
- API Key de **Google Gemini**

## Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/search_intelligent"

ELASTICSEARCH_NODE="http://localhost:9200"
ELASTICSEARCH_INDEX="products_index"

AI_PROVIDER="gemini"
GEMINI_API_KEY="tu_api_key"

# Opcionales
GEMINI_MODEL="gemini-2.5-flash"
GEMINI_FLASH_LITE_MODEL="gemini-2.5-flash-lite"
AI_TIMEOUT_MS=15000
```

## Instalación y uso

```bash
# Instalar dependencias
npm install

# Generar Prisma Client (Prisma 7)
npx prisma generate --config prisma7.config.ts

# Ejecutar migraciones (con PostgreSQL activo)
npx prisma migrate dev --name init --config prisma7.config.ts

# Desarrollo
npm run start:dev

# Compilar
npm run build

# Producción
npm run start:prod
```

## Tests

```bash
# Tests unitarios
npm test

# Tests e2e
npm run test:e2e
```
