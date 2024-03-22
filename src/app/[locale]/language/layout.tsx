// import { notFound } from "next/navigation";

import ContactUs from "@/lib/outlets/language/ContactUs";
import Footer from "@/lib/outlets/language/Footer";
import Header from "@/lib/outlets/language/Header";
import { getCourses } from "../../../../sanity/services/language-service/courses";
import { notFound } from "next/navigation";
import CircularMenu from "@/lib/outlets/language/CircularMenu";


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string
    };
}


async function getResources(locale: string) {
    const res = await getCourses(locale);
    return res
}


async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const courses = await getResources(locale);

    if (!courses) {
        notFound()
    }

    return (
        <div className="languages-container">
            <div className="wrapper-content">
                <Header locale={locale} />
                {/* <CircularMenu /> */}
                <main className="wrapper-main">
                    {children}
                </main>
            </div>
            <ContactUs courses={courses} />
            <Footer />
        </div>
    );
}

export default Layout;

