import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'
import styles from './Pokemon.module.css'

export default function Pokemon({pokemon}) {
  return (
    <div className="container">
      <Head>
        <title>{'Pokemon: ' + pokemon?.name}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main>
        <div className={styles.container}>
          <Header title= {'Welcome, '+ pokemon?.name + '!'} />
          <img src={pokemon?.sprites.front_default} />
        </div>
      </main>

      <Footer />
    </div>
  )
}

export async function getStaticPaths(){
  const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=600')
  const pokemon = await res.json()

  let paths = pokemon.results.map(p => {
    return `/pokemon/${p.name}`
  })

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps({ params }){
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.pokemon}`)
  const pokemon = await res.json()

  return {
    props:{
      pokemon,
    }
  }
}