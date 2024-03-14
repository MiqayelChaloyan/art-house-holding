"use client"

import Main from '@/components/screens/art-house/Main';
import Branches from '@/components/screens/art-house/Branches';
import Progress from '@/components/screens/art-house/Progress';
import Partners from '@/components/screens/art-house/Partners';

import Footer from '@/lib/outlets/art-house/footer';
import Header from '@/lib/outlets/art-house/header';

import { ART_HOUSE_HOME } from '../../../../sanity/sanity-queries/art-house';


interface RootProps {
    data: ART_HOUSE_HOME
};


export default function Home({ data }: Readonly<RootProps>) {
    return (
        <div>
            <Header typePosition='fixed' />
            <Main />
            <Branches data={data.our_websites} />
            <Progress data={data.progress_section} />
            <Partners data={data.co_workers} />
            <Footer />
        </div>
    );
};