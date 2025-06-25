'use client';

import React from 'react';
import ImprovedNovelWriter from '@/components/novel/ImprovedNovelWriter';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ImprovedNovelWriterPage() {
  return (
    <div className="min-h-screen">
      <div className="p-4">
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <ImprovedNovelWriter />
    </div>
  );
}