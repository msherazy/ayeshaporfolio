"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { SkillCategory } from "@/types/portfolio";
import {
    FileText,
    Users,
    Calendar,
    Palette,
    Smartphone,
    PenTool,
    Megaphone,
    Handshake,
    ShieldCheck,
    Clock,
    Building,
    FileSearch,
    Database,
    Code,
    Globe,
    Mail,
    BarChart3,
    Zap,
    Lock,
    Settings,
    Cloud,
    GitBranch,
    Server,
    Monitor
} from 'lucide-react';

export function Skills() {
    const sectionRef = useRef<HTMLElement>(null);
    const [skillsData, setSkillsData] = useState<SkillCategory[]>([]);
    const [loading, setLoading] = useState(true);

    // Fallback data with updated structure
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
                setSkillsData(fallbackData);
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

    // Icon mapping for skills
    const skillIconMap: Record<string, React.ElementType> = {
        // Administrative Skills
        "Microsoft Office Suite": Database,
        "Document Control": FileText,
        "HR Support": Users,
        "Cross-Departmental Coordination": GitBranch,
        "Legal Recordkeeping": FileSearch,

        // Marketing & Content
        "Design Tools (Canva, Adobe)": Palette,
        "Social Media Management": Smartphone,
        "Content Creation": PenTool,
        "Digital Marketing": Megaphone,

        // Professional Attributes
        "Client Service Orientation": Handshake,
        "Professionalism": ShieldCheck,
        "Work Ethic": Clock,
        "Versatility": Settings,

        // Additional mappings for future use
        "Real Estate Operations": Building,
        "Property Conveyancing": FileText,
        "Research & Data Analysis": BarChart3,
        "Event Management": Calendar,
        "Web Development": Code,
        "Mobile Development": Smartphone,
        "UI/UX Design": Palette,
        "Email Marketing": Mail,
        "SEO": Globe,
        "Performance Optimization": Zap,
        "Cybersecurity": Lock,
        "Cloud Services": Cloud,
        "Server Management": Server,
        "Quality Assurance": Monitor
    };

    // Get icon component for a skill
    const getSkillIcon = (skillName: string) => {
        const IconComponent = skillIconMap[skillName] || Database;
        return <IconComponent className="w-4 h-4" />;
    };

    // Semantic color mapping for skill categories
    const categoryColors: Record<string, string> = {
        "Administrative Skills": "bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border-purple-400/30",
        "Marketing & Content": "bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border-emerald-400/30",
        "Professional Attributes": "bg-gradient-to-r from-amber-500/20 to-orange-500/20 border-amber-400/30",
        default: "bg-gradient-to-r from-gray-500/20 to-slate-500/20 border-gray-400/30"
    };

    const getCategoryColor = (categoryTitle: string) => {
        return categoryColors[categoryTitle] || categoryColors.default;
    };

    // Generate technologies list
    const technologies = skillsData.reduce((acc: {name: string, category: string}[], category) => {
        const newSkills = category.skills
            .map(skill => ({ name: skill, category: category.title }))
            .filter(skillObj => !acc.some(t => t.name === skillObj.name));
        return [...acc, ...newSkills];
    }, []);

    // Icon mapping for technologies
    const techIconMap: Record<string, React.ElementType> = {
        ...skillIconMap,
        "JavaScript": Code,
        "TypeScript": Code,
        "React": Code,
        "Node.js": Server,
        "Python": Code,
        "SQL": Database,
        "AWS": Cloud,
        "Docker": Server,
        "Git": GitBranch,
        "Figma": Palette,
        "Photoshop": Palette,
        "Illustrator": Palette,
        "WordPress": Globe,
    };

    const getTechIcon = (techName: string) => {
        const IconComponent = techIconMap[techName] || Database;
        return <IconComponent className="w-4 h-4" />;
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
                            {[1, 2, 3].map((i) => (
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
                            Skills & Expertise
                        </h2>
                        <p className='text-xl text-white/80 relative z-10'>
                            My professional capabilities across different domains
                        </p>
                    </div>

                    {/* Skill Categories */}
                    <div className='grid md:grid-cols-2 gap-8 mb-16'>
                        {skillsData.map((category) => (
                            <Card
                                key={category.id}
                                className={`glass macos-card border transition-all duration-300 hover:scale-[1.02] ${getCategoryColor(category.title)}`}
                            >
                                <CardContent className='p-6'>
                                    <div className='flex items-center mb-6'>
                                        <span className='text-2xl mr-3'>{category.icon}</span>
                                        <h3 className='text-xl font-semibold text-white'>
                                            {category.title}
                                        </h3>
                                    </div>

                                    <div className='space-y-3'>
                                        {category.skills.map((skill, skillIndex) => (
                                            <div
                                                key={skillIndex}
                                                className='flex items-center p-3 rounded-lg bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/20 transition-all duration-200'
                                            >
                                                <div className='mr-3 text-white/80'>
                                                    {getSkillIcon(skill)}
                                                </div>
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

                    {/* Technology Stack */}
                    {technologies.length > 0 && (
                        <Card className='glass macos-card border-white/20 relative z-10'>
                            <CardContent className='p-8'>
                                <h3 className='text-2xl font-semibold mb-6 text-center text-white'>
                                    Technology Stack
                                </h3>
                                <div className='flex flex-wrap gap-3 justify-center'>
                                    {technologies.map((tech, index) => (
                                        <div
                                            key={index}
                                            className='flex items-center px-4 py-2 bg-white/10 border border-white/20 rounded-full text-sm text-white/90 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 cursor-pointer group'
                                        >
                      <span className='mr-2 text-white/80 group-hover:text-white transition-colors'>
                        {getTechIcon(tech.name)}
                      </span>
                                            {tech.name}
                                        </div>
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