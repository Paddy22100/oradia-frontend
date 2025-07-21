"use client";
import Image from "next/image";
import Link from "next/link";

export default function About() {
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
      <h1 className="text-4xl font-bold mb-4">À propos d'Oradia</h1>
      <p className="mb-6 max-w-2xl">
        Oradia estt un espace dédié à la guidance vibratoire et à l’éveil intérieur. Notre vision est de reconnecter chaque être à sa pulsation originelle et à l’harmonie du Vivant.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-lg border border-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0F2C] transition font-bold"
      >
        Retour à l'accueil
      </Link>
    </main>
  );
}
