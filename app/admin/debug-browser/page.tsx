'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertCircle, Wifi, Globe, Settings, RefreshCw } from 'lucide-react';

export default function DebugBrowserPage() {
  const [browserInfo, setBrowserInfo] = useState<any>({});
  const [networkTest, setNetworkTest] = useState<'pending' | 'success' | 'error'>('pending');
  const [firebaseTest, setFirebaseTest] = useState<'pending' | 'success' | 'error'>('pending');
  const [extensionConflicts, setExtensionConflicts] = useState<string[]>([]);

  useEffect(() => {
    collectBrowserInfo();
    testNetwork();
    checkExtensionConflicts();
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
      doNotTrack: navigator.doNotTrack,
      webdriver: (navigator as any).webdriver,
      devtools: checkDevTools(),
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

  const checkDevTools = () => {
    let devtools = false;
    const element = new Image();
    Object.defineProperty(element, 'id', {
      get: function() {
        devtools = true;
        return 'devtools-detector';
      }
    });
    console.log('%c ', element);
    return devtools;
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

  const testFirebase = async () => {
    setFirebaseTest('pending');
    try {
      // Test Firebase connection
      const { db } = await import('@/lib/firebase');
      const { collection, getDocs, limit, query } = await import('firebase/firestore');
      
      const testQuery = query(collection(db, 'projects'), limit(1));
      await getDocs(testQuery);
      setFirebaseTest('success');
    } catch (error) {
      console.error('Firebase test error:', error);
      setFirebaseTest('error');
    }
  };

  const checkExtensionConflicts = () => {
    const conflicts: string[] = [];
    
    // Check for common problematic properties
    if ((window as any).chrome && (window as any).chrome.runtime) {
      conflicts.push('Chrome Extension Runtime Detected');
    }
    
    if ((window as any).__REACT_DEVTOOLS_GLOBAL_HOOK__) {
      conflicts.push('React DevTools Extension');
    }
    
    if ((window as any).__REDUX_DEVTOOLS_EXTENSION__) {
      conflicts.push('Redux DevTools Extension');
    }
    
    if (document.querySelector('[data-extension]')) {
      conflicts.push('DOM Extension Markers Found');
    }
    
    // Check for modified fetch/XMLHttpRequest
    if (window.fetch.toString().includes('native code') === false) {
      conflicts.push('Fetch API Modified (Extension)');
    }
    
    setExtensionConflicts(conflicts);
  };

  const clearAllData = () => {
    try {
      localStorage.clear();
      sessionStorage.clear();
      // Clear Firebase cache if possible
      if ('caches' in window) {
        caches.keys().then(names => {
          names.forEach(name => caches.delete(name));
        });
      }
      alert('Đã xóa cache và storage. Vui lòng reload trang.');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const disableExtensions = () => {
    alert('Để tắt extensions:\n1. Chrome: chrome://extensions/\n2. Firefox: about:addons\n3. Tắt tất cả extensions\n4. Reload trang');
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
          <p className="text-gray-600">Kiểm tra browser conflicts và connection issues</p>
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
            <div><strong>DevTools:</strong> {browserInfo.devtools ? 'Open' : 'Closed'}</div>
            <div><strong>WebDriver:</strong> {browserInfo.webdriver ? 'Yes' : 'No'}</div>
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
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Globe className="h-5 w-5" />
                <span>Firebase Connection</span>
              </div>
              <div className="flex items-center gap-2">
                {getStatusIcon(firebaseTest)}
                <Badge variant={firebaseTest === 'success' ? 'default' : 'destructive'}>
                  {firebaseTest === 'success' ? 'OK' : firebaseTest === 'error' ? 'Failed' : 'Testing...'}
                </Badge>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={testFirebase}
                  disabled={firebaseTest === 'pending'}
                >
                  Test
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Extension Conflicts */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Extension Conflicts</CardTitle>
        </CardHeader>
        <CardContent>
          {extensionConflicts.length > 0 ? (
            <div className="space-y-2">
              <p className="text-red-600 font-medium">Phát hiện conflicts:</p>
              <ul className="list-disc list-inside space-y-1">
                {extensionConflicts.map((conflict, index) => (
                  <li key={index} className="text-red-600 text-sm">{conflict}</li>
                ))}
              </ul>
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 mt-4">
                <p className="text-yellow-800 text-sm">
                  <strong>Khuyến nghị:</strong> Tắt tất cả browser extensions và thử lại.
                  Extension có thể can thiệp vào Firebase connections.
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span>Không phát hiện extension conflicts</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Console Output */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Debug Commands</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-gray-900 text-green-400 p-3 rounded text-xs font-mono">
              <div>// Mở DevTools Console và chạy:</div>
              <div>console.clear()</div>
              <div>localStorage.clear()</div>
              <div>sessionStorage.clear()</div>
              <div>location.reload()</div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button onClick={clearAllData} variant="outline">
                Clear All Storage
              </Button>
              <Button onClick={disableExtensions} variant="outline">
                How to Disable Extensions
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Message */}
      <Card className="border-red-200 bg-red-50">
        <CardHeader>
          <CardTitle className="text-red-800">Về lỗi "Could not establish connection"</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-red-700 space-y-2 text-sm">
            <p><strong>Nguyên nhân chính:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Browser extension conflict (đặc biệt React DevTools, Redux DevTools)</li>
              <li>Chrome's "This doesn't look like a valid response" error</li>
              <li>Firefox connection pooling issues</li>
              <li>Ad blockers hoặc privacy extensions</li>
              <li>Corporate firewalls blocking WebSocket connections</li>
            </ul>
            <p className="mt-4"><strong>Giải pháp:</strong></p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Tắt tất cả extensions và thử lại</li>
              <li>Sử dụng Incognito/Private mode</li>
              <li>Thử browser khác (nếu dùng Chrome thì thử Firefox)</li>
              <li>Clear browser cache và reload</li>
              <li>Kiểm tra Firebase rules đã cập nhật chưa</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 