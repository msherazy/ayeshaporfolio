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
    <div className="container mx-auto px-4 py-12 md:py-20">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-16 text-[#1d3557] dark:text-[#f1faee] text-center">
          {fallbackData.title}
        </h2>

        {/* Material Design 3 Expressive Layout */}
        <div className="relative">
          {/* Background decorative element */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-[#a8dadc]/20 to-[#457b9d]/20 rounded-full blur-3xl opacity-30 z-0"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#457b9d]/20 to-[#1d3557]/20 rounded-full blur-3xl opacity-30 z-0"></div>
          
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
            
            <CardContent className="p-8 md:p-10 relative z-10">
              <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-start">
                {/* Left column - Description with Material Design typography */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-base md:text-lg text-[#1d3557] dark:text-[#f1faee]/90 leading-relaxed font-medium">
                    {fallbackData.description}
                  </p>
                </div>

                {/* Right column - Highlights with Material Design 3 styling */}
                <div className="space-y-4">
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
                        className={`flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r ${getGradient()} backdrop-blur-sm transition-all duration-300 transform hover:translate-y-[-2px]`}
                        style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      >
                        <div className="p-3 bg-white/10 rounded-full">
                          <Icon className={`h-5 w-5 md:h-6 md:w-6 ${highlight.color}`} />
                        </div>
                        <span className="text-sm md:text-base font-medium text-white">
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
  );
}
