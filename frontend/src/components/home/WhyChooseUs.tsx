import React from 'react';
import { FadeIn, StaggerContainer, StaggerItem } from '../animations/MotionUtils';
import { FaGraduationCap, FaChalkboardTeacher, FaBookOpen, FaTrophy } from 'react-icons/fa';

export const WhyChooseUs = () => {
  const features = [
    {
      icon: <FaChalkboardTeacher size={24} />,
      title: "Star Faculty",
      desc: "Learn directly from IITians and doctors with decades of proven teaching experience."
    },
    {
      icon: <FaBookOpen size={24} />,
      title: "Comprehensive Material",
      desc: "Exhaustive study modules, DPPS, and previous year question banks updated annually."
    },
    {
      icon: <FaTrophy size={24} />,
      title: "Proven Track Record",
      desc: "Highest selection ratio in the region with consistent top 100 AIRs every year."
    },
    {
      icon: <FaGraduationCap size={24} />,
      title: "Personalized Mentorship",
      desc: "1-on-1 doubt clearing sessions and regular parent-teacher academic reviews."
    }
  ];

  return (
    <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
      {/* Background pattern decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 -skew-x-12 transform origin-top hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">The Gurukul Advantage</span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Why Choose YP Gurukul?
            </h2>
          </FadeIn>
        </div>

        <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {features.map((feature, idx) => (
            <StaggerItem key={idx}>
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-2xl bg-white/10 text-primary flex items-center justify-center mb-6 shadow-inner transform hover:scale-110 hover:-rotate-3 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
};
