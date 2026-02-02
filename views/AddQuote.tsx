
import React, { useState } from 'react';
import { 
  ArrowLeft, Search, User, MapPin, Mail, ChevronRight, 
  Building2, Phone, Hash, FileUp, ChevronDown, Plus 
} from 'lucide-react';
import { CustomerType, Client, Quote } from '../types';

interface AddQuoteProps {
  initialType: CustomerType | null;
  onBack: () => void;
  onCreateQuote: (quote: Omit<Quote, 'id'>) => void;
}

const MOCK_CLIENTS: Client[] = [
  { id: '1', name: 'amit g', address: 'Surbiton, UK', email: 'amit.g@example.com', phone: '+44 123 456 789' },
  { id: '2', name: 'sachin Chauhan', address: '43 New Cross Rd, London SE14 5FP, UK', email: 'sachin.c@example.com', phone: '+44 987 654 321' },
  { id: '3', name: 'amanda test', address: '16 Croham Road South Croydon', email: 'amanda.t@example.com', phone: '+44 555 000 111' },
];

const AddQuote: React.FC<AddQuoteProps> = ({ initialType, onBack, onCreateQuote }) => {
  const [step, setStep] = useState<'selection' | 'details'>('selection');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  
  // Quote details state
  const [quoteName, setQuoteName] = useState('');
  const [subtotal, setSubtotal] = useState<number>(0);
  const [taxRate] = useState<number>(10); // Fixed at 10% as per UI

  // Data for the quote details page
  const [quoteClient, setQuoteClient] = useState({ name: '', address: '', email: '', phone: '' });

  // Form state for New Client Information
  const [formData, setFormData] = useState({
    companyName: '',
    firstName: '',
    lastName: '',
    phone: '',
    address: '',
    postalCode: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const filteredClients = MOCK_CLIENTS.filter(client => 
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    client.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const proceedToQuoteDetails = () => {
    if (initialType === 'onboarded' && selectedClientId) {
      const client = MOCK_CLIENTS.find(c => c.id === selectedClientId);
      if (client) {
        setQuoteClient({ 
          name: client.name, 
          address: client.address,
          email: client.email,
          phone: client.phone
        });
        setStep('details');
      }
    } else if (initialType === 'non-onboarded') {
      setQuoteClient({ 
        name: `${formData.firstName} ${formData.lastName}`, 
        address: `${formData.address}${formData.postalCode ? ', ' + formData.postalCode : ''}`,
        email: formData.email,
        phone: formData.phone
      });
      setStep('details');
    }
  };

  const handleFinalCreate = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric',
      month: 'short', 
      year: 'numeric' 
    });
    
    onCreateQuote({
      name: quoteName || 'Untitled Quote',
      clientName: quoteClient.name,
      clientAddress: quoteClient.address,
      clientPhone: quoteClient.phone,
      clientEmail: quoteClient.email,
      scheduledDate: formattedDate,
      amount: grandTotal,
      status: initialType === 'onboarded' ? 'scheduled' : 'sent'
    });
  };

  const taxAmount = (subtotal * taxRate) / 100;
  const grandTotal = subtotal + taxAmount;

  if (step === 'details') {
    return (
      <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="flex items-center space-x-4 mb-8">
          <button onClick={() => setStep('selection')} className="p-2 text-slate-400 hover:text-[#2B3674] hover:bg-white rounded-full transition-all">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-3xl font-bold text-[#2B3674]">Add Quote</h1>
        </div>
        <div className="space-y-6">
          <div className="bg-white rounded-xl border-2 border-[#2B3674] p-4 relative overflow-hidden">
            <label className="text-[10px] font-bold text-[#2B3674] uppercase tracking-wider mb-1 block">Client*</label>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-slate-800">{quoteClient.name}</span>
              <ChevronDown size={20} className="text-slate-400" />
            </div>
          </div>
          <div className="bg-white rounded-xl border border-slate-100 p-6 flex justify-between items-start">
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Site</label>
              <p className="text-slate-700 font-medium">{quoteClient.address || 'No site address provided'}</p>
            </div>
            <button className="text-[10px] font-bold text-[#2B3674] border border-[#2B3674]/20 px-3 py-1 rounded-md hover:bg-slate-50 transition-colors uppercase">Change Sites</button>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Name: *</label>
            <input type="text" placeholder="e.g. Weekly Office Cleaning" value={quoteName} onChange={(e) => setQuoteName(e.target.value)} className="w-full h-14 px-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2B3674] transition-all" />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#2B3674]">Services</h2>
              <button className="flex items-center space-x-1 text-xs font-bold text-[#2B3674] border border-[#2B3674]/20 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all uppercase"><Plus size={14} /><span>Add Service</span></button>
            </div>
            <div className="h-px bg-slate-100 w-full"></div>
          </div>
          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-bold text-[#2B3674]">Material</h2>
              <button className="flex items-center space-x-1 text-xs font-bold text-[#2B3674] border border-[#2B3674]/20 px-4 py-2 rounded-lg hover:bg-slate-50 transition-all uppercase"><Plus size={14} /><span>Add Material</span></button>
            </div>
            <div className="h-px bg-slate-100 w-full"></div>
          </div>
          <div className="bg-white rounded-xl border border-blue-100 overflow-hidden mt-8">
            <div className="p-6 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-600 font-medium">Subtotal:</span>
                <div className="flex items-center border border-blue-200 rounded-lg px-3 py-2 bg-white group focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400 transition-all">
                  <span className="text-slate-400 font-bold mr-1">£</span>
                  <input type="number" step="0.01" value={subtotal || ''} onChange={(e) => setSubtotal(parseFloat(e.target.value) || 0)} placeholder="0.00" className="w-24 text-right outline-none font-bold text-slate-800" />
                </div>
              </div>
              <div className="flex justify-between items-center">
                <div className="relative">
                  <div className="bg-slate-50 border border-slate-100 rounded-lg p-2 pr-8 flex flex-col min-w-[120px]">
                    <span className="text-[10px] text-slate-400 font-bold uppercase">Tax Options</span>
                    <span className="text-sm text-slate-700 font-semibold">Tax ({taxRate}%)</span>
                    <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
                <span className="text-slate-800 font-bold">£{taxAmount.toFixed(2)}</span>
              </div>
            </div>
            <div className="p-6 bg-blue-50/30 border-t border-blue-50 flex justify-between items-center">
              <span className="text-lg font-bold text-[#2B3674]">Grand Total:</span>
              <span className="text-lg font-bold text-[#2B3674]">£{grandTotal.toFixed(2)}</span>
            </div>
          </div>
          <div className="space-y-2 pt-6">
            <label className="text-sm font-semibold text-slate-700">Terms & Conditions:*</label>
            <div className="flex gap-4">
              <div className="flex-1">
                <textarea placeholder="Enter terms and conditions..." className="w-full h-24 p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2B3674] transition-all resize-none text-sm" />
              </div>
              <button className="w-40 h-24 border border-slate-200 rounded-xl flex flex-col items-center justify-center text-slate-400 hover:text-[#2B3674] hover:border-[#2B3674] transition-all bg-white group"><FileUp size={32} className="group-hover:scale-110 transition-transform" /></button>
            </div>
          </div>
          <div className="space-y-2 pt-4">
            <label className="text-sm font-semibold text-slate-700">Notes:</label>
            <textarea placeholder="Internal notes (not visible to client)..." className="w-full h-32 p-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#2B3674] transition-all resize-none text-sm" />
          </div>
          <div className="pt-8 flex justify-end space-x-4">
            <button onClick={handleFinalCreate} className="px-10 py-3 bg-[#2B3674] text-white rounded-xl font-bold shadow-lg hover:bg-[#1f285a] transition-all active:scale-95">Create Quote</button>
          </div>
        </div>
      </div>
    );
  }

  if (initialType === 'non-onboarded') {
    return (
      <div className="max-w-3xl mx-auto animate-in slide-in-from-right-4 duration-500 pb-12">
        <div className="flex items-center space-x-4 mb-8">
          <button onClick={onBack} className="p-2 text-slate-400 hover:text-[#2B3674] hover:bg-white rounded-full transition-all"><ArrowLeft size={24} /></button>
          <h1 className="text-3xl font-bold text-[#2B3674]">Customer Information</h1>
        </div>
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8 md:p-10 space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Company Name</label>
              <div className="relative">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="text" name="companyName" placeholder="Enter company name" value={formData.companyName} onChange={handleInputChange} className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B3674]/5 focus:border-[#2B3674] transition-all text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">First Name*</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="text" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleInputChange} className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B3674]/5 focus:border-[#2B3674] transition-all text-sm" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-semibold text-slate-700 ml-1">Last Name*</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                  <input type="text" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleInputChange} className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B3674]/5 focus:border-[#2B3674] transition-all text-sm" />
                </div>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Phone*</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="tel" name="phone" placeholder="Enter phone number" value={formData.phone} onChange={handleInputChange} className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B3674]/5 focus:border-[#2B3674] transition-all text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Address*</label>
              <div className="relative">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="text" name="address" placeholder="Enter street address" value={formData.address} onChange={handleInputChange} className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B3674]/5 focus:border-[#2B3674] transition-all text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Postal Code*</label>
              <div className="relative">
                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="text" name="postalCode" placeholder="Enter postal code" value={formData.postalCode} onChange={handleInputChange} className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B3674]/5 focus:border-[#2B3674] transition-all text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-semibold text-slate-700 ml-1">Email Address*</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                <input type="email" name="email" placeholder="Enter email address" value={formData.email} onChange={handleInputChange} className="w-full h-12 pl-12 pr-4 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B3674]/5 focus:border-[#2B3674] transition-all text-sm" />
              </div>
            </div>
          </div>
          <div className="pt-6 flex flex-col sm:flex-row justify-end items-center gap-4 border-t border-slate-50 mt-8">
            <button onClick={onBack} className="w-full sm:w-auto px-8 py-3 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
            <button onClick={proceedToQuoteDetails} disabled={!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.address} className={`w-full sm:w-auto px-10 py-3 rounded-xl text-sm font-bold shadow-md transition-all active:scale-95 ${ (formData.firstName && formData.lastName && formData.email) ? 'bg-[#2B3674] text-white hover:bg-[#1f285a]' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' }`}>Continue to Quote</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto animate-in slide-in-from-right-4 duration-500">
      <div className="flex items-center space-x-4 mb-8">
        <button onClick={onBack} className="p-2 text-slate-400 hover:text-[#2B3674] hover:bg-white rounded-full transition-all"><ArrowLeft size={24} /></button>
        <div>
          <h1 className="text-3xl font-bold text-[#2B3674]">Select Customer</h1>
          <p className="text-sm text-slate-400 mt-1">Choose an existing client for this quote</p>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input type="text" placeholder="Search by name, address or email..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full h-12 pl-12 pr-4 bg-slate-50 border border-slate-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2B3674]/10 focus:bg-white transition-all text-sm" />
          </div>
        </div>
        <div className="divide-y divide-slate-50 max-h-[600px] overflow-y-auto">
          {filteredClients.length > 0 ? filteredClients.map((client) => (
            <button key={client.id} onClick={() => setSelectedClientId(client.id)} className={`w-full flex items-center justify-between p-6 text-left transition-all hover:bg-slate-50 group ${ selectedClientId === client.id ? 'bg-blue-50/50' : '' }`}>
              <div className="flex items-center space-x-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${ selectedClientId === client.id ? 'bg-[#2B3674] text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-white' }`}><User size={24} /></div>
                <div className="flex flex-col"><span className="text-base font-bold text-slate-800">{client.name}</span><div className="flex items-center space-x-3 mt-1 text-xs text-slate-400"><div className="flex items-center space-x-1"><MapPin size={12} /><span>{client.address}</span></div><div className="flex items-center space-x-1"><Mail size={12} /><span>{client.email}</span></div></div></div>
              </div>
              <div className={`transition-transform duration-200 ${ selectedClientId === client.id ? 'translate-x-0' : '-translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100' }`}><ChevronRight className="text-[#2B3674]" size={20} /></div>
            </button>
          )) : <div className="p-12 text-center"><div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4"><Search size={24} className="text-slate-300" /></div><p className="text-slate-500 font-medium">No clients found matching your search</p></div>}
        </div>
        <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end items-center space-x-4">
          <button onClick={onBack} className="px-6 py-2.5 text-sm font-semibold text-slate-500 hover:text-slate-700 transition-colors">Cancel</button>
          <button onClick={proceedToQuoteDetails} disabled={!selectedClientId} className={`px-8 py-2.5 rounded-lg text-sm font-bold shadow-md transition-all active:scale-95 ${ selectedClientId ? 'bg-[#2B3674] text-white hover:bg-[#1f285a]' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' }`}>Continue to Quote</button>
        </div>
      </div>
    </div>
  );
};

export default AddQuote;
