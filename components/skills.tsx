"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { skillCategoriesService } from "@/lib/portfolioService";
import { SkillCategory } from "@/types/portfolio";

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [skillsData, setSkillsData] = useState<SkillCategory[]>([]);
  const [loading, setLoading] = useState(true);

  // Fallback data if Firebase data is not available
  const fallbackData: SkillCategory[] = [
    {
      id: "fallback-1",
      title: "Administrative Skills",
      icon: "📋",
      skills: [
        "Microsoft Office Suite",
        "Document Control",
        "HR Support",
        "Cross-Departmental Coordination",
        "Legal Recordkeeping",
      ],
      order: 0,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "fallback-2",
      title: "Marketing & Content",
      icon: "🎨",
      skills: [
        "Design Tools (Canva, Adobe)",
        "Social Media Management",
        "Content Creation",
        "Digital Marketing",
      ],
      order: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "fallback-3",
      title: "Professional Attributes",
      icon: "🤝",
      skills: ["Client Service Orientation", "Professionalism", "Work Ethic", "Versatility"],
      order: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
  ];

  useEffect(() => {
    const fetchSkillsData = async () => {
      try {
        const data = await skillCategoriesService?.getSkillCategories();
        if (data && data.length > 0) {
          // Sort by order field
          const sortedData = data.sort((a, b) => (a.order || 0) - (b.order || 0));
          setSkillsData(sortedData);
        } else {
          setSkillsData(fallbackData);
        }
      } catch (error) {
        console.error('Error fetching skills data:', error);
        setSkillsData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    fetchSkillsData();
  }, []);

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

  // Beautiful color palette for dark theme
  const skillColors = [
    "bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-400/30",
    "bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-400/30",
    "bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-400/30",
    "bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-yellow-400/30",
    "bg-gradient-to-r from-red-500/20 to-rose-500/20 border-red-400/30",
    "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-indigo-400/30",
    "bg-gradient-to-r from-teal-500/20 to-cyan-500/20 border-teal-400/30",
    "bg-gradient-to-r from-orange-500/20 to-red-500/20 border-orange-400/30",
    "bg-gradient-to-r from-pink-500/20 to-rose-500/20 border-pink-400/30",
    "bg-gradient-to-r from-lime-500/20 to-green-500/20 border-lime-400/30",
  ];

  const getSkillColor = (index: number) => {
    return skillColors[index % skillColors.length];
  };

  // Generate technologies list from all skills for the technology cloud
  const technologies = skillsData.reduce((acc: string[], category) => {
    return [...acc, ...category.skills];
  }, []);

  // Map technologies to icons
  const getTechIcon = (tech: string) => {
    const iconMap: {[key: string]: string} = {
      // Administrative Skills
      "Microsoft Office Suite": "📊",
      "Document Control": "📄",
      "HR Support": "👥",
      "Cross-Departmental Coordination": "🔄",
      "Legal Recordkeeping": "📑",

      // Marketing & Content
      "Design Tools (Canva, Adobe)": "🎨",
      "Social Media Management": "📱",
      "Content Creation": "✍️",
      "Digital Marketing": "📢",

      // Professional Attributes
      "Client Service Orientation": "🤝",
      "Professionalism": "👔",
      "Work Ethic": "⏰",
      "Versatility": "🔄",

      // Industry Experience
      "Real Estate Operations": "🏢",
      "Property Conveyancing": "📋",
      "Research & Data Analysis": "📊",
      "Event Management": "🎯"
    };

    return iconMap[tech] || "🔍"; // Default icon if not found
  };

  if (loading) {
    return (
      <section id='skills' className='py-20 relative'>
        <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'></div>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <div className='animate-pulse space-y-4'>
                <div className='h-12 bg-white/20 rounded mx-auto w-96'></div>
                <div className='h-6 bg-white/20 rounded mx-auto w-[600px]'></div>
              </div>
            </div>
            <div className='grid md:grid-cols-2 gap-8 mb-16'>
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className='glass macos-card border-white/20'>
                  <CardContent className='p-6'>
                    <div className='animate-pulse space-y-4'>
                      <div className='h-8 bg-white/20 rounded w-48'></div>
                      <div className='space-y-3'>
                        {[1, 2, 3, 4].map((j) => (
                          <div key={j} className='h-10 bg-white/20 rounded'></div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card className='glass macos-card border-white/20'>
              <CardContent className='p-8'>
                <div className='animate-pulse space-y-6'>
                  <div className='h-8 bg-white/20 rounded mx-auto w-48'></div>
                  <div className='flex flex-wrap gap-3 justify-center'>
                    {Array.from({ length: 15 }).map((_, i) => (
                      <div key={i} className='h-8 bg-white/20 rounded w-20'></div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='skills' ref={sectionRef} className='py-20 relative'>
      {/* Section background with subtle overlay */}
      <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'></div>

      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-white relative z-10'>
              Skills & Technologies
            </h2>
            <p className='text-xl text-white/80 relative z-10'>
              My technical expertise across different domains of software
              development
            </p>
          </div>

          {/* Skill Categories */}
          <div className='grid md:grid-cols-2 gap-8 mb-16'>
            {skillsData.map((category, index) => (
              <Card
                key={category.id || index}
                className='glass macos-card border-white/20 relative z-10 group hover:border-white/40 transition-all duration-300'
              >
                <CardContent className='p-6'>
                  <div className='flex items-center mb-6'>
                    <span className='text-3xl mr-3'>{category.icon}</span>
                    <h3 className='text-xl font-semibold text-white'>
                      {category.title}
                    </h3>
                  </div>

                  <div className='space-y-3'>
                    {category.skills.map((skill, skillIndex) => (
                      <div
                        key={skillIndex}
                        className={`p-3 rounded-lg border hover:scale-105 transition-all duration-200 ${getSkillColor(
                          skillIndex
                        )}`}
                      >
                        <span className='text-sm font-medium text-white/90'>
                          {skill}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Technologies Cloud */}
          {technologies.length > 0 && (
            <Card className='glass macos-card border-white/20 relative z-10'>
              <CardContent className='p-8'>
                <h3 className='text-2xl font-semibold mb-6 text-center text-white'>
                  Technology Stack
                </h3>
                <div className='flex flex-wrap gap-3 justify-center'>
                  {technologies.map((tech, index) => (
                    <Badge
                      key={index}
                      variant='secondary'
                      className='px-4 py-2 text-sm bg-white/20 text-white border border-white/30 hover:bg-white/30 transition-colors duration-200 cursor-pointer'
                    >
                      <span className="mr-2">{getTechIcon(tech)}</span>
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

    </section>
  );
}
