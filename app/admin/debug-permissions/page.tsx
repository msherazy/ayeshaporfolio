'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Play, User, Database } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthContext';
import { 
  personalInfoService,
  aboutInfoService, 
  skillCategoriesService,
  contactInfoService,
  siteSettingsService 
} from '@/lib/portfolioService';

export default function DebugPermissionsPage() {
  const { user, isAdmin } = useAuth();
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<{
    personalInfo: { status: 'pending' | 'success' | 'error', message: string };
    aboutInfo: { status: 'pending' | 'success' | 'error', message: string };
    skillCategories: { status: 'pending' | 'success' | 'error', message: string };
    contactInfo: { status: 'pending' | 'success' | 'error', message: string };
    siteSettings: { status: 'pending' | 'success' | 'error', message: string };
  }>({
    personalInfo: { status: 'pending', message: '' },
    aboutInfo: { status: 'pending', message: '' },
    skillCategories: { status: 'pending', message: '' },
    contactInfo: { status: 'pending', message: '' },
    siteSettings: { status: 'pending', message: '' }
  });

  const updateResult = (collection: string, status: 'pending' | 'success' | 'error', message: string) => {
    setResults(prev => ({
      ...prev,
      [collection]: { status, message }
    }));
  };

  const testPermissions = async () => {
    setTesting(true);
    
    // Reset results
    setResults({
      personalInfo: { status: 'pending', message: 'Testing...' },
      aboutInfo: { status: 'pending', message: 'Testing...' },
      skillCategories: { status: 'pending', message: 'Testing...' },
      contactInfo: { status: 'pending', message: 'Testing...' },
      siteSettings: { status: 'pending', message: 'Testing...' }
    });

    // Test Personal Info
    try {
      await personalInfoService.getPersonalInfo();
      updateResult('personalInfo', 'success', 'Read permission OK');
    } catch (error: any) {
      updateResult('personalInfo', 'error', `Read failed: ${error.message}`);
    }

    // Test About Info  
    try {
      await aboutInfoService.getAboutInfo();
      updateResult('aboutInfo', 'success', 'Read permission OK');
    } catch (error: any) {
      updateResult('aboutInfo', 'error', `Read failed: ${error.message}`);
    }

    // Test Skill Categories
    try {
      await skillCategoriesService.getSkillCategories();
      updateResult('skillCategories', 'success', 'Read permission OK');
    } catch (error: any) {
      updateResult('skillCategories', 'error', `Read failed: ${error.message}`);
    }

    // Test Contact Info
    try {
      await contactInfoService.getContactInfo();
      updateResult('contactInfo', 'success', 'Read permission OK');
    } catch (error: any) {
      updateResult('contactInfo', 'error', `Read failed: ${error.message}`);
    }

    // Test Site Settings
    try {
      await siteSettingsService.getSiteSettings();
      updateResult('siteSettings', 'success', 'Read permission OK');
    } catch (error: any) {
      updateResult('siteSettings', 'error', `Read failed: ${error.message}`);
    }

    setTesting(false);
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    if (status === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'error') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <div className="h-5 w-5 bg-gray-300 rounded-full animate-pulse" />;
  };

  const collections = [
    { key: 'personalInfo', name: 'Personal Info', collection: 'personalInfo' },
    { key: 'aboutInfo', name: 'About Info', collection: 'aboutInfo' },
    { key: 'skillCategories', name: 'Skill Categories', collection: 'skillCategories' },
    { key: 'contactInfo', name: 'Contact Info', collection: 'contactInfo' },
    { key: 'siteSettings', name: 'Site Settings', collection: 'siteSettings' }
  ];

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Debug Firebase Permissions</h1>
          <p className="text-gray-600">Kiểm tra quyền truy cập Firebase collections</p>
        </div>
        <Database className="h-8 w-8 text-blue-600" />
      </div>

      {/* Auth Status */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Authentication Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          {user && isAdmin ? (
            <div className="flex items-center gap-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span>Logged in as: {user.email}</span>
              <Badge variant="default">Admin</Badge>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <AlertCircle className="h-5 w-5 text-red-500" />
              <span>Not authenticated or not admin</span>
              <Badge variant="destructive">No Access</Badge>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Firebase Rules Guide */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Cần cập nhật Firebase Rules</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mb-4">
            <p className="text-yellow-800 text-sm mb-2">
              <strong>Để migration hoạt động, bạn cần copy rules sau vào Firebase Console:</strong>
            </p>
            <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono overflow-x-auto">
{`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /personalInfo/{infoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /aboutInfo/{infoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /skillCategories/{categoryId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /contactInfo/{infoId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /siteSettings/{settingsId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}`}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Test Results */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Permission Test Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {collections.map((collection) => (
              <div key={collection.key} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium">{collection.name}</h4>
                  <p className="text-sm text-gray-600">Collection: {collection.collection}</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm">
                    {results[collection.key as keyof typeof results].message || 'Not tested'}
                  </span>
                  {getStatusIcon(results[collection.key as keyof typeof results].status)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button 
          onClick={testPermissions} 
          disabled={testing || !user || !isAdmin}
          size="lg"
          className="px-8"
        >
          <Play className="h-4 w-4 mr-2" />
          {testing ? 'Đang test...' : 'Test Permissions'}
        </Button>
      </div>
    </div>
  );
} 