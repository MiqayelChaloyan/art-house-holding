'use client';

import React from 'react';
import { useLocale } from 'next-intl';

import Layout from '@/lib/outlets/art-house/layout';

import Main from '@/components/screens/art-house/home/Main';
import Branches from '@/components/screens/art-house/home/Branches';
import Progress from '@/components/screens/art-house/home/Progress';
import Partners from '@/components/screens/art-house/home/Partners';


interface Props {
    data: HOME_DETALIS_QUERYResult;
    partners: PARTNER_Result[];
};

const Home = ({ data, partners }: Readonly<Props>) => {
    return (
        <Layout headerPosition='fixed'>
            <Main />
            <Branches data={data?.our_websites} />
            <Progress data={data?.progress_section} />
            <Partners partners={partners} />
        </Layout>
    );
};

export default React.memo(Home);