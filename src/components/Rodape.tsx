import Image from "next/image";

export default function Rodape() {
    return (
        <footer className="bg-gray-700 text-white mt-auto py-10 px-8">

            <div className="grid md:grid-cols-3 gap-8">

                {/* Coluna 1 */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Navegação</h3>
                    <ul className="space-y-2 text-sm">
                        <li><a href="/">Home</a></li>
                        <li><a href="/vervagas">Ver Vagas Disponíveis</a></li>
                        <li><a href="/candidatoCadastro">Cadastrar-se como Candidato</a></li>
                        <li><a href="/empresaCadastro">Cadastrar-se como Empresa</a></li>
                        <li>Sobre nós</li>
                    </ul>
                </div>

                {/* Coluna 2 */}
                <div>
                    <h3 className="text-lg font-semibold mb-2">Políticas</h3>
                    <ul className="space-y-2 text-sm">
                        <li>Termos de Uso</li>
                        <li>Termos de Serviço</li>
                        <li>Privacidade</li>
                        <li>FAQ</li>
                    </ul>
                </div>

                {/* Coluna 3 */}
                <div className="text-center md:text-right">
                    <h3 className="text-2xl font-bold mb-3">
                        Faça parte da nossa jornada
                    </h3>

                    {/* Container obrigatório para fill */}
                    <div className="relative w-64 h-40 mx-auto md:ml-auto md:mr-0">
                        <Image
                            src="https://i.imgur.com/mwTdsXg.png"
                            alt="JobConnect Logo"
                            width={200}
                            height={200}
                            className="rounded shadow object-contain"
                        />
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-500 mt-8 pt-4 text-center text-sm">
                <p>© 2025 MatchCarreira — Desenvolvido por Zeduron | WEB II</p>
                <p>Versão da API: v1</p>
            </div>
        </footer>
    );
}
