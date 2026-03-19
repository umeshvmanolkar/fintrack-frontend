import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { PlusCircle, Wallet, ArrowDownCircle, ArrowUpCircle, Landmark } from 'lucide-react';
import TransactionForm from '../components/TransactionForm';
import LoanForm from '../components/LoanForm';
import { fetchTransactions, fetchLoans } from '../services/api';

export default function Dashboard() {
    const [showTransactionModal, setShowTransactionModal] = useState(false);
    const [showLoanModal, setShowLoanModal] = useState(false);
    const [transactions, setTransactions] = useState([]);
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }
        loadData();
    }, [user]);

    const loadData = async () => {
        try {
            const [txs, lns] = await Promise.all([
                fetchTransactions(user.id),
                fetchLoans(user.id)
            ]);
            setTransactions(txs);
            setLoans(lns);
        } catch (err) {
            console.error("Failed to load data", err);
        } finally {
            setLoading(false);
        }
    };

    const stats = useMemo(() => {
        let totalEarnings = 0;
        let totalSpent = 0;

        transactions.forEach(t => {
            if (t.type === 'earning') totalEarnings += t.amount;
            else totalSpent += t.amount;
        });

        const activeLoansTotal = loans.reduce((acc, curr) => acc + (curr.remainingAmount || curr.totalAmount || 0), 0);

        return {
            balance: totalEarnings - totalSpent,
            totalEarnings,
            totalSpent,
            activeLoansTotal
        };
    }, [transactions, loans]);

    const chartData = useMemo(() => {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const monthlyData = months.map(m => ({ name: m, balance: 0, spent: 0 }));

        let runningBalance = 0;
        const sortedTxs = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));

        sortedTxs.forEach(t => {
            const d = new Date(t.date);
            const mIdx = d.getMonth();
            if (t.type === 'earning') runningBalance += t.amount;
            else {
                runningBalance -= t.amount;
                monthlyData[mIdx].spent += t.amount;
            }
            monthlyData[mIdx].balance = runningBalance;
        });

        return monthlyData.filter(m => m.balance > 0 || m.spent > 0);
    }, [transactions]);

    if (loading) return <div className="flex h-screen items-center justify-center text-white bg-slate-900 w-full animate-pulse font-medium text-lg">Loading Dashboard...</div>;

    return (
        <div className="p-8 h-full flex flex-col gap-8 w-full relative">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold text-white">Dashboard</h2>
                    <p className="text-slate-400 mt-1">Welcome back, {user?.name}</p>
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={() => setShowTransactionModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium shadow-lg shadow-indigo-600/20 cursor-pointer"
                    >
                        <PlusCircle size={18} /> Add Transaction
                    </button>
                    <button
                        onClick={() => setShowLoanModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-700 hover:bg-slate-700 text-white rounded-lg transition-colors font-medium shadow-lg cursor-pointer"
                    >
                        <Landmark size={18} /> Add Loan
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-indigo-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Wallet size={64} className="text-white" />
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-slate-300">
                        <div className="p-2 bg-slate-700/50 rounded-lg"><Wallet size={20} className="text-white" /></div>
                        <h3 className="font-medium">Total Balance</h3>
                    </div>
                    <p className="text-4xl font-bold text-white tracking-tight">${stats.balance.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ArrowDownCircle size={64} className="text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-slate-300">
                        <div className="p-2 bg-emerald-500/10 rounded-lg"><ArrowDownCircle size={20} className="text-emerald-400" /></div>
                        <h3 className="font-medium">Total Earnings</h3>
                    </div>
                    <p className="text-4xl font-bold text-emerald-400 tracking-tight">${stats.totalEarnings.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-rose-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <ArrowUpCircle size={64} className="text-rose-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-slate-300">
                        <div className="p-2 bg-rose-500/10 rounded-lg"><ArrowUpCircle size={20} className="text-rose-400" /></div>
                        <h3 className="font-medium">Total Spent / EMI</h3>
                    </div>
                    <p className="text-4xl font-bold text-rose-400 tracking-tight">${stats.totalSpent.toLocaleString()}</p>
                </div>
                <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 shadow-xl backdrop-blur-sm relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <Landmark size={64} className="text-amber-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-4 text-slate-300">
                        <div className="p-2 bg-amber-500/10 rounded-lg"><Landmark size={20} className="text-amber-400" /></div>
                        <h3 className="font-medium">Active Loans</h3>
                    </div>
                    <p className="text-4xl font-bold text-amber-400 tracking-tight">${stats.activeLoansTotal.toLocaleString()}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
                <div className="lg:col-span-2 bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl p-6 flex flex-col min-h-[300px]">
                    <h3 className="text-lg font-semibold text-white mb-6">Cash Flow Analytics</h3>
                    <div className="flex-1 w-full relative">
                        {chartData.length > 0 ? (
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={chartData} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.5} vertical={false} />
                                    <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                                    <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={(value) => `$${value}`} />
                                    <Tooltip
                                        contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f8fafc' }}
                                        itemStyle={{ color: '#f8fafc', fontWeight: 500 }}
                                        cursor={{ stroke: '#475569', strokeWidth: 1 }}
                                    />
                                    <Line type="monotone" dataKey="balance" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2 }} activeDot={{ r: 6 }} />
                                    <Line type="monotone" dataKey="spent" stroke="#ef4444" strokeWidth={3} dot={{ r: 4, fill: '#ef4444', strokeWidth: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        ) : <div className="flex h-full items-center justify-center text-slate-500">No data to display yet. Add some transactions!</div>}
                    </div>
                </div>

                <div className="bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl p-6 flex flex-col overflow-hidden">
                    <h3 className="text-lg font-semibold text-white mb-6">Recent History</h3>
                    <div className="flex-1 overflow-y-auto pr-2 space-y-4">
                        {transactions.length > 0 ? transactions.slice(0, 10).map((item) => (
                            <div key={item._id} className="flex justify-between items-center p-4 bg-slate-900/50 rounded-xl border border-slate-700/50 hover:bg-slate-700/30 transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'earning' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                                        {item.type === 'earning' ? <ArrowDownCircle size={20} /> : <ArrowUpCircle size={20} />}
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-slate-100">{item.category}</h4>
                                        <p className="text-sm text-slate-400">{new Date(item.date).toLocaleDateString()}</p>
                                    </div>
                                </div>
                                <div className={`font-bold ${item.type === 'earning' ? 'text-emerald-400' : 'text-rose-400'}`}>
                                    {item.type === 'earning' ? '+' : '-'}${item.amount}
                                </div>
                            </div>
                        )) : <div className="text-slate-500 text-center mt-10">No transactions added</div>}
                    </div>
                </div>
            </div>

            {/* A-Ads Banner */}
            <div className="bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl p-4 flex items-center justify-center min-h-24 w-full">
                <div id="frame" style={{ width: "100%", margin: "auto", position: "relative", zIndex: 999 }}>
                    <iframe
                        data-aa="2431073"
                        src="//acceptable.a-ads.com/2431073/?size=Adaptive"
                        className="w-full h-auto min-h-[90px]"
                        title="A-Ads"
                        style={{ border: 0, padding: 0, overflow: "hidden", display: "block", margin: "auto" }}
                    ></iframe>
                </div>
            </div>

            {showTransactionModal && <TransactionForm onClose={() => { setShowTransactionModal(false); loadData(); }} />}
            {showLoanModal && <LoanForm onClose={() => { setShowLoanModal(false); loadData(); }} />}
        </div>
    );
}
