import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder({
  baseUrl: 'https://cdn.sanity.io',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || '',
});

export const urlFor = (source) => builder.image(source);
