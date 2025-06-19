'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BookOpen, Pen, Sparkles, Download, Share2, Save, Wand2, Brain, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { apiService } from '@/services/api';

interface NovelChapter {
  id: string;
  title: string;
  content: string;
  wordCount: number;
  createdAt: Date;
}

interface NovelProject {
  id: string;
  title: string;
  genre: string;
  description: string;
  chapters: NovelChapter[];
  totalWords: number;
  createdAt: Date;
}

export default function NovelWriter() {
  const [projects, setProjects] = useState<NovelProject[]>([]);
  const [currentProject, setCurrentProject] = useState<NovelProject | null>(null);
  const [isWriting, setIsWriting] = useState(false);
  const [aiAssistMode, setAiAssistMode] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [editorContent, setEditorContent] = useState('');

  const createNewProject = () => {
    const newProject: NovelProject = {
      id: Date.now().toString(),
      title: 'Untitled Novel',
      genre: 'Fantasy',
      description: '',
      chapters: [],
      totalWords: 0,
      createdAt: new Date()
    };
    setProjects([...projects, newProject]);
    setCurrentProject(newProject);
    setIsWriting(true);
  };

  const addNewChapter = () => {
    if (!currentProject) return;
    
    const newChapter: NovelChapter = {
      id: Date.now().toString(),
      title: `Chapter ${currentProject.chapters.length + 1}`,
      content: '',
      wordCount: 0,
      createdAt: new Date()
    };

    const updatedProject = {
      ...currentProject,
      chapters: [...currentProject.chapters, newChapter]
    };
    
    setCurrentProject(updatedProject);
    setProjects(projects.map(p => p.id === currentProject.id ? updatedProject : p));
  };

  const generateWithAI = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    try {
      // Use the same endpoint as chat but with novel-specific prompt
      const response = await apiService.sendChatMessage({
        message: `You are a creative novel writing assistant. Write a compelling novel chapter or story segment based on this prompt: "${prompt}". 

Guidelines:
- Make it engaging and descriptive
- Around 500-800 words
- Use vivid imagery and strong character development
- Include dialogue if appropriate
- Match the tone and style requested
- Be creative and original

Write the story content now:`,
        temperature: 0.8, // Higher creativity for novel writing
        max_tokens: 1000
      });
      
      setGeneratedContent(response.response || response.message || 'AI generated content will appear here...');
    } catch (error) {
      console.error('AI generation failed:', error);
      setGeneratedContent('Sorry, AI generation is currently unavailable. Please try again later.');
    } finally {
      setIsGenerating(false);
    }
  };

  const saveProject = () => {
    // Save to localStorage for now
    localStorage.setItem('novel_projects', JSON.stringify(projects));
  };

  useEffect(() => {
    // Load projects from localStorage
    const saved = localStorage.getItem('novel_projects');
    if (saved) {
      setProjects(JSON.parse(saved));
    }
  }, []);

  if (!isWriting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <BookOpen className="w-12 h-12 text-purple-400" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Novel Writer AI
              </h1>
            </div>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Create amazing novels with AI assistance. Write, generate, and publish your stories with the power of artificial intelligence.
            </p>
          </motion.div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <Pen className="w-8 h-8 text-purple-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Smart Writing</h3>
              <p className="text-gray-300">
                Advanced text editor with auto-save, word count, and chapter management.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <Brain className="w-8 h-8 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">AI Assistant</h3>
              <p className="text-gray-300">
                Get creative suggestions, plot ideas, and character development help.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20"
            >
              <Sparkles className="w-8 h-8 text-pink-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">Auto Generate</h3>
              <p className="text-gray-300">
                Generate entire chapters, dialogue, and descriptions with AI.
              </p>
            </motion.div>
          </div>

          {/* Projects Section */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">Your Novel Projects</h2>
              <Button
                onClick={createNewProject}
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
              >
                <Pen className="w-4 h-4 mr-2" />
                New Novel
              </Button>
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-300 mb-2">No novels yet</h3>
                <p className="text-gray-400 mb-6">Start your first novel project and unleash your creativity!</p>
                <Button
                  onClick={createNewProject}
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                >
                  <Sparkles className="w-4 h-4 mr-2" />
                  Create Your First Novel
                </Button>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                  <motion.div
                    key={project.id}
                    whileHover={{ scale: 1.02 }}
                    className="bg-white/5 rounded-xl p-6 border border-white/10 cursor-pointer"
                    onClick={() => {
                      setCurrentProject(project);
                      setIsWriting(true);
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <BookOpen className="w-5 h-5 text-purple-400" />
                      <span className="text-sm text-purple-300 font-medium">{project.genre}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                      {project.description || 'No description yet...'}
                    </p>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{project.chapters.length} chapters</span>
                      <span>{project.totalWords} words</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Writing Interface */}
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-80 bg-black/20 backdrop-blur-lg border-r border-white/10 p-6">
          <div className="flex items-center gap-2 mb-6">
            <Button
              onClick={() => setIsWriting(false)}
              variant="ghost"
              size="sm"
              className="text-gray-300 hover:text-white"
            >
              ← Back
            </Button>
          </div>

          {/* Project Info */}
          <div className="mb-6">
            <input
              type="text"
              value={currentProject?.title || ''}
              onChange={(e) => {
                if (currentProject) {
                  const updated = { ...currentProject, title: e.target.value };
                  setCurrentProject(updated);
                  setProjects(projects.map(p => p.id === currentProject.id ? updated : p));
                }
              }}
              className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-white text-lg font-semibold"
              placeholder="Novel Title"
            />
          </div>

          {/* Chapters */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-white font-semibold">Chapters</h3>
              <Button
                onClick={addNewChapter}
                size="sm"
                className="bg-purple-500 hover:bg-purple-600"
              >
                + Add
              </Button>
            </div>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {currentProject?.chapters.map((chapter) => (
                <div
                  key={chapter.id}
                  className="bg-white/5 rounded-lg p-3 border border-white/10"
                >
                  <div className="text-white text-sm font-medium">{chapter.title}</div>
                  <div className="text-gray-400 text-xs">{chapter.wordCount} words</div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Assistant Toggle */}
          <div className="mb-6">
            <Button
              onClick={() => setAiAssistMode(!aiAssistMode)}
              className={`w-full ${aiAssistMode 
                ? 'bg-gradient-to-r from-purple-500 to-pink-500' 
                : 'bg-white/10 hover:bg-white/20'
              }`}
            >
              <Wand2 className="w-4 h-4 mr-2" />
              AI Assistant {aiAssistMode ? 'ON' : 'OFF'}
            </Button>
          </div>

          {/* Stats */}
          <div className="bg-white/5 rounded-lg p-4">
            <h4 className="text-white font-semibold mb-2">Project Stats</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between text-gray-300">
                <span>Chapters:</span>
                <span>{currentProject?.chapters.length || 0}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Total Words:</span>
                <span>{currentProject?.totalWords || 0}</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Genre:</span>
                <span>{currentProject?.genre}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Editor */}
        <div className="flex-1 flex flex-col">
          {/* Toolbar */}
          <div className="bg-black/20 backdrop-blur-lg border-b border-white/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h2 className="text-white font-semibold">
                  {currentProject?.chapters[0]?.title || 'New Chapter'}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button onClick={saveProject} size="sm" variant="ghost">
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </Button>
                <Button size="sm" variant="ghost">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="flex-1 flex">
            {/* Text Editor */}
            <div className="flex-1 p-6">
              <textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                className="w-full h-full bg-transparent text-white text-lg leading-relaxed resize-none outline-none"
                placeholder="Start writing your novel here... Let your imagination flow!"
                style={{ fontFamily: 'Georgia, serif' }}
              />
            </div>

            {/* AI Assistant Panel */}
            <AnimatePresence>
              {aiAssistMode && (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 400, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="bg-black/20 backdrop-blur-lg border-l border-white/10 p-6"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Brain className="w-5 h-5 text-purple-400" />
                    <h3 className="text-white font-semibold">AI Writing Assistant</h3>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-gray-300 text-sm mb-2 block">
                        What do you want to write about?
                      </label>
                      <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 rounded-lg p-3 text-white text-sm"
                        rows={3}
                        placeholder="Describe a scene, character, or plot point..."
                      />
                    </div>

                    <Button
                      onClick={generateWithAI}
                      disabled={isGenerating || !prompt.trim()}
                      className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                    >
                      {isGenerating ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          Generating...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate with AI
                        </>
                      )}
                    </Button>

                    {generatedContent && (
                      <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                        <h4 className="text-white font-medium mb-2">AI Generated Content:</h4>
                        <div className="text-gray-300 text-sm leading-relaxed max-h-60 overflow-y-auto">
                          {generatedContent}
                        </div>
                        <div className="flex gap-2 mt-3">
                          <Button
                            size="sm"
                            className="bg-green-500 hover:bg-green-600"
                            onClick={() => {
                              // Add to editor
                              setEditorContent(prev => prev + '\n\n' + generatedContent);
                              setGeneratedContent('');
                              setPrompt('');
                            }}
                          >
                            Add to Editor
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => {
                              // Replace editor content
                              setEditorContent(generatedContent);
                              setGeneratedContent('');
                              setPrompt('');
                            }}
                          >
                            Replace All
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}