import Home from "@/components/screens/language/quiz";
import { client } from "../../../../../../sanity/client";
import { query } from "../../../../../../sanity/services/language-service/quiz";
import { notFound } from "next/navigation";


interface Props {
    params: {
        locale: string;
    };
}


async function getResources(locale: string) {
    const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });

    return data
}


export default async function Page({ params: { locale } }: Readonly<Props>) {
    const data = await getResources(locale);

    if (!data) {
        notFound()
    }

    return <Home locale={locale} data={data}/>;
}
