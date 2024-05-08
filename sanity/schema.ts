import { type SchemaTypeDefinition } from 'sanity';

import homeSchemaArtHouse from './schemas/art-house/home-schema';
import contactUsSchemaArtHouse from './schemas/art-house/contact-us-schema';
import aboutUsSchemaEducationalCenter from './schemas/educational-center/about-us-schema';
import coursesSchemaEducationalCenter from './schemas/educational-center/courses-schema';
import contactUsSchemaEducationalCenter from './schemas/educational-center/contact-us-schema';
import lessonsSchemaEducationCenter from './schemas/educational-center/lessons-schema';
import coursesSchemaLanguage from './schemas/language/courses-schema';
import languagesSchemaLanguage from './schemas/language/languages-schema';
import aboutUsSchemaLanguage from './schemas/language/about-us-schema';
import priceListSchemaLanguage from './schemas/language/price-list-schema';
import promotionsSchemaLanguage from './schemas/language/promotions-schema';
import quizSchemaLanguage from './schemas/language/quiz-schema';
import partnersSchema from './schemas/generic';
import contactUsSchemaLanguage from './schemas/language/contact-us-schema';

export const schemaTypes = [
  homeSchemaArtHouse,
  contactUsSchemaArtHouse,
  aboutUsSchemaEducationalCenter,
  coursesSchemaEducationalCenter,
  contactUsSchemaEducationalCenter,
  lessonsSchemaEducationCenter,
  aboutUsSchemaLanguage,
  coursesSchemaLanguage,
  languagesSchemaLanguage,
  priceListSchemaLanguage,
  promotionsSchemaLanguage,
  quizSchemaLanguage,
  contactUsSchemaLanguage,
  partnersSchema,
];

export const schema: { types: SchemaTypeDefinition[] } = {
  types: schemaTypes,
}
