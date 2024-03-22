import Languages from './Languages';


interface RootProps {
    locale: string
};

export default function Home({ locale }: Readonly<RootProps>) {
    return <Languages locale={locale}/>;
}