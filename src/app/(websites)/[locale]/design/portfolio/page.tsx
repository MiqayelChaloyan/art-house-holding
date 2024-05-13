'use server'

import Home from '@/components/screens/design/portfolio';


interface Props {
    params: {
        locale: string,
    }
}


export default async function Page({
    params: { locale }
}: Readonly<Props>) {

    return (
        <Home />
    )
}