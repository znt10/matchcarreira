"use client";

import { useState } from "react";
import { registerUser } from "@/app/actions";
import Link from "next/link";
import Image from "next/image";

export default function CandidatoCadastro() {
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
   

    
    async function handleSubmit(formData: FormData) {
        setLoading(true);
        setErrorMessage("");

        formData.set("role", "candidato"); 

        const result = await registerUser(formData);

        setLoading(false);

        if (result?.error) {
            setErrorMessage(result.error); 
            return;
        }

        alert("Candidato cadastrado com sucesso!");
        window.location.href = "/login";
    }

    return (
        <section id="section-signup-form" className="bg-white font-poppins">


            <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

                {/* Formulário */}
                <div className="flex flex-col justify-center items-center p-8 sm:p-12">
                    <div className="w-full max-w-md">
                        {errorMessage && (
                            <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 border border-red-300">
                                {errorMessage}
                            </div>
                        )}


                        <h1 className="text-[32px] font-medium text-black">Comece agora</h1>
                        <p className="mt-2 text-sm font-medium text-black">
                            Cadastre-se para buscar vagas
                        </p>

                        <form action={handleSubmit} className="mt-8 space-y-5">

                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-black">Nome</label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Digite o seu nome completo"
                                    className="mt-1 block w-full rounded-[10px] border border-gray-300 p-2.5 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-black">Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Digite o seu email"
                                    className="mt-1 block w-full rounded-[10px] border border-gray-300 p-2.5 text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="curriculo" className="block text-sm font-medium text-black">Currículo (link)</label>
                                <input
                                    type="text"
                                    name="curriculo"
                                    placeholder="Link do currículo"
                                    className="mt-1 block w-full rounded-[10px] border border-gray-300 p-2.5 text-sm"
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-black">Senha</label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Cadastre uma senha"
                                    className="mt-1 block w-full rounded-[10px] border border-gray-300 p-2.5 text-sm"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gray-700 text-white font-bold text-sm py-3 rounded-[10px] hover:bg-gray-800 transition-colors disabled:opacity-70"
                            >
                                {loading ? "Cadastrando..." : "Cadastrar"}
                            </button>

                        </form>

                        <p className="mt-6 text-center text-sm font-medium text-black">
                            Já tem uma conta?{" "}
                            <Link href="/login" className="font-medium text-blue-700 hover:underline">
                                Entrar
                            </Link>
                        </p>

                    </div>
                </div>

                {/* Imagem */}
                <div className="hidden lg:block relative rounded-l-[45px] overflow-hidden">
                    <Image
                        src="https://i.imgur.com/ryabWME.jpeg"
                        alt="Foto"
                        fill
                        className="object-cover"
                    />
                </div>

            </div>
        </section>
    );
}
