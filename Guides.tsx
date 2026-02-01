
import React from 'react';
import { SecurityGuide } from '../types';

const GUIDES: SecurityGuide[] = [
  {
    id: 'g1',
    title: 'Passwords Fortes e Seguras',
    steps: [
      'Use pelo menos 12 caracteres.',
      'Combine letras, números e símbolos.',
      'Evite datas de nascimento ou nomes óbvios.',
      'Use um gestor de passwords (ex: Bitwarden ou 1Password).'
    ],
    tips: [
      'Nunca reutilize passwords em sites diferentes.',
      'Troque a password se suspeitar de uma fuga de dados.'
    ],
    image: 'https://picsum.photos/seed/lock/400/300'
  },
  {
    id: 'g2',
    title: 'Autenticação Multifator (MFA)',
    steps: [
      'Ative a verificação em duas etapas em todas as contas.',
      'Prefira apps de autenticação (Authy, Google Auth) a SMS.',
      'Guarde os códigos de recuperação em local seguro (físico).',
      'Use chaves físicas (YubiKey) para segurança máxima.'
    ],
    tips: [
      'O MFA impede 99% dos ataques de roubo de conta.'
    ],
    image: 'https://picsum.photos/seed/shield/400/300'
  },
  {
    id: 'g3',
    title: 'Segurança em Redes Wi-Fi',
    steps: [
      'Altere a password de admin do seu router doméstico.',
      'Mantenha o firmware do router atualizado.',
      'Crie uma rede "Guest" para visitas.',
      'Use uma VPN em redes Wi-Fi públicas.'
    ],
    tips: [
      'Redes Wi-Fi abertas são "minas de ouro" para hackers.'
    ],
    image: 'https://picsum.photos/seed/wifi/400/300'
  }
];

const Guides: React.FC = () => {
  return (
    <div className="animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Guias de Boas Práticas</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Passos simples que fazem toda a diferença na sua proteção diária. Implemente estas medidas hoje mesmo.
        </p>
      </div>

      <div className="space-y-12">
        {GUIDES.map((guide, idx) => (
          <div key={guide.id} className={`flex flex-col lg:flex-row gap-12 items-center ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
            <div className="flex-1 w-full">
              <div className="relative group overflow-hidden rounded-3xl border border-slate-700 aspect-video lg:aspect-square">
                <img 
                  src={guide.image} 
                  alt={guide.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              </div>
            </div>
            
            <div className="flex-1 space-y-8">
              <div>
                <span className="text-cyan-500 font-mono text-lg mb-2 block">Guia 0{idx + 1}</span>
                <h2 className="text-3xl font-bold text-white">{guide.title}</h2>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-300 uppercase tracking-widest">Passos a seguir:</h3>
                <ul className="space-y-3">
                  {guide.steps.map((step, i) => (
                    <li key={i} className="flex items-start space-x-3">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-500 flex-shrink-0"></div>
                      <span className="text-slate-300 leading-relaxed">{step}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-cyan-500/5 border border-cyan-500/20 rounded-2xl">
                <p className="text-cyan-400 text-sm italic">
                  <strong>💡 Dica Pro:</strong> {guide.tips[0]}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Guides;
