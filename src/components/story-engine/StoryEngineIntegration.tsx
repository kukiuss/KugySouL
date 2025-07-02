'use client';

import React from 'react';
import { StoryEngine } from './StoryEngine';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BookOpen, Sparkles, Users, Globe, FileText, ArrowRight } from 'lucide-react';

interface StoryEngineIntegrationProps {
  onClose?: () => void;
}

export function StoryEngineIntegration({ onClose }: StoryEngineIntegrationProps) {
  const [showEngine, setShowEngine] = React.useState(false);

  if (showEngine) {
    return <StoryEngine />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-purple-100 rounded-full">
              <BookOpen className="h-8 w-8 text-purple-600" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              KugySoul Story Engine
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Platform lengkap untuk membuat novel dengan sistem terstruktur dan bantuan AI. 
            Dari ide hingga draft novel yang siap publish.
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <Badge variant="secondary" className="bg-purple-100 text-purple-800">
              <Sparkles className="h-3 w-3 mr-1" />
              AI-Powered
            </Badge>
            <Badge variant="secondary" className="bg-blue-100 text-blue-800">
              <BookOpen className="h-3 w-3 mr-1" />
              Complete Workflow
            </Badge>
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              <Users className="h-3 w-3 mr-1" />
              Character Management
            </Badge>
          </div>
        </div>

        {/* Features Overview */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Sparkles className="h-5 w-5 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Brainstorming AI</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Tidak punya ide? AI akan membantu generate ide cerita berdasarkan genre favorit Anda dengan database 100+ story ideas.
              </CardDescription>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div>• 12+ Genre pilihan</div>
                <div>• AI synopsis generation</div>
                <div>• Story idea database</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="h-5 w-5 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Character Cards</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Buat karakter yang hidup dengan sistem card lengkap. Track personality, background, dan dialogue style setiap karakter.
              </CardDescription>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div>• 5 Character roles</div>
                <div>• Comprehensive fields</div>
                <div>• Custom attributes</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Globe className="h-5 w-5 text-green-600" />
                </div>
                <CardTitle className="text-lg">Worldbuilding</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Bangun dunia cerita yang konsisten dengan 10 jenis element: lokasi, organisasi, magic system, dan lainnya.
              </CardDescription>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div>• 10 Element types</div>
                <div>• Sensory descriptions</div>
                <div>• Custom fields</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BookOpen className="h-5 w-5 text-purple-600" />
                </div>
                <CardTitle className="text-lg">3-Act Outline</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Struktur cerita profesional dengan sistem 3 babak. Setiap chapter punya multiple openings dan AI-generated ideas.
              </CardDescription>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div>• Professional structure</div>
                <div>• Chapter cards</div>
                <div>• Multiple openings</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-100 rounded-lg">
                  <FileText className="h-5 w-5 text-indigo-600" />
                </div>
                <CardTitle className="text-lg">Writing Interface</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Interface menulis profesional dengan akses mudah ke character cards, worldbuilding, dan reference materials.
              </CardDescription>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div>• Reference panels</div>
                <div>• Word count tracking</div>
                <div>• AutoPilot mode</div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <ArrowRight className="h-5 w-5 text-red-600" />
                </div>
                <CardTitle className="text-lg">Guided Workflow</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-sm">
                Workflow terarah dari ide hingga novel selesai. Progress tracking dan phase-based navigation untuk hasil optimal.
              </CardDescription>
              <div className="mt-3 space-y-1 text-xs text-gray-500">
                <div>• Phase-based progression</div>
                <div>• Progress tracking</div>
                <div>• Multi-project support</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Workflow Steps */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Complete Novel Creation Workflow
          </h2>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
              <div className="w-8 h-8 bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold">Brainstorming</h3>
                <p className="text-sm text-gray-600">Genre & Ideas</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 md:rotate-0" />
            
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
              <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold">Planning</h3>
                <p className="text-sm text-gray-600">Characters & World</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 md:rotate-0" />
            
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
              <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold">Outlining</h3>
                <p className="text-sm text-gray-600">3-Act Structure</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-gray-400 rotate-90 md:rotate-0" />
            
            <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md">
              <div className="w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold">Writing</h3>
                <p className="text-sm text-gray-600">Draft Creation</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Card className="border-0 shadow-xl bg-gradient-to-r from-purple-500 to-blue-500 text-white max-w-2xl mx-auto">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">
                Siap Membuat Novel Impian Anda?
              </h2>
              <p className="text-purple-100 mb-6">
                Mulai journey dari ide hingga novel yang siap publish dengan bantuan AI dan sistem terstruktur.
              </p>
              <div className="flex gap-4 justify-center">
                <Button 
                  size="lg" 
                  className="bg-white text-purple-600 hover:bg-gray-100"
                  onClick={() => setShowEngine(true)}
                >
                  <BookOpen className="h-5 w-5 mr-2" />
                  Mulai Membuat Novel
                </Button>
                {onClose && (
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                    onClick={onClose}
                  >
                    Kembali ke Writer
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center text-sm text-gray-500">
          <p>
            🎭 <strong>KugySoul Story Engine</strong> - Transform your ideas into compelling novels with AI assistance
          </p>
        </div>
      </div>
    </div>
  );
}