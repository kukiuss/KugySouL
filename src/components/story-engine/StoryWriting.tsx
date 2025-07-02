'use client';

import React, { useState } from 'react';
import { StoryProject, ChapterCard } from '@/types/kugysoul';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Unused
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BookOpen, Play, Pause, Sparkles, Users, Globe } from 'lucide-react';
// Removed unused: Edit, RotateCcw, FileText

interface StoryWritingProps {
  project: StoryProject;
  onUpdateProject: (project: StoryProject) => void;
}

export function StoryWriting({ project, onUpdateProject }: StoryWritingProps) {
  const [selectedChapter, setSelectedChapter] = useState<ChapterCard | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [isAutoPilotMode, setIsAutoPilotMode] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');

  // Get all chapters from all parts
  const allChapters = project.outline.parts.flatMap(part => 
    part.chapters.map(chapter => ({
      ...chapter,
      partTitle: part.title
    }))
  );

  const handleChapterSelect = (chapterId: string) => {
    const chapter = allChapters.find(c => c.id === chapterId);
    if (chapter) {
      setSelectedChapter(chapter);
      setEditorContent(chapter.roughDraft || '');
    }
  };

  const saveChapterContent = () => {
    if (!selectedChapter) return;

    const updatedParts = project.outline.parts.map(part => ({
      ...part,
      chapters: part.chapters.map(chapter => 
        chapter.id === selectedChapter.id 
          ? { 
              ...chapter, 
              roughDraft: editorContent,
              wordCount: editorContent.split(/\s+/).filter(word => word.length > 0).length,
              lastModified: new Date()
            }
          : chapter
      )
    }));

    onUpdateProject({
      ...project,
      outline: { parts: updatedParts },
      lastModified: new Date()
    });
  };

  const generateChapterContent = async () => {
    if (!selectedChapter) return;

    // Simulate AI generation based on chapter ideas and openings
    const ideas = selectedChapter.ideas.join('. ');
    const opening = selectedChapter.openings.find(o => o.trim()) || '';
    
    const generatedContent = `${opening}

${ideas ? `Berdasarkan ide chapter: ${ideas}` : ''}

[Konten chapter akan di-generate di sini berdasarkan character cards, worldbuilding elements, dan outline yang sudah dibuat. AI akan menggunakan semua informasi dari planning phase untuk membuat chapter yang konsisten dengan cerita.]

Ini adalah placeholder untuk konten yang akan di-generate oleh AI. Dalam implementasi nyata, ini akan menggunakan API AI untuk menghasilkan konten berdasarkan:

1. Character cards yang sudah dibuat
2. Worldbuilding elements 
3. Chapter ideas dan openings
4. Genre, tone, dan style yang dipilih
5. Sinopsis dan braindump

Konten akan disesuaikan dengan format yang dipilih (${selectedChapter.format}) dan akan melanjutkan alur cerita dari chapter sebelumnya.`;

    setEditorContent(generatedContent);
  };

  const toggleAutoPilot = () => {
    setIsAutoPilotMode(!isAutoPilotMode);
    // In real implementation, this would start/stop the autopilot writing process
  };

  const getProjectStats = () => {
    const totalChapters = allChapters.length;
    const completedChapters = allChapters.filter(c => c.isComplete).length;
    const totalWords = allChapters.reduce((total, chapter) => total + chapter.wordCount, 0);
    
    return { totalChapters, completedChapters, totalWords };
  };

  const stats = getProjectStats();

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header with Stats */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Writing Phase</h2>
            <p className="text-gray-600">
              Mulai menulis novel berdasarkan planning yang sudah dibuat
            </p>
          </div>
          
          <div className="flex gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.totalWords}</div>
              <div className="text-sm text-gray-500">Total Words</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.completedChapters}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.totalChapters}</div>
              <div className="text-sm text-gray-500">Total Chapters</div>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${stats.totalChapters > 0 ? (stats.completedChapters / stats.totalChapters) * 100 : 0}%` }}
          />
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar - Chapter List */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Chapters</CardTitle>
              <CardDescription>
                Pilih chapter untuk mulai menulis
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {project.outline.parts.map((part) => (
                <div key={part.id}>
                  <h4 className="font-medium text-sm text-gray-700 mb-2">
                    {part.title}
                  </h4>
                  {part.chapters.map((chapter) => (
                    <Button
                      key={chapter.id}
                      variant={selectedChapter?.id === chapter.id ? "default" : "outline"}
                      size="sm"
                      className="w-full justify-start mb-1"
                      onClick={() => handleChapterSelect(chapter.id)}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="truncate">{chapter.title}</span>
                        <div className="flex items-center gap-1">
                          {chapter.isComplete && (
                            <Badge variant="secondary" className="text-xs">✓</Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {chapter.wordCount}w
                          </span>
                        </div>
                      </div>
                    </Button>
                  ))}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3">
          {!selectedChapter ? (
            <Card className="h-96 flex items-center justify-center">
              <CardContent className="text-center">
                <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  Pilih Chapter untuk Mulai Menulis
                </h3>
                <p className="text-gray-500">
                  Pilih salah satu chapter dari sidebar untuk memulai proses writing
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {/* Chapter Header */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{selectedChapter.title}</CardTitle>
                      <CardDescription>
                        Format: {selectedChapter.format}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={generateChapterContent}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        Generate Content
                      </Button>
                      <Button 
                        variant={isAutoPilotMode ? "destructive" : "default"}
                        size="sm"
                        onClick={toggleAutoPilot}
                      >
                        {isAutoPilotMode ? (
                          <>
                            <Pause className="h-4 w-4 mr-2" />
                            Stop AutoPilot
                          </>
                        ) : (
                          <>
                            <Play className="h-4 w-4 mr-2" />
                            Start AutoPilot
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>

              {/* Writing Interface */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="editor">Editor</TabsTrigger>
                  <TabsTrigger value="reference">Reference</TabsTrigger>
                  <TabsTrigger value="ideas">Ideas & Openings</TabsTrigger>
                </TabsList>

                <TabsContent value="editor" className="space-y-4">
                  <Card>
                    <CardContent className="p-0">
                      <Textarea
                        value={editorContent}
                        onChange={(e) => setEditorContent(e.target.value)}
                        placeholder="Mulai menulis chapter di sini..."
                        className="min-h-[500px] border-0 resize-none focus:ring-0"
                      />
                    </CardContent>
                  </Card>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-500">
                      Words: {editorContent.split(/\s+/).filter(word => word.length > 0).length}
                    </div>
                    <Button onClick={saveChapterContent}>
                      Save Chapter
                    </Button>
                  </div>
                </TabsContent>

                <TabsContent value="reference" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Users className="h-5 w-5" />
                          Characters ({project.characters.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {project.characters.map((character) => (
                          <div key={character.id} className="p-2 bg-gray-50 rounded">
                            <h4 className="font-medium">{character.name}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {character.personality}
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <Globe className="h-5 w-5" />
                          Worldbuilding ({project.worldbuilding.length})
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {project.worldbuilding.map((element) => (
                          <div key={element.id} className="p-2 bg-gray-50 rounded">
                            <h4 className="font-medium">{element.elementName}</h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {element.description}
                            </p>
                          </div>
                        ))}
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="ideas" className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Chapter Ideas</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {selectedChapter.ideas.length > 0 ? (
                          <ul className="space-y-2">
                            {selectedChapter.ideas.map((idea, index) => (
                              <li key={index} className="p-2 bg-gray-50 rounded text-sm">
                                {idea}
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="text-gray-500 text-sm">No ideas yet</p>
                        )}
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Opening Options</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {selectedChapter.openings.map((opening, index) => (
                            <div key={index}>
                              <h4 className="text-sm font-medium text-gray-700 mb-1">
                                Opening {index + 1}
                              </h4>
                              <p className="text-sm text-gray-600 p-2 bg-gray-50 rounded">
                                {opening || 'No opening written yet'}
                              </p>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}