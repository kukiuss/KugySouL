'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Lightbulb, BookOpen } from 'lucide-react';

interface IdeaSelectorProps {
  onCreateProject: (hasIdea: boolean) => void;
  onBack: () => void;
}

export function IdeaSelector({ onCreateProject, onBack }: IdeaSelectorProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Kembali
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Mulai Proyek Novel Baru
            </h1>
            <p className="text-gray-600 mt-2">
              Pilih jalur yang sesuai dengan kondisi Anda saat ini
            </p>
          </div>
        </div>

        {/* Main Options */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Option 1: No Idea Yet */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-yellow-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="h-8 w-8 text-yellow-600" />
              </div>
              <CardTitle className="text-xl">
                Belum Memiliki Ide Cerita
              </CardTitle>
              <CardDescription className="text-base">
                Saya butuh bantuan untuk brainstorming dan mengembangkan ide cerita dari awal
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  Yang akan Anda dapatkan:
                </h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Pilihan genre novel yang beragam</li>
                  <li>• Ide cerita singkat untuk inspirasi</li>
                  <li>• Sinopsis yang dikembangkan AI</li>
                  <li>• Karakter yang dibuat otomatis</li>
                  <li>• Outline cerita yang terstruktur</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Proses Brainstorming:
                </h4>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Genre</span>
                  <span>→</span>
                  <span>Ide</span>
                  <span>→</span>
                  <span>Sinopsis</span>
                  <span>→</span>
                  <span>Karakter</span>
                  <span>→</span>
                  <span>Outline</span>
                </div>
              </div>

              <Button 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-white"
                onClick={() => onCreateProject(false)}
              >
                Mulai Brainstorming
              </Button>
            </CardContent>
          </Card>

          {/* Option 2: Already Have Idea */}
          <Card className="hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-300">
            <CardHeader className="text-center pb-4">
              <div className="mx-auto w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">
                Sudah Memiliki Ide Cerita
              </CardTitle>
              <CardDescription className="text-base">
                Saya sudah punya konsep cerita dan siap untuk mengorganisir ide-ide saya
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-800 mb-2">
                  Yang akan Anda isi:
                </h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Genre, Tone, dan Style cerita</li>
                  <li>• Braindump ide dan premis</li>
                  <li>• Sinopsis cerita (manual/AI)</li>
                  <li>• Card karakter utama</li>
                  <li>• Card worldbuilding</li>
                  <li>• Outline dengan 3 babak</li>
                </ul>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-700 mb-2">
                  Card System:
                </h4>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <span>📝 Character Cards</span>
                  <span>🌍 Worldbuilding Cards</span>
                  <span>📋 Chapter Cards</span>
                  <span>🎬 Scene Cards</span>
                </div>
              </div>

              <Button 
                className="w-full bg-blue-500 hover:bg-blue-600 text-white"
                onClick={() => onCreateProject(true)}
              >
                Mulai Planning
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <Card className="bg-white/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                💡 Tips Memilih Jalur
              </h3>
              <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-600">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Pilih &ldquo;Belum Memiliki Ide&rdquo; jika:</h4>
                  <ul className="space-y-1">
                    <li>• Anda benar-benar blank dan butuh inspirasi</li>
                    <li>• Ingin eksplorasi genre yang berbeda</li>
                    <li>• Suka dengan proses discovery writing</li>
                    <li>• Ingin AI membantu dari awal</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">Pilih &ldquo;Sudah Memiliki Ide&rdquo; jika:</h4>
                  <ul className="space-y-1">
                    <li>• Sudah ada konsep cerita di kepala</li>
                    <li>• Punya karakter atau setting favorit</li>
                    <li>• Ingin kontrol penuh atas cerita</li>
                    <li>• Butuh tools untuk mengorganisir ide</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}