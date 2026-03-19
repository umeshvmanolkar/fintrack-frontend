import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, LogIn, UserPlus } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
    const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';

    if (hideSidebar) return null;

    return (
        <div className="w-64 h-full bg-slate-800/50 border-r border-slate-700/50 p-4 flex flex-col">
            <div className="flex items-center gap-3 mb-8 mt-2 px-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                    F
                </div>
                <h1 className="text-xl font-bold tracking-tight text-white">FinTrack</h1>
            </div>

            <nav className="flex-1 space-y-2">
                <Link to="/" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 font-medium transition-colors">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
            </nav>

            <div className="mt-auto space-y-2 pt-4 border-t border-slate-700/50">
                <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                    <LogIn size={20} />
                    <span>Login</span>
                </Link>
                <Link to="/signup" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                    <UserPlus size={20} />
                    <span>Sign up</span>
                </Link>
            </div>
        </div>
    );
}
