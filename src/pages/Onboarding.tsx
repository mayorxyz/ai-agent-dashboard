import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Activity, Check, Loader2, X, ArrowRight, Key, Zap, Code2, Boxes, Workflow, Database } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function Onboarding() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [apiKey, setApiKey] = useState('');
  const [testing, setTesting] = useState(false);
  const [testResult, setTestResult] = useState<'success' | 'error' | null>(null);
  const [detecting, setDetecting] = useState(false);

  const platforms = [
    { id: 'langchain', name: 'LangChain', icon: Boxes, description: 'Python/JS framework' },
    { id: 'crewai', name: 'CrewAI', icon: Workflow, description: 'Multi-agent orchestration' },
    { id: 'autogen', name: 'AutoGen', icon: Database, description: 'Microsoft agent framework' },
    { id: 'custom', name: 'Custom API', icon: Code2, description: 'Your own implementation' },
  ];

  const handleTestConnection = () => {
    if (!apiKey.trim()) return;
    setTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setTesting(false);
      setTestResult('success');
    }, 2000);
  };

  const handleContinue = () => {
    if (step === 1 && selectedPlatform) {
      setStep(2);
    } else if (step === 2 && testResult === 'success') {
      setStep(3);
      setDetecting(true);
      setTimeout(() => {
        setDetecting(false);
        navigate('/');
      }, 3000);
    }
  };

  const steps = [
    { number: 1, label: 'Connect System' },
    { number: 2, label: 'API Key' },
    { number: 3, label: 'Detection' },
  ];

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-300 ${
      isDark ? 'bg-[#0A0A0B]' : 'bg-[#F3F3F4]'
    }`}>
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#2F5CFF] flex items-center justify-center mx-auto mb-4">
            <Activity size={28} className="text-white" />
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Welcome to OrchestrateIQ</h1>
          <p className={isDark ? 'text-gray-400' : 'text-[#6B7280]'}>Let's get your agent system connected</p>
        </div>

        {/* Stepper */}
        <div className="flex items-center justify-center mb-8">
          {steps.map((s, i) => (
            <div key={s.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all ${
                  step === s.number
                    ? 'bg-[#2F5CFF] text-white'
                    : step > s.number
                      ? 'bg-green-500 text-white'
                      : isDark
                        ? 'bg-[#111113] text-gray-400 border border-[#1F1F23]'
                        : 'bg-white text-[#6B7280] border border-gray-200'
                }`}>
                  {step > s.number ? <Check size={18} /> : s.number}
                </div>
                <span className={`text-xs mt-2 font-medium ${
                  step === s.number ? 'text-[#2F5CFF]' : isDark ? 'text-gray-400' : 'text-[#6B7280]'
                }`}>
                  {s.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 mb-6 ${
                  step > s.number ? 'bg-green-500' : isDark ? 'bg-[#1F1F23]' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className={`rounded-3xl p-8 shadow-sm border ${
          isDark ? 'bg-[#111113] border-[#1F1F23]' : 'bg-white border-gray-100'
        }`}>
          {/* Step 1: Platform Selection */}
          {step === 1 && (
            <div>
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Connect your agent system</h2>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Select the framework you're using</p>
              <div className="grid grid-cols-2 gap-3">
                {platforms.map((platform) => {
                  const Icon = platform.icon;
                  const isSelected = selectedPlatform === platform.id;
                  return (
                    <button
                      key={platform.id}
                      onClick={() => setSelectedPlatform(platform.id)}
                      className={`p-5 rounded-2xl border-2 text-left transition-all ${
                        isSelected
                          ? 'border-[#2F5CFF] bg-blue-50'
                          : isDark
                            ? 'border-[#1F1F23] hover:border-[#27272A] hover:bg-[#1F1F23]'
                            : 'border-gray-100 hover:border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3 ${
                        isSelected ? 'bg-[#2F5CFF]' : isDark ? 'bg-[#1F1F23]' : 'bg-gray-100'
                      }`}>
                        <Icon size={22} className={isSelected ? 'text-white' : isDark ? 'text-gray-400' : 'text-[#6B7280]'} />
                      </div>
                      <h3 className={`text-sm font-semibold mb-1 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>{platform.name}</h3>
                      <p className={`text-xs ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>{platform.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: API Key */}
          {step === 2 && (
            <div>
              <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Enter your API key</h2>
              <p className={`text-sm mb-6 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>We'll use this to connect to your agent system</p>
              <div className="space-y-4">
                <div>
                  <label className={`text-sm font-medium block mb-2 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>API Key</label>
                  <div className="relative">
                    <Key size={18} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => { setApiKey(e.target.value); setTestResult(null); }}
                      placeholder="sk-..."
                      className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-[#2F5CFF] transition-all ${
                        isDark ? 'bg-[#1F1F23] border-[#27272A] text-gray-100 placeholder:text-gray-500' : 'bg-white border-gray-200 text-[#111] placeholder:text-gray-400'
                      }`}
                    />
                  </div>
                </div>
                <button
                  onClick={handleTestConnection}
                  disabled={!apiKey.trim() || testing}
                  className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] ${
                    isDark ? 'bg-[#1F1F23] text-gray-100 hover:bg-[#27272A]' : 'bg-gray-100 text-[#111] hover:bg-gray-200'
                  }`}
                >
                  {testing ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Testing connection...
                    </>
                  ) : testResult === 'success' ? (
                    <>
                      <Check size={18} className="text-green-500" />
                      Connection successful!
                    </>
                  ) : testResult === 'error' ? (
                    <>
                      <X size={18} className="text-red-500" />
                      Connection failed
                    </>
                  ) : (
                    <>
                      <Zap size={18} />
                      Test connection
                    </>
                  )}
                </button>
                {testResult === 'success' && (
                  <p className="text-sm text-green-600 flex items-center gap-2">
                    <Check size={16} />
                    Successfully connected to your agent system
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Step 3: Detection */}
          {step === 3 && (
            <div className="text-center py-8">
              {detecting ? (
                <>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
                    <Loader2 size={32} className="text-[#2F5CFF] animate-spin" />
                  </div>
                  <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>Detecting your system...</h2>
                  <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Analyzing agents, workflows, and connections</p>
                </>
              ) : (
                <>
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${isDark ? 'bg-green-900/30' : 'bg-green-50'}`}>
                    <Check size={32} className="text-green-500" />
                  </div>
                  <h2 className={`text-xl font-semibold mb-2 ${isDark ? 'text-gray-100' : 'text-[#111]'}`}>We found your system!</h2>
                  <p className={`text-sm mb-4 ${isDark ? 'text-gray-400' : 'text-[#6B7280]'}`}>Redirecting to your dashboard...</p>
                </>
              )}
            </div>
          )}

          {/* Navigation */}
          {step < 3 && (
            <div className={`flex items-center justify-between mt-8 pt-6 border-t ${isDark ? 'border-[#1F1F23]' : 'border-gray-100'}`}>
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className={`px-6 py-2.5 transition-all text-sm font-medium ${
                    isDark ? 'text-gray-400 hover:text-gray-200' : 'text-[#6B7280] hover:text-[#111]'
                  }`}
                >
                  Back
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={handleContinue}
                disabled={
                  (step === 1 && !selectedPlatform) ||
                  (step === 2 && testResult !== 'success')
                }
                className="flex items-center gap-2 px-6 py-2.5 bg-[#2F5CFF] text-white rounded-full text-sm font-medium hover:bg-blue-600 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Skip link */}
        <div className="text-center mt-6">
          <button
            onClick={() => navigate('/')}
            className={`text-sm transition-all ${
              isDark ? 'text-gray-400 hover:text-gray-200' : 'text-[#6B7280] hover:text-[#111]'
            }`}
          >
            Skip setup for now
          </button>
        </div>
      </div>
    </div>
  );
}
