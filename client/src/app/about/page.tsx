import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'About Us | Austere-Analytics',
  description:
    'Learn about the Austere-Analytics team — who we are, what drives us, and how we help businesses build exceptional digital products.',
};

const values = [
  {
    name: 'Quality First',
    description:
      'We never cut corners. Every line of code is reviewed, every design decision is intentional, and every delivery is tested before it ships.',
  },
  {
    name: 'Transparent Communication',
    description:
      'No surprises. We keep you in the loop at every stage with weekly demos, progress updates, and honest conversations about timelines and trade-offs.',
  },
  {
    name: 'Long-term Partnership',
    description:
      'We build relationships, not just products. Our best clients have been with us for years because we invest in understanding their business deeply.',
  },
  {
    name: 'Data-Driven Decisions',
    description:
      'We use analytics, user research, and real feedback to drive decisions — not assumptions. Your product should be built on evidence, not guesswork.',
  },
];

const team = [
  {
    name: 'Alex Carter',
    role: 'Founder & Lead Developer',
    bio: 'Full-stack engineer with 10+ years of experience building products for startups and enterprises alike.',
    imageUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Sarah Mitchell',
    role: 'Head of Design',
    bio: 'UI/UX designer passionate about accessible, user-centred design that converts visitors into loyal customers.',
    imageUrl:
      'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'James Okafor',
    role: 'AI & Data Engineer',
    bio: 'Machine learning specialist focused on practical AI applications that deliver measurable business outcomes.',
    imageUrl:
      'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              About Austere-Analytics
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              We are a team of developers, designers, and strategists on a mission to help businesses build exceptional digital products.
            </p>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Mission</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Turning ideas into impactful digital products
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              At Austere-Analytics, we believe technology should serve people — not the other way around.
              We partner with ambitious founders, growing businesses, and enterprise teams to design, build,
              and scale software that makes a real difference.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="bg-gray-50 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Values</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The principles we build on
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {values.map((value) => (
              <div key={value.name} className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
                <h3 className="text-base font-semibold text-gray-900">{value.name}</h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Meet the Team</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The people behind the work
            </p>
          </div>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {team.map((member) => (
              <div key={member.name} className="flex flex-col items-center text-center">
                <Image
                  src={member.imageUrl}
                  alt={member.name}
                  width={96}
                  height={96}
                  className="h-24 w-24 rounded-full object-cover bg-gray-100 mb-4"
                />
                <h3 className="text-base font-semibold text-gray-900">{member.name}</h3>
                <p className="text-sm text-indigo-600 font-medium">{member.role}</p>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">Ready to work together?</h2>
          <p className="mt-4 text-lg text-indigo-100">
            Let&apos;s build something great.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
            >
              Get in Touch
            </Link>
            <Link href="/schedule" className="text-sm font-semibold text-white">
              Book a free call →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
