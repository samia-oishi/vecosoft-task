import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { Check, CircleAlert, Clock3, Headphones, MapPin, Package, Truck } from 'lucide-react';
import './index.css';

const statuses = [
  { title: 'Order placed', detail: 'Your order has been received', date: 'May 22, 10:24 AM', icon: Package },
  { title: 'Processing', detail: 'We are preparing your package', date: 'May 23, 9:15 AM', icon: Clock3 },
  { title: 'Shipped', detail: 'On its way to your address', date: 'May 24, 2:40 PM', icon: Truck },
  { title: 'Out for delivery', detail: 'Arriving today', date: 'Estimated today', icon: MapPin },
];

function validUrl(value) { try { const url = new URL(value); return url.protocol === 'http:' || url.protocol === 'https:'; } catch { return false; } }

function App() {
  const [status, setStatus] = useState('In transit');
  const [trackingUrl, setTrackingUrl] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const progress = useMemo(() => status === 'Delivered' ? 100 : status === 'Out for delivery' ? 86 : 66, [status]);

  function submit(event) {
    event.preventDefault();
    const next = {};
    if (!validUrl(trackingUrl)) next.trackingUrl = 'Enter a valid http:// or https:// tracking URL.';
    if (!validUrl(repoUrl)) next.repoUrl = 'Enter a valid GitHub repository URL.';
    setErrors(next);
    if (!Object.keys(next).length) setSubmitted(true);
  }

  return <main className="min-h-screen px-4 py-8 sm:px-6 lg:py-12">
    <div className="mx-auto max-w-3xl">
      <header className="mb-7 flex items-center justify-between gap-4">
        <div><p className="text-xs font-semibold uppercase tracking-[.18em] text-indigo-600">Task 01</p><h1 className="mt-1 text-2xl font-bold tracking-tight text-ink sm:text-3xl">Order tracking</h1><p className="mt-1 text-sm text-slate-500">A clear snapshot of where an order is right now.</p></div>
        <span className="rounded-full bg-indigo-50 px-3 py-1.5 text-xs font-semibold text-indigo-700">Frontend assessment</span>
      </header>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-7">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-5">
          <div><p className="text-sm font-semibold text-slate-500">Order #VS-48291</p><h2 className="mt-1 text-xl font-bold text-ink">Wireless headphones</h2><p className="mt-1 text-sm text-slate-500">Placed on May 22, 2024 · 1 item</p></div>
          <span className="rounded-full bg-amber-50 px-3 py-1.5 text-sm font-semibold text-amber-700">{status}</span>
        </div>
        <div className="mt-7">
          <div className="mb-3 flex items-center justify-between"><p className="text-sm font-semibold text-slate-800">Delivery progress</p><p className="text-sm font-semibold text-indigo-600">{progress}%</p></div>
          <div className="h-2 overflow-hidden rounded-full bg-slate-100"><div className="h-full rounded-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }} /></div>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-4">{statuses.map((item, index) => { const Icon = item.icon; const complete = index < 3; return <div className="relative" key={item.title}><div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-full ${complete ? 'bg-indigo-600 text-white' : 'bg-indigo-50 text-indigo-600'}`}>{complete ? <Check size={18} /> : <Icon size={18} />}</div><h3 className="text-sm font-semibold text-slate-800">{item.title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{item.detail}<br />{item.date}</p>{index < statuses.length - 1 && <span className="absolute left-10 top-5 hidden h-px w-[calc(100%-2rem)] bg-indigo-100 sm:block" />}</div> })}</div>
      </section>

      <section className="mt-5 grid gap-5 md:grid-cols-[1fr_1fr]">
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"><div className="flex items-center gap-3"><div className="rounded-lg bg-indigo-50 p-2 text-indigo-600"><MapPin size={18} /></div><div><h2 className="font-semibold">Delivery details</h2><p className="text-xs text-slate-500">Estimated arrival</p></div></div><p className="mt-5 text-2xl font-bold text-ink">May 27, 2024</p><p className="mt-1 text-sm text-slate-500">Monday · 9:00 AM – 6:00 PM</p><div className="mt-5 rounded-lg bg-slate-50 p-3 text-sm text-slate-600">18 Park View Road<br />Dhaka 1212, Bangladesh</div></div>
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card"><div className="flex items-center gap-3"><div className="rounded-lg bg-emerald-50 p-2 text-emerald-600"><Headphones size={18} /></div><div><h2 className="font-semibold">Need help?</h2><p className="text-xs text-slate-500">Our support team is here for you</p></div></div><p className="mt-5 text-sm leading-6 text-slate-600">If your order is delayed or the tracking details look unusual, contact support and we’ll investigate.</p><button className="mt-5 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-indigo-400 hover:text-indigo-700">Contact support</button></div>
      </section>

      <form onSubmit={submit} className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-card sm:p-7">
        <div className="mb-5"><p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">Submission</p><h2 className="mt-1 text-lg font-bold">Share your implementation</h2><p className="mt-1 text-sm text-slate-500">Provide the live URL and repository for review.</p></div>
        <div className="grid gap-4 sm:grid-cols-2"><label className="text-sm font-semibold text-slate-700">Live deployed URL<input className={`field ${errors.trackingUrl ? 'border-rose-400' : ''}`} value={trackingUrl} onChange={e => setTrackingUrl(e.target.value)} placeholder="https://your-deployment.example" />{errors.trackingUrl && <span className="mt-1 flex items-center gap-1 text-xs font-normal text-rose-600"><CircleAlert size={13} />{errors.trackingUrl}</span>}</label><label className="text-sm font-semibold text-slate-700">GitHub repository URL<input className={`field ${errors.repoUrl ? 'border-rose-400' : ''}`} value={repoUrl} onChange={e => setRepoUrl(e.target.value)} placeholder="https://github.com/you/repository" />{errors.repoUrl && <span className="mt-1 flex items-center gap-1 text-xs font-normal text-rose-600"><CircleAlert size={13} />{errors.repoUrl}</span>}</label></div>
        <label className="mt-4 block text-sm font-semibold text-slate-700">Preview status<select className="field" value={status} onChange={e => setStatus(e.target.value)}><option>In transit</option><option>Out for delivery</option><option>Delivered</option></select></label>
        {submitted && <p className="mt-4 rounded-lg bg-emerald-50 px-3 py-2.5 text-sm font-medium text-emerald-700">Your submission details are valid and ready to share.</p>}
        <button className="primary mt-5 w-full" type="submit">{submitted ? 'Update submission' : 'Mark task complete'} <Check size={16} /></button>
      </form>
    </div>
  </main>;
}
createRoot(document.getElementById('root')).render(<App />);
