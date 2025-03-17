import React from 'react';

export const HowWeWork: React.FC = () => {
  const steps = [
    {
      id: 1,
      title: 'Organization Enrolment',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      description: 'The organization (the client) registers with the bug bounty platform, providing details about their software, websites, or systems they want to be tested.',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      id: 2,
      title: 'Scope Definition',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
        </svg>
      ),
      description: 'The organization defines the scope of the bug bounty program, including what assets are in scope (e.g., specific web applications, APIs, mobile apps) and what types of vulnerabilities they are interested in receiving reports about.',
      bgColor: 'from-violet-500/20 to-purple-500/20'
    },
    {
      id: 3,
      title: 'Inviting Cyber Security Companies',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      description: 'The bug bounty platform invites group of companies ethical hackers and security researchers to participate in the program. This often includes both individual hackers and security teams from around the world.',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      id: 4,
      title: 'Hacking And Reporting',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
      description: 'Hackers attempt to find vulnerabilities within the defined scope using various methods such as penetration testing, code review, or fuzzing. When they discover a vulnerability, they report it to the bug bounty platform following the organization\'s reporting guidelines.',
      bgColor: 'from-violet-500/20 to-purple-500/20'
    },
    {
      id: 5,
      title: 'Vulnerability Triage',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      description: 'The bug bounty platform triages the reported vulnerabilities, verifying their validity and severity. They often collaborate with the organization\'s security team to confirm and prioritize the reported issues.',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      id: 6,
      title: 'Reward And Recognition',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      ),
      description: 'The organization rewards hackers based on the severity and impact of the reported vulnerabilities. Rewards can vary from monetary bounties to recognition in hall of fame, swag, or public acknowledgment.',
      bgColor: 'from-violet-500/20 to-purple-500/20'
    },
    {
      id: 7,
      title: 'Vulnerability Remediation',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
      description: 'The organization\'s security team works to fix the reported vulnerabilities and improve the overall security posture of their software or systems.',
      bgColor: 'from-cyan-500/20 to-blue-500/20'
    },
    {
      id: 8,
      title: 'Continuous Iteration',
      icon: (
        <svg className="w-12 h-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      description: 'Bug bounty programs are often ongoing, with organizations continuously improving their security and inviting hackers to find new vulnerabilities as their systems evolve.',
      bgColor: 'from-violet-500/20 to-purple-500/20'
    }
  ];

  return (
    <section className="py-24 bg-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="work-grid" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <rect width="100" height="100" fill="url(#work-grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h3 className="text-lg font-medium text-red-500 mb-4">
            A bug bounty platform connects organizations with a community of leading cyber security companies
          </h3>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            How We Work
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Here\'s a simplified overview of how bug bounty platforms typically work
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {steps.map((step) => (
            <div
              key={step.id}
              className="group relative bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 hover:bg-gray-800/70 transition-all duration-300"
            >
              {/* Card Background Gradient */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${step.bgColor} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}></div>
              
              {/* Content */}
              <div className="relative">
                {/* Icon */}
                <div className="mb-4">
                  <div className="w-16 h-16 rounded-xl bg-gray-900/50 border border-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    {step.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-red-500 transition-colors duration-300">
                  {step.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 