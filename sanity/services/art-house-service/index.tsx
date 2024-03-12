import { groq } from 'next-sanity';

import { client } from '../../client';

import { ART_HOUSE_HOME } from '../../sanity-queries/art-house';

export const fetchArtHouseHomeData = async (language: string): Promise<ART_HOUSE_HOME[]> => {
    const query = groq`*[_type == "art-house-home"] {
        "_id": _id,
        "our_websites": our_websites[] {
            "company_name": company_name,
            "words": words[$language],
            "website_logo_front": website_logo_front,
            "website_logo_back": website_logo_back,
            "slug": slug.current,
            "web_site_url": web_site_url
        },
        "progress_section": progress_section[] {
            "title": title[$language],
            "slug": slug.current,
            "quantity": quantity
        },
        "co_workers": co_workers,
    }`;

    try {
        const data = await client.fetch(query, { language: language || 'am'  });
        return data;
    } catch (err) {
        throw err;
    }
};