import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, LogIn, UserPlus, LogOut, Zap, BookOpen } from 'lucide-react';

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();
    const hideSidebar = location.pathname === '/login' || location.pathname === '/signup';

    if (hideSidebar) return null;

    const isAuthenticated = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    return (
        <div className="w-full md:w-64 md:h-full bg-slate-800/80 border-b md:border-r md:border-b-0 border-slate-700/50 p-4 flex flex-col shadow-lg z-10 shrink-0">
            <div className="flex items-center justify-between md:mb-8 md:mt-2 px-2">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20">
                        <Zap size={18} className="fill-white" />
                    </div>
                    <h1 className="text-xl font-bold tracking-tight text-white hidden sm:block md:block">FinTrack</h1>
                </div>

                {/* Mobile Navigation Horizontal */}
                <div className="flex md:hidden items-center gap-1 sm:gap-3">
                    {isAuthenticated ? (
                        <>
                            <Link to="/" className={`p-2 rounded-lg transition-colors ${location.pathname === '/' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                                <LayoutDashboard size={22} />
                            </Link>
                            <Link to="/guide" className={`p-2 rounded-lg transition-colors ${location.pathname === '/guide' ? 'bg-indigo-500/10 text-indigo-400' : 'text-slate-400 hover:text-white hover:bg-slate-700/50'}`}>
                                <BookOpen size={22} />
                            </Link>
                            <button onClick={handleLogout} className="flex items-center p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors cursor-pointer ml-2">
                                <LogOut size={22} />
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="p-2 text-slate-400 hover:text-white transition-colors"><LogIn size={22} /></Link>
                            <Link to="/signup" className="p-2 text-slate-400 hover:text-white transition-colors"><UserPlus size={22} /></Link>
                        </>
                    )}
                </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="flex-1 space-y-2 hidden md:block">
                <Link to="/" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-700/50 text-slate-300 font-medium transition-colors rounded-lg">
                    <LayoutDashboard size={20} />
                    <span>Dashboard</span>
                </Link>
                <Link to="/guide" className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-700/50 text-slate-300 font-medium transition-colors rounded-lg">
                    <BookOpen size={20} />
                    <span>Loan Guide</span>
                </Link>

                {/* Ad Space Left Panel */}
                <div className="mt-8 relative w-full h-auto min-h-64 bg-slate-900/50 rounded-lg overflow-hidden border border-slate-700/50 hidden md:block">
                    <iframe data-aa='2431073' src='//acceptable.a-ads.com/2431073/?size=Adaptive' title="side-ad" style={{ border: 0, padding: 0, width: '100%', height: '100%', minHeight: '260px', overflow: 'hidden', backgroundColor: 'transparent', display: 'block' }}></iframe>
                </div>
            </nav>

            {/* Desktop Auth Controls */}
            <div className="hidden md:flex mt-auto space-y-2 pt-4 border-t border-slate-700/50 flex-col w-full">
                {isAuthenticated ? (
                    <button onClick={handleLogout} className="flex items-center gap-3 px-3 py-2.5 text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition-colors w-full text-left cursor-pointer">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                ) : (
                    <>
                        <Link to="/login" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                            <LogIn size={20} />
                            <span>Login</span>
                        </Link>
                        <Link to="/signup" className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-lg transition-colors">
                            <UserPlus size={20} />
                            <span>Sign up</span>
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
}
