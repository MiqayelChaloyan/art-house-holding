import { notFound } from "next/navigation";

import Header from "@/lib/outlets/educational-center/Header";
import BottomMenu from "@/lib/outlets/educational-center/BottomMenu";
import RightMenu from "@/lib/outlets/educational-center/RightMenu";
import Footer from "@/lib/outlets/educational-center/Footer";

import { getCourses } from "../../../../sanity/services/educational-center-service/courses";


async function getResources(locale: string) {
    const courses = await getCourses(locale);

    if (!courses?.length) {
        return {
            data: [],
            isError: true
        }
    }

    return {
        data: courses,
        isError: false
    }
}


interface RootLayoutProps {
    children: React.ReactNode;
    params: {
        locale: string
    };
}


async function Layout({
    children,
    params: { locale },
}: Readonly<RootLayoutProps>) {
    const { data, isError } = await getResources(locale);

    if (!data || isError) {
        notFound()
    }

    return (
        <div>
            <div className="wrapper">
                <RightMenu />
                <BottomMenu />
                <div className="wrapper-content">
                    <Header typePosition='fixed'  locale={locale} />
                    <main className="wrapper-main">
                        {children}
                    </main>
                </div>
                <Footer courses={data} />
            </div>
            {/* <Modal>
            <CoursesModal courses={courses} />
        </Modal> */}
            {/* <ModalLoading/> */}
        </div>

    );
}

export default Layout;



