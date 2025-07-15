"use client";
import { useState } from 'react';
import Image,  from 'next/image';
import { motion } from 'framer-motion';

export interface BoardMember {
  id: number;
  name: string;
  title: string;
  company: string;
  bio: string;
  image: string;
  expertise: string[];
}


interface AdvisoryBoardProps {
  members: BoardMember[];
}

const AdvisoryBoard = ({ members }: AdvisoryBoardProps) => {
  const [expandedMember, setExpandedMember] = useState<number | null>(null);

  const toggleMember = (id: number) => {
    setExpandedMember(expandedMember === id ? null : id);
  };

  return (
    <div className="bg-black text-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Advisory Board
          </h2>
          <p className="text-zinc-300 max-w-3xl mx-auto text-lg">
            Our distinguished advisors bring decades of collective experience and expertise to guide our strategic direction.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-red-600 to-orange-500 mx-auto mt-6 rounded-full" />
        </motion.div>

        {/* Board Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <motion.div
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 transition-all duration-300 ${
                expandedMember === member.id ? 'shadow-xl shadow-red-900/20' : 'hover:shadow-lg hover:shadow-orange-900/10'
              }`}
            >
              {/* Member Card */}
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative h-20 w-20 flex-shrink-0 rounded-full overflow-hidden border-2 border-red-600/50">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{member.name}</h3>
                    <p className="text-orange-400 font-medium">{member.title}</p>
                    <p className="text-zinc-400 text-sm">{member.company}</p>
                  </div>
                </div>

                {/* Expertise Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {member.expertise.map((skill, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 rounded-full bg-zinc-800 text-orange-200 border border-zinc-700"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Bio (collapsible) */}
                <div className={`mt-4 transition-all duration-300 ${expandedMember === member.id ? 'max-h-96' : 'max-h-0'} overflow-hidden`}>
                  <p className="text-zinc-300 text-sm">{member.bio}</p>
                </div>

                {/* Toggle Button */}
                <button
                  onClick={() => toggleMember(member.id)}
                  className={`mt-4 text-sm font-medium flex items-center ${
                    expandedMember === member.id ? 'text-red-400' : 'text-orange-400'
                  }`}
                >
                  {expandedMember === member.id ? 'Read Less' : 'Read More'}
                  <svg
                    className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                      expandedMember === member.id ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              {/* Footer */}
              <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 px-6 py-3 border-t border-zinc-800">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-zinc-400">Advisor since 2022</span>
                  <div className="flex space-x-2">
                    <button className="text-zinc-300 hover:text-white transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                      </svg>
                    </button>
                    <button className="text-zinc-300 hover:text-white transition-colors">
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Interested in joining our advisory board?</h3>
          <p className="text-zinc-300 max-w-2xl mx-auto mb-6">
            We&apos;re always looking for industry leaders to help guide our vision. Get in touch to discuss opportunities.
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-500 rounded-full text-white font-medium hover:opacity-90 transition-opacity shadow-lg hover:shadow-red-900/30">
            Contact Us
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdvisoryBoard;