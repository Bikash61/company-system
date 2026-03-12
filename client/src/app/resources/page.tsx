'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { getResources, downloadResource } from '@/services/api';

interface Resource {
  _id: string;
  title: string;
  description: string;
  fileUrl: string;
  coverImageUrl?: string;
  createdAt: string;
}

function DownloadModal({
  resource,
  onClose,
}: {
  resource: Resource;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { fileUrl } = await downloadResource(resource._id, name, email);
      setDownloadUrl(fileUrl);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm';

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        {!downloadUrl ? (
          <>
            <h3 className="text-lg font-bold text-gray-900">
              Download: {resource.title}
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              Enter your details to get instant access.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {error && (
                <p className="text-sm text-red-600">{error}</p>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="Jane Smith"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={inputClass}
                  placeholder="jane@company.com"
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 rounded-md px-4 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500 disabled:opacity-50"
                >
                  {loading ? 'Processing…' : 'Get Access →'}
                </button>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
              <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-gray-900">You&apos;re all set!</h3>
            <p className="mt-1 text-sm text-gray-500">
              Click the button below to download your resource.
            </p>
            <a
              href={downloadUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white text-center hover:bg-indigo-500"
            >
              ↓ Download Now
            </a>
            <button
              onClick={onClose}
              className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Resource | null>(null);

  useEffect(() => {
    getResources()
      .then(setResources)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Free Resources
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Guides, templates &amp; whitepapers
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Practical resources to help you make informed decisions about your
            technology projects — completely free.
          </p>
        </div>

        {loading ? (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="rounded-2xl bg-gray-100 animate-pulse h-64" />
            ))}
          </div>
        ) : resources.length === 0 ? (
          <p className="mt-16 text-center text-gray-500">
            No resources available yet. Check back soon!
          </p>
        ) : (
          <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {resources.map((resource) => (
              <div
                key={resource._id}
                className="flex flex-col rounded-2xl bg-gray-50 ring-1 ring-gray-200 overflow-hidden"
              >
                {resource.coverImageUrl && (
                  <Image
                    src={resource.coverImageUrl}
                    alt={resource.title}
                    width={600}
                    height={160}
                    className="h-40 w-full object-cover"
                  />
                )}
                <div className="flex flex-col flex-1 p-6">
                  <h3 className="text-base font-semibold text-gray-900">
                    {resource.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 flex-1">
                    {resource.description}
                  </p>
                  <button
                    onClick={() => setSelected(resource)}
                    className="mt-6 w-full rounded-md bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-indigo-500 transition-colors"
                  >
                    Free Download →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <DownloadModal resource={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
}
