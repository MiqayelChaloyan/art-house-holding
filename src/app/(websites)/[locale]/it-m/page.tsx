'use server'

import Home from "@/components/screens/it-m/home";


interface RootProps {
    params: {
        locale: string;
    }
};

export default async function Page({
    params: { locale }
}: Readonly<RootProps>) {
    return (
        <Home />
    )
};