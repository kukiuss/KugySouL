'use client';

import React from 'react';
import SelectTest from '@/components/test/SelectTest';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function TestSelectPage() {
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Select Component Test</h1>
          <p className="text-gray-500">
            Testing the @radix-ui/react-select integration
          </p>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <SelectTest />
        </div>
      </div>
    </div>
  );
}