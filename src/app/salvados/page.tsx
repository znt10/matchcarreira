"use client";

import { useEffect, useState } from "react";
import { listarVagasSalvas, removerVagaSalva } from "@/app/actions";
import { Heart, Briefcase, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export default function Salvados() {
  const [vagas, setVagas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const dados = await listarVagasSalvas();
        setVagas(dados);
      } catch (error) {
        console.error("Erro ao carregar favoritos:", error);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-blue-600 mb-2" size={40} />
        <p className="text-gray-500 font-medium">Buscando suas vagas...</p>
      </div>
    );
  }

  const handleRemover = async (vagaId: string) => {
  // 1. Atualiza a interface instantaneamente (Filtra a vaga removida)
  setVagas((prevVagas) => prevVagas.filter((v) => v._id !== vagaId));

  try {
    // 2. Remove do banco de dados
    const res = await removerVagaSalva(vagaId);
    
    if (!res.success) {
      // Caso dê erro no servidor, você pode opcionalmente recarregar a lista
      console.error("Erro ao remover do banco");
    }
  } catch (error) {
    console.error("Erro na requisição:", error);
  }
};

  return (
    <section className="min-h-screen bg-gray-50 py-24 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Cabeçalho */}
        <div className="flex items-center gap-4 mb-10">
          <Link href="/" className="p-2 hover:bg-white rounded-full transition-all shadow-sm border border-transparent hover:border-gray-200">
            <ArrowLeft size={24} className="text-gray-700" />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Vagas Salvas</h1>
            <p className="text-gray-500 text-sm">Estas são as oportunidades que você demonstrou interesse.</p>
          </div>
        </div>

        {vagas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-200">
            <div className="bg-gray-100 p-6 rounded-full mb-4">
              <Heart size={40} className="text-gray-300" />
            </div>
            <p className="text-xl font-medium text-gray-600">Nenhuma vaga favoritada ainda.</p>
            <Link href="/" className="mt-4 text-blue-600 hover:text-blue-700 font-semibold transition-colors">
              Voltar para a busca de vagas
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vagas.map((vaga) => (
              <div 
                key={vaga._id} 
                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <span className="bg-blue-50 text-blue-600 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      Favorito
                    </span>
                    
                        <Heart size={22} onClick={async() => {handleRemover(vaga._id)}} className="text-red-500 fill-red-500 cursor-pointer" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-2 leading-tight">
                    {vaga.titulo}
                  </h3>
                  
                  <p className="text-gray-500 text-xs font-semibold mb-4 flex items-center gap-1">
                    <Briefcase size={14} />
                    {vaga.empresa_nome || "Empresa Parceira"}
                  </p>

                  <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {vaga.descricao}
                  </p>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-50 flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Salário</span>
                    <span className="text-lg font-bold text-green-600">R$ {vaga.salario}</span>
                  </div>
                  
                  <Link 
                    href={`/vagas/${vaga._id}`}
                    className="bg-gray-900 text-white text-sm px-5 py-2.5 rounded-xl hover:bg-black transition-colors"
                  >
                    Ver Detalhes
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}