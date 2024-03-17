"use client"

import Main from '@/components/screens/art-house/Main';
import Branches from '@/components/screens/art-house/Branches';
import Progress from '@/components/screens/art-house/Progress';
import Partners from '@/components/screens/art-house/Partners';

import Layout from '@/lib/outlets/art-house/layout';

import { ART_HOUSE_HOME } from '../../../../sanity/sanity-queries/art-house';


interface RootProps {
    data?: ART_HOUSE_HOME | any
};


export default function Home({ data }: Readonly<RootProps>) {    
    return (
        <Layout headerPosition='fixed'>
            <Main />
            <Branches data={data.our_websites} />
            <Progress data={data.progress_section} />
            <Partners data={data.co_workers} />
        </Layout>
    );
};