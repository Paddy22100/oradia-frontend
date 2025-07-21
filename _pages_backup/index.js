
import Link from 'next/link';
export default function Home() {
    return (
        <main style={backgroundColor:'#0b1d3a', color:'#d4af37', fontFamily:'Arial, sans-serif', minHeight:'100vh', padding:'2rem'}>
            <h1>Oradia</h1>
            <ul>
                <li><Link href='/test'>test</Link></li>
            </ul>
        </main>
    );
}
