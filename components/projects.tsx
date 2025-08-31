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
		<section id="projects" ref={sectionRef} className="py-20 relative">
			{/* Material Design 3 Background Elements */}
			<div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>
			<div className="absolute top-40 right-10 w-96 h-96 bg-gradient-to-br from-purple-500/10 to-blue-500/10 rounded-full blur-3xl opacity-30 z-0"></div>
			<div className="absolute bottom-40 left-10 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-orange-500/10 rounded-full blur-3xl opacity-30 z-0"></div>

			<div className="container mx-auto px-4">
				<div className="max-w-7xl mx-auto">
					{/* Material Design 3 Typography */}
					<div className="text-center mb-16 relative z-10">
						<h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
							Featured Projects
						</h2>
						<p className="text-xl text-white/80 max-w-2xl mx-auto">
							A showcase of my recent work and side projects
						</p>
						{/* Material Design 3 decorative element */}
						<div className="h-1 w-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mx-auto mt-8"></div>
					</div>

					{/* Material Design 3 Card Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project, index) => {
							// Alternate gradient colors for cards
							const getCardGradient = (index: number) => {
								const gradients = [
									"from-purple-500/10 to-indigo-500/10",
									"from-teal-500/10 to-emerald-500/10",
									"from-amber-500/10 to-orange-500/10",
									"from-blue-500/10 to-sky-500/10",
									"from-pink-500/10 to-rose-500/10",
									"from-indigo-500/10 to-blue-500/10"
								];
								return gradients[index % gradients.length];
							};
							
							return (
								<Card
									key={project.title}
									className={`group overflow-hidden relative z-10 border-none shadow-lg transition-all duration-300 hover:shadow-xl transform hover:translate-y-[-4px] ${
										project.featured ? "md:col-span-2 lg:col-span-1" : ""
									}`}
									style={{
										borderRadius: '24px',
										background: 'rgba(255, 255, 255, 0.08)',
										backdropFilter: 'blur(20px)'
									}}
								>
									{/* Card background gradient */}
									<div className={`absolute inset-0 bg-gradient-to-br ${getCardGradient(index)} opacity-30 z-0`} />
									
									{/* Image container with Material Design 3 styling */}
									<div className="relative overflow-hidden">
										<img
											src={project.image}
											alt={project.title}
											className="w-full h-56 object-cover transition-all duration-500 group-hover:scale-110"
											style={{ objectPosition: 'center' }}
										/>
										<div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
									</div>
									
									<CardContent className="p-6 relative z-10">
										{/* Material Design 3 Typography */}
										<h3 className="text-xl font-semibold mb-3 text-white">
											{project.title}
										</h3>
										<p className="text-white/80 mb-5 line-clamp-3">
											{project.description}
										</p>
										
										{/* Material Design 3 Chips */}
										<div className="flex flex-wrap gap-2 mb-5">
											{project.technologies.map((tech) => (
												<Badge
													key={tech}
													variant="secondary"
													className="text-xs bg-white/15 text-white border-none px-3 py-1 rounded-full transition-all duration-300 hover:bg-white/25"
												>
													{tech}
												</Badge>
											))}
										</div>
										
										{/* Material Design 3 Button */}
										{(project.demo || project.github) && (
											<div className="flex">
												<Button
													size="lg"
													className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-none rounded-full py-6 transition-all duration-300 shadow-md hover:shadow-lg"
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
											</div>
										)}
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
