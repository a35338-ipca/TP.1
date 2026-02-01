
import React, { useState, useEffect, useRef } from 'react';
import { generateSecurityTip, chatWithPro, generateSecurityIllustration } from '../services/geminiService';
import { ChatMessage } from '../types';

const AILab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'chat' | 'images' | 'tips'>('chat');
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [userInput, setUserInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Image Gen State
  const [imagePrompt, setImagePrompt] = useState('');
  const [imageSize, setImageSize] = useState<"1K" | "2K" | "4K">("1K");
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  // Fast Tips State
  const [fastTip, setFastTip] = useState('');
  const [isTipLoading, setIsTipLoading] = useState(false);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  const handleSendMessage = async () => {
    if (!userInput.trim()) return;
    
    const newUserMsg: ChatMessage = { role: 'user', text: userInput };
    setChatMessages(prev => [...prev, newUserMsg]);
    setUserInput('');
    setIsChatLoading(true);

    try {
      // Map simplified history for the service
      const history = chatMessages.map(m => ({
        role: m.role,
        parts: [{ text: m.text }]
      }));
      
      const response = await chatWithPro(userInput, history);
      setChatMessages(prev => [...prev, { role: 'model', text: response || 'Desculpe, ocorreu um erro na resposta.' }]);
    } catch (err) {
      console.error(err);
      setChatMessages(prev => [...prev, { role: 'model', text: 'Erro ao conectar ao especialista. Verifique a sua ligação.' }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleGenerateImage = async () => {
    if (!imagePrompt.trim()) return;

    // Pro Image model requires key selection check usually
    const hasKey = await (window as any).aistudio?.hasSelectedApiKey();
    if (!hasKey) {
      await (window as any).aistudio?.openSelectKey();
    }

    setIsImageLoading(true);
    try {
      const url = await generateSecurityIllustration(imagePrompt, imageSize);
      setGeneratedImageUrl(url);
    } catch (err) {
      console.error(err);
      alert('Erro ao gerar imagem. Certifique-se de que selecionou a sua chave de API corretamente.');
    } finally {
      setIsImageLoading(false);
    }
  };

  const loadFastTip = async () => {
    setIsTipLoading(true);
    try {
      const tip = await generateSecurityTip();
      setFastTip(tip || '');
    } catch (err) {
      console.error(err);
      setFastTip('Não foi possível carregar a dica.');
    } finally {
      setIsTipLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Laboratório de IA CyberGuard</h1>
        <p className="text-slate-400">Experimente as nossas ferramentas de inteligência artificial avançada para cibersegurança.</p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-8">
        {[
          { id: 'chat', label: 'Especialista IA', icon: '🤖' },
          { id: 'images', label: 'Gerador Visual', icon: '🎨' },
          { id: 'tips', label: 'Dica Rápida (Flash)', icon: '⚡' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              activeTab === tab.id 
              ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/30' 
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
            }`}
          >
            <span>{tab.icon}</span>
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-slate-800 border border-slate-700 rounded-3xl shadow-xl overflow-hidden min-h-[500px] flex flex-col">
        {activeTab === 'chat' && (
          <div className="flex flex-col h-[600px]">
            <div className="flex-grow overflow-y-auto p-6 space-y-4">
              {chatMessages.length === 0 && (
                <div className="h-full flex flex-col items-center justify-center text-slate-500 space-y-4">
                  <span className="text-6xl">💬</span>
                  <p>Olá! Sou o seu assistente Pro de cibersegurança. O que deseja saber?</p>
                </div>
              )}
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-2xl ${
                    msg.role === 'user' 
                    ? 'bg-cyan-600 text-white rounded-tr-none' 
                    : 'bg-slate-700 text-slate-100 rounded-tl-none border border-slate-600'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  </div>
                </div>
              ))}
              {isChatLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-700 p-4 rounded-2xl rounded-tl-none border border-slate-600 flex space-x-2">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-700 flex space-x-2">
              <input 
                type="text" 
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Pergunte sobre segurança, phishing, firewalls..."
                className="flex-grow bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 transition-colors"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isChatLoading || !userInput.trim()}
                className="bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white px-6 py-3 rounded-xl transition-all font-bold"
              >
                Enviar
              </button>
            </div>
          </div>
        )}

        {activeTab === 'images' && (
          <div className="p-8 space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Prompt da Ilustração:</label>
                  <textarea 
                    value={imagePrompt}
                    onChange={(e) => setImagePrompt(e.target.value)}
                    placeholder="Descreva a imagem (ex: 'Um hacker encapuçado frente a um portal digital azul')..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white min-h-[120px] focus:outline-none focus:border-cyan-500"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-2">Tamanho da Imagem:</label>
                  <div className="flex space-x-4">
                    {(['1K', '2K', '4K'] as const).map(s => (
                      <button
                        key={s}
                        onClick={() => setImageSize(s)}
                        className={`flex-grow py-2 rounded-lg font-mono text-sm border transition-all ${
                          imageSize === s 
                          ? 'bg-cyan-600/20 border-cyan-500 text-cyan-400' 
                          : 'bg-slate-900 border-slate-700 text-slate-500'
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={handleGenerateImage}
                  disabled={isImageLoading || !imagePrompt.trim()}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center space-x-2"
                >
                  {isImageLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                      <span>A Gerar Obra Prima...</span>
                    </>
                  ) : (
                    <>
                      <span>🎨</span>
                      <span>Gerar com Gemini 3 Pro</span>
                    </>
                  )}
                </button>
                <p className="text-xs text-slate-500">Nota: O modelo Gemini 3 Pro Image requer a seleção da sua própria chave API paga.</p>
              </div>

              <div className="bg-slate-900 rounded-2xl border border-slate-700 aspect-video flex items-center justify-center overflow-hidden relative group">
                {generatedImageUrl ? (
                  <img src={generatedImageUrl} alt="Generated" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-slate-600 text-center space-y-2">
                    <span className="text-6xl block">🖼️</span>
                    <p className="text-sm">A sua imagem aparecerá aqui</p>
                  </div>
                )}
                {isImageLoading && (
                  <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-cyan-400 font-mono text-sm">Rendering pixels...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'tips' && (
          <div className="p-12 flex flex-col items-center justify-center space-y-8">
            <div className="w-24 h-24 bg-cyan-500/10 rounded-full flex items-center justify-center text-5xl animate-pulse">
              ⚡
            </div>
            <div className="max-w-xl text-center">
              <h3 className="text-2xl font-bold text-white mb-6">Dica de Segurança Ultra-Rápida</h3>
              <div className="bg-slate-900 p-8 rounded-3xl border border-slate-700 min-h-[150px] flex items-center justify-center shadow-inner">
                {isTipLoading ? (
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping"></div>
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping delay-75"></div>
                    <div className="w-3 h-3 bg-cyan-500 rounded-full animate-ping delay-150"></div>
                  </div>
                ) : (
                  <p className="text-xl text-slate-200 leading-relaxed">
                    {fastTip || "Clique no botão para receber uma dica instantânea do modelo Gemini Flash Lite."}
                  </p>
                )}
              </div>
            </div>
            <button 
              onClick={loadFastTip}
              disabled={isTipLoading}
              className="bg-white text-slate-900 hover:bg-slate-200 px-8 py-4 rounded-2xl font-bold transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
            >
              Gerar Nova Dica
            </button>
            <p className="text-slate-500 text-xs font-mono">Powered by gemini-2.5-flash-lite-latest</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AILab;
