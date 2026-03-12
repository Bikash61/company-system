// src/app/admin/leads/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getLeads, updateLeadStatus, deleteLead } from '@/services/api';

enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  UNQUALIFIED = 'unqualified',
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  qualified: 'bg-green-100 text-green-700',
  unqualified: 'bg-red-100 text-red-700',
};

interface Lead {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);

  const load = () => getLeads().then(setLeads).catch(console.error);

  useEffect(() => { load(); }, []);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try { await updateLeadStatus(id, status); load(); } catch { console.error('Failed to update status'); }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this lead?')) return;
    try { await deleteLead(id); load(); } catch { alert('Failed to delete lead.'); }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Leads</h1>
        <p className="text-sm text-gray-500 mt-1">{leads.length} total lead{leads.length !== 1 ? 's' : ''}</p>
      </div>
      <div className="bg-white shadow-sm rounded-xl overflow-hidden ring-1 ring-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['Name','Email','Phone','Message','Status','Received',''].map(h => (
                <th key={h} className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {leads.length === 0 && (
              <tr><td colSpan={7} className="px-6 py-10 text-center text-gray-400">No leads yet.</td></tr>
            )}
            {leads.map((lead) => (
              <tr key={lead._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{lead.name}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{lead.phone || '—'}</td>
                <td className="px-6 py-4 text-sm text-gray-600 max-w-xs truncate">{lead.message}</td>
                <td className="px-6 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value as LeadStatus)}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-0 cursor-pointer ${statusColors[lead.status] || ''}`}
                  >
                    {Object.values(LeadStatus).map(s => (
                      <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(lead._id)} className="text-red-600 hover:text-red-900 text-sm font-medium">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
