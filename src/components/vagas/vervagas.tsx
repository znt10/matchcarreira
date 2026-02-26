"use client";

import { useEffect, useState } from "react";
import { candidatarVaga, listarvagas, salvarVaga } from "@/app/actions";
import BtnDeletar from "@/components/BtnDeletar";
import BtnEditar from "@/components/BtnEditar";
import { X, Heart, Check, RotateCcw, Briefcase, Plus} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";


interface VerVagasProps {
  tipo: string;
  userId: string | null | undefined;
}

export default function VerVagas({ tipo, userId }: VerVagasProps) {
  const [vagas, setVagas] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [vagaAtualIndex, setVagaAtualIndex] = useState(0);
  const [direcao, setDirecao] = useState(0);

  const isEmpresa = tipo === "empresa";

  // Filtra as vagas que pertencem a esta empresa específica
  const minhasVagas = vagas.filter((v) => v.empresaId === userId);
  const vagaAtual = vagas[vagaAtualIndex];

  useEffect(() => {
    const load = async () => {
      try {
        const dados = await listarvagas();
        setVagas(dados);
      } catch (error) {
        console.error("Erro ao carregar vagas:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const proximaVaga = (d: number = 0) => {
    setDirecao(d);
    setVagaAtualIndex((prev) => prev + 1);
  };

  const voltarVaga = () => {
    setDirecao(-1);
    setVagaAtualIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };

  if (loading) return <div className="flex items-center justify-center min-h-screen text-lg font-medium">Carregando vagas...</div>;

  // --- LAYOUT PARA EMPRESA (VER TODAS AS VAGAS) ---
  if (isEmpresa) {
    return (
      <section className="px-6 max-w-7xl mx-auto py-20 bg-gray-50 min-h-screen">
        <header className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-900">Painel da Empresa</h1>
            <p className="text-gray-500 mt-1">Gerencie suas {minhasVagas.length} vagas publicadas</p>
          </div>

          
            <Link href="/vagas/cadastro" className="no-underline"> 
              <button className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-full hover:bg-gray-800 transition-all shadow-md">
                <Plus size={20} />
                Postar Nova Vaga 
              </button>
            </Link>
        

        </header>

        {minhasVagas.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
            <Briefcase size={60} className="text-gray-300 mb-4" />
            <p className="text-xl font-medium text-gray-600">Nenhuma vaga encontrada.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {minhasVagas.map((vaga) => (
              <div 
                key={vaga._id} 
                className="bg-blue-100 p-8 rounded-[2rem] border border-gray-700 shadow-sm hover:shadow-xl transition-shadow relative flex flex-col justify-between"
              >
                <div className="absolute top-6 right-6 flex gap-2">
                  <BtnEditar vagaId={vaga._id} />
                  <BtnDeletar vagaId={vaga._id} />
                </div>

                <div className="space-y-4 ">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-black">Título da Vaga</span>
                    <h3 className="text-2xl font-bold text-blackmt-1 pr-16">{vaga.titulo}</h3>
                  </div>
                  
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-black">Descrição</span>
                    <p className="text-black text-sm line-clamp-3 mt-1">{vaga.descricao}</p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <p className="text-lg font-bold text-black">R$ {vaga.salario}</p>
                    <p className="text-xs text-black">Publicada recentemente</p>
                  </div>
                </div>
                <Link href= {"/vercandidatos/"}>
                  <button className="mt-6 w-full py-3 bg-gray-500 hover:bg-gray-600 text-black font-semibold rounded-xl transition-colors">
                    Ver Candidatos
                  </button>
                </Link>

              </div>
            ))}
          </div>
        )}
      </section>
    );
  }

  // --- LAYOUT PARA CANDIDATO (TINDER SWIPE) ---
  const variants = {
    enter: { opacity: 0, scale: 0.9 },
    center: { zIndex: 1, x: 0, opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? -1000 : direction > 0 ? 1000 : 0,
      opacity: 0,
      transition: { duration: 0.5 }
    })
  };

  if (!vagaAtual) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-gray-100 text-center px-4">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-gray-800">Você viu todas as vagas!</h2>
        <p className="text-gray-500 mt-2">Volte mais tarde para conferir novas oportunidades.</p>
      </div>
    );
  }

  return (
    <section className="px-6 max-w-7xl mx-auto pb-10 pt-30 bg-gray-100 min-h-screen overflow-hidden">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Vagas disponíveis</h1>
      </div>

      <div className="flex flex-col items-center">
        <div className="relative w-full max-w-4xl min-h-[500px]">
          <AnimatePresence initial={false} custom={direcao} mode="popLayout">
            <motion.article
              key={vagaAtual._id}
              custom={direcao}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full p-10 bg-white border border-gray-200 rounded-[2rem] shadow-sm"
            >
              <div className="space-y-4 text-gray-800">
                <p><strong className="text-black text-lg">Empresa:</strong><br />{vagaAtual.empresa_nome || "Empresa Parceira"}</p>
                <p><strong className="text-black text-lg">Vaga:</strong><br />{vagaAtual.titulo}</p>
                <p><strong className="text-black text-lg">Descrição:</strong><br />{vagaAtual.descricao}</p>
                <p><strong className="text-black text-lg">Requisitos:</strong><br />{vagaAtual.requisitos}</p>
                <p><strong className="text-black text-lg">Salário:</strong><br />R$ {vagaAtual.salario} + benefícios</p>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>

        <div className="flex justify-center items-center gap-10 mt-8 z-10">
          <button
            onClick={voltarVaga}
            disabled={vagaAtualIndex === 0}
            className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110 ${vagaAtualIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-yellow-500 hover:bg-yellow-600 text-white"}`}
          >
            <RotateCcw size={30} />
          </button>

          <button
            onClick={() => proximaVaga(-1)}
            className="w-16 h-16 bg-[#d64541] hover:bg-[#b93a37] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          >
            <X size={35} strokeWidth={2.5} />
          </button>

          <button
            onClick={async () => {
              if (!userId) return alert("Logue para salvar.");
              try { await salvarVaga(vagaAtual._id); } catch (e) { console.error(e); }
              proximaVaga(1);
            }}
            className="w-16 h-16 bg-[#6b9dff] hover:bg-[#5a8be6] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          >
            <Heart size={30} fill="white" />
          </button>

          <button
            onClick={async () => {
              if (!userId) return alert("Logue para candidatar-se.");
                try { await candidatarVaga(vagaAtual._id); } 
                catch (e) { console.error(e); }
              proximaVaga(1);
            }}
            className="w-20 h-20 bg-[#32ad1d] hover:bg-[#2a9318] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          >
            <Check size={45} strokeWidth={3} />
          </button>
        </div>
      </div>
    </section>
  );
}