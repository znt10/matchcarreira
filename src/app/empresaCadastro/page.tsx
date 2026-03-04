"use client";

import Image from "next/image";
import { useState } from "react";
import { registerUser } from "@/app/actions"; 
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function EmpresaCadastro() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState("");

    async function handleSubmit(formData: FormData) {
        setLoading(true);
    
        formData.set("role", "empresa"); 
        formData.set("area_atuacao", formData.get("field-of-work") || "");

        const result = await registerUser(formData);

        setLoading(false);

        if (result?.error) {
            setErrorMessage(result.error); 
            return;
        }

        alert("Empresa cadastrada com sucesso!");
        router.push("/login");
    }

    return (
        <section id="signup-form" className="bg-white font-poppins py-12">


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
                        <p className="mt-2 text-sm text-gray-600">
                            Cadastre a sua empresa para começar a anunciar vagas
                        </p>

                        <form action={handleSubmit} className="mt-8 space-y-5">

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Nome
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Digite o nome da empresa"
                                    className="mt-2 block w-full p-2.5 border border-gray-300 rounded-lg text-xs"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Digite o email da empresa"
                                    className="mt-2 block w-full p-2.5 border border-gray-300 rounded-lg text-xs"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Área de atuação
                                </label>
                                <input
                                    type="text"
                                    name="field-of-work"
                                    placeholder="Área de atuação da empresa"
                                    className="mt-2 block w-full p-2.5 border border-gray-300 rounded-lg text-xs"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Descrição
                                </label>
                                <textarea
                                    name="descricao"
                                    placeholder="Descreva a sua empresa"
                                    className="mt-2 block w-full p-2.5 border border-gray-300 rounded-lg text-xs"
                                    required
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-black">
                                    Senha
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Cadastre uma senha"
                                    className="mt-2 block w-full p-2.5 border border-gray-300 rounded-lg text-xs"
                                    required
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 rounded-lg bg-gray-700 text-white font-bold hover:bg-gray-800 disabled:opacity-70"
                            >
                                {loading ? "Cadastrando..." : "Cadastrar"}
                            </button>
                        </form>

                        <p className="mt-8 text-center text-sm font-medium text-black">
                            Já tem uma conta?{" "}
                            <Link href="/login" className="font-medium text-blue-700 hover:underline">
                                Entrar
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Imagem */}
                <div className="hidden lg:block relative">
                    <Image
                        src="https://i.imgur.com/aeIrjKy.jpeg"
                        alt="Foto lateral"
                        fill
                        className="object-cover rounded-l-[45px]"
                    />
                </div>

            </div>
        </section>
    );
}
