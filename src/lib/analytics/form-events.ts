/** Form submit events that capture request body, response, and client IP. */
export const CONTACT_FORM_EVENT_NAMES = new Set([
  'Contact Us Design',
  'Contact Us Educational',
  'Contact Us Language',
  'Course Registration',
  'Order Design',
]);

export function isContactFormEvent(name: string): boolean {
  return CONTACT_FORM_EVENT_NAMES.has(name);
}
