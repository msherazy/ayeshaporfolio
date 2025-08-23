"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Eye } from "lucide-react";
import { ProjectService } from "@/lib/projectService";
import { Project } from "@/types/project";

export function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<Project[]>([]);
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
    const loadProjects = async () => {
      try {
        const data = await ProjectService.getAllProjects();
        setProjects(data);
      } catch (error) {
        console.error('Error loading projects:', error);
        // Fallback to hardcoded data if Firebase fails
        setProjects([
          {
            title: "E-Commerce REST API",
            description:
              "A robust REST API for e-commerce platform built with Node.js and Express.js, featuring JWT authentication, payment integration, and comprehensive documentation.",
            image:
              "https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=600",
            technologies: ["Node.js", "Express.js", "MongoDB", "JWT", "Stripe API"],
            github: "https://github.com/Thinhtran42/ecommerce-api",
            demo: "https://api-demo.herokuapp.com/docs",
            featured: true,
          },
          {
            title: "Real-time Chat Application",
            description:
              "A scalable real-time chat application with Socket.io, featuring group chats, message encryption, and user presence indicators.",
            image:
              "https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=600",
            technologies: ["Node.js", "Socket.io", "Redis", "PostgreSQL", "JWT"],
            github: "https://github.com/Thinhtran42/realtime-chat",
            demo: "https://chat-app-demo.herokuapp.com",
            featured: true,
          },
          {
            title: "Task Management API",
            description:
              "RESTful API for task management with team collaboration, file uploads, and comprehensive reporting endpoints.",
            image:
              "https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=600",
            technologies: [
              "Node.js",
              "Express.js",
              "TypeScript",
              "MongoDB",
              "Cloudinary",
            ],
            github: "https://github.com/Thinhtran42/task-api",
            // No demo link for this project
            featured: false,
          },
          {
            title: "Microservices Architecture",
            description:
              "A microservices-based application with API Gateway, user service, and product service, deployed with Docker.",
            image:
              "https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg?auto=compress&cs=tinysrgb&w=600",
            technologies: ["Node.js", "Docker", "nginx", "MongoDB", "Redis"],
            github: "https://github.com/Thinhtran42/microservices-demo",
            demo: "https://microservices-demo.herokuapp.com",
            featured: false,
          },
          {
            title: "Authentication Service",
            description:
              "Secure authentication microservice with JWT, refresh tokens, email verification, and password reset functionality.",
            image:
              "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=600",
            technologies: ["Node.js", "JWT", "bcrypt", "Nodemailer", "MongoDB"],
            github: "https://github.com/Thinhtran42/auth-service",
            // No demo link for this project
            featured: false,
          },
          {
            title: "File Upload Service",
            description:
              "Scalable file upload service with multiple storage options, image processing, and CDN integration.",
            image:
              "https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?auto=compress&cs=tinysrgb&w=600",
            technologies: ["Node.js", "Multer", "Sharp", "AWS S3", "CloudFront"],
            github: "https://github.com/Thinhtran42/file-upload-service",
            demo: "https://upload-service-demo.herokuapp.com",
            featured: false,
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadProjects();
  }, []);

  return (
    <section id='projects' ref={sectionRef} className='py-20 relative'>
      {/* Section background with subtle overlay */}
      <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'></div>

      <div className='container mx-auto px-4'>
        <div className='max-w-7xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-white relative z-10'>
              Featured Projects
            </h2>
            <p className='text-xl text-white/80 relative z-10'>
              A showcase of my recent work and side projects
            </p>
          </div>

          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className={`group glass macos-card border-white/20 overflow-hidden relative z-10 ${
                  project.featured ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                <div className='relative overflow-hidden'>
                  <img
                    src={project.image}
                    alt={project.title}
                    className='w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300'
                  />
                  <div className='absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300'></div>
                  <div className='absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                    <div className='flex space-x-2'>
                      <Button
                        size='sm'
                        variant='secondary'
                        className='bg-white/90 hover:bg-white text-black dark:text-black'
                        asChild
                      >
                        <a
                          href={project.github}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Github className='h-4 w-4' />
                        </a>
                      </Button>
                      {project.demo && (
                        <Button
                          size='sm'
                          variant='secondary'
                          className='bg-white/90 hover:bg-white text-black dark:text-black'
                          asChild
                        >
                          <a
                            href={project.demo}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            <ExternalLink className='h-4 w-4' />
                          </a>
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                <CardContent className='p-6'>
                  <h3 className='text-xl font-semibold mb-3 text-white'>
                    {project.title}
                  </h3>
                  <p className='text-white/80 mb-4 line-clamp-3'>
                    {project.description}
                  </p>
                  <div className='flex flex-wrap gap-2 mb-4'>
                    {project.technologies.map((tech) => (
                      <Badge
                        key={tech}
                        variant='secondary'
                        className='text-xs bg-white/20 text-white border-white/30'
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className='flex space-x-3'>
                    <Button
                      size='sm'
                      className='flex-1 bg-white/20 hover:bg-white/30 text-white border-white/30'
                      asChild
                    >
                      <a
                        href={project.github}
                        target='_blank'
                        rel='noopener noreferrer'
                      >
                        <Github className='h-4 w-4 mr-2' />
                        Code
                      </a>
                    </Button>
                    {project.demo && (
                      <Button
                        size='sm'
                        className='flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white'
                        asChild
                      >
                        <a
                          href={project.demo}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <Eye className='h-4 w-4 mr-2' />
                          Demo
                        </a>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className='text-center mt-12'>
            <Button
              size='lg'
              className='px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 glass text-white border-white/30 relative z-10'
              asChild
            >
              <a
                href='https://github.com/Thinhtran42?tab=repositories'
                target='_blank'
                rel='noopener noreferrer'
              >
                <Github className='h-5 w-5 mr-2' />
                View More on GitHub
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
