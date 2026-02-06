/**
 * Blogs redirect page - redirect to dashboard.
 */
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function BlogsRedirect() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace('/dashboard');
  }, [router]);

  return null;
}
