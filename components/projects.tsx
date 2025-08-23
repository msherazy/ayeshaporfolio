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
		description:
			"Developed an integrated dashboard for tracking multi-channel marketing campaigns, including social media performance, email metrics, and ROI analysis across different market segments.",
		image: "/images/ayesha-portfolio-image.png",
		technologies: [
			"Data Visualization",
			"Campaign Analytics",
			"Marketing Automation",
			"PowerBI",
			"Excel",
		],
		featured: true,
	},
	{
		title: "Corporate Brand Asset Portfolio",
		description:
			"Created and managed a comprehensive collection of marketing materials, including digital posters, brochures, and social media content, maintaining brand consistency across all channels.",
		image: "/images/avatar.png",
		technologies: [
			"Adobe Creative Suite",
			"Brand Guidelines",
			"Digital Marketing",
			"Content Strategy",
		],
		featured: true,
	},
	{
		title: "Compliance Training Platform",
		description:
			"Designed and implemented an interactive compliance training system with progress tracking, certification management, and automated reporting features.",
		image: "/images/ayesha-portfolio-image.png",
		technologies: [
			"LMS Development",
			"Compliance Tracking",
			"Report Automation",
			"Training Analytics",
		],
		featured: false,
	},
	{
		title: "Sales Performance Analytics",
		description:
			"Built a comprehensive sales reporting system featuring daily broker performance metrics, pipeline analysis, and automated sales agenda generation.",
		image: "/images/avatar.png",
		technologies: ["Sales Analytics", "Data Reporting", "Excel", "PowerBI", "Automation"],
		featured: false,
	},
	{
		title: "Client Qualification System",
		description:
			"Developed a streamlined client qualification process with automated scoring, risk assessment, and documentation management capabilities.",
		image: "/images/ayesha-portfolio-image.png",
		technologies: [
			"Risk Assessment",
			"Process Automation",
			"Document Management",
			"CRM Integration",
		],
		featured: false,
	},
	{
		title: "Marketing Resource Hub",
		description:
			"Created a centralized platform for managing marketing assets, campaign materials, and collaborative tools for cross-functional team coordination.",
		image: "/images/avatar.png",
		technologies: [
			"Asset Management",
			"Team Collaboration",
			"Campaign Planning",
			"Resource Optimization",
		],
		featured: false,
	},
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
			{/* Section background with subtle overlay */}
			<div className="absolute inset-0 bg-white/5 backdrop-blur-sm"></div>

			<div className="container mx-auto px-4">
				<div className="max-w-7xl mx-auto">
					<div className="text-center mb-16">
						<h2 className="text-4xl md:text-5xl font-bold mb-4 text-white relative z-10">
							Featured Projects
						</h2>
						<p className="text-xl text-white/80 relative z-10">
							A showcase of my recent work and side projects
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{projects.map((project, index) => (
							<Card
								key={project.title}
								className={`group glass macos-card border-white/20 overflow-hidden relative z-10 ${
									project.featured ? "md:col-span-2 lg:col-span-1" : ""
								}`}
							>
								<div className="relative overflow-hidden">
									<img
										src={project.image}
										alt={project.title}
										className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
									/>
									<div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300"></div>
								</div>
								<CardContent className="p-6">
									<h3 className="text-xl font-semibold mb-3 text-white">
										{project.title}
									</h3>
									<p className="text-white/80 mb-4 line-clamp-3">
										{project.description}
									</p>
									<div className="flex flex-wrap gap-2 mb-4">
										{project.technologies.map((tech) => (
											<Badge
												key={tech}
												variant="secondary"
												className="text-xs bg-white/20 text-white border-white/30"
											>
												{tech}
											</Badge>
										))}
									</div>
									{project.demo && (
										<div className="flex">
											<Button
												size="sm"
												className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
												asChild
											>
												<a
													href={project.demo}
													target="_blank"
													rel="noopener noreferrer"
												>
													<Eye className="h-4 w-4 mr-2" />
													View Project
												</a>
											</Button>
										</div>
									)}
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
