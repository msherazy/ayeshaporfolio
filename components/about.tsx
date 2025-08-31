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
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-8 md:mb-16 text-white text-center">
          {fallbackData.title}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
          <div className="prose prose-invert max-w-none">
            <p className="text-sm md:text-base text-white/90 leading-relaxed backdrop-blur-none bg-transparent">
              {fallbackData.description}
            </p>
          </div>

          <div>
            <Card className="bg-white/5 backdrop-blur-[2px] border-white/10 hover:border-white/20 transition-colors duration-300">
              <CardContent className="p-4 md:p-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                  {fallbackData.highlights.map((highlight, index) => {
                    const Icon = getIconComponent(highlight.icon);
                    return (
                      <div
                        key={index}
                        className="flex items-center space-x-3 p-2.5 md:p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors duration-200"
                      >
                        <Icon className={`h-4 w-4 md:h-5 md:w-5 ${highlight.color}`} />
                        <span className="text-xs md:text-sm font-medium text-white/90">
                          {highlight.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
