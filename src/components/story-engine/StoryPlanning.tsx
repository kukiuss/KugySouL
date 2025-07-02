'use client';

import React, { useState } from 'react';
import { StoryProject, GENRES, TONES, STYLES } from '@/types/kugysoul';
import { CharacterCards } from './cards/CharacterCards';
import { WorldbuildingCards } from './cards/WorldbuildingCards';
import { OutlineEditor } from './cards/OutlineEditor';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
// import { Input } from '@/components/ui/input'; // Unused
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
// import { Badge } from '@/components/ui/badge'; // Unused
import { Users, Globe, BookOpen, Settings, ArrowRight, Sparkles } from 'lucide-react';

interface StoryPlanningProps {
  project: StoryProject;
  onUpdateProject: (project: StoryProject) => void;
}

export function StoryPlanning({ project, onUpdateProject }: StoryPlanningProps) {
  const [activeTab, setActiveTab] = useState('settings');

  const updateProjectField = (field: keyof StoryProject, value: any) => {
    onUpdateProject({
      ...project,
      [field]: value,
      lastModified: new Date()
    });
  };

  const generateSynopsisFromBraindump = async () => {
    if (!project.braindump.trim()) return;
    
    // Simulate AI generation
    const generatedSynopsis = `Berdasarkan braindump Anda, berikut adalah sinopsis yang dikembangkan:

${project.braindump}

Cerita ini mengeksplorasi tema-tema mendalam tentang [tema utama] melalui perjalanan protagonis yang penuh tantangan. Konflik utama muncul ketika [konflik], memaksa karakter utama untuk menghadapi [tantangan internal/eksternal].

Dalam perjalanannya, protagonis akan bertemu dengan berbagai karakter yang akan membentuk perkembangannya, termasuk [karakter pendukung] yang memberikan perspektif berbeda tentang [tema cerita].

Klimaks terjadi ketika [momen puncak], di mana semua konflik yang telah dibangun sepanjang cerita mencapai titik kulminasi. Resolusi memberikan penutup yang memuaskan sambil meninggalkan kesan mendalam tentang [pesan moral/tema].`;

    updateProjectField('synopsis', generatedSynopsis);
  };

  const canProceedToWriting = () => {
    return project.genre && 
           project.synopsis && 
           project.characters.length > 0 && 
           project.outline.parts.length > 0;
  };

  const proceedToWriting = () => {
    updateProjectField('currentPhase', 'writing');
  };

  const renderSettings = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Genre, Tone & Style
          </CardTitle>
          <CardDescription>
            Atur pengaturan dasar untuk konsistensi AI dalam mengembangkan cerita
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="genre">Genre</Label>
              <Select value={project.genre} onValueChange={(value) => updateProjectField('genre', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih genre" />
                </SelectTrigger>
                <SelectContent>
                  {GENRES.map((genre) => (
                    <SelectItem key={genre} value={genre}>{genre}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="tone">Tone</Label>
              <Select value={project.tone} onValueChange={(value) => updateProjectField('tone', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih tone" />
                </SelectTrigger>
                <SelectContent>
                  {TONES.map((tone) => (
                    <SelectItem key={tone} value={tone}>{tone}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="style">Style</Label>
              <Select value={project.style} onValueChange={(value) => updateProjectField('style', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Pilih style" />
                </SelectTrigger>
                <SelectContent>
                  {STYLES.map((style) => (
                    <SelectItem key={style} value={style}>{style}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Braindump</CardTitle>
          <CardDescription>
            Tuangkan semua ide, premis, dan konsep cerita Anda di sini. Fokus pada tokoh dan konflik utama.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Contoh: Cerita tentang seorang detektif muda yang menemukan bahwa ayahnya yang hilang sebenarnya adalah seorang pembunuh berantai. Dia harus memilih antara keadilan dan keluarga..."
            value={project.braindump}
            onChange={(e) => updateProjectField('braindump', e.target.value)}
            rows={6}
            className="resize-none"
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Sinopsis
            {project.braindump && (
              <Button 
                variant="outline" 
                size="sm"
                onClick={generateSynopsisFromBraindump}
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Generate dari Braindump
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Sinopsis lengkap cerita Anda. Bisa diisi manual atau di-generate dari braindump.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Sinopsis cerita akan muncul di sini..."
            value={project.synopsis}
            onChange={(e) => updateProjectField('synopsis', e.target.value)}
            rows={8}
            className="resize-none"
          />
        </CardContent>
      </Card>
    </div>
  );

  const renderProgress = () => {
    const completedSections = [
      project.genre && project.tone && project.style,
      project.braindump || project.synopsis,
      project.characters.length > 0,
      project.worldbuilding.length > 0,
      project.outline.parts.length > 0
    ].filter(Boolean).length;

    const totalSections = 5;
    const progressPercentage = (completedSections / totalSections) * 100;

    return (
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold">Progress Planning</h3>
            <span className="text-sm text-gray-500">{completedSections}/{totalSections} selesai</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="grid grid-cols-5 gap-2 text-xs">
            <div className={`text-center ${project.genre && project.tone && project.style ? 'text-green-600' : 'text-gray-400'}`}>
              Settings
            </div>
            <div className={`text-center ${project.braindump || project.synopsis ? 'text-green-600' : 'text-gray-400'}`}>
              Braindump
            </div>
            <div className={`text-center ${project.characters.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
              Characters
            </div>
            <div className={`text-center ${project.worldbuilding.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
              Worldbuilding
            </div>
            <div className={`text-center ${project.outline.parts.length > 0 ? 'text-green-600' : 'text-gray-400'}`}>
              Outline
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="max-w-7xl mx-auto">
      {/* Progress Indicator */}
      {renderProgress()}

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
          <TabsTrigger value="characters" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Characters ({project.characters.length})
          </TabsTrigger>
          <TabsTrigger value="worldbuilding" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Worldbuilding ({project.worldbuilding.length})
          </TabsTrigger>
          <TabsTrigger value="outline" className="flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            Outline ({project.outline.parts.length} parts)
          </TabsTrigger>
        </TabsList>

        <TabsContent value="settings" className="mt-6">
          {renderSettings()}
        </TabsContent>

        <TabsContent value="characters" className="mt-6">
          <CharacterCards 
            characters={project.characters}
            onUpdateCharacters={(characters) => updateProjectField('characters', characters)}
          />
        </TabsContent>

        <TabsContent value="worldbuilding" className="mt-6">
          <WorldbuildingCards 
            worldbuilding={project.worldbuilding}
            onUpdateWorldbuilding={(worldbuilding) => updateProjectField('worldbuilding', worldbuilding)}
          />
        </TabsContent>

        <TabsContent value="outline" className="mt-6">
          <OutlineEditor 
            outline={project.outline}
            onUpdateOutline={(outline) => updateProjectField('outline', outline)}
          />
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="mt-8 flex justify-between items-center">
        <div className="text-sm text-gray-500">
          {canProceedToWriting() ? (
            <span className="text-green-600">✓ Semua komponen planning sudah lengkap</span>
          ) : (
            <span>Lengkapi semua komponen untuk melanjutkan ke tahap writing</span>
          )}
        </div>
        
        <Button 
          onClick={proceedToWriting}
          disabled={!canProceedToWriting()}
          size="lg"
        >
          Mulai Writing
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
}