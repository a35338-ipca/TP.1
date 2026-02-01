
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl">🛡️</span>
              <span className="text-xl font-bold text-white">CyberGuard<span className="text-cyan-500">PT</span></span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              O seu portal de confiança para educação em cibersegurança em Portugal. Proteja a sua vida digital com conhecimento.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">Recursos Úteis</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="https://www.cncs.gov.pt/" target="_blank" className="hover:text-cyan-400 transition-colors">Centro Nacional de Cibersegurança</a></li>
              <li><a href="https://www.internetsegura.pt/" target="_blank" className="hover:text-cyan-400 transition-colors">Internet Segura</a></li>
              <li><a href="https://www.policiajudiciaria.pt/" target="_blank" className="hover:text-cyan-400 transition-colors">Polícia Judiciária (UNC3T)</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Apoio Técnico</h4>
            <p className="text-slate-400 text-sm">
              Desenvolvido para fins educativos. Em caso de incidente, contacte as autoridades competentes.
            </p>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs">
          <p>© 2024 CyberGuard Portugal. Todos os direitos reservados.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <button className="hover:text-slate-300">Privacidade</button>
            <button className="hover:text-slate-300">Termos de Uso</button>
            <button className="hover:text-slate-300">Contactos</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
