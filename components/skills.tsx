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

    // Updated Skills & Expertise data organized into 2 parent categories
    const parentCategories = [
        {
            id: "parent-1",
            title: "Core Professional Skills",
            icon: "🏢",
            description: "Essential business and professional capabilities",
            subCategories: [
                {
                    id: "sub-1",
            title: "Administrative Skills",
            icon: "📋",
            skills: [
                "Document Control",
                "HR Support",
                "Cross-Departmental Coordination",
                "Legal Recordkeeping",
                        "CRM & Property Management Systems",
                        "Compliance & Regulatory Knowledge"
                    ]
                },
                {
                    id: "sub-2",
                    title: "Marketing & Content",
                    icon: "🎨",
                    skills: [
                        "Social Media Management",
                        "Content Creation",
                        "Digital Marketing",
                        "Content & Digital Marketing Strategy"
                    ]
                },
                {
                    id: "sub-3",
                    title: "Professional Attributes",
                    icon: "🤝",
                    skills: [
                        "Client Service Orientation", 
                        "Professionalism", 
                        "Work Ethic", 
                        "Versatility"
                    ]
                },
                {
                    id: "sub-4",
                    title: "Digital & Analytics",
                    icon: "📊",
                    skills: [
                        "Digital Transformation & Process Automation",
                        "Data Management & Reporting",
                        "Customer Experience (CX) Tools",
                        "Business Intelligence"
                    ]
                }
            ],
            order: 0,
            createdAt: new Date(),
            updatedAt: new Date()
        },
        {
            id: "parent-2",
            title: "Technical Tools & Platforms",
            icon: "🛠️",
            description: "Software tools and technology platforms",
            subCategories: [
                {
                    id: "tech-1",
                    title: "Office & Productivity",
                    icon: "💻",
                    skills: ["Microsoft Office Suite", "Google Workspace"]
                },
                {
                    id: "tech-2",
                    title: "Design Tools",
            icon: "🎨",
                    skills: ["Canva", "Adobe Photoshop", "Adobe Lightroom"]
                },
                {
                    id: "tech-3",
                    title: "CRM & ERP",
                    icon: "🏢",
            skills: [
                        "Salesforce", 
                        "Zoho CRM", 
                        "Property Finder", 
                        "Bayut Tools", 
                        "SAP SuccessFactors", 
                        "Oracle HR", 
                        "Microsoft Dynamics"
                    ]
                },
                {
                    id: "tech-4",
                    title: "Marketing & Communication",
                    icon: "📢",
                    skills: ["Meta Business Suite", "Google Ads", "Mailchimp"]
                },
                {
                    id: "tech-5",
                    title: "Data & Analytics",
                    icon: "📊",
                    skills: ["Excel (Advanced)", "Power BI (Entry-Level)", "Google Analytics"]
                }
            ],
            order: 1,
            createdAt: new Date(),
            updatedAt: new Date()
        }
    ];

    // Keep fallbackData for compatibility but it won't be used
    const fallbackData: SkillCategory[] = [];

    useEffect(() => {
        // No need to fetch data since we have static parentCategories
        setLoading(false);
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
        "Business Intelligence": BarChart3,

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
            <section id='skills' className='py-8 md:py-16 relative'>
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
        <section id='skills' ref={sectionRef} className='py-8 md:py-16 relative'>
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

                    {/* Parent Categories - 2 Main Cards */}
                    <div className='grid md:grid-cols-2 gap-8 mb-16'>
                        {parentCategories.map((parentCategory, parentIndex) => {
                            const getParentGradient = () => {
                                return parentIndex === 0 
                                    ? "linear-gradient(135deg, #457b9d 0%, #1d3557 100%)"
                                    : "linear-gradient(135deg, #a8dadc 0%, #457b9d 100%)";
                            };
                            
                            return (
                                <Card
                                    key={parentCategory.id}
                                    className="border-none shadow-lg overflow-hidden relative transition-all duration-300 hover:shadow-xl h-full"
                                    style={{
                                        borderRadius: '28px',
                                        background: 'rgba(241, 250, 238, 0.08)',
                                        backdropFilter: 'blur(20px)'
                                    }}
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br opacity-20 z-0"
                                        style={{
                                            background: getParentGradient()
                                        }}
                                    />
                                    
                                    <CardContent className='p-8 relative z-10'>
                                        {/* Parent Category Header */}
                                        <div className='flex items-center mb-6'>
                                            <div className="p-4 rounded-full mr-4" 
                                                style={{
                                                    background: getParentGradient(),
                                                    boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
                                                }}
                                            >
                                                <span className='text-3xl'>{parentCategory.icon}</span>
                                            </div>
                                            <div>
                                                <h3 className='text-2xl font-bold text-[#1d3557] dark:text-[#f1faee] mb-1'>
                                                    {parentCategory.title}
                                                </h3>
                                                <p className='text-sm text-[#1d3557]/70 dark:text-[#f1faee]/70'>
                                                    {parentCategory.description}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Sub Categories Grid */}
                                        <div className='space-y-6'>
                                            {parentCategory.subCategories.map((subCategory, subIndex) => (
                                                <div key={subCategory.id} className='border-l-4 border-[#a8dadc]/30 pl-4'>
                                                    <div className='flex items-center mb-3'>
                                                        <span className='text-lg mr-2'>{subCategory.icon}</span>
                                                        <h4 className='text-lg font-semibold text-[#1d3557] dark:text-[#f1faee]'>
                                                            {subCategory.title}
                                                        </h4>
                                                    </div>
                                                    <div className='flex flex-wrap gap-1.5 md:gap-2'>
                                                        {subCategory.skills.map((skill, skillIndex) => {
                                                            // Define gradient backgrounds for skill chips like contact items
                                                            const getSkillGradient = () => {
                                                                switch(skillIndex % 4) {
                                                                    case 0: return "from-[#457b9d]/20 to-[#a8dadc]/20";
                                                                    case 1: return "from-[#a8dadc]/20 to-[#f1faee]/20";
                                                                    case 2: return "from-[#e63946]/20 to-[#457b9d]/20";
                                                                    case 3: return "from-[#1d3557]/20 to-[#457b9d]/20";
                                                                    default: return "from-[#a8dadc]/20 to-[#457b9d]/20";
                                                                }
                                                            };
                                                            
                                                            return (
                                                                <div
                                                                    key={skillIndex}
                                                                    className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs bg-gradient-to-r ${getSkillGradient()} backdrop-blur-sm text-[#1d3557] dark:text-[#f1faee] transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
                                                                    style={{ boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                                                >
                                                                    <span className='mr-1 p-1 rounded-full bg-white/15'>
                                                                        {getSkillIcon(skill)}
                                                                    </span>
                                                                    {skill}
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                </div>
                                            ))}
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