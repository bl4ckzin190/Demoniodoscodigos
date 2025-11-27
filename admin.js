import React, { useState, useEffect } from 'react';
import { Code, Settings, Upload, Lock, Unlock, Plus, Trash2, Save, Eye, EyeOff, Database, QrCode, Award } from 'lucide-react';

const CodeGamePart2 = () => {
  const [view, setView] = useState('home');
  const [bgImage, setBgImage] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // Estados do Admin
  const [questions, setQuestions] = useState([]);
  const [passwords, setPasswords] = useState([]);
  const [finalChallenge, setFinalChallenge] = useState(null);
  const [notification, setNotification] = useState(null);
  
  // Form states
  const [newQuestion, setNewQuestion] = useState({
    type: 'blue',
    question: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    isBonus: false,
    decoded: { letter: '', symbol: '' }
  });
  
  const [newPassword, setNewPassword] = useState({
    type: 'blue',
    text: '',
    encoded: ''
  });
  
  const [newFinalChallenge, setNewFinalChallenge] = useState({
    question: '',
    description: '',
    options: ['', '', '', ''],
    correctAnswer: 0,
    decoded: {}
  });

  const ADMIN_PASS = 'admin123';

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [questionsData, passwordsData, challengeData] = await Promise.all([
        window.storage.get('questions').catch(() => null),
        window.storage.get('passwords').catch(() => null),
        window.storage.get('finalChallenge').catch(() => null)
      ]);

      if (questionsData) setQuestions(JSON.parse(questionsData.value));
      if (passwordsData) setPasswords(JSON.parse(passwordsData.value));
      if (challengeData) setFinalChallenge(JSON.parse(challengeData.value));
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    }
  };

  const saveData = async (key, data) => {
    try {
      await window.storage.set(key, JSON.stringify(data));
      showNotification('Dados salvos com sucesso', 'success');
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      showNotification('Erro ao salvar dados', 'error');
    }
  };

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => setBgImage(event.target.result);
      reader.readAsDataURL(file);
    }
  };

  const adminLogin = () => {
    if (adminPassword === ADMIN_PASS) {
      setIsAdmin(true);
      setView('admin');
      showNotification('Login admin realizado com sucesso', 'success');
    } else {
      showNotification('Senha incorreta', 'error');
    }
    setAdminPassword('');
  };

  const addQuestion = () => {
    if (!newQuestion.question || newQuestion.options.some(opt => !opt)) {
      showNotification('Preencha todos os campos da questão', 'error');
      return;
    }
    
    const questionToAdd = {
      ...newQuestion,
      id: Date.now().toString()
    };
    
    const updatedQuestions = [...questions, questionToAdd];
    setQuestions(updatedQuestions);
    saveData('questions', updatedQuestions);
    
    setNewQuestion({
      type: 'blue',
      question: '',
      options: ['', '', '', ''],
      correctAnswer: 0,
      isBonus: false,
      decoded: { letter: '', symbol: '' }
    });
  };

  const deleteQuestion = (id) => {
    const updatedQuestions = questions.filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    saveData('questions', updatedQuestions);
  };

  const addPassword = () => {
    if (!newPassword.text || !newPassword.encoded) {
      showNotification('Preencha texto e versão codificada', 'error');
      return;
    }
    
    const updatedPasswords = [...passwords, { ...newPassword, id: Date.now().toString() }];
    setPasswords(updatedPasswords);
    saveData('passwords', updatedPasswords);
    
    setNewPassword({
      type: 'blue',
      text: '',
      encoded: ''
    });
  };

  const deletePassword = (id) => {
    const updatedPasswords = passwords.filter(p => p.id !== id);
    setPasswords(updatedPasswords);
    saveData('passwords', updatedPasswords);
  };

  const saveFinalChallenge = () => {
    if (!newFinalChallenge.question || newFinalChallenge.options.some(opt => !opt)) {
      showNotification('Preencha todos os campos do desafio', 'error');
      return;
    }
    
    setFinalChallenge(newFinalChallenge);
    saveData('finalChallenge', newFinalChallenge);
  };

  const cardColors = {
    blue: { name: 'AZUL', color: '#00a8ff' },
    red: { name: 'VERMELHO', color: '#ff3838' },
    purple: { name: 'ROXO', color: '#a55eea' },
    green: { name: 'VERDE', color: '#00ff00' }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden" 
         style={{
           backgroundImage: bgImage ? `url(${bgImage})` : 'none',
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundAttachment: 'fixed'
         }}>
      
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(255,56,56,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,56,56,0.3) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>

      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      {/* Notificação */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg border-2 animate-pulse ${
          notification.type === 'success' ? 'bg-green-900 bg-opacity-90 border-green-500' :
          notification.type === 'error' ? 'bg-red-900 bg-opacity-90 border-red-500' :
          'bg-purple-900 bg-opacity-90 border-purple-500'
        }`} style={{ boxShadow: '0 0 20px currentColor' }}>
          {notification.message}
        </div>
      )}

      <div className="relative z-10 container mx-auto px-4 py-8">
        
        {/* Header */}
        <header className="mb-8 flex justify-between items-center border-b border-red-900 pb-6">
          <div className="flex items-center gap-4">
            <Code className="w-12 h-12 text-red-500" style={{ filter: 'drop-shadow(0 0 15px #ff3838)' }} />
            <div>
              <h1 className="text-4xl font-bold tracking-wider" style={{ textShadow: '0 0 20px #ff3838', fontFamily: 'monospace' }}>
                DECODE_SYSTEM
              </h1>
              <p className="text-red-500 text-sm tracking-widest">ADMIN PANEL</p>
            </div>
          </div>
          
          <div className="flex gap-3">
            <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" id="bgUpload" />
            <label htmlFor="bgUpload" className="px-4 py-2 bg-gray-900 border-2 border-red-500 rounded cursor-pointer hover:bg-red-950 transition-all flex items-center gap-2">
              <Upload className="w-4 h-4" />
              BG
            </label>
            
            {isAdmin && (
              <button onClick={() => setView(view === 'home' ? 'admin' : 'home')} 
                      className="px-4 py-2 bg-gray-900 border-2 border-purple-500 rounded hover:bg-purple-950 transition-all">
                {view === 'home' ? 'ADMIN' : 'HOME'}
              </button>
            )}
          </div>
        </header>

        {/* Login Admin */}
        {!isAdmin && view === 'home' && (
          <div className="max-w-md mx-auto">
            <div className="bg-black bg-opacity-90 border-2 border-purple-500 rounded-lg p-8" style={{ boxShadow: '0 0 30px rgba(165,94,234,0.4)' }}>
              <div className="text-center mb-6">
                <Lock className="w-16 h-16 mx-auto mb-4 text-purple-500" style={{ filter: 'drop-shadow(0 0 10px #a55eea)' }} />
                <h2 className="text-3xl font-bold text-purple-500">ACESSO RESTRITO</h2>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                  <input 
                    type={showPassword ? "text" : "password"}
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && adminLogin()}
                    placeholder="Senha do administrador"
                    className="w-full px-4 py-3 bg-gray-900 border-2 border-purple-500 rounded text-white placeholder-gray-500 focus:outline-none focus:border-purple-400"
                  />
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-purple-500 hover:text-purple-400">
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                <button 
                  onClick={adminLogin}
                  className="w-full px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all border-2 border-purple-400"
                  style={{ boxShadow: '0 0 20px rgba(165,94,234,0.5)' }}>
                  <Unlock className="w-5 h-5 inline mr-2" />
                  ACESSAR PAINEL
                </button>
              </div>
              
              <p className="text-gray-500 text-sm text-center mt-6">
                Senha padrão: admin123
              </p>
            </div>
          </div>
        )}

        {/* Painel Admin */}
        {isAdmin && view === 'admin' && (
          <div className="max-w-7xl mx-auto">
            
            {/* Menu de Tabs */}
            <div className="flex gap-4 mb-8 border-b border-red-900 pb-4">
              <button 
                onClick={() => setView('admin-questions')}
                className="px-6 py-3 bg-gray-900 border-2 border-blue-500 rounded-lg hover:bg-blue-950 transition-all flex items-center gap-2">
                <Database className="w-5 h-5" />
                QUESTÕES
              </button>
              
              <button 
                onClick={() => setView('admin-passwords')}
                className="px-6 py-3 bg-gray-900 border-2 border-red-500 rounded-lg hover:bg-red-950 transition-all flex items-center gap-2">
                <Lock className="w-5 h-5" />
                SENHAS
              </button>
              
              <button 
                onClick={() => setView('admin-final')}
                className="px-6 py-3 bg-gray-900 border-2 border-green-500 rounded-lg hover:bg-green-950 transition-all flex items-center gap-2">
                <Award className="w-5 h-5" />
                DESAFIO FINAL
              </button>
              
              <button 
                onClick={() => setView('admin-qr')}
                className="px-6 py-3 bg-gray-900 border-2 border-purple-500 rounded-lg hover:bg-purple-950 transition-all flex items-center gap-2">
                <QrCode className="w-5 h-5" />
                QR CODES
              </button>
            </div>

            {/* Gerenciar Questões */}
            {view === 'admin-questions' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Formulário */}
                <div className="bg-black bg-opacity-90 border-2 border-blue-500 rounded-lg p-6" style={{ boxShadow: '0 0 20px rgba(0,168,255,0.3)' }}>
                  <h3 className="text-2xl font-bold mb-6 text-blue-500 flex items-center gap-2">
                    <Plus className="w-6 h-6" />
                    NOVA QUESTÃO
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">TIPO DE CARD</label>
                      <select 
                        value={newQuestion.type}
                        onChange={(e) => setNewQuestion({...newQuestion, type: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-blue-500">
                        {Object.entries(cardColors).filter(([key]) => key !== 'green').map(([key, data]) => (
                          <option key={key} value={key}>{data.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">PERGUNTA</label>
                      <textarea 
                        value={newQuestion.question}
                        onChange={(e) => setNewQuestion({...newQuestion, question: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-blue-500 h-24"
                        placeholder="Digite a questão aqui..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">OPÇÕES DE RESPOSTA</label>
                      {newQuestion.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <input 
                            type="radio"
                            checked={newQuestion.correctAnswer === idx}
                            onChange={() => setNewQuestion({...newQuestion, correctAnswer: idx})}
                            className="w-4 h-4"
                          />
                          <input 
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...newQuestion.options];
                              newOpts[idx] = e.target.value;
                              setNewQuestion({...newQuestion, options: newOpts});
                            }}
                            className="flex-1 px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-blue-500"
                            placeholder={`Opção ${idx + 1}`}
                          />
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 mt-2">Selecione a opção correta com o botão de rádio</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-400">LETRA</label>
                        <input 
                          value={newQuestion.decoded.letter}
                          onChange={(e) => setNewQuestion({...newQuestion, decoded: {...newQuestion.decoded, letter: e.target.value.toUpperCase()}})}
                          className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-blue-500 text-center text-2xl"
                          maxLength={1}
                          placeholder="A"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-bold mb-2 text-gray-400">SÍMBOLO</label>
                        <input 
                          value={newQuestion.decoded.symbol}
                          onChange={(e) => setNewQuestion({...newQuestion, decoded: {...newQuestion.decoded, symbol: e.target.value}})}
                          className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-blue-500 text-center text-2xl"
                          maxLength={1}
                          placeholder="#"
                        />
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        checked={newQuestion.isBonus}
                        onChange={(e) => setNewQuestion({...newQuestion, isBonus: e.target.checked})}
                        className="w-5 h-5"
                      />
                      <label className="text-sm font-bold text-yellow-500">QUESTÃO BÔNUS (Resposta grátis)</label>
                    </div>
                    
                    <button 
                      onClick={addQuestion}
                      className="w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-bold transition-all border-2 border-blue-400 flex items-center justify-center gap-2"
                      style={{ boxShadow: '0 0 20px rgba(0,168,255,0.5)' }}>
                      <Save className="w-5 h-5" />
                      ADICIONAR QUESTÃO
                    </button>
                  </div>
                </div>
                
                {/* Lista de Questões */}
                <div className="bg-black bg-opacity-90 border-2 border-blue-500 rounded-lg p-6" style={{ boxShadow: '0 0 20px rgba(0,168,255,0.3)' }}>
                  <h3 className="text-2xl font-bold mb-6 text-blue-500">
                    QUESTÕES CADASTRADAS ({questions.length})
                  </h3>
                  
                  <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                    {questions.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Nenhuma questão cadastrada</p>
                    ) : (
                      questions.map(q => (
                        <div key={q.id} className="bg-gray-900 border-2 rounded-lg p-4"
                             style={{ borderColor: cardColors[q.type].color }}>
                          <div className="flex justify-between items-start mb-2">
                            <span className="px-3 py-1 rounded text-sm font-bold"
                                  style={{ backgroundColor: cardColors[q.type].color, color: 'black' }}>
                              {cardColors[q.type].name}
                            </span>
                            {q.isBonus && (
                              <span className="px-3 py-1 bg-yellow-600 rounded text-sm font-bold">BÔNUS</span>
                            )}
                            <button 
                              onClick={() => deleteQuestion(q.id)}
                              className="text-red-500 hover:text-red-400">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <p className="text-white mb-3">{q.question}</p>
                          
                          <div className="space-y-1 mb-3">
                            {q.options.map((opt, idx) => (
                              <div key={idx} className={`text-sm px-2 py-1 rounded ${idx === q.correctAnswer ? 'bg-green-900 text-green-300' : 'text-gray-400'}`}>
                                {idx + 1}. {opt} {idx === q.correctAnswer && '✓'}
                              </div>
                            ))}
                          </div>
                          
                          <div className="flex gap-4 text-sm">
                            <span className="text-gray-400">Decodificação:</span>
                            <span className="font-bold">{q.decoded.letter} = {q.decoded.symbol}</span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Gerenciar Senhas */}
            {view === 'admin-passwords' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Formulário */}
                <div className="bg-black bg-opacity-90 border-2 border-red-500 rounded-lg p-6" style={{ boxShadow: '0 0 20px rgba(255,56,56,0.3)' }}>
                  <h3 className="text-2xl font-bold mb-6 text-red-500 flex items-center gap-2">
                    <Plus className="w-6 h-6" />
                    NOVA SENHA
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">TIPO</label>
                      <select 
                        value={newPassword.type}
                        onChange={(e) => setNewPassword({...newPassword, type: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-red-500">
                        {Object.entries(cardColors).filter(([key]) => key !== 'green').map(([key, data]) => (
                          <option key={key} value={key}>{data.name}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">FRASE DECODIFICADA</label>
                      <input 
                        value={newPassword.text}
                        onChange={(e) => setNewPassword({...newPassword, text: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-red-500"
                        placeholder="Ex: ACESSO LIBERADO"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">FRASE CODIFICADA</label>
                      <input 
                        value={newPassword.encoded}
                        onChange={(e) => setNewPassword({...newPassword, encoded: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-red-500"
                        placeholder="Ex: #C3$$0 L1B3R#D0"
                      />
                    </div>
                    
                    <button 
                      onClick={addPassword}
                      className="w-full px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold transition-all border-2 border-red-400 flex items-center justify-center gap-2"
                      style={{ boxShadow: '0 0 20px rgba(255,56,56,0.5)' }}>
                      <Save className="w-5 h-5" />
                      ADICIONAR SENHA
                    </button>
                  </div>
                </div>
                
                {/* Lista de Senhas */}
                <div className="bg-black bg-opacity-90 border-2 border-red-500 rounded-lg p-6" style={{ boxShadow: '0 0 20px rgba(255,56,56,0.3)' }}>
                  <h3 className="text-2xl font-bold mb-6 text-red-500">
                    SENHAS CADASTRADAS ({passwords.length})
                  </h3>
                  
                  <div className="space-y-4">
                    {passwords.length === 0 ? (
                      <p className="text-gray-500 text-center py-8">Nenhuma senha cadastrada</p>
                    ) : (
                      passwords.map(p => (
                        <div key={p.id} className="bg-gray-900 border-2 rounded-lg p-4"
                             style={{ borderColor: cardColors[p.type].color }}>
                          <div className="flex justify-between items-start mb-3">
                            <span className="px-3 py-1 rounded text-sm font-bold"
                                  style={{ backgroundColor: cardColors[p.type].color, color: 'black' }}>
                              {cardColors[p.type].name}
                            </span>
                            <button 
                              onClick={() => deletePassword(p.id)}
                              className="text-red-500 hover:text-red-400">
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                          
                          <div className="space-y-2">
                            <div>
                              <span className="text-gray-400 text-sm">Decodificada:</span>
                              <p className="text-white font-bold text-lg">{p.text}</p>
                            </div>
                            <div>
                              <span className="text-gray-400 text-sm">Codificada:</span>
                              <p className="text-green-400 font-mono text-lg">{p.encoded}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Gerenciar Desafio Final */}
            {view === 'admin-final' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-black bg-opacity-90 border-2 border-green-500 rounded-lg p-6" style={{ boxShadow: '0 0 20px rgba(0,255,0,0.3)' }}>
                  <h3 className="text-2xl font-bold mb-6 text-green-500 flex items-center gap-2">
                    <Award className="w-6 h-6" />
                    CONFIGURAR DESAFIO FINAL
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">TÍTULO DO DESAFIO</label>
                      <input 
                        value={newFinalChallenge.question}
                        onChange={(e) => setNewFinalChallenge({...newFinalChallenge, question: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-green-500"
                        placeholder="Ex: ACESSO AO NÚCLEO CENTRAL"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">DESCRIÇÃO</label>
                      <textarea 
                        value={newFinalChallenge.description}
                        onChange={(e) => setNewFinalChallenge({...newFinalChallenge, description: e.target.value})}
                        className="w-full px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-green-500 h-24"
                        placeholder="Descrição do desafio final..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-bold mb-2 text-gray-400">OPÇÕES DE RESPOSTA</label>
                      {newFinalChallenge.options.map((opt, idx) => (
                        <div key={idx} className="flex items-center gap-2 mb-2">
                          <input 
                            type="radio"
                            checked={newFinalChallenge.correctAnswer === idx}
                            onChange={() => setNewFinalChallenge({...newFinalChallenge, correctAnswer: idx})}
                            className="w-4 h-4"
                          />
                          <input 
                            value={opt}
                            onChange={(e) => {
                              const newOpts = [...newFinalChallenge.options];
                              newOpts[idx] = e.target.value;
                              setNewFinalChallenge({...newFinalChallenge, options: newOpts});
                            }}
                            className="flex-1 px-4 py-2 bg-gray-900 border-2 border-gray-700 rounded text-white focus:outline-none focus:border-green-500"
                            placeholder={`Opção ${idx + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    
                    <button 
                      onClick={saveFinalChallenge}
                      className="w-full px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-bold transition-all border-2 border-green-400 flex items-center justify-center gap-2"
                      style={{ boxShadow: '0 0 20px rgba(0,255,0,0.5)' }}>
                      <Save className="w-5 h-5" />
                      SALVAR DESAFIO FINAL
                    </button>
                  </div>
                  
                  {finalChallenge && (
                    <div className="mt-6 p-4 bg-gray-900 border-2 border-green-500 rounded">
                      <h4 className="text-green-500 font-bold mb-2">DESAFIO ATUAL:</h4>
                      <p className="text-white mb-2">{finalChallenge.question}</p>
                      <p className="text-gray-400 text-sm mb-3">{finalChallenge.description}</p>
                      <div className="space-y-1">
                        {finalChallenge.options.map((opt, idx) => (
                          <div key={idx} className={`text-sm px-2 py-1 rounded ${idx === finalChallenge.correctAnswer ? 'bg-green-900 text-green-300' : 'text-gray-400'}`}>
                            {idx + 1}. {opt} {idx === finalChallenge.correctAnswer && '✓'}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Gerenciar QR Codes */}
            {view === 'admin-qr' && (
              <div className="max-w-6xl mx-auto">
                <div className="bg-black bg-opacity-90 border-2 border-purple-500 rounded-lg p-6 mb-6" style={{ boxShadow: '0 0 20px rgba(165,94,234,0.3)' }}>
                  <h3 className="text-2xl font-bold mb-6 text-purple-500 flex items-center gap-2">
                    <QrCode className="w-6 h-6" />
                    GERADOR DE QR CODES
                  </h3>
                  
                  <p className="text-gray-400 mb-4">
                    Gere QR Codes automaticamente para cada tipo de card. Cada QR Code levará o jogador para uma URL única que carrega as questões correspondentes.
                  </p>
                  
                  <button 
                    onClick={() => {
                      const types = ['blue', 'red', 'purple'];
                      const newQRCodes = [];
                      
                      types.forEach(type => {
                        for (let i = 1; i <= 5; i++) {
                          const cardId = `${type}-${i}`;
                          newQRCodes.push({
                            type,
                            id: cardId,
                            url: `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.origin + '?card=' + type + '&id=' + cardId)}`
                          });
                        }
                      });
                      
                      saveData('qrCodes', newQRCodes);
                      showNotification('QR Codes gerados com sucesso', 'success');
                      loadData();
                    }}
                    className="px-6 py-3 bg-purple-600 hover:bg-purple-700 rounded-lg font-bold transition-all border-2 border-purple-400 flex items-center gap-2"
                    style={{ boxShadow: '0 0 20px rgba(165,94,234,0.5)' }}>
                    <QrCode className="w-5 h-5" />
                    GERAR 15 QR CODES (5 de cada cor)
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {Object.entries(cardColors).filter(([key]) => key !== 'green').map(([type, data]) => (
                    <div key={type} className="bg-black bg-opacity-90 border-2 rounded-lg p-6"
                         style={{ borderColor: data.color, boxShadow: `0 0 20px ${data.color}40` }}>
                      <h4 className="text-xl font-bold mb-4 text-center" style={{ color: data.color }}>
                        CARDS {data.name}
                      </h4>
                      
                      <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map(num => {
                          const cardId = `${type}-${num}`;
                          const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(window.location.origin + '?card=' + type + '&id=' + cardId)}`;
                          
                          return (
                            <div key={num} className="bg-gray-900 p-3 rounded border border-gray-700">
                              <p className="text-center mb-2 font-bold" style={{ color: data.color }}>
                                CARD {num}
                              </p>
                              <div className="bg-white p-2 rounded">
                                <img src={qrUrl} alt={cardId} className="w-full h-auto" />
                              </div>
                              <p className="text-xs text-gray-500 text-center mt-2 font-mono">
                                ID: {cardId}
                              </p>
                              <a 
                                href={qrUrl}
                                download={`${cardId}.png`}
                                className="block mt-2 px-3 py-1 bg-gray-800 text-center rounded text-sm hover:bg-gray-700 transition-all">
                                Download PNG
                              </a>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CodeGamePart2;
