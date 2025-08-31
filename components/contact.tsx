"use client";

import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
} from "lucide-react";
import { contactInfoService } from "@/lib/portfolioService";
import { ContactInfo } from "@/types/portfolio";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactData, setContactData] = useState<ContactInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const data = await contactInfoService.getContactInfo();
        if (data) {
          setContactData(data);
        }
      } catch (error) {
        console.error('Error fetching contact data:', error);
        // Will use fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchContactData();
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Thank you for your message! I'll get back to you soon.");
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 1000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Use API data if available, otherwise use fallback
  const currentData = {
      email: "ayeshafayaz97@gmail.com",
      phone: "+971 58 590 2781",
      location: "Dubai, UAE",
      socialLinks: {
          github: "",
          linkedin: "https://linkedin.com/in/ayesha-fayaz-42717524a",
          twitter: "",
          facebook: "",
          instagram: ""
      },
      contactFormEmail: "Ayeshafayaz97@gmail.com"
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      content: currentData.email,
      href: `mailto:${currentData.email}`,
    },
    {
      icon: Phone,
      title: "Phone",
      content: currentData.phone || "Contact me via email",
      href: currentData.phone ? `tel:${currentData.phone.replace(/[^\d+]/g, '')}` : `mailto:${currentData.email}`,
    },
    {
      icon: MapPin,
      title: "Location",
      content: currentData.location,
      href: `https://maps.google.com/?q=${encodeURIComponent(currentData.location)}`,
    },
  ];

  const socialLinks = [
    currentData?.socialLinks?.github && {
      icon: Github,
      href: currentData?.socialLinks?.github,
      label: "GitHub",
    },
    currentData?.socialLinks?.linkedin && {
      icon: Linkedin,
      href: currentData?.socialLinks?.linkedin,
      label: "LinkedIn",
    },
    currentData?.socialLinks?.twitter && {
      icon: Twitter,
      href: currentData?.socialLinks?.twitter,
      label: "Twitter",
    },
  ].filter(Boolean);

  if (loading) {
    return (
      <section id='contact' className='py-20 relative'>
        <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'></div>
        <div className='container mx-auto px-4'>
          <div className='max-w-6xl mx-auto'>
            <div className='text-center mb-16'>
              <div className='animate-pulse space-y-4'>
                <div className='h-12 bg-white/20 rounded mx-auto w-72'></div>
                <div className='h-6 bg-white/20 rounded mx-auto w-96'></div>
              </div>
            </div>
            <div className='grid lg:grid-cols-2 gap-12'>
              <Card className='glass macos-card border-white/20'>
                <CardContent className='p-8'>
                  <div className='animate-pulse space-y-6'>
                    <div className='h-8 bg-white/20 rounded w-48'></div>
                    <div className='grid sm:grid-cols-2 gap-4'>
                      <div className='h-20 bg-white/20 rounded'></div>
                      <div className='h-20 bg-white/20 rounded'></div>
                    </div>
                    <div className='h-20 bg-white/20 rounded'></div>
                    <div className='h-32 bg-white/20 rounded'></div>
                    <div className='h-12 bg-white/20 rounded'></div>
                  </div>
                </CardContent>
              </Card>
              <div className='space-y-8'>
                {[1, 2, 3].map((i) => (
                  <Card key={i} className='glass macos-card border-white/20'>
                    <CardContent className='p-8'>
                      <div className='animate-pulse space-y-4'>
                        <div className='h-8 bg-white/20 rounded w-32'></div>
                        <div className='space-y-4'>
                          {[1, 2, 3].map((j) => (
                            <div key={j} className='flex items-center space-x-4'>
                              <div className='h-12 w-12 bg-white/20 rounded-full'></div>
                              <div className='space-y-2 flex-1'>
                                <div className='h-4 bg-white/20 rounded w-24'></div>
                                <div className='h-4 bg-white/20 rounded w-32'></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id='contact' ref={sectionRef} className='py-20 relative'>
      {/* Section background with subtle overlay */}
      <div className='absolute inset-0 bg-white/5 backdrop-blur-sm'></div>

      <div className='container mx-auto px-4'>
        <div className='max-w-6xl mx-auto'>
          <div className='text-center mb-16'>
            <h2 className='text-4xl md:text-5xl font-bold mb-4 text-white relative z-10'>
              Get In Touch
            </h2>
            <p className='text-xl text-white/80 relative z-10'>
              Let&apos;s discuss your next project or just say hello
            </p>
          </div>

          <div className='grid lg:grid-cols-3 gap-8 items-stretch'>
            {/* Contact Information Card - Enhanced Design */}
            <div className='lg:col-span-1'>
              <Card 
                className='relative z-10 h-full border-none shadow-lg overflow-hidden'
                style={{
                  borderRadius: '28px',
                  background: 'rgba(241, 250, 238, 0.08)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Card background gradient - Standardized */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#457b9d]/10 to-[#1d3557]/10 opacity-30 z-0" />
                
                <CardContent className='p-8 relative z-10'>
                  {/* Header with decorative element */}
                  <div className='mb-8'>
                    <h3 className='text-2xl font-bold mb-3 text-[#1d3557] dark:text-[#f1faee]'>
                      Contact Information
                    </h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-[#457b9d] to-[#e63946] rounded-full"></div>
                  </div>
                  
                  <div className='space-y-6'>
                    {contactInfo.map((info, index) => {
                      // Define gradient backgrounds for each contact item
                      const getContactGradient = () => {
                        switch(index) {
                          case 0: return "from-[#457b9d]/20 to-[#a8dadc]/20";
                          case 1: return "from-[#a8dadc]/20 to-[#f1faee]/20";
                          case 2: return "from-[#e63946]/20 to-[#457b9d]/20";
                          default: return "from-[#a8dadc]/20 to-[#457b9d]/20";
                        }
                      };
                      
                      return (
                        <a
                          key={index}
                          href={info.href}
                          target={info.href.startsWith("http") ? "_blank" : undefined}
                          rel={info.href.startsWith("http") ? "noopener noreferrer" : undefined}
                          className={`flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r ${getContactGradient()} backdrop-blur-sm transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg`}
                          style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                        >
                          <div className='p-3 bg-white/20 rounded-full shadow-lg'>
                            <info.icon className='h-6 w-6 text-[#1d3557] dark:text-[#f1faee]' />
                          </div>
                          <div>
                            <h4 className='font-semibold text-[#1d3557] dark:text-[#f1faee] text-base'>
                              {info.title}
                            </h4>
                            <p className='text-[#1d3557]/70 dark:text-[#f1faee]/70 text-sm'>{info.content}</p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form - Enhanced Design */}
            <div className='lg:col-span-2'>
              <Card 
                className='relative z-10 border-none shadow-lg overflow-hidden'
                style={{
                  borderRadius: '28px',
                  background: 'rgba(241, 250, 238, 0.08)',
                  backdropFilter: 'blur(20px)'
                }}
              >
                {/* Card background gradient - Standardized */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#457b9d]/10 to-[#1d3557]/10 opacity-30 z-0" />
                
                <CardContent className='p-8 relative z-10'>
                  {/* Header with decorative element */}
                  <div className='mb-8'>
                    <h3 className='text-2xl font-bold mb-3 text-[#1d3557] dark:text-[#f1faee]'>
                      Send me a message
                    </h3>
                    <div className="h-1 w-16 bg-gradient-to-r from-[#457b9d] to-[#e63946] rounded-full"></div>
                  </div>
                  
                  <form onSubmit={handleSubmit} className='space-y-6'>
                    <div className='grid sm:grid-cols-2 gap-6'>
                      <div className='relative group'>
                        <Label htmlFor='name' className='absolute -top-2 left-3 px-2 text-xs bg-gradient-to-r from-[#457b9d] to-[#1d3557] rounded text-white z-10 font-medium shadow-lg'>
                          Name
                        </Label>
                        <Input
                          id='name'
                          name='name'
                          value={formData.name}
                          onChange={handleChange}
                          placeholder='Your name'
                          className='bg-white/10 border-[#457b9d]/50 text-[#1d3557] dark:text-[#f1faee] placeholder:text-[#1d3557]/50 dark:placeholder:text-[#f1faee]/50 pt-4 transition-all duration-300 focus:ring-2 focus:ring-[#a8dadc]/50 focus:border-[#a8dadc] hover:border-[#a8dadc] text-base rounded-xl'
                          required
                        />
                      </div>
                      <div className='relative group'>
                        <Label htmlFor='email' className='absolute -top-2 left-3 px-2 text-xs bg-gradient-to-r from-[#457b9d] to-[#1d3557] rounded text-white z-10 font-medium shadow-lg'>
                          Email
                        </Label>
                        <Input
                          id='email'
                          name='email'
                          type='email'
                          value={formData.email}
                          onChange={handleChange}
                          placeholder='your@email.com'
                          className='bg-white/10 border-[#457b9d]/50 text-[#1d3557] dark:text-[#f1faee] placeholder:text-[#1d3557]/50 dark:placeholder:text-[#f1faee]/50 pt-4 transition-all duration-300 focus:ring-2 focus:ring-[#a8dadc]/50 focus:border-[#a8dadc] hover:border-[#a8dadc] text-base rounded-xl'
                          required
                        />
                      </div>
                    </div>
                    <div className='relative group'>
                      <Label htmlFor='subject' className='absolute -top-2 left-3 px-2 text-xs bg-gradient-to-r from-[#457b9d] to-[#1d3557] rounded text-white z-10 font-medium shadow-lg'>
                        Subject
                      </Label>
                      <Input
                        id='subject'
                        name='subject'
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="What's this about?"
                        className='bg-white/10 border-[#457b9d]/50 text-[#1d3557] dark:text-[#f1faee] placeholder:text-[#1d3557]/50 dark:placeholder:text-[#f1faee]/50 pt-4 transition-all duration-300 focus:ring-2 focus:ring-[#a8dadc]/50 focus:border-[#a8dadc] hover:border-[#a8dadc] text-base rounded-xl'
                        required
                      />
                    </div>
                    <div className='relative group'>
                      <Label htmlFor='message' className='absolute -top-2 left-3 px-2 text-xs bg-gradient-to-r from-[#457b9d] to-[#1d3557] rounded text-white z-10 font-medium shadow-lg'>
                        Message
                      </Label>
                      <Textarea
                        id='message'
                        name='message'
                        value={formData.message}
                        onChange={handleChange}
                        placeholder='Tell me about your project...'
                        className='bg-white/10 border-[#457b9d]/50 text-[#1d3557] dark:text-[#f1faee] placeholder:text-[#1d3557]/50 dark:placeholder:text-[#f1faee]/50 pt-4 transition-all duration-300 focus:ring-2 focus:ring-[#a8dadc]/50 focus:border-[#a8dadc] hover:border-[#a8dadc] text-base rounded-xl'
                        rows={5}
                        required
                      />
                    </div>
                    <Button
                      type='submit'
                      disabled={isSubmitting}
                      className='w-full bg-gradient-to-r from-[#457b9d] to-[#1d3557] hover:from-[#3d6d8c] hover:to-[#152843] text-[#f1faee] py-6 rounded-full transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px] text-base font-semibold'
                    >
                      {isSubmitting ? (
                        "Sending..."
                      ) : (
                        <>
                          <Send className='h-5 w-5 mr-2' />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
