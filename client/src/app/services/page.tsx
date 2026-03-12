import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Our Services | Austere-Analytics',
  description:
    'Explore the full range of services offered by Austere-Analytics — from web and mobile development to AI integration, UI/UX design, and more.',
};

const services = [
  {
    name: 'Web Development',
    icon: '🌐',
    description:
      'We design and build modern, performant, and scalable web applications using Next.js, Nest.js, and cloud-native infrastructure. From marketing sites to complex SaaS platforms.',
    features: ['Next.js / React', 'Nest.js REST APIs', 'MongoDB & PostgreSQL', 'Cloud Deployment (AWS / Vercel)'],
  },
  {
    name: 'AI Integration',
    icon: '🤖',
    description:
      'Unlock the power of artificial intelligence in your business. We integrate custom AI and machine learning solutions to automate processes, analyse data, and delight users.',
    features: ['Custom ML models', 'NLP & chatbots', 'Data pipelines', 'Python FastAPI microservices'],
  },
  {
    name: 'UI/UX Design',
    icon: '🎨',
    description:
      'Beautiful, intuitive interfaces that convert visitors into customers. Our design process starts with your users and ends with pixel-perfect, accessible interfaces.',
    features: ['User research & wireframing', 'Figma prototyping', 'Design systems', 'Accessibility (WCAG 2.1)'],
  },
  {
    name: 'API Development',
    icon: '🔌',
    description:
      'Robust, secure, and well-documented APIs that power your applications and third-party integrations. We follow REST standards and implement authentication, rate-limiting, and full test coverage.',
    features: ['RESTful & GraphQL', 'JWT / OAuth2', 'API documentation', 'Automated testing'],
  },
  {
    name: 'Mobile Development',
    icon: '📱',
    description:
      'Cross-platform mobile applications that feel native on both iOS and Android. We use React Native to share code and ship faster without compromising on quality.',
    features: ['React Native', 'iOS & Android', 'Push notifications', 'App Store publishing'],
  },
  {
    name: 'Project Management',
    icon: '📋',
    description:
      'We run projects using agile methodologies — short sprints, continuous delivery, and transparent communication — so you always know exactly where things stand.',
    features: ['Agile / Scrum', 'Dedicated project manager', 'Weekly demos', 'Transparent billing'],
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl">
              What we do
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-300">
              A comprehensive suite of digital services to take your project from idea to launch — and beyond.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/contact"
                className="rounded-md bg-indigo-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400"
              >
                Get a Quote
              </Link>
              <Link href="/schedule" className="text-sm font-semibold text-white">
                Book a free call →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Services grid */}
      <div className="py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-12 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            {services.map((service) => (
              <div
                key={service.name}
                className="rounded-2xl border border-gray-200 p-8 hover:border-indigo-300 hover:shadow-md transition-all"
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-gray-900">{service.name}</h3>
                <p className="mt-3 text-base text-gray-600 leading-relaxed">
                  {service.description}
                </p>
                <ul className="mt-5 space-y-2">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 text-sm text-gray-700">
                      <span className="h-1.5 w-1.5 rounded-full bg-indigo-600 shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-indigo-600 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white">
            Have a project in mind?
          </h2>
          <p className="mt-4 text-lg text-indigo-100">
            Let&apos;s discuss how we can help you achieve your goals.
          </p>
          <div className="mt-8 flex items-center justify-center gap-x-6">
            <Link
              href="/contact"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-indigo-600 shadow-sm hover:bg-indigo-50"
            >
              Contact Us
            </Link>
            <Link href="/portfolio" className="text-sm font-semibold text-white">
              View our work →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
