import React, { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import Loader from './components/Loader';
import ResultDisplay from './components/ResultDisplay';
import { UserInfo, AppState } from './types';
import { generateFortune } from './services/geminiService';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.INPUT);
  const [fortuneResult, setFortuneResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = async (data: UserInfo) => {
    setAppState(AppState.ANALYZING);
    setError(null);
    
    try {
      const result = await generateFortune(data);
      setFortuneResult(result);
      setAppState(AppState.RESULT);
    } catch (err) {
      console.error(err);
      setError('天机晦涩，连接受阻。请稍后重试，或检查网络。');
      setAppState(AppState.INPUT); // Go back to input on error for now, or could show error state
    }
  };

  const handleReset = () => {
    setFortuneResult('');
    setAppState(AppState.INPUT);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-paper-pattern bg-fixed flex flex-col font-serif text-stone-800">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center">
        {appState === AppState.INPUT && (
          <div className="w-full max-w-md animate-fade-in-up">
             {error && (
               <div className="mb-4 p-4 bg-red-50 border border-red-200 text-red-800 rounded-md text-sm text-center">
                 {error}
               </div>
             )}
             <InputForm onSubmit={handleFormSubmit} isLoading={false} />
          </div>
        )}

        {appState === AppState.ANALYZING && (
          <Loader />
        )}

        {appState === AppState.RESULT && (
          <ResultDisplay content={fortuneResult} onReset={handleReset} />
        )}
      </main>

      <footer className="py-6 text-center text-stone-400 text-xs">
        <p>© {new Date().getFullYear()} 渊海·命理 | Powered by Gemini 2.5</p>
      </footer>
      
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .writing-vertical {
          writing-mode: vertical-rl;
        }
      `}</style>
    </div>
  );
};

export default App;