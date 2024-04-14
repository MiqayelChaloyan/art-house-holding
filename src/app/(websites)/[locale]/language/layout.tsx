'use server'

import { notFound } from "next/navigation";

import FBMessenger from "@/lib/outlets/language/FBMessenger";
import ScrollToTopButton from "@/lib/outlets/general/ScrollToTopButton";
import ContactUs from "@/lib/outlets/language/ContactUs";
import Footer from "@/lib/outlets/language/Footer";
import Header from "@/lib/outlets/language/Header";

import { client } from "../../../../../sanity/client";
import { query } from "../../../../../sanity/services/language-service/courses";


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string
    };
}


async function getResources(locale: string) {
    // const res = await getLanguageBySlug(slug, locale);
    const data = await client.fetch(query, { language: locale }, { next: { revalidate: 100 } });
    return data[0]
}

async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {

    const data = await getResources(locale);

    if (!data) {
        notFound()
    }

    return (
        <div className="languages-container">
            <div className="wrapper-content">
                <div>
                    <Header locale={locale} />
                </div>
                <FBMessenger />
                <ScrollToTopButton/>
                <main className="languages-main">
                    {children}
                </main>
            </div>
            <ContactUs courses={data.languages} />
            <Footer/>
        </div>
    );
}

export default Layout;


