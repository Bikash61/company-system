// src/app/admin/leads/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { getLeads, updateLeadStatus, deleteLead } from '@/services/api';
import { useRouter } from 'next/navigation';

enum LeadStatus {
  NEW = 'new',
  CONTACTED = 'contacted',
  QUALIFIED = 'qualified',
  UNQUALIFIED = 'unqualified',
}

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
  const router = useRouter();

  const fetchLeads = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        router.push('/auth/login');
        return;
      }
      const fetchedLeads = await getLeads(token);
      setLeads(fetchedLeads);
    } catch (error) {
      console.error("Failed to fetch leads", error);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const handleStatusChange = async (id: string, status: LeadStatus) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;
      await updateLeadStatus(id, status, token);
      fetchLeads(); // Refresh leads
    } catch (error) {
      console.error("Failed to update lead status", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this lead?')) {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        await deleteLead(id, token);
        fetchLeads(); // Refresh leads
      } catch (error) {
        console.error("Failed to delete lead", error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Leads</h1>
      <div className="bg-white shadow-md rounded">
        <table className="min-w-full table-auto">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Email</th>
              <th className="px-6 py-3 text-left">Phone</th>
              <th className="px-6 py-3 text-left">Message</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-left">Received</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {leads.map((lead) => (
              <tr key={lead._id}>
                <td className="px-6 py-4">{lead.name}</td>
                <td className="px-6 py-4">{lead.email}</td>
                <td className="px-6 py-4">{lead.phone}</td>
                <td className="px-6 py-4 max-w-xs truncate">{lead.message}</td>
                <td className="px-6 py-4">
                  <select
                    value={lead.status}
                    onChange={(e) => handleStatusChange(lead._id, e.target.value as LeadStatus)}
                    className="shadow border rounded py-1 px-2"
                  >
                    {Object.values(LeadStatus).map(status => (
                      <option key={status} value={status}>{status}</option>
                    ))}
                  </select>
                </td>
                <td className="px-6 py-4">{new Date(lead.createdAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => handleDelete(lead._id)} className="text-red-600 hover:text-red-900">
                    Delete
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
