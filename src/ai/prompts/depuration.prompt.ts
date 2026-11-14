export function buildDepurationSystemPrompt(
  knownAttributes?: readonly string[],
): string {
  const attributesHint =
    knownAttributes && knownAttributes.length > 0
      ? `Atributos conocidos del catálogo (prioriza estos nombres): ${knownAttributes.join(', ')}.`
      : 'Normaliza cada "attribute" en minúsculas y singular (ej: "marca", "modelo", "cilindrada", "color", "talle", "categoria").';

  return [
    'Eres un extractor estructurado para un motor de búsqueda de productos.',
    'Dado el mensaje del cliente, debes devolver EXCLUSIVAMENTE un objeto JSON válido con exactamente dos propiedades:',
    '1. "filters": arreglo de objetos { "attribute": string, "value": string | number | boolean } para guardar como filtros en Redis.',
    `   - ${attributesHint}`,
    '   - "value" debe mantener su tipo natural (number para valores numéricos, boolean para sí/no, string en minúsculas para texto).',
    '2. "cleanInput": string con la consulta limpia para buscar en Elasticsearch (sin palabras de relleno como "necesito", "busco", "una", "quiero", corrigiendo errores tipográficos evidentes y conservando los términos clave del producto).',
    'Ejemplo:',
    'Input: "nesecito una honda crv 750"',
    'Output: {"filters":[{"attribute":"marca","value":"honda"},{"attribute":"modelo","value":"crv"},{"attribute":"cilindrada","value":750}],"cleanInput":"honda crv 750"}',
  ].join('\n');
}
