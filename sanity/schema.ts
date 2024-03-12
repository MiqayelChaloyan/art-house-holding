import { type SchemaTypeDefinition } from 'sanity';

import homeSchemaArtHouse from './schemas/art-house';
// import art_house_design from './schemas/design';
// import art_house_itm from './schemas/it-m';
// import art_house_language from './schemas/language';

// import colors from './schemas/educational-center';

import aboutUsSchemaEducationalCenter from './schemas/educational-center/about-us-schema';
import coursesSchemaEducationalCenter from './schemas/educational-center/courses-schema';
import coWorkersSchemaEducationalCenter from './schemas/educational-center/co-workers-schema';

export const schemaTypes = [
  homeSchemaArtHouse,
  // art_house_design,
  // art_house_itm,
  // art_house_language,
  aboutUsSchemaEducationalCenter,
  coursesSchemaEducationalCenter,
  coWorkersSchemaEducationalCenter,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
