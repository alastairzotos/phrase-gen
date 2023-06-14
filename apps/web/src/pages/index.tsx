import type { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { PhraseGen } from '../components/app';
import { usePhraseGenState } from '../state/phrase-gen';
import { useProjectsState } from '../state/projects';
import { urls } from '../urls';

const Home: NextPage = () => {
  const { pathname } = useRouter();

  const setValues = usePhraseGenState(s => s.setValues);
  const clear = useProjectsState(s => s.clear);

  useEffect(() => {
    clear();

    if (pathname === urls.home()) {
      setValues(
        ['buy @item in @city', '@item for sale in @city'],
        [
          {
            name: 'item',
            values: ['flowers', 'chairs']
          },
          {
            name: 'city',
            values: ['london', 'paris']
          }
        ],
        'broad-match'
      )
    }
  }, [pathname]);

  return (
    <>
      <Head>
        <title>PhraseGen | BitMetro</title>
        <meta name="description" content="Create high-quantity targeted Google Ads keyword phrases" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PhraseGen />
    </>
  )
}

export default Home
