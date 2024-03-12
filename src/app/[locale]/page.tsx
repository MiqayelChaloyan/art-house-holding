"use client"

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

import Page from '@/components/screens/art-house';

import { fetchArtHouseHomeData } from '../../../sanity/services/art-house-service';
import { ART_HOUSE_HOME } from '../../../sanity/sanity-queries/art-house';


export const getDataAPI = async (localActive: string) => {
  try {
    const data = await fetchArtHouseHomeData(localActive);
    return data[1];
  } catch (err) {
    console.error('Error fetching data:', err);
  }
};


export default function Home(props: any) {
  const [data, setData] = useState<ART_HOUSE_HOME[] | any>([]);
  const localActive = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getDataAPI(localActive);
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return <Page data={data} />;
}



