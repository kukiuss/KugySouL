'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Pen, Sparkles, Zap, Wrench } from 'lucide-react';

export function AutopilotSection() {
  return (
    <section className="py-16 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-4">Auto-Pilot Feature</h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Try our improved auto-pilot feature for novel writing with OpenRouter API integration
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Pen className="h-5 w-5 text-purple-400" />
                Original Novel Writer
              </CardTitle>
              <CardDescription className="text-gray-300">
                The original novel writer with auto-pilot feature
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                This is the original implementation of the novel writer with auto-pilot feature. It may not display generated text properly.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/novel" className="w-full">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Try Original
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-blue-400" />
                Fixed Novel Writer
              </CardTitle>
              <CardDescription className="text-gray-300">
                Novel writer with patched auto-pilot feature
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                This version applies a patch to fix the auto-pilot feature by properly handling the OpenRouter API response.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/fixed-novel-writer" className="w-full">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Try Fixed Version
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-400" />
                Direct Fix
              </CardTitle>
              <CardDescription className="text-gray-300">
                Novel writer with direct function replacement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                This version directly replaces the autoPilotWrite function with a fixed version that properly handles the OpenRouter API response.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/direct-fix-novel-writer" className="w-full">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Try Direct Fix
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-green-400" />
                Fixed Word Count
              </CardTitle>
              <CardDescription className="text-gray-300">
                Novel writer with fixed word count (500-800 words)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                <span className="text-yellow-300 font-bold">RECOMMENDED</span>: This version specifically fixes the word count issue by ensuring the auto-pilot generates at least 500-800 words per request.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/fixed-word-count-novel-writer" className="w-full">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Try Fixed Word Count
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-pink-400" />
                Improved Novel Writer
              </CardTitle>
              <CardDescription className="text-gray-300">
                Enhanced novel writer with improved API integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                This version has an improved API service with better error handling and response processing for the OpenRouter API.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/improved-novel-writer" className="w-full">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Try Improved Version
                </Button>
              </Link>
            </CardFooter>
          </Card>
          
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-blue-400" />
                Test OpenRouter
              </CardTitle>
              <CardDescription className="text-gray-300">
                Test the OpenRouter API integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-300">
                This page allows you to test the OpenRouter API integration with different methods and models.
              </p>
            </CardContent>
            <CardFooter>
              <Link href="/test-openrouter" className="w-full">
                <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                  Test API
                </Button>
              </Link>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  );
}