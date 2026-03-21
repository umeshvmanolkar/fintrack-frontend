import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogIn, UserPlus, LogOut, Zap, BookOpen, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    if (hideSidebar) return null;

    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    const closeMenu = () => setIsMobileMenuOpen(false);

    return (
        <>
            {/* Mobile Top Navigation Bar (Always Visible on Mobile) */}
            <div className="md:hidden w-full bg-slate-800 border-b border-slate-700/50 p-4 py-3 flex items-center justify-between shadow-md z-30 shrink-0 relative">
                <div className="flex items-center justify-center gap-3">
                    <button onClick={() => setIsMobileMenuOpen(true)} className="text-slate-300 hover:text-white p-1 rounded-lg hover:bg-slate-700 transition-colors focus:outline-none cursor-pointer">
                        <Menu size={24} />
                    </button>
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                        <Zap size={18} className="fill-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white">FinTrack</h1>
                </div>
            </div>

            {/* Mobile Overlay (Darkens background when drawer is open) */}
            {isMobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-40 md:hidden animate-in fade-in duration-200"
                    onClick={closeMenu}
                />
            )}

            {/* Main Sidebar (Sliding Drawer on Mobile, Static left panel on Desktop) */}
            <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700/50 p-4 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out md:relative md:translate-x-0 md:h-full md:shadow-none md:bg-slate-800/80 shrink-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>

                {/* Sidebar Header */}
                <div className="flex items-center justify-between mb-8 mt-2 px-2">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                            <Zap size={18} className="fill-white" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight text-white">FinTrack</h1>
                    </div>

                    {/* Close button inside mobile drawer */}
                    <button onClick={closeMenu} className="md:hidden text-slate-400 hover:text-white p-1 flex items-center justify-center rounded-lg hover:bg-slate-700 transition-colors focus:outline-none cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                {/* Primary Navigation Links */}
                <nav className="flex-1 space-y-2">
                    <Link to="/" onClick={closeMenu} className={`flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg transition-colors font-medium ${location.pathname === '/' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}>
                        <LayoutDashboard size={20} />
                        <span>Dashboard</span>
                    </Link>
                    <Link to="/guide" onClick={closeMenu} className={`flex items-center gap-3 px-3 py-3 md:py-2.5 rounded-lg transition-colors font-medium ${location.pathname === '/guide' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-300 hover:text-white hover:bg-slate-700/50'}`}>
                        <BookOpen size={20} />
                        <span>Loan Guide</span>
                    </Link>

                    {/* Ad Space Panel */}
                    <div className="mt-8 relative w-full h-auto min-h-64 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700/50">
                        <iframe data-aa='2431073' src='//acceptable.a-ads.com/2431073/?size=Adaptive' title="side-ad" style={{ border: 0, padding: 0, width: '100%', height: '100%', minHeight: '260px', overflow: 'hidden', backgroundColor: 'transparent', display: 'block' }}></iframe>
                    </div>
                </nav>

                {/* Authentication Controls Container */}
                <div className="mt-auto space-y-2 pt-4 border-t border-slate-700/50 flex flex-col w-full pb-2 md:pb-0">
                    {isAuthenticated ? (
                        <button onClick={() => { closeMenu(); handleLogout(); }} className="flex items-center gap-3 px-3 py-3 md:py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors w-full text-left cursor-pointer">
                            <LogOut size={20} />
                            <span>Logout</span>
                        </button>
                    ) : (
                        <>
                            <Link to="/login" onClick={closeMenu} className="flex items-center gap-3 px-3 py-3 md:py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                                <LogIn size={20} />
                                <span>Login</span>
                            </Link>
                            <Link to="/signup" onClick={closeMenu} className="flex items-center gap-3 px-3 py-3 md:py-2.5 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                                <UserPlus size={20} />
                                <span>Sign up</span>
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </>
    );
}
