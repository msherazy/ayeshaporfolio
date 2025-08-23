'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ExperienceService } from '@/lib/experienceService';

export default function MigratePage() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<string[]>([]);

  const experiences = [
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
      featured: true,
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
      featured: true,
    },
  ];

  const migrateExperiences = async () => {
    setLoading(true);
    setStatus(['Bắt đầu migrate experience data...']);

    try {
      for (let i = 0; i < experiences.length; i++) {
        const experience = experiences[i];
        
        setStatus(prev => [...prev, `Đang thêm: ${experience.title} tại ${experience.company}...`]);
        
        const id = await ExperienceService.createExperience(experience);
        
        setStatus(prev => [...prev, `✅ Đã thêm: ${experience.title} (ID: ${id})`]);
      }
      
      setStatus(prev => [...prev, '🎉 Migrate experience data thành công!']);
      setStatus(prev => [...prev, `📊 Đã thêm ${experiences.length} experiences vào Firebase`]);
      
    } catch (error) {
      console.error('Error migrating experiences:', error);
      setStatus(prev => [...prev, `❌ Lỗi: ${error instanceof Error ? error.message : 'Unknown error'}`]);
    } finally {
      setLoading(false);
    }
  };

  const clearStatus = () => {
    setStatus([]);
  };

  return (
    <div className="px-4 space-y-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Migrate Experience Data</h1>
        
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Experience Data Migration</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Này sẽ import {experiences.length} experiences từ code vào Firebase database.
            </p>
            
            <div className="space-y-2">
              <h3 className="font-semibold">Experiences sẽ được import:</h3>
              <ul className="list-disc list-inside space-y-1 text-sm">
                {experiences.map((exp, index) => (
                  <li key={index}>
                    <strong>{exp.title}</strong> tại {exp.company} ({exp.period})
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={migrateExperiences} 
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? 'Đang migrate...' : 'Migrate Data'}
              </Button>
              
              <Button 
                variant="outline" 
                onClick={clearStatus}
                disabled={loading}
              >
                Clear Log
              </Button>
            </div>
          </CardContent>
        </Card>

        {status.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Migration Log</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black text-green-400 p-4 rounded-md font-mono text-sm space-y-1 max-h-96 overflow-y-auto">
                {status.map((line, index) => (
                  <div key={index}>{line}</div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 