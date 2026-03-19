import { useState } from 'react';
import { X } from 'lucide-react';

export default function TransactionForm({ onClose }) {
    const [type, setType] = useState('earning');
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ type, amount, category, message });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h3 className="text-xl font-bold text-white">Add Transaction</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-700/50 hover:bg-slate-600 p-1.5 rounded-lg"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button"
                            className={`py-3 rounded-lg font-medium border-2 transition-all ${type === 'earning' ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                            onClick={() => setType('earning')}
                        >
                            Earning
                        </button>
                        <button
                            type="button"
                            className={`py-3 rounded-lg font-medium border-2 transition-all ${type === 'emi' ? 'bg-rose-500/10 border-rose-500 text-rose-400' : 'bg-slate-900 border-slate-700 text-slate-400 hover:bg-slate-800'}`}
                            onClick={() => setType('emi')}
                        >
                            EMI Deduction
                        </button>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Amount ($)</label>
                        <input type="number" required value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white shadow-inner" placeholder="0.00" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                        <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white appearance-none shadow-inner">
                            <option value="" disabled>Select category...</option>
                            {type === 'earning' ? (
                                <>
                                    <option value="Salary">Salary</option>
                                    <option value="Freelance">Freelance</option>
                                    <option value="Other">Other</option>
                                </>
                            ) : (
                                <>
                                    <option value="House Rent">House Rent</option>
                                    <option value="Car EMI">Car EMI</option>
                                    <option value="Other">Other Loan</option>
                                </>
                            )}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Custom Message (Optional)</label>
                        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows="2" className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white resize-none shadow-inner" placeholder="Add a note..."></textarea>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors shadow-lg">Cancel</button>
                        <button type="submit" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-600/20">Save Entry</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
