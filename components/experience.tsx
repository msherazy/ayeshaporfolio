"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";
import { ExperienceService } from "@/lib/experienceService";
import { Experience as ExperienceType } from "@/types/experience";

export function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const loadExperiences = async () => {
      try {
        const data = await ExperienceService.getAllExperiences();
        setExperiences(data);
      } catch (error) {
        console.error('Error loading experiences:', error);
        // Fallback to default data if Firebase fails
        setExperiences([
          {
            title: "Junior Back End Golang",
            company: "Be Earning",
            location: "Ho Chi Minh City, Vietnam",
            period: "Mar 2025 - May 2025",
            description: [
              "Developed backend services in Golang with focus on scalability and performance",
              "Applied clean architecture and domain-driven design in production-level code",
              "Collaborated with cross-functional teams to deliver high-quality software solutions",
              "Implemented efficient APIs and microservices architecture",
            ],
            technologies: [
              "Golang",
              "Microservices",
              "Clean Architecture",
              "Domain-Driven Design",
              "RESTful APIs",
              "Git",
            ],
            featured: false,
          },
          {
            title: ".NET Intern",
            company: "FPT Software HCM",
            location: "Ho Chi Minh City, Vietnam",
            period: "Sep 2023 - Jan 2024",
            description: [
              "Participated in both Backend and Frontend Developer Teams to implement the application",
              "Worked with the BA Team and Test Team to finalize the Detailed Design Document",
              "Gained hands-on experience with full-stack development using .NET technologies",
              "Collaborated in an agile development environment with cross-functional teams",
            ],
            technologies: [
              ".NET",
              "C#",
              "ASP.NET",
              "SQL Server",
              "JavaScript",
              "HTML/CSS",
            ],
            featured: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadExperiences();
  }, []);

  return (
    <section id='experience' ref={sectionRef} className='py-20 relative'>
      {/* Section background with subtle overlay */}
      <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'></div>
      <div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-[#a8dadc]/10 to-[#457b9d]/10 rounded-full blur-3xl opacity-30 z-0"></div>
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-tr from-[#e63946]/10 to-[#1d3557]/10 rounded-full blur-3xl opacity-30 z-0"></div>

      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-[#1d3557] dark:text-[#f1faee] relative z-10'>
              Work Experience
            </h2>
            <p className='text-xl text-[#1d3557]/80 dark:text-[#f1faee]/80 relative z-10'>
              My professional journey and achievements
            </p>
          </div>

          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="text-xl text-[#1d3557]/80 dark:text-[#f1faee]/80">Loading experiences...</div>
            </div>
          ) : (
            <div className='relative'>
              {/* Timeline line */}
              <div className='absolute left-8 top-0 bottom-0 w-0.5 bg-[#a8dadc]/30'></div>

              <div className='space-y-12'>
                {experiences.map((exp, index) => (
                  <div key={index} className='relative flex items-start'>
                    {/* Timeline dot */}
                    <div className='absolute left-6 w-4 h-4 bg-gradient-to-r from-[#457b9d] to-[#e63946] rounded-full border-4 border-[#a8dadc]/30 shadow-lg'></div>

                    <div className='ml-16 w-full'>
                      <Card 
                        className='border-none shadow-lg relative z-10 overflow-hidden'
                        style={{
                          borderRadius: '28px',
                          background: 'rgba(241, 250, 238, 0.08)',
                          backdropFilter: 'blur(20px)'
                        }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#457b9d]/10 to-[#1d3557]/10 opacity-30 z-0" />
                        <CardContent className='p-6 relative z-10'>
                          <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-4'>
                            <div>
                              <h3 className='text-xl font-semibold text-[#1d3557] dark:text-[#f1faee] mb-1'>
                                {exp.title}
                              </h3>
                              <div className='flex items-center space-x-4 text-[#1d3557]/70 dark:text-[#f1faee]/70'>
                                <div className='flex items-center space-x-1'>
                                  <Building className='h-4 w-4' />
                                  <span>{exp.company}</span>
                                </div>
                                <div className='flex items-center space-x-1'>
                                  <MapPin className='h-4 w-4' />
                                  <span>{exp.location}</span>
                                </div>
                              </div>
                            </div>
                            <div className='flex items-center space-x-1 text-[#e63946] mt-2 md:mt-0'>
                              <Calendar className='h-4 w-4' />
                              <span className='text-sm font-medium'>
                                {exp.period}
                              </span>
                            </div>
                          </div>

                          {exp.description && (
                            <div className='mb-4'>
                              {Array.isArray(exp.description) ? (
                                <ul className='space-y-2'>
                                  {exp.description.map((item, itemIndex) => (
                                    <li
                                      key={itemIndex}
                                      className='text-[#1d3557]/80 dark:text-[#f1faee]/80 flex items-start'
                                    >
                                      <span className='text-[#e63946] mr-2 mt-1.5'>
                                        •
                                      </span>
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className='text-[#1d3557]/80 dark:text-[#f1faee]/80'>{exp.description}</p>
                              )}
                            </div>
                          )}

                          <div className='flex flex-wrap gap-2'>
                            {exp.technologies.map((tech) => (
                              <Badge
                                key={tech}
                                variant='secondary'
                                className='text-xs bg-[#a8dadc]/15 text-[#1d3557] dark:text-[#f1faee] border-[#a8dadc]/30 rounded-full px-3 py-1'
                              >
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
