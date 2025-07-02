'use client';

import React, { useState } from 'react';
import { OutlineStructure, OutlinePart, ChapterCard } from '@/types/kugysoul';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// Removed Collapsible import - using conditional rendering instead
import { Plus, Edit, Trash2, BookOpen, ChevronDown, ChevronRight, Sparkles } from 'lucide-react';
// Removed unused: FileText

interface OutlineEditorProps {
  outline: OutlineStructure;
  onUpdateOutline: (outline: OutlineStructure) => void;
}

const DEFAULT_PARTS = [
  {
    title: 'INTRODUCTION',
    description: 'Perkenalan karakter, setting, dan konflik awal'
  },
  {
    title: 'KONFLIK DAN KLIMAKS', 
    description: 'Pengembangan konflik dan mencapai puncak ketegangan'
  },
  {
    title: 'PENYELESAIAN DAN RESOLUSI',
    description: 'Penyelesaian konflik dan penutup cerita'
  }
];

export function OutlineEditor({ outline, onUpdateOutline }: OutlineEditorProps) {
  const [editingPart, setEditingPart] = useState<OutlinePart | null>(null);
  const [editingChapter, setEditingChapter] = useState<ChapterCard | null>(null);
  const [isPartDialogOpen, setIsPartDialogOpen] = useState(false);
  const [isChapterDialogOpen, setIsChapterDialogOpen] = useState(false);
  const [expandedParts, setExpandedParts] = useState<Set<string>>(new Set());

  const initializeDefaultOutline = () => {
    const defaultParts: OutlinePart[] = DEFAULT_PARTS.map((part, index) => ({
      id: Date.now().toString() + index,
      title: part.title,
      description: part.description,
      chapters: [],
      order: index
    }));

    onUpdateOutline({ parts: defaultParts });
  };

  const createNewPart = (): OutlinePart => ({
    id: Date.now().toString(),
    title: '',
    description: '',
    chapters: [],
    order: outline.parts.length
  });

  const createNewChapter = (partId: string): ChapterCard => ({
    id: Date.now().toString(),
    title: '',
    partId,
    order: 0,
    roughDraft: '',
    openings: ['', '', ''],
    ideas: [],
    format: 'standard',
    isComplete: false,
    wordCount: 0,
    createdAt: new Date(),
    lastModified: new Date()
  });

  const handleAddPart = () => {
    setEditingPart(createNewPart());
    setIsPartDialogOpen(true);
  };

  const handleEditPart = (part: OutlinePart) => {
    setEditingPart({ ...part });
    setIsPartDialogOpen(true);
  };

  const handleSavePart = () => {
    if (!editingPart) return;

    const updatedParts = outline.parts.find(p => p.id === editingPart.id)
      ? outline.parts.map(p => p.id === editingPart.id ? editingPart : p)
      : [...outline.parts, editingPart];

    onUpdateOutline({ parts: updatedParts });
    setIsPartDialogOpen(false);
    setEditingPart(null);
  };

  const handleDeletePart = (id: string) => {
    onUpdateOutline({ 
      parts: outline.parts.filter(p => p.id !== id) 
    });
  };

  const handleAddChapter = (partId: string) => {
    const part = outline.parts.find(p => p.id === partId);
    if (!part) return;

    const newChapter = createNewChapter(partId);
    newChapter.order = part.chapters.length;
    newChapter.title = `Chapter ${part.chapters.length + 1}`;
    
    setEditingChapter(newChapter);
    setIsChapterDialogOpen(true);
  };

  const handleEditChapter = (chapter: ChapterCard) => {
    setEditingChapter({ ...chapter });
    setIsChapterDialogOpen(true);
  };

  const handleSaveChapter = () => {
    if (!editingChapter) return;

    const updatedParts = outline.parts.map(part => {
      if (part.id === editingChapter.partId) {
        const updatedChapters = part.chapters.find(c => c.id === editingChapter.id)
          ? part.chapters.map(c => c.id === editingChapter.id ? editingChapter : c)
          : [...part.chapters, editingChapter];
        
        return { ...part, chapters: updatedChapters };
      }
      return part;
    });

    onUpdateOutline({ parts: updatedParts });
    setIsChapterDialogOpen(false);
    setEditingChapter(null);
  };

  const handleDeleteChapter = (partId: string, chapterId: string) => {
    const updatedParts = outline.parts.map(part => {
      if (part.id === partId) {
        return {
          ...part,
          chapters: part.chapters.filter(c => c.id !== chapterId)
        };
      }
      return part;
    });

    onUpdateOutline({ parts: updatedParts });
  };

  const togglePartExpansion = (partId: string) => {
    const newExpanded = new Set(expandedParts);
    if (newExpanded.has(partId)) {
      newExpanded.delete(partId);
    } else {
      newExpanded.add(partId);
    }
    setExpandedParts(newExpanded);
  };

  const generateChapterIdeas = () => {
    // Simulate AI generation
    const ideas = [
      'Perkenalan karakter utama dalam situasi normal',
      'Munculnya konflik atau masalah pertama',
      'Karakter mengambil keputusan penting',
      'Komplikasi yang memperburuk situasi',
      'Momen realisasi atau discovery'
    ];
    
    if (editingChapter) {
      setEditingChapter({
        ...editingChapter,
        ideas: ideas
      });
    }
  };

  const totalChapters = outline.parts.reduce((total, part) => total + part.chapters.length, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Outline Structure</h2>
          <p className="text-gray-600">
            Buat struktur cerita dengan sistem 3 babak dan chapter cards
          </p>
        </div>
        <div className="flex gap-2">
          {outline.parts.length === 0 && (
            <Button variant="outline" onClick={initializeDefaultOutline}>
              <BookOpen className="h-4 w-4 mr-2" />
              Setup Default Outline
            </Button>
          )}
          <Button onClick={handleAddPart}>
            <Plus className="h-4 w-4 mr-2" />
            Tambah Babak
          </Button>
        </div>
      </div>

      {/* Stats */}
      {outline.parts.length > 0 && (
        <div className="flex gap-4">
          <Badge variant="secondary">
            {outline.parts.length} Babak
          </Badge>
          <Badge variant="secondary">
            {totalChapters} Chapter
          </Badge>
        </div>
      )}

      {/* Outline Structure */}
      {outline.parts.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Belum Ada Outline
            </h3>
            <p className="text-gray-500 mb-4">
              Mulai dengan setup outline default 3 babak atau buat struktur custom Anda sendiri
            </p>
            <div className="flex gap-2 justify-center">
              <Button onClick={initializeDefaultOutline}>
                <BookOpen className="h-4 w-4 mr-2" />
                Setup Default (3 Babak)
              </Button>
              <Button variant="outline" onClick={handleAddPart}>
                <Plus className="h-4 w-4 mr-2" />
                Buat Custom
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {outline.parts.map((part, partIndex) => {
            const isExpanded = expandedParts.has(part.id);
            
            return (
              <Card key={part.id}>
                {/* Using conditional rendering instead of Collapsible */}
                    <CardHeader 
                      className="cursor-pointer hover:bg-gray-50"
                      onClick={() => togglePartExpansion(part.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          {isExpanded ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                          <div>
                            <CardTitle className="text-lg">
                              BABAK {partIndex + 1}: {part.title}
                            </CardTitle>
                            <CardDescription>{part.description}</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {part.chapters.length} chapters
                          </Badge>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleEditPart(part);
                            }}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeletePart(part.id);
                            }}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                
                {isExpanded && (
                    <CardContent className="pt-0">
                      {/* Chapters */}
                      <div className="space-y-3">
                        {part.chapters.map((chapter) => (
                          <Card key={chapter.id} className="bg-gray-50">
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between">
                                <div className="flex-1">
                                  <h4 className="font-medium">{chapter.title}</h4>
                                  <div className="flex items-center gap-4 text-sm text-gray-500 mt-1">
                                    <span>Format: {chapter.format}</span>
                                    <span>Ideas: {chapter.ideas.length}</span>
                                    <span>Openings: {chapter.openings.filter(o => o.trim()).length}/3</span>
                                    {chapter.isComplete && (
                                      <Badge variant="secondary" className="text-xs">
                                        Complete
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleEditChapter(chapter)}
                                  >
                                    <Edit className="h-3 w-3 mr-1" />
                                    Edit
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDeleteChapter(part.id, chapter.id)}
                                    className="text-red-600 hover:text-red-700"
                                  >
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                        
                        {/* Add Chapter Button */}
                        <Button 
                          variant="outline" 
                          className="w-full border-dashed"
                          onClick={() => handleAddChapter(part.id)}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Tambah Chapter ke Babak {partIndex + 1}
                        </Button>
                      </div>
                    </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      )}

      {/* Part Editor Dialog */}
      <Dialog open={isPartDialogOpen} onOpenChange={setIsPartDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>
              {editingPart?.title ? `Edit ${editingPart.title}` : 'Tambah Babak Baru'}
            </DialogTitle>
            <DialogDescription>
              Atur struktur babak dalam outline cerita Anda
            </DialogDescription>
          </DialogHeader>

          {editingPart && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="partTitle">Judul Babak *</Label>
                <Input
                  id="partTitle"
                  value={editingPart.title}
                  onChange={(e) => setEditingPart({ ...editingPart, title: e.target.value })}
                  placeholder="Contoh: INTRODUCTION, KONFLIK DAN KLIMAKS"
                />
              </div>

              <div>
                <Label htmlFor="partDescription">Deskripsi Babak</Label>
                <Textarea
                  id="partDescription"
                  value={editingPart.description}
                  onChange={(e) => setEditingPart({ ...editingPart, description: e.target.value })}
                  placeholder="Jelaskan apa yang terjadi di babak ini"
                  rows={3}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsPartDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSavePart} 
                  disabled={!editingPart.title.trim()}
                  className="flex-1"
                >
                  Save Babak
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Chapter Editor Dialog */}
      <Dialog open={isChapterDialogOpen} onOpenChange={setIsChapterDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingChapter?.title ? `Edit ${editingChapter.title}` : 'Tambah Chapter Baru'}
            </DialogTitle>
            <DialogDescription>
              Setup chapter dengan berbagai opsi konten dan format
            </DialogDescription>
          </DialogHeader>

          {editingChapter && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="chapterTitle">Judul Chapter *</Label>
                  <Input
                    id="chapterTitle"
                    value={editingChapter.title}
                    onChange={(e) => setEditingChapter({ ...editingChapter, title: e.target.value })}
                    placeholder="Judul chapter"
                  />
                </div>
                <div>
                  <Label htmlFor="chapterFormat">Format Tulisan</Label>
                  <select 
                    id="chapterFormat"
                    value={editingChapter.format}
                    onChange={(e) => setEditingChapter({ ...editingChapter, format: e.target.value as any })}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="standard">Standard</option>
                    <option value="dialogue-heavy">Dialogue Heavy</option>
                    <option value="action-heavy">Action Heavy</option>
                    <option value="descriptive">Descriptive</option>
                  </select>
                </div>
              </div>

              {/* Ideas Section */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Chapter Ideas</Label>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => generateChapterIdeas()}
                  >
                    <Sparkles className="h-3 w-3 mr-1" />
                    Generate Ideas
                  </Button>
                </div>
                <div className="space-y-2">
                  {editingChapter.ideas.map((idea, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={idea}
                        onChange={(e) => {
                          const newIdeas = [...editingChapter.ideas];
                          newIdeas[index] = e.target.value;
                          setEditingChapter({ ...editingChapter, ideas: newIdeas });
                        }}
                        placeholder={`Ide ${index + 1}`}
                      />
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          const newIdeas = editingChapter.ideas.filter((_, i) => i !== index);
                          setEditingChapter({ ...editingChapter, ideas: newIdeas });
                        }}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setEditingChapter({ 
                      ...editingChapter, 
                      ideas: [...editingChapter.ideas, ''] 
                    })}
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add Idea
                  </Button>
                </div>
              </div>

              {/* Openings Section */}
              <div>
                <Label>3 Opening Paragraphs</Label>
                <div className="space-y-2">
                  {editingChapter.openings.map((opening, index) => (
                    <Textarea
                      key={index}
                      value={opening}
                      onChange={(e) => {
                        const newOpenings = [...editingChapter.openings];
                        newOpenings[index] = e.target.value;
                        setEditingChapter({ ...editingChapter, openings: newOpenings });
                      }}
                      placeholder={`Opening ${index + 1}`}
                      rows={2}
                    />
                  ))}
                </div>
              </div>

              {/* Rough Draft */}
              <div>
                <Label htmlFor="roughDraft">Rough Draft</Label>
                <Textarea
                  id="roughDraft"
                  value={editingChapter.roughDraft}
                  onChange={(e) => setEditingChapter({ ...editingChapter, roughDraft: e.target.value })}
                  placeholder="Draft mentah chapter yang bisa diedit"
                  rows={6}
                />
              </div>

              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsChapterDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveChapter} 
                  disabled={!editingChapter.title.trim()}
                  className="flex-1"
                >
                  Save Chapter
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}