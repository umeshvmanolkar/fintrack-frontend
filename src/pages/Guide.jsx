import { useState } from 'react';
import { ShieldAlert, Info, ExternalLink, ChevronDown, ChevronUp, ShieldOff, AlertTriangle, Building2 } from 'lucide-react';

const AppleIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.62-1.496 3.6-2.947 1.13-1.639 1.595-3.228 1.615-3.322-.033-.013-3.115-1.198-3.14-4.785-.02-2.99 2.45-4.43 2.56-4.502-1.396-2.046-3.557-2.324-4.325-2.39-1.884-.193-3.665 1.108-4.595 1.108zM15.003 3.593c.833-1.006 1.393-2.41.121-3.593-1.18.06-2.735.802-3.594 1.808-.755.856-1.427 2.278-1.252 3.513 1.32.103 2.766-.64 3.594-1.728z" />
    </svg>
);

const PlayStoreIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.609 1.814l11.082 11.236-11.082 11.136c-.198-.445-.308-.946-.308-1.472v-19.428c0-.526.11-1.027.308-1.472zm11.758 11.916l2.91-2.951-2.91-2.949-11.081 11.136 11.081-11.236zm.609-6.471l6.196 3.578c.84.485.84 1.282 0 1.767l-6.196 3.576-3.181-3.235 3.181-3.22zm-12.793 15.341l11.516-11.666-11.516-11.564c-.453.308-.772.822-.772 1.416v18.983c0 .594.319 1.108.772 1.416z" />
    </svg>
);

const aggregators = [
    { name: 'Anumati', website: 'https://anumati.co.in/' },
    { name: 'OneMoney', website: 'https://www.onemoney.in/' },
    { name: 'Saafe', website: 'https://saafe.in/' },
    { name: 'NADL', website: 'https://nadl.co.in/' },
    { name: 'FinVu', website: 'https://finvu.in/' },
    { name: 'CAMSfinserv', website: 'https://www.camsfinserv.com/' },
];

const dummyPaydayApps = [
    { id: 1, appName: "QuickCash", nbfc: "FastFinance NBFC Pvt Ltd", supportMail: "support@quickcash.in", grievanceMail: "grievance@quickcash.in" },
    { id: 2, appName: "EasyLoan", nbfc: "Reliable Credit Ltd", supportMail: "help@easyloan.com", grievanceMail: "nodal.officer@easyloan.com" },
    { id: 3, appName: "InstaRupee", nbfc: "Apex Capital Services", supportMail: "care@instarupee.in", grievanceMail: "escalation@instarupee.in" },
    { id: 4, appName: "CashKing", nbfc: "Royal FinServ NBFC", supportMail: "contact@cashking.org", grievanceMail: "complaints@cashking.org" },
    { id: 5, appName: "SwiftPay", nbfc: "Swift Financial Solutions", supportMail: "query@swiftpay.in", grievanceMail: "grievances@swiftpay.in" }
];

