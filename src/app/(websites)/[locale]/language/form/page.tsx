import Form from "@/components/screens/language/form";
import { query } from "../../../../../../sanity/services/language-service/courses";

import { client } from "../../../../../../sanity/client";
import { notFound } from "next/navigation";


async function getResources(locale: string) {
    // const res = await getLanguageBySlug(slug, locale);
    const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    return data[0]
}

interface Props {
    params: {
        locale: string
    };
}

export default async function Page({
    params: { locale },
}: Readonly<Props>) {
    const data = await getResources(locale);

    if (!data) {
        notFound()
    }

    return <Form data={data}/>;
}