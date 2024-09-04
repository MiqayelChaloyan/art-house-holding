'use server'

import FloatingMenu from "@/lib/outlets/general/FloatingMenu";
import GoBack from "@/lib/outlets/general/GoBack";
import ScrollToTopButton from "@/lib/outlets/general/ScrollToTopButton";
import Header from "@/lib/outlets/it-m/Header";
import { client } from "../../../../../sanity/client";
import { query as queryBranches } from '../../../../../sanity/services/art-house-service';
import { notFound } from "next/navigation";
import Footer from "@/lib/outlets/it-m/Footer";
import PlayerModal from "@/lib/outlets/general/PlayerModal";
import { getHomeDetails } from "@/utils/data/it-m/data";
import { Locale } from "@/locales";
import { Metadata } from "next";
import { urlForImage } from "../../../../../sanity/imageUrlBuilder";
import { ImagePath } from "@/types/general";
import { generateMetadataDynamic } from "@/utils/default-metadata";


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string;
    }
};

const localeStrings: {
    am: string
    ru: string
    en: string
    [key: string]: string
} = {
    am: 'itm կենտրոն',
    ru: 'itm центр',
    en: 'itm center'
};



async function getResources(locale: string) {
    const branchesPromise = await client.fetch(queryBranches, { language: locale }, { next: { revalidate: 100 } });

    return Promise.all([branchesPromise])
        .then(([branches]) => {
            if (!branches?.length) {
                return { courses: [], branches: [], languages: [], social: [], isError: true };
            }

            return { branches: branches[1], };
        })
        .catch(_ => {
            return { branches: [], isError: true };
        });
};


export default async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {

    const {
        branches,
        isError
    }: any = await getResources(locale);

    if (!branches || isError) {
        notFound()
    };

    return (
        <>
        <Header typePosition='fixed' locale={locale} />
        <div className='itm-container'>
            <GoBack locale={locale} theme='#1A2738' />
            <ScrollToTopButton theme='#1A2738' />
            <FloatingMenu
                website={localeStrings[locale]}
                branches={branches}
                theme='#1A2738'
                hover='#B2D01B'
            />
            {children}
            <Footer locale={locale}/>
        </div>
        <PlayerModal />
    </>
    )
};


export async function generateMetadata({
    params: { locale },
}: {
    params: { locale: Locale };
}): Promise<Metadata> {
    const data = await getHomeDetails(locale);

    const ogTitle = data.ogTitle;
    const ogImage = data.ogImage;
    const ogDescription = data?.ogDescription;

    const path: ImagePath = urlForImage(ogImage);
    const icon = null;

    const metadata = generateMetadataDynamic(ogDescription, ogTitle, path, icon, locale);
    return metadata;
};