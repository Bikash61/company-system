'use client';

import { useState } from 'react';
import { subscribeToNewsletter } from '@/services/api';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const res = await subscribeToNewsletter(email);
      setStatus('success');
      setMessage(res.message);
      setEmail('');
    } catch (err) {
      const e = err as { response?: { data?: { message?: string } } };
      setStatus('error');
      setMessage(
        e?.response?.data?.message || 'Something went wrong. Please try again.',
      );
    }
  };

  if (status === 'success') {
    return (
      <p className="text-sm text-green-400">{message}</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:flex-row">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        placeholder="your@email.com"
        className="flex-1 rounded-md bg-gray-800 px-3 py-2 text-sm text-white placeholder-gray-500 ring-1 ring-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50 whitespace-nowrap"
      >
        {status === 'loading' ? '…' : 'Subscribe'}
      </button>
      {status === 'error' && (
        <p className="w-full text-xs text-red-400 mt-1">{message}</p>
      )}
    </form>
  );
}
