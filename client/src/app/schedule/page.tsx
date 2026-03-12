import CalendlyWidget from '@/components/CalendlyWidget';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Book a Discovery Call | Austere-Analytics',
  description: 'Schedule a free 30-minute consultation with the Austere-Analytics team to discuss your project.',
};

// Replace this URL with your actual Calendly booking link
const CALENDLY_URL =
  process.env.NEXT_PUBLIC_CALENDLY_URL ||
  'https://calendly.com/austere-analytics/discovery-call';

export default function SchedulePage() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h2 className="text-base font-semibold leading-7 text-indigo-600">
            Book a Meeting
          </h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Schedule a Free Discovery Call
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Pick a time that works for you. A 30-minute call is all it takes to
            explore how we can help turn your ideas into reality.
          </p>
        </div>

        <CalendlyWidget url={CALENDLY_URL} height={700} />
      </div>
    </div>
  );
}
