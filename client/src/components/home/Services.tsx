// components/home/Services.tsx
const services = [
    {
      name: 'Web Development',
      description: 'We build modern, responsive, and scalable web applications using the latest technologies like Next.js and Nest.js.',
    },
    {
      name: 'AI Integration',
      description: 'Leverage the power of Artificial Intelligence. We integrate custom AI solutions to automate processes and derive insights from your data.',
    },
    {
      name: 'UI/UX Design',
      description: 'Our design team creates intuitive and beautiful user interfaces that provide a great user experience.',
    },
    {
        name: 'API Development',
        description: 'We design and build robust and secure RESTful APIs to power your applications.',
    },
    {
        name: 'Database Management',
        description: 'We offer expertise in managing and optimizing databases to ensure data integrity and performance.',
    },
    {
        name: 'Project Management',
        description: 'Our team follows agile methodologies to deliver your project on time and within budget.',
    },
  ];
  
  export default function Services() {
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-indigo-600">Our Services</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to ship your project
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              From concept to deployment, we provide a comprehensive suite of services to bring your vision to life.
            </p>
          </div>
          <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
            <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
              {services.map((service) => (
                <div key={service.name} className="flex flex-col">
                  <dt className="text-base font-semibold leading-7 text-gray-900">
                    {service.name}
                  </dt>
                  <dd className="mt-1 flex flex-auto flex-col text-base leading-7 text-gray-600">
                    <p className="flex-auto">{service.description}</p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    );
  }
  