
import React from 'react';
import { Page } from '../types';

interface HomeProps {
  onNavigate: (page: Page) => void;
}

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="space-y-20 animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative py-12 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="relative text-center max-w-4xl mx-auto px-4">
          <span className="inline-block py-1 px-3 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-6 tracking-wider uppercase">
            Educação & Prevenção Digital
          </span>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Navegue com <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Confiança</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Aprenda a proteger os seus dados, dispositivos e identidade num mundo cada vez mais conectado. Guia completo sobre cibersegurança em Portugal.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={() => onNavigate(Page.Guides)}
              className="w-full sm:w-auto px-8 py-4 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/20 hover:scale-105"
            >
              Começar a Aprender
            </button>
            <button 
              onClick={() => onNavigate(Page.Attacks)}
              className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition-all border border-slate-700 hover:scale-105"
            >
              Ver Tipos de Ataques
            </button>
          </div>
        </div>
      </section>

      {/* Main Concepts - CIA Triad */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-16">Conceitos Fundamentais</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Confidencialidade",
              description: "Garantir que os dados só são acessíveis a quem tem autorização. Proteção contra acessos não autorizados.",
              icon: "🔒"
            },
            {
              title: "Integridade",
              description: "Assegurar que a informação se mantém exata e não é alterada ou corrompida durante o armazenamento ou transporte.",
              icon: "💎"
            },
            {
              title: "Disponibilidade",
              description: "Garantir que os sistemas e dados estão prontos a ser usados sempre que necessário pelos utilizadores autorizados.",
              icon: "⚡"
            }
          ].map((item, idx) => (
            <div key={idx} className="bg-slate-800/50 border border-slate-700 p-8 rounded-2xl hover:border-cyan-500/50 transition-colors group">
              <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
              <h3 className="text-xl font-bold mb-4 text-white">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why it matters */}
      <section className="bg-slate-800/30 rounded-3xl p-8 md:p-16 border border-slate-800">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-bold text-white">Por que é Importante?</h2>
            <p className="text-slate-400 leading-relaxed">
              Em Portugal, os ciberataques têm aumentado exponencialmente. Desde o roubo de identidade até ao ransomware em grandes instituições, ninguém está totalmente imune.
            </p>
            <ul className="space-y-4">
              {[
                "Proteção de dados bancários e financeiros",
                "Preservação da privacidade pessoal",
                "Segurança das infraestruturas críticas",
                "Continuidade de negócios e serviços públicos"
              ].map((point, i) => (
                <li key={i} className="flex items-center space-x-3 text-slate-300">
                  <span className="text-cyan-500 font-bold">✓</span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex-1 w-full h-64 md:h-96 rounded-2xl bg-gradient-to-br from-cyan-900/20 to-blue-900/20 flex items-center justify-center overflow-hidden border border-cyan-500/20">
            <img 
              src="https://picsum.photos/seed/cyber/800/600" 
              alt="Cybersecurity abstraction" 
              className="w-full h-full object-cover opacity-60 mix-blend-overlay"
            />
            <div className="absolute flex flex-col items-center">
              <span className="text-6xl mb-4">🛡️</span>
              <span className="font-mono text-cyan-500 animate-pulse">Scanning Threats...</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
