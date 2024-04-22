'use client'

import { useLocale } from 'next-intl';

import Container from '@/components/components/container';

import LanguageGallery from './Languages';


interface RootProps {
    data: any
};

export default function Home({ data }: Readonly<RootProps>) {
    const activeLocale = useLocale();

    const images = data.map((language: any) => ({
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