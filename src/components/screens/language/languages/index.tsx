'use client'

import React from 'react';

import { useLocale } from 'next-intl';

import LanguageGallery from './Languages';

import Container from '@/components/components/container';

import { ABOUT_LANGUAGE } from '../../../../../sanity/sanity-queries/language';

import { LANGUAGE } from '@/types/language';


type Props = {
    data: ABOUT_LANGUAGE[]
};

const Home = ({ data }: Props)  => {
    const activeLocale = useLocale();

    const images = data?.map((language: LANGUAGE | any) => ({
        path: language.image,
        page: language.slug.current,
    }));

    return (
        <section id='language'>
            <Container>
                <LanguageGallery locale={activeLocale} images={images.slice(0, 4)} />
                <LanguageGallery locale={activeLocale} images={images.slice(4, 7)} />
            </Container>
        </section>
    );
};

export default React.memo(Home);