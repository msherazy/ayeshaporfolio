"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Coffee, Code, Zap } from "lucide-react";

interface AboutInfo {
  title?: string;
  description: string;
  highlights: Array<{
    icon: string;
    text: string;
    color: string;
  }>;
}

// Fallback data in case API fails
const fallbackData: AboutInfo = {
  title: "About Me",
  description: "I'm a passionate developer who loves creating amazing web experiences.",
  highlights: [
    { icon: "💻", text: "Full-stack development expertise", color: "text-blue-400" },
    { icon: "⚡", text: "Performance optimization", color: "text-yellow-400" },
    { icon: "❤️", text: "Clean code enthusiast", color: "text-red-400" },
    { icon: "☕", text: "Coffee-powered coding", color: "text-brown-400" }
  ]
};

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const [aboutData, setAboutData] = useState<AboutInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch about data from API
  useEffect(() => {
    async function fetchAboutData() {
      try {
        setLoading(true);
        const response = await fetch('/api/portfolio');
        if (!response.ok) throw new Error('Failed to fetch about data');
        const data = await response.json();
        setAboutData(data.aboutInfo);
        setError(null);
      } catch (error) {
        console.error('Error fetching about data:', error);
        setError('Failed to load about section');
      } finally {
        setLoading(false);
      }
    }
    fetchAboutData();
  }, []);

  // Animation observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Use API data if available, otherwise use fallback
  const currentData = aboutData || fallbackData;
  
  // Map icon strings to actual icon components for highlights
  const getIconComponent = (iconStr: string) => {
    switch (iconStr) {
      case "💻": return Code;
      case "⚡": return Zap; 
      case "❤️": return Heart;
      case "☕": return Coffee;
      default: return Code;
    }
  };

  // Loading state
  if (loading) {
    return (
      <section id="about" className="py-20 relative opacity-75">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-8">
              <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto" />
              <div className="space-y-4">
                <div className="h-4 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-5/6" />
                <div className="h-4 bg-gray-300 rounded w-4/6" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-20 bg-gray-300 rounded" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="about" className="py-20 relative">
        <div className="container mx-auto px-4 text-center text-red-500">
          <p>{error}</p>
          <p className="mt-2 text-sm">Using fallback data...</p>
        </div>
      </section>
    );
  }

  // Render actual content
  return (
    <section id="about" ref={sectionRef} className="py-20 relative">
      <div className="absolute inset-0 bg-white/10 backdrop-blur-sm" />
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white relative z-10">
              {currentData.title}
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="prose prose-invert">
                {currentData?.description?.split('\n\n').map((paragraph, i) => (
                  <p key={i} className="text-white/80">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <Card className="glass macos-card border-white/20">
                <CardContent className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {currentData.highlights.map((highlight, index) => {
                      const Icon = getIconComponent(highlight.icon);
                      return (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors duration-200"
                        >
                          <Icon className={`h-5 w-5 ${highlight.color}`} />
                          <span className="text-sm font-medium text-white">
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
    </section>
  );
}
