'use client'

import Main from '@/components/screens/art-house/Main';
import Branches from '@/components/screens/art-house/Branches';
import Progress from '@/components/screens/art-house/Progress';
import Partners from '@/components/screens/art-house/Partners';

import Layout from '@/lib/outlets/art-house/layout';

import { ART_HOUSE_HOME } from '../../../../sanity/sanity-queries/art-house';
import { PARTNERS } from '../../../../sanity/sanity-queries/generic';


interface RootProps {
    data?: ART_HOUSE_HOME | any
    partners?: PARTNERS[] | any
};


export default function Home({ data, partners }: Readonly<RootProps>) {    
    return (
        <Layout headerPosition='fixed'>
            <Main />
            <Branches data={data?.our_websites} />
            <Progress data={data?.progress_section} />
            <Partners partners={partners} />
        </Layout>
    );
};