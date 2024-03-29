import { type SchemaTypeDefinition } from 'sanity';

// import art_house_design from './schemas/design';
// import art_house_itm from './schemas/it-m';

// import colors from './schemas/educational-center';
import homeSchemaArtHouse from './schemas/art-house';
import aboutUsSchemaEducationalCenter from './schemas/educational-center/about-us-schema';
import coursesSchemaEducationalCenter from './schemas/educational-center/courses-schema';
import coWorkersSchemaEducationalCenter from './schemas/educational-center/co-workers-schema';
import coursesSchemaLanguage from './schemas/language/courses-schema';
import languagesSchemaLanguage from './schemas/language/languages-schema';
import aboutUsSchemaLanguage from './schemas/language/about-us-schema';
import priceListSchemaLanguage from './schemas/language/price-list-schema';
import coWorkersSchemaLanguage from './schemas/language/co-workers-schema';

export const schemaTypes = [
  homeSchemaArtHouse,
  // art_house_design,
  // art_house_itm,
  aboutUsSchemaEducationalCenter,
  coursesSchemaEducationalCenter,
  coWorkersSchemaEducationalCenter,
  aboutUsSchemaLanguage,
  coursesSchemaLanguage,
  languagesSchemaLanguage,
  priceListSchemaLanguage,
  coWorkersSchemaLanguage
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
