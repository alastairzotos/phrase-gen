import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { PhraseGen } from '../components/app';

const Home: NextPage = () => {
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
