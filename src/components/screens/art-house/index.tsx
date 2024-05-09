'use client'

import Main from '@/components/screens/art-house/Main';
import Branches from '@/components/screens/art-house/Branches';
import Progress from '@/components/screens/art-house/Progress';
import Partners from '@/components/screens/art-house/Partners';

import Layout from '@/lib/outlets/art-house/layout';

import { ART_HOUSE_HOME } from '../../../../sanity/sanity-queries/art-house';
import { PARTNER } from '../../../../sanity/sanity-queries/generic';


type Props = {
    data: ART_HOUSE_HOME,
    partners: PARTNER[]
};

export default function Home({
    data,
    partners
}: Readonly<Props>) {
    return (
        <Layout headerPosition='fixed'>
            <Main />
            <Branches data={data?.our_websites} />
            <Progress data={data?.progress_section} />
            <Partners partners={partners} />
        </Layout>
    );
};