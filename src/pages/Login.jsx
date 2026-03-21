import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { Zap } from 'lucide-react';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const data = await loginUser(email, password);
            // Save authenticated user securely
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/');
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-slate-900 w-full p-4">
            <div className="w-full max-w-md p-8 rounded-2xl bg-slate-800/80 border border-slate-700 shadow-xl backdrop-blur-sm">
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 text-xl">
                        <Zap size={24} className="fill-white" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">FinTrack</h1>
                </div>
                <h2 className="text-2xl font-semibold text-center text-slate-100 mb-6">Welcome Back</h2>

                {error && <div className="mb-4 p-3 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">{error}</div>}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Email or Username</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white transition-all shadow-inner"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                            disabled={loading}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white transition-all shadow-inner"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-medium rounded-lg transition-colors mt-4 shadow-lg shadow-indigo-600/20"
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <p className="mt-6 text-center text-slate-400">
                    Don't have an account? <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-medium ml-1 transition-colors">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
