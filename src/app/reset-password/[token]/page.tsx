'use client'

import { redifinirSenha } from '@/app/actions';
import { useState, use } from 'react'; // 👈 importar use
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

export default function ResetPasswordPage({
  params,
}: {
  params: Promise<{ token: string }>; // 👈 agora é Promise
}) {
  const { token } = use(params); // 👈 CORREÇÃO AQUI

  const [status, setStatus] = useState<{ error?: string; success?: string }>({});

  const actionWithToken = redifinirSenha.bind(null, token);

  async function handleAction(formData: FormData) {
    setStatus({});
    const result = await actionWithToken(formData);

    if (result?.error) {
      setStatus({ error: result.error });
    }

    if (result?.success) {
      setStatus({ success: result.success });
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden">
      
      {/* Background (Parede de Tijolos + Overlay) */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1453856908920-432d43232128?q=80&w=2067&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-blue-950/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Efeito de Luz Superior */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-yellow-200/40 via-blue-900/0 to-transparent z-10 pointer-events-none" />
      
      {/* Card de Vidro */}
      <div className="z-20 w-full max-w-md p-8 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md shadow-2xl relative">
        
        {/* Brilho no topo do card */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-white/30 blur-sm rounded-full" />

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-md">
            Redefina sua senha
          </h1>
        </div>

        {status.error && (
          <Alert variant="destructive" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{status.error}</AlertDescription>
          </Alert>
        )}

        {status.success && (
          <Alert className="mb-4">
            <AlertDescription>{status.success}</AlertDescription>
          </Alert>
        )}

        <form action={handleAction} className="space-y-6">
        <div className="relative group">
          <Input
            name="newPassword"
            type="password"
            placeholder="Nova Senha"
            required
            className="h-12 pl-6 pr-10 rounded-full bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus-visible:ring-offset-0 focus-visible:ring-white/50 focus-visible:border-white transition-all hover:bg-white/10"
            />
          
          </div>
          <Input
            name="confirmPassword"
            type="password"
            placeholder="Confirme a Nova Senha"
            required
            className="h-12 pl-6 pr-10 rounded-full bg-white/5 border-white/30 text-white placeholder:text-gray-300 focus-visible:ring-offset-0 focus-visible:ring-white/50 focus-visible:border-white transition-all hover:bg-white/10"
          />
         
          <Button className="w-full h-12 rounded-full bg-white text-slate-900 hover:bg-gray-100 font-bold text-lg shadow-lg transition-transform hover:scale-[1.02]">
            Redefinir Senha
          </Button>
        </form>
      </div>
    </div>
  );
}