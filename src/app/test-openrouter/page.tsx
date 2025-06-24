'use client';

import React from 'react';
import OpenRouterTest from '@/components/novel/OpenRouterTest';

export default function TestOpenRouterPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">OpenRouter API Test</h1>
      <OpenRouterTest />
    </div>
  );
}