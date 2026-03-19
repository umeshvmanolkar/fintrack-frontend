import { useState } from 'react';
import { X } from 'lucide-react';

export default function LoanForm({ onClose }) {
    const [name, setName] = useState('');
    const [interestRate, setInterestRate] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({ name, interestRate, totalAmount, startDate, endDate });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden">
                <div className="flex justify-between items-center p-6 border-b border-slate-700">
                    <h3 className="text-xl font-bold text-white">Add New Loan</h3>
                    <button onClick={onClose} className="text-slate-400 hover:text-white transition-colors bg-slate-700/50 hover:bg-slate-600 p-1.5 rounded-lg"><X size={20} /></button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-1">Loan Name <span className="text-rose-500">*</span></label>
                        <input type="text" required value={name} onChange={(e) => setName(e.target.value)} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white shadow-inner" placeholder="e.g. Car Loan" />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Total Amount ($)</label>
                            <input type="number" value={totalAmount} onChange={(e) => setTotalAmount(e.target.value)} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white shadow-inner" placeholder="0.00" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Interest Rate (%)</label>
                            <input type="number" step="0.1" value={interestRate} onChange={(e) => setInterestRate(e.target.value)} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-white shadow-inner" placeholder="8.5" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">Start Date</label>
                            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-300 shadow-inner" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1">End Date</label>
                            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none text-slate-300 shadow-inner" />
                        </div>
                    </div>

                    <div className="pt-2 flex gap-3">
                        <button type="button" onClick={onClose} className="flex-1 py-2.5 bg-slate-700 hover:bg-slate-600 text-white font-medium rounded-lg transition-colors shadow-lg">Cancel</button>
                        <button type="submit" className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-medium rounded-lg transition-colors shadow-lg shadow-indigo-600/20">Save Loan</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
