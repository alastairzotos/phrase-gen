import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react';
import { PhraseGen } from '../components/app';
import { usePhraseGenState } from '../state/phrase-gen';

const Home: NextPage = () => {
  const setPhrasesAndVariables = usePhraseGenState(s => s.setPhrasesAndVariables);

  useEffect(() => {
    setPhrasesAndVariables(
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
      ]
    )
  }, []);

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
