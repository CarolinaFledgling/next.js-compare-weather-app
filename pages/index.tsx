
import Head from 'next/head'
import HeaderSection from '../components/HeaderSection/HeaderSection'
import MainContent from '../components/MainContent/MainContent';
import styles from '../styles/Home.module.css'

const Home = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Compare the weather </title>
        <meta name="description" content="Tool for comparing the weather" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <HeaderSection />
        <MainContent />
      </main>
    </div>
  )
}

export default Home




