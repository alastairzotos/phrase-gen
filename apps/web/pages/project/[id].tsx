import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { useEffect } from 'react';
import { PhraseGen } from '../../components/app'
import { useProjectsState } from '../../state/projects';

interface Props {
  id: string;
}

const ProjectPage: NextPage<Props> = ({ id }) => {
  const [loadProject] = useProjectsState(s => [s.loadProject]);

  useEffect(() => {
    loadProject(id);
  }, [id])

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

export default ProjectPage

export const getServerSideProps: GetServerSideProps<{}> = async (f) => {
  return {
    props: { id: f.params!.id }
  }
}
