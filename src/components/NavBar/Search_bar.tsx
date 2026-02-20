"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Dropdown from "./Dropdown";
import DropdownVaga from "./DropdownVaga";

export default function Bar() {
  const { status } = useSession();
  const session = status === "authenticated";
  const [isOpen, setIsOpen] = useState(false);

  // Mude o nome aqui facilmente
  const appName = "MatchCarreira"; 

  return (
    <nav className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      <div className="flex justify-between items-center bg-gray-900/60 backdrop-blur-md p-4 md:px-10 w-full border-b border-white/10 shadow-lg">
        
        {/* LOGO AREA */}
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-white font-bold text-2xl tracking-tight">
            {appName}
          </span>
        </Link>

        {/* Botão Mobile */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✕" : "☰"}
        </button>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-gray-200 hover:text-yellow-300 transition font-medium">Home</Link>
          <Link href="/candidatoCadastro" className="text-gray-200 hover:text-yellow-300 transition font-medium">Candidato</Link>
          
          <DropdownVaga />

          <Link href="/empresaCadastro" className="text-gray-200 hover:text-yellow-300 transition font-medium">Empresas</Link>

          {!session ? (
            <Link href="/login" className="bg-blue-400 hover:bg-blue-500 text-gray-900 px-5 py-2 rounded-full font-bold transition shadow-md">
              Entrar
            </Link>
          ) : (
            <Dropdown />
          )}
        </div>
      </div>

      {/* Menu Mobile */}
      {isOpen && (
        <div className="md:hidden bg-gray-900/95 backdrop-blur-xl h-screen p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          <Link onClick={() => setIsOpen(false)} href="/" className="text-white text-xl border-b border-white/5 pb-2">Home</Link>
          <Link onClick={() => setIsOpen(false)} href="/candidatoCadastro" className="text-white text-xl border-b border-white/5 pb-2">Candidato</Link>
          <Link onClick={() => setIsOpen(false)} href="/vagas/cadastro" className="text-white text-xl border-b border-white/5 pb-2">Cadastrar Vagas</Link>
          <Link onClick={() => setIsOpen(false)} href="/vervagas" className="text-white text-xl border-b border-white/5 pb-2">Ver Vagas</Link>
          {!session && (
            <Link onClick={() => setIsOpen(false)} href="/login" className="bg-blue-400 text-gray-900 text-center py-3 rounded-xl font-bold">Entrar</Link>
          )}
          {session && (
            <Link onClick={() => signOut({ callbackUrl: "/" })} href="/" className="bg-blue-400 text-gray-900 text-center py-3 rounded-xl font-bold">Sair</Link>
          )}
        </div>
      )}
    </nav>
  );
}