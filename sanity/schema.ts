import { type SchemaTypeDefinition } from 'sanity';

import homeSchemaArtHouse from './schemas/art-house';
import aboutUsSchemaEducationalCenter from './schemas/educational-center/about-us-schema';
import coursesSchemaEducationalCenter from './schemas/educational-center/courses-schema';
import coursesSchemaLanguage from './schemas/language/courses-schema';
import languagesSchemaLanguage from './schemas/language/languages-schema';
import aboutUsSchemaLanguage from './schemas/language/about-us-schema';
import priceListSchemaLanguage from './schemas/language/price-list-schema';
import coWorkersSchemaLanguage from './schemas/language/co-workers-schema';
import promotionsSchemaLanguage from './schemas/language/promotions-schema';
import partnersSchema from './schemas/generic';

export const schemaTypes = [
  homeSchemaArtHouse,
  aboutUsSchemaEducationalCenter,
  coursesSchemaEducationalCenter,
  aboutUsSchemaLanguage,
  coursesSchemaLanguage,
  languagesSchemaLanguage,
  priceListSchemaLanguage,
  coWorkersSchemaLanguage,
  promotionsSchemaLanguage,
  partnersSchema,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
