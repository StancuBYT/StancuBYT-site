import Head from 'next/head'
import Image from 'next/image'
import Header from '../components/Header'
import Roadmap from '../components/Roadmap'
import Footer from '../components/Footer'


export default function Home(){
return (
<>
<Head>
<title>StancuBYT</title>
<meta name="description" content="StancuBYT – viitorul schimbului de valori digitale" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
</Head>


<Header />


<main className="px-6 md:px-12">
<section className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
<div>
<h2 className="text-4xl md:text-5xl font-extrabold metallic-text">StancuBYT</h2>
<p className="mt-4 text-lg text-gray-700">StancuBYT — viitorul schimbului de valori digitale. Tokenul tău pentru tranzacții și lichiditate.</p>


<div className="mt-6 flex gap-3">
<a className="px-4 py-2 rounded-md border" href="#liquidity">Adăugați lichiditate</a>
<a className="px-4 py-2 rounded-md bg-darktext text-white" href="https://etherscan.io/address/0x44Cf220399be798baeaE45fd7C4fF44623713833">Vezi contract</a>
</div>
</div>


<div className="flex justify-center">
<div className="w-64 h-64 relative">
<Image src="/logo.png" alt="StancuBYT logo" fill sizes="256px"/>
</div>
</div>
</section>


<Roadmap />


<section id="liquidity" className="py-12">
<h2 className="text-2xl font-semibold mb-4">Liquidity & Uniswap</h2>
<div className="card-metal p-6">
<p className="mb-2">Pași sugerați pentru creare pool pe Uniswap:</p>
<ol className="list-decimal list-inside text-gray-700">
<li>Deschide Uniswap → Pool → New Position</li>
<li>Selectează tokenul (Adaugă adresa contractului) și ETH (sau alt token)</li>
<li>Definește proporția și confirmă tranzacția din wallet</li>
</ol>
</div>
</section>


</main>


<Footer />
</>
)
}
