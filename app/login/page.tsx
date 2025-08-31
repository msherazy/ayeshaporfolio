'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {ArrowLeft, Mail, Shield} from 'lucide-react';
import Link from 'next/link';
import {AuthProvider, useAuth} from '@/components/auth/AuthContext';

function LoginContent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signInWithGoogle, user, isAdmin } = useAuth();
  const router = useRouter();

  // Redirect if already authenticated and admin
  useEffect(() => {
    if (user && isAdmin) {
      router.push('/admin');
    }
  }, [user, isAdmin, router]);

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);

    try {
      await signInWithGoogle();
      // Redirect will happen via useEffect above
    } catch (error: any) {
      const errorMessage = error instanceof Error ? error.message : 'Đăng nhập thất bại';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-blue-600 p-3 rounded-full">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
          <p className="text-gray-600">Đăng nhập để quản lý portfolio</p>
        </div>

        {/* Login Card */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-center">Xác thực Admin</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">
                      Lỗi đăng nhập
                    </h3>
                    <div className="mt-2 text-sm text-red-700">
                      {error}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="space-y-4">
              <Button
                onClick={handleGoogleSignIn}
                disabled={loading}
                className="w-full h-12 text-base font-medium"
                variant="outline"
              >
                <Mail className="h-5 w-5 mr-3" />
                {loading ? 'Đang đăng nhập...' : 'Đăng nhập bằng Google'}
              </Button>
            </div>

            <div className="text-center">
              <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                <div className="text-sm text-yellow-800">
                  <strong>Lưu ý:</strong> Chỉ admin được phép truy cập.
                  <br />
                  Email được phép: <strong>vanxuatx@gmail.com</strong>
                </div>
              </div>
            </div>


          </CardContent>
        </Card>

        {/* Back to Portfolio */}
        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Quay về Portfolio
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginContent />
    </AuthProvider>
  );
} 