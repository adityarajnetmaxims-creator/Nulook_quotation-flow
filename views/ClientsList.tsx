
import React from 'react';
import { User, Mail, Phone, MapPin, MoreVertical, Search } from 'lucide-react';
import { Client } from '../types';

interface ClientsListProps {
  clients: Client[];
}

const ClientsList: React.FC<ClientsListProps> = ({ clients }) => {
  return (
    <div className="max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2B3674]">Clients</h1>
          <p className="text-slate-400 mt-1">Total {clients.length} onboarded customers</p>
        </div>
        <div className="relative w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search clients..." 
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#2B3674]/5 focus:border-[#2B3674]"
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Client Name</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact Info</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Primary Site</th>
                <th className="px-6 py-4 text-[10px] font-bold text-slate-400 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-[#2B3674]/5 flex items-center justify-center text-[#2B3674]">
                        <User size={20} />
                      </div>
                      <span className="text-sm font-bold text-slate-800">{client.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <Mail size={14} className="text-[#00AEEF]/60" />
                        <span className="font-medium">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-xs text-slate-600">
                        <Phone size={14} className="text-[#00AEEF]/60" />
                        <span className="font-medium">{client.phone}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-start space-x-2 text-xs text-slate-500">
                      <MapPin size={14} className="text-slate-300 mt-0.5 min-w-[14px]" />
                      <span className="leading-relaxed">{client.address}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 text-slate-400 hover:text-[#2B3674] hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {clients.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center space-y-3">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center">
                        <User size={32} className="text-slate-200" />
                      </div>
                      <p className="text-slate-400 font-medium italic">No onboarded clients in your database.</p>
                      <p className="text-xs text-slate-300">Onboard customers from the Quotes tab to see them here.</p>
                    </div>
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

export default ClientsList;
