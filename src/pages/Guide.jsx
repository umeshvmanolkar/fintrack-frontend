import { ShieldAlert, Info, ExternalLink, Smartphone } from 'lucide-react';

const aggregators = [
    { name: 'Anumati', website: 'https://anumati.co.in/' },
    { name: 'OneMoney', website: 'https://www.onemoney.in/' },
    { name: 'Saafe', website: 'https://saafe.in/' },
    { name: 'NADL', website: 'https://nadl.co.in/' },
    { name: 'FinVu', website: 'https://finvu.in/' },
    { name: 'CAMSfinserv', website: 'https://www.camsfinserv.com/' },
];

export default function Guide() {
    return (
        <div className="p-4 md:p-8 h-full flex flex-col w-full relative overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full pb-16">

                <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <ShieldAlert className="text-rose-500" size={32} />
                        Loan Repayment & Safety Guide
                    </h2>
                    <p className="text-slate-400 mt-2 text-base md:text-lg">Essential steps to take if you are struggling to repay payday loans on time to protect your data and prevent continuous harassment.</p>
                </div>

                <div className="bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl p-6 md:p-8 mb-8 backdrop-blur-sm relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full"></div>

                    <div className="flex flex-col md:flex-row items-start gap-4 mb-6 relative">
                        <div className="p-3 bg-indigo-500/10 rounded-xl mt-1 shrink-0">
                            <Info className="text-indigo-400" size={24} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold text-white mb-2">Step 1: Revoke Third-Party Bank Consents</h3>
                            <p className="text-slate-300 leading-relaxed">
                                Many payday loan apps trick you into granting permanent access to your live bank statements via officially licensed <strong>Account Aggregators (AAs)</strong>. If you are unable to repay your loan, lenders and recovery agents may use this permanent backdoor access to continuously monitor your balance and trigger auto-debits the second you receive your salary.
                            </p>
                            <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 mt-6">
                                <p className="text-rose-300 leading-relaxed font-medium">
                                    <strong>Action Required:</strong> You must immediately log into the aggregators listed below (either via their App or Website) and "REVOKE" your active consents to instantly disconnect loan apps from spying on your bank account.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                        {aggregators.map((aa, idx) => (
                            <div key={idx} className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all flex flex-col group">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-slate-300 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 transition-colors">
                                        {aa.name.charAt(0)}
                                    </div>
                                    <h4 className="font-bold text-lg text-white">{aa.name}</h4>
                                </div>

                                <div className="flex gap-3 mt-auto">
                                    <a href={aa.website} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1.5 py-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-medium text-slate-200 transition-colors">
                                        <ExternalLink size={16} /> Website
                                    </a>
                                    <a href={`https://play.google.com/store/search?q=${aa.name}+Account+Aggregator&c=apps`} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1.5 py-2.5 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-medium text-emerald-400 transition-colors">
                                        <Smartphone size={16} /> Play Store
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
