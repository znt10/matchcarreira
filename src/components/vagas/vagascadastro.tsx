"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Bar from "@/components/NavBar/Search_bar";
import { criarVaga } from "@/app/actions"; // Sua server action
import { useState } from "react";

export default function VagasCadastro() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    async function clientAction(formData: FormData) {
        // A action criarVaga já pega o ID da sessão internamente no servidor
        const result = await criarVaga(formData) as { error?: string } | undefined;

        if (result?.error) {
            setErrorMessage(result.error); 
            return;
        } else {
            alert("Vaga cadastrada com sucesso!");
            router.push("/vervagas");
        }
    }

    return (
        <section id="section-form-page" className="bg-white font-poppins">
            <div className="min-h-screen flex items-stretch">
                <div className="w-full grid grid-cols-1 lg:grid-cols-2">

                {/* Form Column */}
                <div className="flex flex-col justify-center items-center p-8 sm:p-12">
                    <div className="w-full max-w-md">
                        {errorMessage && (
                            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                                {errorMessage}
                            </div>
                        )}
                    {/* Header */}
                    <div className="mb-10">
                        <h1 className="text-black text-[32px] font-medium ">Cadastrar vaga</h1>
                        <p className="text-black text-sm font-medium leading-[21px] mt-2">
                        Anuncie a vaga disponível na sua empresa
                        </p>
                    </div>

                    {/* Form */}
                    <form className="space-y-5" action={clientAction} >
                        <div>
                            <label htmlFor="job-title" className="block text-black text-sm font-medium mb-2">
                            Vaga disponível
                            </label>
                            <input
                            type="text"
                            name="titulo" // Importante: deve bater com o formData.get("titulo") na action
                            id="job-title"
                            placeholder="Digite o cargo da vaga disponível"
                            className="w-full border rounded-[10px] p-2.5 text-sm"
                            required
                            />
                        </div>

                        <div>
                            <label htmlFor="requirements" className="block text-black text-sm font-medium mb-2">
                            Requisitos
                            </label>
                            <input
                            type="text"
                            name="requisitos"
                            id="requirements"
                            placeholder="Digite os requisitos"
                            className="w-full border rounded-[10px] p-2.5 text-sm"
                            />
                        </div>

                        <div>
                            <label htmlFor="description" className="block text-black text-sm font-medium mb-2">
                            Descrição
                            </label>
                            <textarea
                            id="description"
                            name="descricao"
                            rows={3}
                            placeholder="Descreva como será o trabalho"
                            className="w-full border rounded-[10px] p-2.5 text-sm"
                            required
                            ></textarea>
                        </div>

                        <div>
                            <label htmlFor="salary" className="block text-black text-sm font-medium mb-2">
                            Salário
                            </label>
                            <input
                            type="text"
                            name="salario"
                            id="salary"
                            placeholder="Digite o salário"
                            className="w-full border rounded-[10px] p-2.5 text-sm"
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-gray-600 text-white font-bold py-3 rounded-[10px] hover:bg-gray-800 transition-colors"
                        >
                            Cadastrar
                        </button>
                    </form>
                    </div>
                </div>

                {/* Image Column */}
                <div className="relative hidden lg:block">
                    <Image
                    src="https://i.imgur.com/0HlkYWv.jpeg"
                    alt="Imagem"
                    fill
                    priority
                    className="object-cover"
                    />
                </div>
                </div>
            </div>
        </section>
    );
}