"use client";

import { useState, useEffect } from "react";
import { ArrowDown, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { personalInfoService } from "@/lib/portfolioService";
import { PersonalInfo } from "@/types/portfolio";

export function Hero() {
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(100);
  const [personalData, setPersonalData] = useState<PersonalInfo | null>(null);
  const [loading, setLoading] = useState(true);

  // Fallback data if Firebase data is not available
  const fallbackData = {
    name: "Ayesha Fayaz",
    title: "Marketing & Admin Professional",
    description: "Results-driven marketing and admin professional with a passion for client engagement, real estate operations, and HR processes. Skilled in communication, data organization, and digital content creation.",
    typingTexts: [
      "HR Assistant",
      "Marketing Executive",
      "Admin Coordinator",
      "Conveyancer",
      "Social Media Agent"
    ],
    location: "Dubai, UAE",
    socialLinks: {
      github: "",
      linkedin: "http://linkedin.com/in/ayesha-fayaz-42717524a",
      twitter: "",
      email: "Ayeshafayaz97@gmail.com"
    },
    resumeUrl: ""
  };

  useEffect(() => {
    const fetchPersonalData = async () => {
      try {
        const data = await personalInfoService.getPersonalInfo();
        if (data) {
          setPersonalData(data);
        }
      } catch (error) {
        console.error('Error fetching personal data:', error);
        // Will use fallback data
      } finally {
        setLoading(false);
      }
    };

    fetchPersonalData();
  }, []);

  // Use Firebase data if available, otherwise use fallback
  const currentData =  fallbackData;
  const words = currentData.typingTexts;

  useEffect(() => {
    const handleTyping = () => {
      const i = loopNum % words.length;
      const fullText = words[i];

      setText(
        isDeleting
          ? fullText.substring(0, text.length - 1)
          : fullText.substring(0, text.length + 1)
      );

      setTypingSpeed(isDeleting ? 50 : 100);

      if (!isDeleting && text === fullText) {
        setTimeout(() => setIsDeleting(true), 1000);
      } else if (isDeleting && text === "") {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed, words]);

  if (loading) {
    return (
      <section className='min-h-screen flex items-center justify-center relative'>
        <div className='container mx-auto px-4 text-center'>
          <div className='max-w-4xl mx-auto'>
            <div className='animate-pulse space-y-8'>
              <div className='w-36 h-36 bg-white/20 rounded-full mx-auto'></div>
              <div className='h-6 bg-white/20 rounded mx-auto w-64'></div>
              <div className='h-16 bg-white/20 rounded mx-auto w-96'></div>
              <div className='h-12 bg-white/20 rounded mx-auto w-80'></div>
              <div className='h-6 bg-white/20 rounded mx-auto w-48'></div>
              <div className='flex justify-center space-x-4'>
                <div className='h-12 bg-white/20 rounded w-32'></div>
                <div className='h-12 bg-white/20 rounded w-32'></div>
              </div>
              <div className='flex justify-center space-x-6'>
                <div className='h-12 w-12 bg-white/20 rounded-full'></div>
                <div className='h-12 w-12 bg-white/20 rounded-full'></div>
                <div className='h-12 w-12 bg-white/20 rounded-full'></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className='min-h-screen flex items-center justify-center relative overflow-hidden'>
      {/* Material Design 3 Background Elements */}
      <div className='absolute -top-40 -right-40 w-[600px] h-[600px] bg-gradient-to-br from-[#a8dadc]/30 to-[#1d3557]/30 rounded-full blur-3xl opacity-40 z-0 animate-slow-spin'></div>
      <div className='absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-gradient-to-tr from-[#457b9d]/30 to-[#1d3557]/30 rounded-full blur-3xl opacity-40 z-0 animate-slow-spin-reverse'></div>
      
      <div className='container mx-auto px-4 text-center relative z-10'>
        <div className='max-w-5xl mx-auto'>
          {/* Profile Image with Material Design 3 Styling */}
          <div className='mb-10 animate-fade-in relative'>
            <div className='relative w-44 h-44 mx-auto mt-20 mb-8'>
              {/* Decorative ring with gradient */}
              <div className='absolute -inset-4 rounded-full bg-gradient-to-r from-[#457b9d]/30 via-[#a8dadc]/30 to-[#e63946]/30 blur-md'></div>
              
              {/* Image container with elevation */}
              <div className='relative w-full h-full rounded-full p-1 bg-gradient-to-r from-[#457b9d] via-[#a8dadc] to-[#e63946] shadow-xl'>
                <img
                  src='/images/ayesha-portfolio-image.png'
                  alt={currentData.name}
                  className='w-full h-full rounded-full object-cover object-center transition-all duration-500 hover:scale-105'
                  style={{
                    objectPosition: "center center",
                    objectFit: "cover"
                  }}
                />
              </div>
              
              {/* Material Design 3 highlight effect */}
              <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 to-transparent opacity-60'></div>
            </div>
            
            {/* Location badge with Material Design 3 styling */}
            <div className='inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-lg'>
              <MapPin className='h-4 w-4 mr-2 text-blue-300' />
              <span className='text-white font-medium'>{currentData.location}</span>
            </div>
          </div>

          {/* Material Design 3 Typography with enhanced styling */}
          <div className='relative'>
            <h1 className='text-5xl md:text-7xl font-bold mb-6 animate-slide-up'>
              <span className='text-[#1d3557] dark:text-[#f1faee]'>Hi, I'm </span>
              <span className='bg-gradient-to-r from-[#457b9d] via-[#a8dadc] to-[#e63946] bg-clip-text text-transparent'>
                {currentData.name}
              </span>
            </h1>

            {/* Typing text with enhanced styling */}
            <div className='text-2xl md:text-3xl text-[#1d3557]/90 dark:text-[#f1faee]/90 mb-8 h-12 animate-slide-up animation-delay-200'>
              <span>I'm a </span>
              <span className='relative'>
                <span className='absolute -inset-1 bg-gradient-to-r from-[#457b9d]/20 to-[#a8dadc]/20 rounded-lg blur-sm'></span>
                <span className='relative text-transparent bg-gradient-to-r from-[#457b9d] to-[#a8dadc] bg-clip-text font-semibold'>
                  {text}
                  <span className='animate-pulse text-[#e63946]'>|</span>
                </span>
              </span>
            </div>

            {/* Description with enhanced typography */}
            <p className='text-xl text-[#1d3557]/80 dark:text-[#f1faee]/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-400'>
              {currentData.description}
            </p>
          </div>

          {/* Material Design 3 Buttons with enhanced styling */}
          <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-slide-up animation-delay-600'>
            <Button
              size='lg'
              className='bg-gradient-to-r from-[#457b9d] to-[#1d3557] hover:from-[#3d6d8c] hover:to-[#152843] px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-lg border-none text-[#f1faee] font-medium shadow-md'
              onClick={() => {
                const contactSection = document.getElementById('contact');
                contactSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <Mail className='h-5 w-5 mr-2' />
              Get In Touch
            </Button>
            <Button
              variant='outline'
              size='lg'
              className='px-8 py-6 rounded-full transition-all duration-300 transform hover:scale-105 border border-[#a8dadc]/50 text-[#1d3557] dark:text-[#f1faee] bg-[#f1faee]/20 dark:bg-transparent hover:bg-[#f1faee]/30 dark:hover:bg-[#a8dadc]/20 hover:shadow-lg backdrop-blur-sm font-medium'
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </Button>
          </div>

          {/* Social links with Material Design 3 styling */}
          <div className='flex items-center justify-center space-x-6 animate-slide-up animation-delay-800'>
            {currentData?.socialLinks?.github && (
              <a
                href={currentData?.socialLinks?.github}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-[#a8dadc]/10 hover:bg-[#a8dadc]/20 text-[#1d3557] dark:text-[#f1faee] p-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg backdrop-blur-sm'
              >
                <Github className='h-6 w-6' />
              </a>
            )}
            {currentData?.socialLinks?.linkedin && (
              <a
                href={currentData?.socialLinks?.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='bg-[#a8dadc]/10 hover:bg-[#a8dadc]/20 text-[#1d3557] dark:text-[#f1faee] p-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg backdrop-blur-sm'
              >
                <Linkedin className='h-6 w-6' />
              </a>
            )}
            {currentData?.socialLinks?.email && (
              <a
                href={`mailto:${currentData?.socialLinks?.email}`}
                className='bg-[#a8dadc]/10 hover:bg-[#a8dadc]/20 text-[#1d3557] dark:text-[#f1faee] p-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg backdrop-blur-sm'
              >
                <Mail className='h-6 w-6' />
              </a>
            )}
            
            {/* Scroll indicator with Material Design 3 styling */}
            <div className='bg-[#a8dadc]/10 hover:bg-[#a8dadc]/20 text-[#1d3557] dark:text-[#f1faee] p-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg backdrop-blur-sm cursor-pointer'
              onClick={() => {
                const aboutSection = document.getElementById('about');
                aboutSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <ArrowDown className='h-6 w-6 text-white' />
            </div>
          </div>
        </div>


      </div>
    </section>
  );
}
