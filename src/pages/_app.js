import '../styles/globals.css'
import Head from 'next/head'

if (typeof window !== 'undefined') {
  console.log(`
  ____          _  __ _   
 / ___|_      _(_)/ _| |_ 
 \\___ \\ \\ /\\ / / | |_| __|
  ___) \\ V  V /| |  _| |_ 
 |____/ \\_/\\_/ |_|_|  \\__|
                          
  `);
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/assets/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  )
}