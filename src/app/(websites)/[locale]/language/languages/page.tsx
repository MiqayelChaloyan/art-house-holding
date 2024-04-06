import Home from "@/components/screens/language/languages";


interface RootLayoutProps {
    params: {
        locale: string | any;
    };
}

export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
    return <Home locale={locale}/>;
}
