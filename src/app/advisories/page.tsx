// import AdvisoryBoard from '@/components/AdvisoryBoard';
// import type { BoardMember } from '@/components/AdvisoryBoard';

import AdvisoryBoard, { BoardMember } from '../components/AdvisoryBoard';


const AdvisoryBoardPage = () => {
  const boardMembers: BoardMember[] = [
    {
      id: 1,
      name: 'Dr. Sarah Chen',
      title: 'Chief Technology Officer',
      company: 'TechGlobal Inc.',
      bio: 'With over 20 years in the tech industry, Dr. Chen specializes in AI and machine learning applications. She has led multiple successful startups and serves on several Fortune 500 advisory boards.',
      image: "/member1",
      expertise: ['AI/ML', 'Technology Strategy', 'Startups'],
    },
    {
      id: 2,
      name: 'James Rodriguez',
      title: 'Financial Director',
      company: 'Global Capital Partners',
      bio: 'James brings extensive financial expertise with a focus on emerging markets. He has structured over $5B in investments and specializes in scaling operations internationally.',
      image: "/member2",
      expertise: ['Finance', 'Emerging Markets', 'M&A'],
    },
    {
      id: 3,
      name: 'Priya Kapoor',
      title: 'Marketing Executive',
      company: 'BrandVision Worldwide',
      bio: 'Priya is an award-winning marketing strategist with deep expertise in digital transformation and brand positioning. She has launched campaigns for some of the world\'s most recognizable brands.',
      image: "/member3",
      expertise: ['Digital Marketing', 'Brand Strategy', 'Consumer Insights'],
    },
    {
      id: 4,
      name: 'Michael Okafor',
      title: 'Operations Specialist',
      company: 'LogiChain Solutions',
      bio: 'Michael revolutionized supply chain management in three different industries. His operational frameworks are now considered industry standards across multiple sectors.',
      image: "/member4",
      expertise: ['Operations', 'Supply Chain', 'Process Optimization'],
    },
    {
      id: 5,
      name: 'Elena Petrov',
      title: 'Legal Counsel',
      company: 'Horizon Law Group',
      bio: 'Elena specializes in international business law and compliance. She has successfully navigated complex regulatory environments for multinational corporations.',
      image: "/member5",
      expertise: ['Corporate Law', 'Compliance', 'Regulatory Affairs'],
    },
    {
      id: 6,
      name: 'David Kim',
      title: 'Venture Partner',
      company: 'Summit Venture Capital',
      bio: 'David has invested in over 50 early-stage companies with 12 successful exits. He brings unparalleled insight into startup financing and growth strategies.',
      image: "/member6",
      expertise: ['Venture Capital', 'Startup Growth', 'Investment Strategy'],
    },
  ];

  return <AdvisoryBoard members={boardMembers} />;
};

export default AdvisoryBoardPage;