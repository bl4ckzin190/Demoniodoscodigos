import React, { useState } from 'react';
import { Code, Settings, Upload } from 'lucide-react';

const CodeGamePart1 = () => {
  const [view, setView] = useState('home');
  const [bgImage, setBgImage] = useState('');

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setBgImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const cardColors = {
    blue: { name: 'AZUL', color: '#00a8ff', glow: '0 0 20px #00a8ff' },
    red: { name: 'VERMELHO', color: '#ff3838', glow: '0 0 20px #ff3838' },
    purple: { name: 'ROXO', color: '#a55eea', glow: '0 0 20px #a55eea' }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" 
         style={{
           backgroundImage: bgImage ? `url(${bgImage})` : 'none',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      
      {/* Grid animado de fundo */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `
          linear-gradient(rgba(255,56,56,0.3) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,56,56,0.3) 1px, transparent 1px)
        `,
        backgroundSize: '50px 50px',
        animation: 'gridMove 20s linear infinite'
      }}></div>

      {/* Partículas flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div key={i} 
               className="absolute rounded-full"
               style={{
                 width: `${2 + Math.random() * 3}px`,
                 height: `${2 + Math.random() * 3}px`,
                 backgroundColor: i % 3 === 0 ? '#ff3838' : i % 3 === 1 ? '#a55eea' : '#00a8ff',
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 100}%`,
                 animation: `float ${5 + Math.random() * 10}s ease-in-out infinite`,
                 animationDelay: `${Math.random() * 5}s`,
                 boxShadow: '0 0 10px currentColor'
               }}></div>
        ))}
      </div>

      {/* Overlay escuro para melhor legibilidade */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Conteúdo Principal */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="mb-12 flex justify-between items-center border-b border-red-900 pb-6">
          <div className="flex items-center gap-4">
            <Code className="w-12 h-12 text-red-500 animate-pulse" 
                  style={{ filter: 'drop-shadow(0 0 15px #ff3838)' }} />
            <div>
              <h1 className="text-5xl font-bold tracking-wider" 
                  style={{
                    textShadow: '0 0 20px #ff3838, 0 0 40px #a55eea',
                    fontFamily: 'monospace'
                  }}>
                DECODE_SYSTEM
              </h1>
              <p className="text-red-500 text-sm tracking-widest mt-1">v1.0.0 | OPERATIONAL</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload}
              className="hidden" 
              id="bgUpload"
            />
            <label htmlFor="bgUpload" 
                   className="px-5 py-3 bg-gray-900 border-2 border-red-500 rounded-lg cursor-pointer hover:bg-red-950 transition-all flex items-center gap-2"
                   style={{ boxShadow: '0 0 10px rgba(255,56,56,0.3)' }}>
              <Upload className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wider">BACKGROUND</span>
            </label>
            
            <button onClick={() => setView('admin')} 
                    className="px-5 py-3 bg-gray-900 border-2 border-purple-500 rounded-lg hover:bg-purple-950 transition-all flex items-center gap-2"
                    style={{ boxShadow: '0 0 10px rgba(165,94,234,0.3)' }}>
              <Settings className="w-4 h-4" />
              <span className="text-sm font-bold tracking-wider">ADMIN</span>
            </button>
          </div>
        </header>

        {/* Home View */}
        {view === 'home' && (
          <div className="max-w-5xl mx-auto">
            
            {/* Banner Principal */}
            <div className="bg-black border-2 border-red-500 rounded-lg p-10 mb-8 relative overflow-hidden"
                 style={{ boxShadow: '0 0 40px rgba(255,56,56,0.4)' }}>
              
              {/* Efeito de linhas de código no fundo */}
              <div className="absolute inset-0 opacity-5 text-xs font-mono overflow-hidden">
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="whitespace-nowrap">
                    {`function decode() { return ${Math.random().toString(36)} }`}
                  </div>
                ))}
              </div>

              <div className="relative z-10">
                <h2 className="text-4xl font-bold mb-6 text-center tracking-wider" 
                    style={{ textShadow: '0 0 20px #ff3838' }}>
                  SISTEMA DE DECODIFICAÇÃO ATIVO
                </h2>
                
                <div className="h-1 w-32 bg-gradient-to-r from-red-500 via-purple-500 to-red-500 mx-auto mb-8"></div>

                <div className="space-y-5 text-gray-300 mb-10">
                  <div className="flex items-start gap-4 bg-gray-900 bg-opacity-50 p-4 rounded border-l-4 border-red-500">
                    <span className="text-red-500 font-bold text-xl">01</span>
                    <p className="text-lg">Escaneie os QR Codes dos cards coloridos para acessar o banco de questões</p>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-gray-900 bg-opacity-50 p-4 rounded border-l-4 border-purple-500">
                    <span className="text-purple-500 font-bold text-xl">02</span>
                    <p className="text-lg">Responda corretamente para revelar símbolos da codificação</p>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-gray-900 bg-opacity-50 p-4 rounded border-l-4 border-blue-500">
                    <span className="text-blue-500 font-bold text-xl">03</span>
                    <p className="text-lg">Decodifique a mensagem e insira a senha no terminal final</p>
                  </div>
                  
                  <div className="flex items-start gap-4 bg-gray-900 bg-opacity-50 p-4 rounded border-l-4 border-green-500">
                    <span className="text-green-500 font-bold text-xl">04</span>
                    <p className="text-lg">Complete o desafio final em 20 minutos para entrar no ranking</p>
                  </div>
                </div>

                {/* Tipos de Cards */}
                <h3 className="text-2xl font-bold text-center mb-6 text-red-500">
                  TIPOS DE CODIFICAÇÃO
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(cardColors).map(([key, data]) => (
                    <div key={key} 
                         className="bg-gray-900 bg-opacity-80 border-2 rounded-lg p-6 hover:scale-105 transition-all cursor-pointer relative overflow-hidden group"
                         style={{ 
                           borderColor: data.color, 
                           boxShadow: data.glow 
                         }}>
                      
                      {/* Efeito hover */}
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                           style={{ backgroundColor: data.color }}></div>
                      
                      <div className="relative z-10 text-center">
                        <div className="w-20 h-20 mx-auto mb-4 rounded-full border-4 flex items-center justify-center"
                             style={{ 
                               borderColor: data.color,
                               boxShadow: `inset 0 0 20px ${data.color}` 
                             }}>
                          <span className="text-3xl font-bold" style={{ color: data.color }}>
                            {key.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        
                        <p className="font-bold text-xl tracking-wider mb-2" style={{ color: data.color }}>
                          {data.name}
                        </p>
                        
                        <p className="text-gray-400 text-sm">
                          Sistema de codificação {data.name.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Botão de Iniciar */}
            <div className="text-center">
              <button className="px-12 py-5 bg-gradient-to-r from-red-600 to-purple-600 rounded-lg text-2xl font-bold tracking-wider hover:scale-105 transition-all border-2 border-red-400"
                      style={{ boxShadow: '0 0 30px rgba(255,56,56,0.6)' }}
                      onClick={() => alert('Sistema pronto! Próximas partes: Scanner QR, Questões, Decoder...')}>
                INICIAR DECODIFICAÇÃO
              </button>
            </div>
          </div>
        )}

      </div>

      {/* Animações CSS */}
      <style>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
          50% { transform: translateY(-20px) translateX(10px); opacity: 0.6; }
        }
      `}</style>
    </div>
  );
};

export default CodeGamePart1;
