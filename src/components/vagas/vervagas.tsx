"use client";

import { useEffect, useState } from "react";
import { listarvagas } from "@/app/actions";
import BtnDeletar from "@/components/BtnDeletar";
import BtnEditar from "@/components/BtnEditar";
import { salvarVaga } from "@/app/actions";
// Importando os ícones para os botões de baixo
import { X, Heart, Check } from "lucide-react";

interface VerVagasProps {
    tipo: string;
    userId: string | null | undefined;
}

export default function VerVagas({ tipo, userId }: VerVagasProps) {
    const [vagas, setVagas] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const dados = await listarvagas();
                setVagas(dados);
            } catch (error) {
                console.error("Erro ao carregar vagas:", error);
                setVagas([]);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const isEmpresa = tipo === "empresa";

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[300px] text-gray-700 text-lg">
                Carregando vagas...
            </div>
        );
    }

    return (
        <section className="px-6 max-w-7xl mx-auto pb-10 pt-30 bg-gray-100 min-h-screen">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">Vagas disponíveis</h1>
                <p className="text-gray-600">Não tem cadastro? <span className="text-blue-600 cursor-pointer">Cadastre-se</span></p>
            </div>

            {vagas.length === 0 ? (
                <div className="text-center text-gray-600 text-lg py-10 bg-white rounded-lg shadow-sm">
                    Nenhuma vaga disponível no momento.
                </div>
            ) : (
                <div className="flex flex-col gap-12 items-center">
                    {vagas.map((vaga, index) => {
                        const isDonoDaVaga = isEmpresa && userId === vaga.empresaId;

                        return (
                            <div key={vaga._id || index} className="w-full max-w-4xl">
                                {/* CARD DA VAGA */}
                                <article className="relative p-10 bg-white border border-gray-200 rounded-[2rem] shadow-sm w-full">
                                    {isDonoDaVaga && (
                                        <div className="absolute top-4 right-4 flex gap-2">
                                            <BtnEditar vagaId={vaga._id} />
                                            <BtnDeletar vagaId={vaga._id} />
                                        </div>
                                    )}

                                    <div className="space-y-4 text-gray-800">
                                        <p><strong className="text-black text-lg">Empresa:</strong><br /> {vaga.empresa_nome || "NeuralSoft Tecnologia Ltda."}</p>
                                        <p><strong className="text-black text-lg">Vaga:</strong><br /> {vaga.titulo}</p>
                                        <p><strong className="text-black text-lg">Descrição:</strong><br /> {vaga.descricao}</p>
                                        <p><strong className="text-black text-lg">Requisitos:</strong><br /> {vaga.requisitos}</p>
                                        <p><strong className="text-black text-lg">Salário:</strong><br /> R$ {vaga.salario} + benefícios</p>
                                    </div>
                                </article>

                                {/* AS "BOLAS" DE AÇÃO (SÓ APARECEM PARA CANDIDATOS) */}
                                {!isEmpresa && (
                                    <div className="flex justify-center items-center gap-10 mt-8">
                                        {/* Botão Passar (X) */}
                                        <button className="w-20 h-20 bg-[#d64541] hover:bg-[#b93a37] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                                            <X size={45} strokeWidth={2.5} />
                                        </button>

                                        {/* Botão Salvar (Coração) */}
                                        <button
                                            onClick={async () => {
                                                if (!userId) {
                                                alert("Você precisa estar logado para salvar vagas.")
                                                return
                                                }

                                                await salvarVaga(vaga._id)
                                            }}
                                            className="w-20 h-20 bg-[#6b9dff] hover:bg-[#5a8be6] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110"
                                            >
                                            <Heart size={40} fill="white" />
                                            </button>
                                                                                    

                                        {/* Botão Candidatar (Check) */}
                                        <button className="w-24 h-24 bg-[#32ad1d] hover:bg-[#2a9318] text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-110">
                                            <Check size={55} strokeWidth={3} />
                                        </button>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </section>
    );
}