function GuideSection({ title, icon: Icon = Info, defaultOpen = false, children }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="bg-slate-800/80 rounded-2xl border border-slate-700 shadow-xl mb-4 backdrop-blur-sm relative overflow-hidden transition-all duration-300">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-6 md:p-8 flex items-center justify-between bg-transparent hover:bg-slate-700/30 transition-colors cursor-pointer text-left focus:outline-none group"
            >
                <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl shrink-0 transition-colors ${isOpen ? 'bg-indigo-500/20 shadow-inner' : 'bg-slate-700/50 group-hover:bg-indigo-500/10'}`}>
                        <Icon className={isOpen ? 'text-indigo-400' : 'text-slate-400 group-hover:text-indigo-400'} size={24} />
                    </div>
                    <h3 className="text-xl font-semibold text-white md:text-2xl">{title}</h3>
                </div>
                <div className="text-slate-400 shrink-0 ml-4 group-hover:text-white transition-colors">
                    {isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
            </button>

            {isOpen && (
                <div className="px-6 md:px-8 pb-6 md:pb-8 border-t border-slate-700/50 pt-6 animate-in slide-in-from-top-2 duration-200">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full pointer-events-none"></div>
                    {children}
                </div>
            )}
        </div>
    );
}

export default function Guide() {
    return (
        <div className="p-4 md:p-8 h-full flex flex-col w-full relative overflow-y-auto">
            <div className="max-w-4xl mx-auto w-full pb-16">

                <div className="mb-6 md:mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-3">
                        <ShieldAlert className="text-rose-500" size={32} />
                        Loan Repayment & Safety Guide
                    </h2>
                    <p className="text-slate-400 mt-2 text-base md:text-lg">Essential steps to take if you are struggling to repay payday loans on time to protect your data and prevent continuous harassment.</p>
                </div>

                {/* Mobile In-Feed Ad Banner (Conditionally mounted via JS to satisfy A-Ads Viewability) */}
                {window.innerWidth < 768 && (
                    <div className="w-full h-[100px] mb-8 bg-slate-900/30 rounded-xl overflow-hidden border border-slate-700/50 flex align-center justify-center relative">
                        <iframe data-aa='2431384' src='//acceptable.a-ads.com/2431384/?size=Adaptive' title="mobile-incontent-ad" style={{ border: 0, padding: 0, width: '100%', height: '100%', maxHeight: '100px', overflow: 'hidden', backgroundColor: 'transparent', display: 'block' }}></iframe>
                    </div>
                )}

                <GuideSection title="Revoke Third-Party Bank Consents" icon={ShieldOff} defaultOpen={false}>
                    <p className="text-slate-300 leading-relaxed relative z-10">
                        Many payday loan apps trick you into granting permanent access to your live bank statements via officially licensed <strong>Account Aggregators (AAs)</strong>. If you are unable to repay your loan, lenders and recovery agents may use this permanent backdoor access to continuously monitor your balance and trigger auto-debits the second you receive your salary.
                    </p>
                    <div className="bg-rose-500/10 border border-rose-500/20 rounded-lg p-4 mt-6 relative z-10">
                        <p className="text-rose-300 leading-relaxed font-medium">
                            <strong>Action Required:</strong> You must immediately log into the aggregators listed below (either via their App or Website) and "REVOKE" your active consents to instantly disconnect loan apps from spying on your bank account.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8 relative z-10">
                        {aggregators.map((aa, idx) => (
                            <div key={idx} className="bg-slate-900/50 rounded-xl p-5 border border-slate-700/50 hover:border-indigo-500/50 hover:bg-slate-800/80 transition-all flex flex-col group/card relative z-10">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center shadow-inner group-hover/card:shadow-indigo-500/20 group-hover/card:shadow-lg transition-all overflow-hidden border border-slate-300/50 shrink-0">
                                        <img
                                            src={`https://www.google.com/s2/favicons?sz=64&domain_url=${aa.website}`}
                                            alt={`${aa.name} logo`}
                                            className="w-7 h-7 object-contain"
                                        />
                                    </div>
                                    <h4 className="font-bold text-lg text-white">{aa.name}</h4>
                                </div>

                                <div className="flex gap-2 mt-auto">
                                    <a href={aa.website} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-slate-800 hover:bg-slate-700 border border-slate-600 rounded-lg text-xs font-medium text-slate-200 transition-colors tooltip" title="Website">
                                        <ExternalLink size={16} /> Web
                                    </a>
                                    <a href={`https://play.google.com/store/search?q=${aa.name}+Account+Aggregator&c=apps`} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 rounded-lg text-xs font-medium text-emerald-400 transition-colors tooltip" title="Android">
                                        <PlayStoreIcon size={16} /> Android
                                    </a>
                                    <a href={`https://apps.apple.com/in/search?term=${aa.name}+Account+Aggregator`} target="_blank" rel="noreferrer" className="flex-1 flex flex-col items-center justify-center gap-1.5 py-2 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-lg text-xs font-medium text-sky-400 transition-colors tooltip" title="iOS">
                                        <AppleIcon size={16} /> iOS
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </GuideSection>

                <GuideSection title="File a Cybercrime Report & Block Contacts" icon={AlertTriangle} defaultOpen={false}>
                    <p className="text-slate-300 leading-relaxed relative z-10 mb-4">
                        Once you have revoked the Account Aggregator consents, the next crucial step to stop harassment is reporting the illegal loan apps to the authorities and securing your phone.
                    </p>
                    <ul className="list-disc pl-5 text-slate-300 space-y-2 relative z-10">
                        <li><strong>Report to Cybercrime:</strong> File a formal complaint immediately at the National Cyber Crime Reporting Portal (<a href="https://cybercrime.gov.in/" target="_blank" rel="noreferrer" className="text-indigo-400 hover:text-indigo-300 underline">cybercrime.gov.in</a>) or dial 1930. Provide screenshots of the harassing messages and the loan app details.</li>
                        <li><strong>Block & Report on WhatsApp:</strong> Do not engage with recovery agents. Use WhatsApp's built-in "Block and Report" feature for every single unknown number that messages you.</li>
                    </ul>
                </GuideSection>

                <GuideSection title="Loan App NBFC & Grievance Directory" icon={Building2} defaultOpen={false}>
                    <p className="text-slate-300 leading-relaxed relative z-10 mb-6">
                        If a loan app is harassing you (or your contacts), you must identify their official <strong>NBFC (Non-Banking Financial Company)</strong> partner and immediately email their Grievance Redressal Officer. If they do not resolve the harassment within 30 days, you can escalate the complaint directly to the RBI Ombudsman.
                    </p>

                    {/* Desktop Table View */}
                    <div className="overflow-x-auto relative z-10 rounded-xl border border-slate-700/50 hidden md:block">
                        <table className="w-full text-left text-sm text-slate-300">
                            <thead className="bg-slate-900/80 text-xs uppercase text-slate-400">
                                <tr>
                                    <th className="px-6 py-4 font-semibold">Payday App Name</th>
                                    <th className="px-6 py-4 font-semibold">Official NBFC Partner</th>
                                    <th className="px-6 py-4 font-semibold">Support Email</th>
                                    <th className="px-6 py-4 font-semibold">Grievance / Nodal Email</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-700/50">
                                {dummyPaydayApps.map((app) => (
                                    <tr key={app.id} className="bg-slate-800/50 hover:bg-slate-700/50 transition-colors">
                                        <td className="px-6 py-4 font-bold text-white">{app.appName}</td>
                                        <td className="px-6 py-4 text-slate-300">{app.nbfc}</td>
                                        <td className="px-6 py-4">
                                            <a href={`mailto:${app.supportMail}`} className="text-indigo-400 hover:text-indigo-300 transition-colors">{app.supportMail}</a>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`mailto:${app.grievanceMail}`} className="text-rose-400 hover:text-rose-300 font-medium transition-colors">{app.grievanceMail}</a>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    {/* Mobile Card View (shown only on small screens) */}
                    <div className="md:hidden space-y-4 relative z-10">
                        {dummyPaydayApps.map((app) => (
                            <div key={app.id} className="bg-slate-900/50 p-5 border border-slate-700/50 rounded-xl hover:border-indigo-500/50 transition-colors">
                                <h4 className="text-white font-bold text-lg mb-1">{app.appName}</h4>
                                <p className="text-xs text-slate-400 mb-4 uppercase tracking-wider">{app.nbfc}</p>
                                <div className="space-y-3 text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700/30">
                                    <div className="flex flex-col gap-1">
                                        <span className="text-slate-500 font-medium text-xs uppercase">Support Email</span>
                                        <a href={`mailto:${app.supportMail}`} className="text-indigo-400 truncate">{app.supportMail}</a>
                                    </div>
                                    <div className="flex flex-col gap-1 pt-2 border-t border-slate-700/50">
                                        <span className="text-slate-500 font-medium text-xs uppercase">Grievance Email</span>
                                        <a href={`mailto:${app.grievanceMail}`} className="text-rose-400 font-medium truncate">{app.grievanceMail}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </GuideSection>

            </div>
        </div>
    );
}
