"use client"

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';

import Page from '@/components/screens/art-house';

import { fetchArtHouseHomeData } from '../../../sanity/services/art-house-service';
import { ART_HOUSE_HOME } from '../../../sanity/sanity-queries/art-house';


export default function Home(props: any) {
  const [data, setData] = useState<ART_HOUSE_HOME[] | any>([]);
  const localActive = useLocale();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await fetchArtHouseHomeData(localActive);
        setData(result[1]);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return <Page data={data} />;
}



