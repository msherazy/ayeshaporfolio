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
    <section className='min-h-screen flex items-center justify-center relative'>
      <div className='container mx-auto px-4 text-center'>
        <div className='max-w-4xl mx-auto'>
          <div className='mb-8 animate-fade-in'>
            <div className='relative w-36 h-36 mx-auto mt-20 mb-6'>
              <img
                src='/images/ayesha-portfolio-image.png'
                alt={currentData.name}
                className='w-full h-full rounded-full object-cover object-center shadow-2xl ring-4 ring-white/30 backdrop-blur-sm transition-transform duration-300 hover:scale-105'
                style={{
                  objectPosition: "center center",
                  objectFit: "cover",
                  transform: "scale(1.15)"
                }}
              />
              <div className='absolute inset-0 rounded-full bg-gradient-to-tr from-transparent via-transparent to-white/10'></div>
            </div>
            <div className='flex items-center justify-center space-x-2 text-white/70 mb-4'>
              <MapPin className='h-4 w-4' />
              <span>{currentData.location}</span>
            </div>
          </div>

          <h1 className='text-5xl md:text-7xl font-bold mb-6 animate-slide-up'>
            <span className='text-white'>Hi, I'm </span>
            <span className='bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600 bg-clip-text text-transparent'>
              {currentData.name}
            </span>
          </h1>

          <div className='text-2xl md:text-3xl text-white/90 mb-8 h-12 animate-slide-up animation-delay-200'>
            <span>I'm a </span>
            <span className='text-yellow-400 font-semibold'>
              {text}
              <span className='animate-pulse'>|</span>
            </span>
          </div>

          <p className='text-xl text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-slide-up animation-delay-400'>
            {currentData.description}
          </p>

          <div className='flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16 animate-slide-up animation-delay-600'>
            <Button
              size='lg'
              className='glass px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 border-white/20 text-black dark:text-white hover:text-white dark:hover:text-black font-medium'
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
              className='px-8 py-4 rounded-full transition-all duration-300 hover:scale-105 border-white/30 dark:border-white/30 border-gray-600/30 text-white dark:text-white text-gray-800 hover:bg-white/10 dark:hover:bg-white/10 hover:bg-gray-200/20'
              onClick={() => {
                const projectsSection = document.getElementById('projects');
                projectsSection?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              View My Work
            </Button>
          </div>

          <div className='flex items-center justify-center space-x-6 animate-slide-up animation-delay-800'>
            {currentData?.socialLinks?.github && (
              <a
                href={currentData?.socialLinks?.github}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white/70 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/10'
              >
                <Github className='h-6 w-6' />
              </a>
            )}
            {currentData?.socialLinks?.linkedin && (
              <a
                href={currentData?.socialLinks?.linkedin}
                target='_blank'
                rel='noopener noreferrer'
                className='text-white/70 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/10'
              >
                <Linkedin className='h-6 w-6' />
              </a>
            )}
            {currentData?.socialLinks?.email && (
              <a
                href={`mailto:${currentData?.socialLinks?.email}`}
                className='text-white/70 hover:text-white transition-all duration-300 p-3 rounded-full hover:bg-white/10'
              >
                <Mail className='h-6 w-6' />
              </a>
            )}
          </div>
        </div>

        <div className='absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce'>
          <ArrowDown className='h-6 w-6 text-white/50' />
        </div>
      </div>
    </section>
  );
}
