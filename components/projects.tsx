"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Project } from "@/types/project";

// Static projects data
const projectsData: Project[] = [
    {
        title: "Marketing Campaign Management Dashboard",
        description: "Developed an integrated dashboard for tracking multi-channel marketing campaigns, including social media performance, email metrics, and ROI analysis across different market segments.",
        image: "https://images.pexels.com/photos/669610/pexels-photo-669610.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Data Visualization", "Campaign Analytics", "Marketing Automation", "PowerBI", "Excel"],
        github: "https://github.com/msherazy/campaign-dashboard",
        featured: true,
    },
    {
        title: "Corporate Brand Asset Portfolio",
        description: "Created and managed a comprehensive collection of marketing materials, including digital posters, brochures, and social media content, maintaining brand consistency across all channels.",
        image: "https://images.pexels.com/photos/6476260/pexels-photo-6476260.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Adobe Creative Suite", "Brand Guidelines", "Digital Marketing", "Content Strategy"],
        github: "https://github.com/msherazy/brand-portfolio",
        featured: true,
    },
    {
        title: "Compliance Training Platform",
        description: "Designed and implemented an interactive compliance training system with progress tracking, certification management, and automated reporting features.",
        image: "https://images.pexels.com/photos/7376/startup-photos.jpg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["LMS Development", "Compliance Tracking", "Report Automation", "Training Analytics"],
        github: "https://github.com/msherazy/compliance-training",
        featured: false,
    },
    {
        title: "Sales Performance Analytics",
        description: "Built a comprehensive sales reporting system featuring daily broker performance metrics, pipeline analysis, and automated sales agenda generation.",
        image: "https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Sales Analytics", "Data Reporting", "Excel", "PowerBI", "Automation"],
        github: "https://github.com/msherazy/sales-analytics",
        featured: false,
    },
    {
        title: "Client Qualification System",
        description: "Developed a streamlined client qualification process with automated scoring, risk assessment, and documentation management capabilities.",
        image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Risk Assessment", "Process Automation", "Document Management", "CRM Integration"],
        github: "https://github.com/msherazy/client-qualification",
        featured: false,
    },
    {
        title: "Marketing Resource Hub",
        description: "Created a centralized platform for managing marketing assets, campaign materials, and collaborative tools for cross-functional team coordination.",
        image: "https://images.pexels.com/photos/3182773/pexels-photo-3182773.jpeg?auto=compress&cs=tinysrgb&w=600",
        technologies: ["Asset Management", "Team Collaboration", "Campaign Planning", "Resource Optimization"],
        github: "https://github.com/msherazy/marketing-hub",
        featured: false,
    }
];

export function Projects() {
	const sectionRef = useRef<HTMLElement>(null);
	const [projects, setProjects] = useState<Project[]>(projectsData);

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

	return (
		    <section id="projects" ref={sectionRef} className="py-8 md:py-16 relative">
			{/* Material Design 3 Background Elements */}
			<div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
			<div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-[#a8dadc]/10 to-[#457b9d]/10 rounded-full blur-3xl opacity-30 z-0"></div>
			<div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-tr from-[#e63946]/10 to-[#1d3557]/10 rounded-full blur-3xl opacity-30 z-0"></div>

			<div className="container mx-auto px-4">
				<div className="max-w-7xl mx-auto">
					{/* Material Design 3 Typography */}
					<div className="text-center mb-16 relative z-10">
						<h2 className="text-4xl md:text-5xl font-bold mb-4 text-[#1d3557] dark:text-[#f1faee]">
							Featured Projects
						</h2>
						<p className="text-xl text-[#1d3557]/80 dark:text-[#f1faee]/80 max-w-2xl mx-auto">
							A showcase of my recent work and side projects
						</p>
						{/* Material Design 3 decorative element */}
						<div className="h-1 w-24 bg-gradient-to-r from-[#457b9d] to-[#e63946] rounded-full mx-auto mt-8"></div>
					</div>

					{/* Material Design 3 Card Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project, index) => {
							// Alternate gradient colors for cards using our color palette
							const getCardGradient = (index: number) => {
								const gradients = [
									"from-[#457b9d]/10 to-[#1d3557]/10",
									"from-[#a8dadc]/10 to-[#457b9d]/10",
									"from-[#e63946]/10 to-[#457b9d]/10",
									"from-[#f1faee]/10 to-[#a8dadc]/10",
									"from-[#1d3557]/10 to-[#457b9d]/10",
									"from-[#457b9d]/10 to-[#a8dadc]/10"
								];
								return gradients[index % gradients.length];
							};
							
							return (
								<Card
									key={project.title}
									className={`group overflow-hidden relative z-10 border-none shadow-lg transition-all duration-300 hover:shadow-xl transform hover:translate-y-[-4px] flex flex-col h-full ${
										project.featured ? "md:col-span-2 lg:col-span-1" : ""
									}`}
									style={{
										borderRadius: '28px',
										background: 'rgba(241, 250, 238, 0.08)',
										backdropFilter: 'blur(20px)'
									}}
								>
									{/* Card background gradient - Standardized */}
									<div className="absolute inset-0 bg-gradient-to-br from-[#457b9d]/10 to-[#1d3557]/10 opacity-30 z-0" />
									
									{/* Image container with Material Design 3 styling - Fixed height */}
									<div className="relative overflow-hidden flex-shrink-0">
										<img
											src={project.image}
											alt={project.title}
											className="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110"
											style={{ objectPosition: 'center' }}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>
									
									{/* Content container with flex-grow and fixed structure */}
									<CardContent className="p-6 relative z-10 flex flex-col flex-grow">
										{/* Title - Fixed height area */}
										<div className="h-16 mb-3 flex items-start">
											<h3 className="text-xl font-semibold text-[#1d3557] dark:text-[#f1faee] line-clamp-2 leading-tight">
												{project.title}
											</h3>
										</div>
										
										{/* Description - Fixed height area */}
										<div className="h-20 mb-5 flex items-start">
											<p className="text-[#1d3557]/80 dark:text-[#f1faee]/80 text-sm line-clamp-4 leading-relaxed">
												{project.description}
											</p>
										</div>
										
										{/* Skills - Fixed height area with flex-grow */}
										<div className="flex-grow mb-5 min-h-[80px] flex items-start">
											<div className="flex flex-wrap gap-2 w-full">
												{project.technologies.map((tech) => (
													<Button
														key={tech}
														variant="outline"
														size="sm"
														className="text-xs bg-[#a8dadc]/10 hover:bg-[#a8dadc]/20 text-[#1d3557] dark:text-[#f1faee] border-[#a8dadc]/30 hover:border-[#a8dadc]/50 px-3 py-1 rounded-full transition-all duration-300 cursor-default"
														disabled
													>
														{tech}
													</Button>
												))}
											</div>
										</div>
										
										{/* Button - Fixed at bottom */}
										<div className="mt-auto">
											{(project.demo || project.github) && (
												<Button
													size="lg"
													className="w-full bg-gradient-to-r from-[#457b9d] to-[#1d3557] hover:from-[#3d6d8c] hover:to-[#152843] text-[#f1faee] border-none rounded-full py-6 transition-all duration-300 shadow-md hover:shadow-lg"
													asChild
												>
													<a
														href={project.demo || project.github}
														target="_blank"
														rel="noopener noreferrer"
													>
														<Eye className="h-5 w-5 mr-2" />
														View Project
													</a>
												</Button>
											)}
										</div>
									</CardContent>
								</Card>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}
