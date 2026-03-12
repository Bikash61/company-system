'use client';

import { useEffect, useState } from 'react';
import { getSubscribers, deleteSubscriber } from '@/services/api';

interface Subscriber {
  _id: string;
  email: string;
  createdAt: string;
}

export default function AdminSubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  const load = () => getSubscribers().then(setSubscribers).catch(console.error);

  useEffect(() => { load(); }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm('Remove this subscriber?')) return;
    try { await deleteSubscriber(id); load(); } catch { alert('Failed to remove subscriber.'); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Newsletter Subscribers</h1>
        <p className="text-sm text-gray-500 mt-1">
          {subscribers.length} subscriber{subscribers.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="bg-white shadow-sm rounded-xl overflow-hidden ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Email', 'Subscribed On', ''].map((h) => (
                <th
                  key={h}
                  className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {subscribers.length === 0 && (
              <tr>
                <td colSpan={3} className="px-6 py-10 text-center text-gray-400">
                  No subscribers yet.
                </td>
              </tr>
            )}
            {subscribers.map((s) => (
              <tr key={s._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{s.email}</td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleDelete(s._id)}
                    className="text-sm font-medium text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
