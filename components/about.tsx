"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Building, BookOpen, Target, Users, Briefcase, Award } from "lucide-react";

interface AboutInfo {
  title?: string;
  description: string;
  highlights: Array<{
    icon: string;
    text: string;
    color: string;
  }>;
}

const fallbackData: AboutInfo = {
  title: "About Me",
  description: "Business Administration graduate from the University of Wollongong Dubai with expertise in marketing, administration, and HR roles. Specialized in client engagement, real estate operations, and HR processes, with a focus on efficient organizational management. Strong background in digital content creation and data organization. Beyond work, I'm an active sports enthusiast and volunteer, having played National Throwball and contributed to SOS Village initiatives.",
  highlights: [
    {
      icon: "🎓",
      text: "Business Administration Graduate",
      color: "text-blue-400"
    },
    {
      icon: "💼",
      text: "3+ Years Experience",
      color: "text-emerald-400"
    },
    {
      icon: "🏢",
      text: "Multiple Industries",
      color: "text-purple-400"
    },
    {
      icon: "🎯",
      text: "Results Driven",
      color: "text-amber-400"
    }
  ]
};

export function About() {
  const getIconComponent = (iconStr: string) => {
    switch (iconStr) {
      case "🎓": return BookOpen;
      case "💼": return Briefcase;
      case "🏢": return Building;
      case "🎯": return Target;
      case "👥": return Users;
      case "🏆": return Award;
      default: return Briefcase;
    }
  };

  return (
    <section id="about" className="py-12 md:py-20 relative">
      {/* About Section - Purple/Pink Theme */}
      <div className='absolute -top-20 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-[#e63946]/35 to-[#a8dadc]/35 rounded-full blur-3xl opacity-45 z-0 animate-slow-spin-reverse'></div>
      <div className='absolute -bottom-20 -left-20 w-[550px] h-[550px] bg-gradient-to-tr from-[#457b9d]/35 to-[#e63946]/35 rounded-full blur-3xl opacity-45 z-0 animate-slow-spin'></div>
      <div className='absolute top-1/2 -right-10 w-[300px] h-[300px] bg-gradient-to-bl from-[#a8dadc]/25 to-[#1d3557]/25 rounded-full blur-3xl opacity-35 z-0 animate-slow-spin' style={{ animationDelay: '-8s' }}></div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-6 md:mb-8 lg:mb-16">
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 text-[#1d3557] dark:text-[#f1faee]">
              {fallbackData.title}
            </h2>
            <p className="text-lg md:text-xl text-[#1d3557]/80 dark:text-[#f1faee]/80 max-w-2xl mx-auto mb-6 md:mb-8">
              {fallbackData.description}
            </p>
            {/* Material Design 3 decorative element */}
            <div className="h-1 w-24 bg-gradient-to-r from-[#457b9d] to-[#e63946] rounded-full mx-auto"></div>
          </div>

          {/* Material Design 3 Expressive Layout */}
          <div className="relative">
            
            {/* Main content with Material Design 3 card */}
            <Card 
              className="relative z-10 border-none shadow-lg overflow-hidden"
              style={{
                borderRadius: '28px',
                background: 'rgba(241, 250, 238, 0.08)',
                backdropFilter: 'blur(20px)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#457b9d]/10 to-[#1d3557]/10 opacity-30 z-0" />
              
              <CardContent className="p-6 md:p-8 lg:p-10 relative z-10">
                <div className="grid md:grid-cols-2 gap-6 md:gap-10 lg:gap-16 items-start">
                  {/* Left column - Professional Summary with Material Design typography */}
                  <div className="prose prose-invert max-w-none">
                    <p className="text-sm md:text-base lg:text-lg text-[#1d3557] dark:text-[#f1faee]/90 leading-relaxed font-medium">
                      I am a dedicated professional with expertise in marketing, administration, and client relations. My passion lies in delivering exceptional results through strategic thinking, effective communication, and attention to detail.
                    </p>
                  </div>

                  {/* Right column - Highlights with Material Design 3 styling */}
                  <div className="space-y-3 md:space-y-4">
                    {fallbackData.highlights.map((highlight, index) => {
                      const Icon = getIconComponent(highlight.icon);
                      
                      // Define gradient backgrounds for each highlight
                      const getGradient = () => {
                        switch(index) {
                          case 0: return "from-[#457b9d]/20 to-[#a8dadc]/20";
                          case 1: return "from-[#a8dadc]/20 to-[#f1faee]/20";
                          case 2: return "from-[#e63946]/20 to-[#457b9d]/20";
                          case 3: return "from-[#1d3557]/20 to-[#457b9d]/20";
                          default: return "from-[#a8dadc]/20 to-[#457b9d]/20";
                        }
                      };
                      
                      return (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 md:space-x-4 p-3 md:p-4 rounded-2xl bg-gradient-to-r ${getGradient()} backdrop-blur-sm transition-all duration-300 transform hover:translate-y-[-2px]`}
                          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        >
                          <div className="p-2 md:p-3 bg-white/10 rounded-full">
                            <Icon className={`h-4 w-4 md:h-5 md:w-5 lg:h-6 lg:w-6 ${highlight.color}`} />
                          </div>
                          <span className="text-xs md:text-sm lg:text-base font-medium text-white">
                            {highlight.text}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
