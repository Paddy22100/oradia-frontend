"use client";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#0A0F2C] to-[#1A1F4C] text-[#D4AF37] font-sans text-center">
      <header className="w-full flex justify-center py-6">
        <Image
          src="/logo.png"
          alt="Logo Oradia"
          width={150}
          height={150}
        />
      </header>
      <h1 className="text-5xl font-bold mb-4">Bienvenue sur Oradia</h1>
      <p className="mb-6 max-w-xl">
        Explore ton univers vibratoire et renouvelle ta connexion au Vivant.
      </p>
      <div className="flex space-x-6">
        <Link
          href="/about"
          className="px-6 py-3 rounded-lg border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0F2C] transition font-bold"
        >
          En savoir plus
        </Link>
        <Link
          href="/oracle"
          className="px-6 py-3 rounded-lg border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0F2C] transition font-bold"
        >
          Oracle Oradia
        </Link>
        <Link
          href="/contact"
          className="px-6 py-3 rounded-lg border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0F2C] transition font-bold"
        >
          Contact
        </Link>
      </div>
    </main>
  );
}
