
import React, { useState } from 'react';
import { ViewState, CustomerType, Quote, Client } from './types';
import Layout from './components/Layout';
import QuotesList from './views/QuotesList';
import AddQuote from './views/AddQuote';
import ClientsList from './views/ClientsList';

const INITIAL_CLIENTS: Client[] = [
  { id: '1', name: 'amit g', address: 'Surbiton, UK', email: 'amit.g@example.com', phone: '+44 123 456 789' },
  { id: '2', name: 'sachin Chauhan', address: '43 New Cross Rd, London SE14 5FP, UK', email: 'sachin.c@example.com', phone: '+44 987 654 321' },
  { id: '3', name: 'amanda test', address: '16 Croham Road South Croydon', email: 'amanda.t@example.com', phone: '+44 555 000 111' },
];

const INITIAL_QUOTES: Quote[] = [
  { id: '0', name: 'Office maintenance', clientName: 'Aditya Rajput', clientAddress: '26 Geoffrey Close, Coventry, West Mi...', scheduledDate: 'Mon, 2 Feb 2026', amount: 220.00, status: 'scheduled', isClientOnboarded: true },
  { id: '1', name: 'House cleaning', clientName: 'amit g', clientAddress: 'Surbiton, UK', scheduledDate: 'Fri, Jan 30, 2026', amount: 660.00, status: 'scheduled', isClientOnboarded: true },
  { id: '2', name: 'Test Location', clientName: 'sachin Chauhan', clientAddress: '43 New Cross Rd, London SE14 5FP, UK', scheduledDate: 'Thu, Nov 20, 2025', amount: 1100.00, status: 'scheduled', isClientOnboarded: true },
  // Sent Quotes for non-onboarded customers
  { id: 'sent-1', name: 'Window Cleaning', clientName: 'Michael Scott', clientAddress: '1725 Slough Avenue, Scranton, PA', clientEmail: 'michael.scott@dundermifflin.com', clientPhone: '570-555-0123', scheduledDate: 'Mon, 10 Nov 2025', amount: 150.00, status: 'sent', isClientOnboarded: false },
  { id: 'sent-2', name: 'Deep Kitchen Clean', clientName: 'Gordon Ramsay', clientAddress: '15 Royal Hospital Rd, London, UK', clientEmail: 'gordon.r@restaurant.com', clientPhone: '+44 20 7352 4441', scheduledDate: 'Wed, 12 Nov 2025', amount: 450.00, status: 'sent', isClientOnboarded: false },
  { id: 'sent-3', name: 'Office Sanitization', clientName: 'Elon Musk', clientAddress: '1 Rocket Rd, Hawthorne, CA', clientEmail: 'elon@spacex.com', clientPhone: '310-363-6000', scheduledDate: 'Fri, 14 Nov 2025', amount: 800.00, status: 'sent', isClientOnboarded: false },
  { id: 'sent-4', name: 'Post-Renovation Clean', clientName: 'Joanna Gaines', clientAddress: '601 Webster Ave, Waco, TX', clientEmail: 'joanna@magnolia.com', clientPhone: '254-235-0603', scheduledDate: 'Sun, 16 Nov 2025', amount: 1200.00, status: 'sent', isClientOnboarded: false },
  { id: 'sent-5', name: 'Carpet Steam Clean', clientName: 'Jeff Bezos', clientAddress: '1200 12th Ave S, Seattle, WA', clientEmail: 'jeff@amazon.com', clientPhone: '206-266-1000', scheduledDate: 'Tue, 18 Nov 2025', amount: 300.00, status: 'sent', isClientOnboarded: false },
  { id: 'sent-6', name: 'Regular Maintenance', clientName: 'Bill Gates', clientAddress: '1835 73rd Ave NE, Medina, WA', clientEmail: 'bill@gatesfoundation.org', clientPhone: '425-882-8080', scheduledDate: 'Thu, 20 Nov 2025', amount: 200.00, status: 'sent', isClientOnboarded: false },
  { id: 'sent-7', name: 'Gutter Cleaning', clientName: 'Mark Zuckerberg', clientAddress: '1 Hacker Way, Menlo Park, CA', clientEmail: 'zuck@meta.com', clientPhone: '650-543-4800', scheduledDate: 'Sat, 22 Nov 2025', amount: 175.00, status: 'sent', isClientOnboarded: false },
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('quotes');
  const [selectedCustomerType, setSelectedCustomerType] = useState<CustomerType | null>(null);
  const [quotes, setQuotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);

  const navigateTo = (view: ViewState, type?: CustomerType) => {
    if (type) setSelectedCustomerType(type);
    setCurrentView(view);
  };

  const handleBack = () => {
    setSelectedCustomerType(null);
    setCurrentView('quotes');
  };

  const handleCreateQuote = (newQuote: Omit<Quote, 'id'>) => {
    const quoteWithId = {
      ...newQuote,
      id: Math.random().toString(36).substr(2, 9),
      // If creating for onboarded, mark as onboarded immediately
      isClientOnboarded: selectedCustomerType === 'onboarded'
    };
    setQuotes([quoteWithId, ...quotes]);
    handleBack();
  };

  const handleOnboardClient = (quote: Quote) => {
    const newClient: Client = {
      id: Math.random().toString(36).substr(2, 9),
      name: quote.clientName,
      address: quote.clientAddress,
      email: quote.clientEmail || 'N/A',
      phone: quote.clientPhone || 'N/A',
    };
    
    setClients(prev => [...prev, newClient]);
    
    // Update quote: Mark client as onboarded but KEEP in Sent tab as per user request
    setQuotes(prev => prev.map(q => 
      q.id === quote.id ? { ...q, isClientOnboarded: true } : q
    ));
    
    alert(`${quote.clientName} has been onboarded successfully! They are now in your client list, and you can now convert this quote to a job.`);
  };

  const renderView = () => {
    switch (currentView) {
      case 'quotes':
        return <QuotesList 
          quotes={quotes}
          onAddQuote={(type) => navigateTo('add-quote', type)} 
          onOnboardClient={handleOnboardClient}
        />;
      case 'add-quote':
        return <AddQuote 
          initialType={selectedCustomerType} 
          onBack={handleBack} 
          onCreateQuote={handleCreateQuote}
        />;
      case 'clients':
        return <ClientsList clients={clients} />;
      default:
        return (
          <div className="flex flex-col items-center justify-center h-[60vh] text-slate-400 space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🚧</span>
            </div>
            <p className="text-xl font-medium">This view ({currentView}) is currently under construction.</p>
          </div>
        );
    }
  };

  return (
    <Layout currentView={currentView} onNavigate={navigateTo}>
      {renderView()}
    </Layout>
  );
};

export default App;
