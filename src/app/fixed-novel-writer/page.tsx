'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import NovelWriter from '@/components/novel/NovelWriter';
import NovelWriterPatch from '@/components/novel/NovelWriterPatch';

export default function FixedNovelWriterPage() {
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
      
      {/* Apply the patch to fix the auto-pilot feature */}
      <NovelWriterPatch />
      
      {/* Render the original NovelWriter component */}
      <div className="relative">
        <div className="absolute top-0 right-0 bg-green-100 text-green-800 px-2 py-1 text-xs rounded-bl-md z-50">
          Fixed Auto-Pilot
        </div>
        <NovelWriter />
      </div>
    </div>
  );
}