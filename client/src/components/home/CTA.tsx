// components/home/CTA.tsx
import Link from 'next/link';

export default function CTA() {
  return (
    <div className="bg-gray-900">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
          Ready to start your project?
          <br />
          Let's build something amazing together.
        </h2>
        <div className="mt-10 flex items-center gap-x-6">
          <Link
            href="/contact"
            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-400"
          >
            Get a Quote
          </Link>
          <Link href="/portfolio" className="text-sm font-semibold leading-6 text-white">
            See our work <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
