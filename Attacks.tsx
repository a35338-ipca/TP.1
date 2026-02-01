
import React from 'react';
import { AttackType } from '../types';

const ATTACKS_DATA: AttackType[] = [
  {
    id: '1',
    title: 'Phishing',
    description: 'A forma mais comum de ataque. O atacante faz-se passar por uma entidade legítima (banco, CTT, colega) via email ou SMS para roubar credenciais ou dados.',
    prevention: 'Verifique sempre o remetente, não clique em links suspeitos e nunca partilhe passwords por mensagem.',
    severity: 'High',
    icon: '🎣'
  },
  {
    id: '2',
    title: 'Ransomware',
    description: 'Software malicioso que sequestra (encripta) os seus ficheiros e exige um resgate (normalmente em criptomoedas) para os libertar.',
    prevention: 'Mantenha backups offline regulares e software de segurança atualizado.',
    severity: 'Critical',
    icon: '💰'
  },
  {
    id: '3',
    title: 'DDoS',
    description: 'Distributed Denial of Service. Inunda um site com tráfego falso até que este fique indisponível para utilizadores reais.',
    prevention: 'Utilize serviços de proteção de rede e firewalls de aplicações web (WAF).',
    severity: 'Medium',
    icon: '🌊'
  },
  {
    id: '4',
    title: 'Malware',
    description: 'Termo geral para vírus, trojans e worms desenhados para danificar, espiar ou ganhar acesso não autorizado a um sistema.',
    prevention: 'Instale um bom antivírus e evite descarregar ficheiros de fontes desconhecidas.',
    severity: 'High',
    icon: '🦠'
  },
  {
    id: '5',
    title: 'Man-in-the-Middle',
    description: 'O atacante intercepta a comunicação entre duas partes sem que elas saibam, podendo ler ou alterar a informação.',
    prevention: 'Use sempre HTTPS e evite Wi-Fi públicos para transações sensíveis sem VPN.',
    severity: 'High',
    icon: '🕵️'
  },
  {
    id: '6',
    title: 'Engenharia Social',
    description: 'Manipulação psicológica de pessoas para que estas divulguem informações confidenciais ou realizem certas ações.',
    prevention: 'Seja cético em relação a pedidos urgentes ou invulgares, mesmo que pareçam vir de conhecidos.',
    severity: 'Critical',
    icon: '🧠'
  }
];

const Attacks: React.FC = () => {
  return (
    <div className="animate-in slide-in-from-bottom duration-500">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-4">Catálogo de Ameaças</h1>
        <p className="text-slate-400 max-w-2xl mx-auto">
          Conhecer o inimigo é o primeiro passo para a defesa. Explore os métodos mais comuns utilizados por cibercriminosos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ATTACKS_DATA.map((attack) => (
          <div key={attack.id} className="bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-900/10 transition-all flex flex-col h-full">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl">{attack.icon}</span>
                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${
                  attack.severity === 'Critical' ? 'bg-red-500/10 text-red-500 border border-red-500/20' :
                  attack.severity === 'High' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' :
                  'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                }`}>
                  {attack.severity}
                </span>
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">{attack.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                {attack.description}
              </p>
            </div>
            <div className="p-6 bg-slate-900/50 border-t border-slate-700 mt-auto">
              <h4 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-2">Como prevenir:</h4>
              <p className="text-slate-300 text-xs italic leading-relaxed">
                {attack.prevention}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Attacks;
