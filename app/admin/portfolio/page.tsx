'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, Info, Code, Phone, Settings } from 'lucide-react';
import { PersonalInfoForm } from '@/components/admin/portfolio/PersonalInfoForm';
import { AboutInfoForm } from '@/components/admin/portfolio/AboutInfoForm';
import { SkillCategoriesManager } from '@/components/admin/portfolio/SkillCategoriesManager';
import { ContactInfoForm } from '@/components/admin/portfolio/ContactInfoForm';
import { SiteSettingsForm } from '@/components/admin/portfolio/SiteSettingsForm';

export default function PortfolioInfoPage() {
  const [activeTab, setActiveTab] = useState('personal');

  const tabs = [
    {
      id: 'personal',
      label: 'Personal Info',
      icon: User,
      description: 'Thông tin cá nhân và hero section'
    },
    {
      id: 'about',
      label: 'About Info',
      icon: Info,
      description: 'Thông tin giới thiệu và highlights'
    },
    {
      id: 'skills',
      label: 'Skills',
      icon: Code,
      description: 'Quản lý danh mục kỹ năng'
    },
    {
      id: 'contact',
      label: 'Contact Info',
      icon: Phone,
      description: 'Thông tin liên hệ và social links'
    },
    {
      id: 'settings',
      label: 'Site Settings',
      icon: Settings,
      description: 'Cài đặt website và SEO'
    }
  ];

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Portfolio Information</h1>
          <p className="text-gray-600">Quản lý thông tin hiển thị trên trang portfolio</p>
        </div>
        <Badge variant="outline" className="text-sm text-black">
          {tabs.find(tab => tab.id === activeTab)?.description}
        </Badge>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger 
                key={tab.id} 
                value={tab.id}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Personal Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <PersonalInfoForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                About Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <AboutInfoForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Code className="h-5 w-5" />
                Skills Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SkillCategoriesManager />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="contact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Phone className="h-5 w-5" />
                Contact Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContactInfoForm />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Site Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <SiteSettingsForm />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 