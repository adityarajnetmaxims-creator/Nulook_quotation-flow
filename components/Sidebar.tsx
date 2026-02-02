
import React from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Receipt, 
  Users, 
  UserCircle, 
  Clock, 
  ChevronRight 
} from 'lucide-react';
import { SidebarItem, ViewState } from '../types';

interface SidebarProps {
  activeView: ViewState;
  onNavigate: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onNavigate }) => {
  const menuItems: SidebarItem[] = [
    { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
    { id: 'jobs', label: 'Jobs', icon: <Briefcase size={20} />, hasSubmenu: true },
    { id: 'quotes', label: 'Quotes', icon: <FileText size={20} /> },
    { id: 'invoices', label: 'Invoices', icon: <Receipt size={20} /> },
    { id: 'team', label: 'Team', icon: <Users size={20} /> },
    { id: 'clients', label: 'Clients', icon: <UserCircle size={20} /> },
    { id: 'timesheet', label: 'Timesheet', icon: <Clock size={20} /> },
  ];

  return (
    <aside className="w-64 bg-white border-r border-slate-200 flex flex-col h-screen sticky top-0 hidden lg:flex">
      <div className="p-6 flex flex-col items-center">
        <div className="flex items-center space-x-2">
            <div className="relative w-32 h-16">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                    <path d="M40,50 Q60,10 100,50 T160,50" fill="none" stroke="#00AEEF" strokeWidth="8" strokeLinecap="round" />
                    <path d="M30,60 Q60,30 110,65 T170,40" fill="none" stroke="#2B3674" strokeWidth="4" strokeLinecap="round" opacity="0.6"/>
                    <text x="100" y="85" textAnchor="middle" fontSize="24" fontWeight="bold" fill="#2B3674" fontFamily="Arial">simplynu</text>
                    <text x="100" y="95" textAnchor="middle" fontSize="6" letterSpacing="2" fill="#2B3674" opacity="0.8">PROFESSIONAL CLEANERS</text>
                </svg>
            </div>
        </div>
      </div>

      <nav className="flex-1 mt-4 px-3 space-y-1">
        {menuItems.map((item) => {
          const isActive = activeView === item.id || (activeView === 'add-quote' && item.id === 'quotes');
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-lg transition-all duration-200 group ${
                isActive 
                ? 'bg-slate-100 text-[#2B3674] font-semibold' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`${isActive ? 'text-[#2B3674]' : 'text-slate-400 group-hover:text-slate-500'}`}>
                  {item.icon}
                </span>
                <span className="text-sm">{item.label}</span>
              </div>
              {item.hasSubmenu && (
                <ChevronRight size={16} className={isActive ? 'text-[#2B3674]' : 'text-slate-400'} />
              )}
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default Sidebar;
