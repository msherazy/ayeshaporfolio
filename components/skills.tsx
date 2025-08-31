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

    // Updated Skills & Expertise data with professional capabilities
    const fallbackData: SkillCategory[] = [
        {
            id: "fallback-1",
            title: "Administrative Skills",
            icon: "📋",
            skills: [
                "Document Control",
                "HR Support",
                "Cross-Departmental Coordination",
                "Legal Recordkeeping",
                "CRM & Property Management Systems",
                "Compliance & Regulatory Knowledge"
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
                "Social Media Management",
                "Content Creation",
                "Digital Marketing",
                "Content & Digital Marketing Strategy"
            ],
            order: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "fallback-3",
            title: "Professional Attributes",
            icon: "🤝",
            skills: [
                "Client Service Orientation", 
                "Professionalism", 
                "Work Ethic", 
                "Versatility",
                "Digital Transformation & Process Automation",
                "Data Management & Reporting",
                "Customer Experience (CX) Tools"
            ],
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
        "Document Control": FileText,
        "HR Support": Users,
        "Cross-Departmental Coordination": GitBranch,
        "Legal Recordkeeping": FileSearch,
        "CRM & Property Management Systems": Building,
        "Compliance & Regulatory Knowledge": ShieldCheck,

        // Marketing & Content
        "Social Media Management": Smartphone,
        "Content Creation": PenTool,
        "Digital Marketing": Megaphone,
        "Content & Digital Marketing Strategy": Globe,

        // Professional Attributes
        "Client Service Orientation": Handshake,
        "Professionalism": ShieldCheck,
        "Work Ethic": Clock,
        "Versatility": Settings,
        "Digital Transformation & Process Automation": Zap,
        "Data Management & Reporting": BarChart3,
        "Customer Experience (CX) Tools": Users,

        // Additional mappings for tools
        "Microsoft Office Suite": Database,
        "Google Workspace": Cloud,
        "Canva": Palette,
        "Adobe Photoshop": Palette,
        "Adobe Lightroom": Palette,
        "Salesforce": Building,
        "Zoho CRM": Building,
        "Property Finder": Building,
        "Bayut Tools": Building,
        "SAP SuccessFactors": Database,
        "Oracle HR": Database,
        "Microsoft Dynamics": Database,
        "Meta Business Suite": Globe,
        "Google Ads": Globe,
        "Mailchimp": Mail,
        "Excel (Advanced)": BarChart3,
        "Power BI (Entry-Level)": BarChart3,
        "Google Analytics": BarChart3
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
                        <h2 className='text-4xl md:text-5xl font-bold mb-4 text-[#1d3557] dark:text-[#f1faee] relative z-10'>
                            Skills & Expertise
                        </h2>
                        <p className='text-xl text-[#1d3557]/80 dark:text-[#f1faee]/80 relative z-10'>
                            My professional capabilities across different domains
                        </p>
                    </div>

                    {/* Skill Categories - Material Design 3 Style */}
                                        <div className='grid md:grid-cols-3 gap-6 mb-16'>
                        {skillsData.map((category) => {
                            // Define gradient based on category
                            const getGradient = () => {
                                switch(category.title) {
                                    case "Administrative Skills":
                                        return "linear-gradient(135deg, #457b9d 0%, #1d3557 100%)";
                                    case "Marketing & Content":
                                        return "linear-gradient(135deg, #a8dadc 0%, #457b9d 100%)";
                                    case "Professional Attributes":
                                        return "linear-gradient(135deg, #e63946 0%, #457b9d 100%)";
                                    default:
                                        return "linear-gradient(135deg, #457b9d 0%, #1d3557 100%)";
                                }
                            };
                            
                            return (
                            <Card
                                key={category.id}
                                    className="glass border-none shadow-lg overflow-hidden relative transition-all duration-300 hover:shadow-xl h-full"
                                    style={{
                                        borderRadius: '28px',
                                        background: 'rgba(241, 250, 238, 0.08)',
                                        backdropFilter: 'blur(20px)'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-20 z-0"
                                        style={{
                                            background: getGradient()
                                        }}
                                    />
                                    
                                    <CardContent className='p-8 relative z-10'>
                                        <div className='flex items-center mb-8'>
                                            <div className="p-3 rounded-full mr-4" 
                                                style={{
                                                    background: getGradient(),
                                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                                }}
                                            >
                                                <span className='text-2xl'>{category.icon}</span>
                                            </div>
                                            <h3 className='text-xl font-semibold text-[#1d3557] dark:text-[#f1faee]'>
                                            {category.title}
                                        </h3>
                                    </div>

                                        <div className='space-y-4'>
                                        {category.skills.map((skill, skillIndex) => (
                                            <div
                                                key={skillIndex}
                                                    className='flex items-center p-4 rounded-2xl bg-white/10 hover:bg-white/15 transition-all duration-300 transform hover:translate-y-[-2px]'
                                                    style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                            >
                                                    <div className='mr-4 p-2 rounded-full bg-white/15'>
                                                    {getSkillIcon(skill)}
                                                </div>
                                                    <span className='text-sm font-medium text-[#1d3557] dark:text-[#f1faee]'>
                          {skill}
                        </span>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                            );
                        })}
                    </div>

                    {/* Technology Stack - Material Design 3 Style with Grouped Categories */}
                    <Card 
                        className='relative z-10 border-none shadow-lg overflow-hidden mt-16'
                        style={{
                            borderRadius: '28px',
                            background: 'rgba(241, 250, 238, 0.08)',
                            backdropFilter: 'blur(20px)'
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-[#a8dadc]/20 to-[#1d3557]/20 opacity-30 z-0" />
                        
                        <CardContent className='p-10 relative z-10'>
                            <h3 className='text-2xl font-semibold mb-8 text-center text-[#1d3557] dark:text-[#f1faee]'>
                                    Technology Stack
                                </h3>
                            
                            {/* Office & Productivity */}
                            <div className="mb-10">
                                <h4 className="text-lg font-semibold mb-4 text-[#1d3557] dark:text-[#f1faee] border-b border-[#a8dadc]/30 pb-2">
                                    Office & Productivity
                                </h4>
                                <div className='flex flex-wrap gap-3'>
                                    {["Microsoft Office Suite", "Google Workspace"].map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#457b9d]/30 to-[#a8dadc]/30 hover:from-[#457b9d]/40 hover:to-[#a8dadc]/40 border-none rounded-full text-sm text-[#1d3557] dark:text-[#f1faee] backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                        >
                                            <span className='mr-2 p-1.5 bg-white/15 rounded-full'>
                                                {getSkillIcon(tech)}
                                            </span>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Design Tools */}
                            <div className="mb-10">
                                <h4 className="text-lg font-semibold mb-4 text-[#1d3557] dark:text-[#f1faee] border-b border-[#a8dadc]/30 pb-2">
                                    Design Tools
                                </h4>
                                <div className='flex flex-wrap gap-3'>
                                    {["Canva", "Adobe Photoshop", "Adobe Lightroom"].map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#e63946]/30 to-[#457b9d]/30 hover:from-[#e63946]/40 hover:to-[#457b9d]/40 border-none rounded-full text-sm text-[#1d3557] dark:text-[#f1faee] backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                        >
                                            <span className='mr-2 p-1.5 bg-white/15 rounded-full'>
                                                {getSkillIcon(tech)}
                                            </span>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* CRM & ERP */}
                            <div className="mb-10">
                                <h4 className="text-lg font-semibold mb-4 text-[#1d3557] dark:text-[#f1faee] border-b border-[#a8dadc]/30 pb-2">
                                    CRM & ERP
                                </h4>
                                <div className='flex flex-wrap gap-3'>
                                    {[
                                        "Salesforce", 
                                        "Zoho CRM", 
                                        "Property Finder", 
                                        "Bayut Tools", 
                                        "SAP SuccessFactors", 
                                        "Oracle HR", 
                                        "Microsoft Dynamics"
                                    ].map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#1d3557]/30 to-[#457b9d]/30 hover:from-[#1d3557]/40 hover:to-[#457b9d]/40 border-none rounded-full text-sm text-[#1d3557] dark:text-[#f1faee] backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                        >
                                            <span className='mr-2 p-1.5 bg-white/15 rounded-full'>
                                                {getSkillIcon(tech)}
                                            </span>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Marketing & Communication */}
                            <div className="mb-10">
                                <h4 className="text-lg font-semibold mb-4 text-[#1d3557] dark:text-[#f1faee] border-b border-[#a8dadc]/30 pb-2">
                                    Marketing & Communication
                                </h4>
                                <div className='flex flex-wrap gap-3'>
                                    {["Meta Business Suite", "Google Ads", "Mailchimp"].map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#a8dadc]/30 to-[#457b9d]/30 hover:from-[#a8dadc]/40 hover:to-[#457b9d]/40 border-none rounded-full text-sm text-[#1d3557] dark:text-[#f1faee] backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                        >
                                            <span className='mr-2 p-1.5 bg-white/15 rounded-full'>
                                                {getSkillIcon(tech)}
                                            </span>
                                            {tech}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Data & Analytics */}
                            <div>
                                <h4 className="text-lg font-semibold mb-4 text-[#1d3557] dark:text-[#f1faee] border-b border-[#a8dadc]/30 pb-2">
                                    Data & Analytics
                                </h4>
                                <div className='flex flex-wrap gap-3'>
                                    {["Excel (Advanced)", "Power BI (Entry-Level)", "Google Analytics"].map((tech, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center px-4 py-2 bg-gradient-to-r from-[#457b9d]/30 to-[#1d3557]/30 hover:from-[#457b9d]/40 hover:to-[#1d3557]/40 border-none rounded-full text-sm text-[#1d3557] dark:text-[#f1faee] backdrop-blur-sm transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                                            style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}
                                        >
                                            <span className='mr-2 p-1.5 bg-white/15 rounded-full'>
                                                {getSkillIcon(tech)}
                      </span>
                                            {tech}
                                        </div>
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