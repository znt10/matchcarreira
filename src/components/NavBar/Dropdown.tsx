"use client";

import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/dropdown";
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react"; // 1. Importar useSession

function DropdownMenuCustom() {
    const router = useRouter();
    const { data: session, status } = useSession(); // 2. Pegar dados da sessão

    // Verifica se está carregando para não piscar conteúdo errado
    if (status === "loading") {
        return <button className="text-white px-2">...</button>;
    }

    const isAdmin = session?.user?.role === "admin" 
    const isLoggedIn = status === "authenticated";

    return (
        <Dropdown placement="bottom-end">
            <DropdownTrigger>
                <button className="bg-blue-400 hover:bg-blue-500 text-gray-900 px-5 py-2 rounded-full font-bold transition shadow-md">
                    {/* Muda o texto do botão dependendo se está logado */}
                    {isLoggedIn ? `Olá, ${session?.user?.name?.split(' ')[0]}` : "Entrar / Menu"}
                </button>
            </DropdownTrigger>

<DropdownMenu
    aria-label="Menu do usuário"
    className="bg-white/90 backdrop-blur-lg border border-gray-300 shadow-xl rounded-xl py-2"
    itemClasses={{
        base: [
            "rounded-lg", "text-sm", "font-medium", "px-3", "py-2",
            "transition-colors", "text-gray-700",
            "data-[hover=true]:bg-gray-100",
        ],
    }}
>
            {/* --- CASO 1: NÃO LOGADO (Visitante) --- */}
            {/* Em vez de array, renderizamos condicionalmente retornando null se falso */}
            
            {!isLoggedIn ? (
                <DropdownItem key="login" onClick={() => router.push("/login")}>
                    Entrar
                </DropdownItem>
            ) : null}


            {/* --- CASO 2: LOGADO COMO ADMIN --- */}
            {isLoggedIn && isAdmin ? (
                <DropdownItem key="dashboard" onClick={() => router.push("/dashboard")}>
                    Dashboard
                </DropdownItem>
            ) : null}

            {isLoggedIn && isAdmin ? (
                <DropdownItem
                    key="logout-adm"
                    className="text-red-600 data-[hover=true]:bg-red-100"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    Sair
                </DropdownItem>
            ) : null}

            {/* --- CASO 3: LOGADO COMO USUÁRIO COMUM --- */}
            {isLoggedIn && !isAdmin ? (
                <DropdownItem key="salvo" onClick={() => router.push("/salvados")}>
                        Salvados
                </DropdownItem>
            ) : null}

            {isLoggedIn && !isAdmin ? (
                <DropdownItem
                    key="logout-user"
                    className="text-red-600 data-[hover=true]:bg-red-100"
                    onClick={() => signOut({ callbackUrl: "/" })}
                >
                    Sair
                </DropdownItem>
            ) : null}

</DropdownMenu>
        </Dropdown>
    );
}

export default DropdownMenuCustom;