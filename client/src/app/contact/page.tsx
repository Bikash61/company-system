// src/app/contact/page.tsx
'use client';

import { useState } from 'react';
import { submitLead } from '@/services/api';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      await submitLead({ name, email, phone, message });
      setSuccess('Thank you for your message! We will get back to you shortly.');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to send message. Please try again.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-12">Contact Us</h1>
      <div className="max-w-2xl mx-auto">
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {error && <p className="text-red-500 text-xs italic mb-4">{error}</p>}
          {success && <p className="text-green-500 text-xs italic mb-4">{success}</p>}
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" required />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone (Optional)
            </label>
            <input id="phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              Message
            </label>
            <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 h-32" required />
          </div>
          <div className="flex items-center justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
