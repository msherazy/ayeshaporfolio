'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Wifi, Settings, RefreshCw } from 'lucide-react';

export default function DebugBrowserPage() {
  const [browserInfo, setBrowserInfo] = useState<any>({});
  const [networkTest, setNetworkTest] = useState<'pending' | 'success' | 'error'>('pending');

  useEffect(() => {
    collectBrowserInfo();
    testNetwork();
  }, []);

  const collectBrowserInfo = () => {
    const info = {
      userAgent: navigator.userAgent,
      browser: getBrowserName(),
      version: getBrowserVersion(),
      platform: navigator.platform,
      language: navigator.language,
      onLine: navigator.onLine,
      cookieEnabled: navigator.cookieEnabled,
      localStorage: checkLocalStorage(),
      sessionStorage: checkSessionStorage(),
      indexedDB: checkIndexedDB(),
      serviceWorker: checkServiceWorker(),
      webgl: checkWebGL(),
      canvas: checkCanvas()
    };
    setBrowserInfo(info);
  };

  const getBrowserName = () => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Edge')) return 'Edge';
    return 'Unknown';
  };

  const getBrowserVersion = () => {
    const userAgent = navigator.userAgent;
    const matches = userAgent.match(/(Chrome|Firefox|Safari|Edge)\/(\d+)/);
    return matches ? matches[2] : 'Unknown';
  };

  const checkLocalStorage = () => {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  };

  const checkSessionStorage = () => {
    try {
      const test = '__test__';
      sessionStorage.setItem(test, test);
      sessionStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  };

  const checkIndexedDB = () => {
    return !!window.indexedDB;
  };

  const checkServiceWorker = () => {
    return 'serviceWorker' in navigator;
  };

  const checkWebGL = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
    } catch {
      return false;
    }
  };

  const checkCanvas = () => {
    try {
      const canvas = document.createElement('canvas');
      return !!(canvas.getContext && canvas.getContext('2d'));
    } catch {
      return false;
    }
  };

  const testNetwork = async () => {
    try {
      const response = await fetch('https://httpbin.org/json', { method: 'GET' });
      if (response.ok) {
        setNetworkTest('success');
      } else {
        setNetworkTest('error');
      }
    } catch {
      setNetworkTest('error');
    }
  };

  const clearAllData = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
      alert('Cache and storage cleared. Please reload the page.');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const getStatusIcon = (status: 'pending' | 'success' | 'error') => {
    if (status === 'success') return <CheckCircle className="h-5 w-5 text-green-500" />;
    if (status === 'error') return <AlertCircle className="h-5 w-5 text-red-500" />;
    return <RefreshCw className="h-5 w-5 text-gray-400 animate-spin" />;
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">Browser Debug Tool</h1>
          <p className="text-gray-600">Check browser compatibility and connection issues</p>
        </div>
        <Settings className="h-8 w-8 text-blue-600" />
      </div>

      {/* Browser Info */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Browser Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Browser:</strong> {browserInfo.browser} {browserInfo.version}</div>
            <div><strong>Platform:</strong> {browserInfo.platform}</div>
            <div><strong>Online:</strong> {browserInfo.onLine ? 'Yes' : 'No'}</div>
            <div><strong>Cookies:</strong> {browserInfo.cookieEnabled ? 'Enabled' : 'Disabled'}</div>
            <div><strong>LocalStorage:</strong> {browserInfo.localStorage ? 'Working' : 'Blocked'}</div>
            <div><strong>IndexedDB:</strong> {browserInfo.indexedDB ? 'Available' : 'Unavailable'}</div>
            <div><strong>WebGL:</strong> {browserInfo.webgl ? 'Supported' : 'Not Supported'}</div>
            <div><strong>Canvas:</strong> {browserInfo.canvas ? 'Supported' : 'Not Supported'}</div>
          </div>
        </CardContent>
      </Card>

      {/* Connection Tests */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Connection Tests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Wifi className="h-5 w-5" />
                <span>Network Connection</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(networkTest)}
                <Badge variant={networkTest === 'success' ? 'default' : 'destructive'}>
                  {networkTest === 'success' ? 'OK' : networkTest === 'error' ? 'Failed' : 'Testing...'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Debug Commands */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Debug Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono">
              <div>// Open DevTools Console and run:</div>
              <div>console.clear()</div>
              <div>localStorage.clear()</div>
              <div>sessionStorage.clear()</div>
              <div>location.reload()</div>
            </div>
            
            <Button onClick={clearAllData} variant="outline">
              Clear All Storage
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 