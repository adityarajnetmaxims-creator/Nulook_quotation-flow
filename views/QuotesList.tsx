
import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreVertical, ChevronDown, UserCheck, UserPlus, UserPlus2, Briefcase, CheckCircle2 } from 'lucide-react';
import { Quote, CustomerType } from '../types';

interface QuotesListProps {
  quotes: Quote[];
  onAddQuote: (type: CustomerType) => void;
  onOnboardClient: (quote: Quote) => void;
}

const QuotesList: React.FC<QuotesListProps> = ({ quotes, onAddQuote, onOnboardClient }) => {
  const [activeTab, setActiveTab] = useState<'scheduled' | 'sent'>('scheduled');
  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [activeActionQuoteId, setActiveActionQuoteId] = useState<string | null>(null);
  
  const addMenuRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (addMenuRef.current && !addMenuRef.current.contains(event.target as Node)) {
        setIsAddMenuOpen(false);
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActiveActionQuoteId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredQuotes = quotes.filter(quote => quote.status === activeTab);

  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-3xl font-bold text-[#2B3674]">Quotes</h1>
        
        <div className="relative" ref={addMenuRef}>
          <button 
            onClick={() => setIsAddMenuOpen(!isAddMenuOpen)}
            className="bg-[#2B3674] hover:bg-[#1f285a] text-white px-5 py-2.5 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all shadow-md active:scale-95"
          >
            <Plus size={18} />
            <span>Add Quote</span>
            <ChevronDown size={16} className={`transition-transform duration-200 ${isAddMenuOpen ? 'rotate-180' : ''}`} />
          </button>

          {isAddMenuOpen && (
            <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-200">
              <button 
                onClick={() => { setIsAddMenuOpen(false); onAddQuote('onboarded'); }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors group"
              >
                <div className="p-2 bg-blue-50 text-[#2B3674] rounded-lg group-hover:bg-[#2B3674] group-hover:text-white transition-colors">
                  <UserCheck size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700">Onboarded Customer</span>
                  <span className="text-[10px] text-slate-400">Select from existing clients</span>
                </div>
              </button>
              <button 
                onClick={() => { setIsAddMenuOpen(false); onAddQuote('non-onboarded'); }}
                className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-slate-50 transition-colors group border-t border-slate-50"
              >
                <div className="p-2 bg-emerald-50 text-emerald-600 rounded-lg group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                  <UserPlus size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-semibold text-slate-700">Non Onboarded Customer</span>
                  <span className="text-[10px] text-slate-400">Enter customer information</span>
                </div>
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="flex border-b border-slate-100 px-6 pt-4">
          <button 
            onClick={() => setActiveTab('scheduled')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'scheduled' 
              ? 'border-[#2B3674] text-[#2B3674]' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Scheduled
          </button>
          <button 
            onClick={() => setActiveTab('sent')}
            className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === 'sent' 
              ? 'border-[#2B3674] text-[#2B3674]' 
              : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Sent
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Scheduled Date</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredQuotes.map((quote) => (
                <tr key={quote.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5 align-top">
                    <span className="text-sm font-semibold text-slate-800">{quote.name}</span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <div className="flex flex-col">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-slate-900">{quote.clientName}</span>
                        {quote.isClientOnboarded && (
                          <div className="bg-emerald-50 text-emerald-600 px-1.5 py-0.5 rounded flex items-center space-x-1" title="Onboarded">
                            <CheckCircle2 size={10} />
                            <span className="text-[8px] font-bold uppercase">Onboarded</span>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 mt-0.5 max-w-[200px] truncate">{quote.clientAddress}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span className="text-sm text-slate-600">{quote.scheduledDate}</span>
                  </td>
                  <td className="px-6 py-5 align-top">
                    <span className="text-sm font-bold text-slate-800">£{quote.amount.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-5 align-top text-right relative">
                    <button 
                      onClick={() => setActiveActionQuoteId(activeActionQuoteId === quote.id ? null : quote.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all"
                    >
                      <MoreVertical size={18} />
                    </button>
                    
                    {activeActionQuoteId === quote.id && (
                      <div ref={actionMenuRef} className="absolute right-6 top-10 w-64 bg-white rounded-xl shadow-2xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
                        {/* Only show "Onboard now" if they are NOT onboarded */}
                        {!quote.isClientOnboarded && (
                          <button 
                            onClick={() => { setActiveActionQuoteId(null); onOnboardClient(quote); }}
                            className="w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-emerald-50 transition-colors group"
                          >
                            <UserPlus2 size={16} className="text-emerald-600" />
                            <span className="text-sm font-medium text-slate-700">Onboard the customer now</span>
                          </button>
                        )}
                        
                        {/* Enabled if they ARE onboarded */}
                        <button 
                          disabled={!quote.isClientOnboarded}
                          onClick={() => {
                            if(quote.isClientOnboarded) {
                              alert(`Converting ${quote.name} for ${quote.clientName} to a Job...`);
                              setActiveActionQuoteId(null);
                            }
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors group ${
                            !quote.isClientOnboarded 
                            ? 'opacity-40 cursor-not-allowed' 
                            : 'hover:bg-blue-50'
                          }`}
                        >
                          <Briefcase size={16} className="text-blue-600" />
                          <span className="text-sm font-medium text-slate-700">Convert in jobs</span>
                        </button>
                        
                        {!quote.isClientOnboarded && (
                          <div className="px-4 py-2 border-t border-slate-50 mt-1 bg-slate-50/50">
                            <span className="text-[10px] text-amber-600 font-bold uppercase tracking-tight block flex items-center">
                              🔒 Action Restricted
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5 leading-normal">
                              Admin must onboard this customer before converting to a job.
                            </span>
                          </div>
                        )}

                        {quote.isClientOnboarded && quote.status === 'sent' && (
                          <div className="px-4 py-2 border-t border-slate-50 mt-1 bg-emerald-50/30">
                            <span className="text-[10px] text-emerald-600 font-bold uppercase tracking-tight block flex items-center">
                              ✓ Customer Onboarded
                            </span>
                            <span className="text-[10px] text-slate-400 block mt-0.5 leading-normal">
                              You can now proceed to create jobs for this client.
                            </span>
                          </div>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
              ))}
              {filteredQuotes.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400 italic">
                    No {activeTab} quotes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuotesList;
