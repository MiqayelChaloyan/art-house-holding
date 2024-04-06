'use server'

import { notFound } from 'next/navigation';

import Header from '@/lib/outlets/educational-center/Header';
import BottomMenu from '@/lib/outlets/educational-center/BottomMenu';
import RightMenu from '@/lib/outlets/educational-center/RightMenu';
import Footer from '@/lib/outlets/educational-center/Footer';

import Modal from '@/lib/outlets/educational-center/Modal';
import CoursesModal from '@/lib/outlets/educational-center/Modal/courses';

import { allCoursesQuery } from '../../../../../sanity/services/educational-center-service/courses';
import { client } from '../../../../../sanity/client';


async function getResources(locale: string) {
    const data = await client.fetch(allCoursesQuery, { language: locale }, { next: { revalidate: 100 } });

    if (!data?.length) {
        return {
            data: [],
            isError: true
        }
    }

    return {
        data,
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
            <div className='wrapper'>
                <RightMenu />
                <BottomMenu locale={locale} />
                <div className='wrapper-content'>
                    <Header typePosition='fixed' locale={locale} />
                    <main className='wrapper-main'>
                        {children}
                    </main>
                </div>
                <Footer courses={data} />
            </div>
            <Modal>
                <CoursesModal locale={locale} courses={data} />
            </Modal>
            {/* <ModalLoading/> */}
        </div>
    );
}

export default Layout;



