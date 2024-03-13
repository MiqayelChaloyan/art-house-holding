import Home from '@/components/screens/art-house';

import { fetchArtHouseHomeData } from '../../../sanity/services/art-house-service';



interface RootLayoutProps {
  params: {
    locale: string;
  };
}


async function getResources(locale: string) {
  const res = await fetchArtHouseHomeData(locale);
  return res[1]
}


export default async function Page({ params: { locale } }: Readonly<RootLayoutProps>) {
  const data = await getResources(locale);
  console.log(data);

  return <Home />;
}
