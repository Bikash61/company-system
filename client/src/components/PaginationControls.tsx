'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
}

export default function PaginationControls({ currentPage, totalPages }: PaginationControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = useCallback(
    (page: number) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', String(page));
      return `${pathname}?${params.toString()}`;
    },
    [pathname, searchParams],
  );

  if (totalPages <= 1) return null;

  const pages: (number | '…')[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== '…') {
      pages.push('…');
    }
  }

  return (
    <nav className="mt-16 flex items-center justify-center gap-2" aria-label="Pagination">
      <button
        onClick={() => router.push(createPageURL(currentPage - 1))}
        disabled={currentPage <= 1}
        className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Previous
      </button>

      {pages.map((page, idx) =>
        page === '…' ? (
          <span key={`ellipsis-${idx}`} className="px-3 py-2 text-sm text-gray-500">
            …
          </span>
        ) : (
          <button
            key={page}
            onClick={() => router.push(createPageURL(page as number))}
            aria-current={page === currentPage ? 'page' : undefined}
            className={`relative inline-flex items-center rounded-md px-4 py-2 text-sm font-medium ring-1 ring-inset transition-colors ${
              page === currentPage
                ? 'bg-indigo-600 text-white ring-indigo-600'
                : 'text-gray-700 ring-gray-300 hover:bg-gray-50'
            }`}
          >
            {page}
          </button>
        ),
      )}

      <button
        onClick={() => router.push(createPageURL(currentPage + 1))}
        disabled={currentPage >= totalPages}
        className="relative inline-flex items-center rounded-md px-3 py-2 text-sm font-medium text-gray-700 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
      >
        Next
      </button>
    </nav>
  );
}
