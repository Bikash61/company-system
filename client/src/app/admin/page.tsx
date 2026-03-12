'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getPosts, getPortfolioItems, getLeads } from '@/services/api';

interface Stats {
  posts: number;
  portfolio: number;
  leads: number;
  newLeads: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({ posts: 0, portfolio: 0, leads: 0, newLeads: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [posts, portfolio, leads] = await Promise.all([
          getPosts(),
          getPortfolioItems(),
          getLeads(),
        ]);
        setStats({
          posts: posts.length,
          portfolio: portfolio.length,
          leads: leads.length,
          newLeads: leads.filter((l: { status: string }) => l.status === 'new').length,
        });
      } catch {
        // Stats remain at 0 if fetch fails
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const cards = [
    { label: 'Blog Posts', value: stats.posts, href: '/admin/blog', color: 'bg-indigo-600' },
    { label: 'Portfolio Items', value: stats.portfolio, href: '/admin/portfolio', color: 'bg-emerald-600' },
    { label: 'Total Leads', value: stats.leads, href: '/admin/leads', color: 'bg-amber-500' },
    { label: 'New Leads', value: stats.newLeads, href: '/admin/leads', color: 'bg-rose-500' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">Overview of your Austere-Analytics website.</p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-gray-200 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map(({ label, value, href, color }) => (
            <Link key={label} href={href} className="group relative rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200 hover:ring-indigo-400 transition">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-lg ${color} mb-4`}>
                <span className="text-xl font-bold text-white">{value}</span>
              </div>
              <p className="text-sm font-medium text-gray-500">{label}</p>
              <p className="mt-1 text-2xl font-semibold text-gray-900">{value}</p>
            </Link>
          ))}
        </div>
      )}

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/blog/create" className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition">
              <span className="text-sm font-medium text-gray-700">Write a new blog post</span>
              <span className="text-indigo-600 text-sm">→</span>
            </Link>
            <Link href="/admin/portfolio/create" className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition">
              <span className="text-sm font-medium text-gray-700">Add a portfolio project</span>
              <span className="text-indigo-600 text-sm">→</span>
            </Link>
            <Link href="/admin/leads" className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition">
              <span className="text-sm font-medium text-gray-700">Review incoming leads</span>
              <span className="text-indigo-600 text-sm">→</span>
            </Link>
          </div>
        </div>
        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-6">
          <h2 className="text-base font-semibold text-gray-900 mb-4">Site Links</h2>
          <div className="space-y-3">
            <Link href="/" target="_blank" className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition">
              <span className="text-sm font-medium text-gray-700">Homepage</span>
              <span className="text-gray-400 text-sm">↗</span>
            </Link>
            <Link href="/blog" target="_blank" className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition">
              <span className="text-sm font-medium text-gray-700">Blog</span>
              <span className="text-gray-400 text-sm">↗</span>
            </Link>
            <Link href="/portfolio" target="_blank" className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 hover:bg-gray-50 transition">
              <span className="text-sm font-medium text-gray-700">Portfolio</span>
              <span className="text-gray-400 text-sm">↗</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
