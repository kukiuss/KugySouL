'use client';

import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  BookOpen, 
  Users, 
  Globe, 
  FileText, 
  CheckCircle, 
  Clock,
  Target,
  TrendingUp
} from 'lucide-react';
import { StoryProject } from '@/types/kugysoul';

interface StoryEngineStatsProps {
  project: StoryProject;
}

export function StoryEngineStats({ project }: StoryEngineStatsProps) {
  // Calculate statistics
  const totalChapters = project.outline.parts.reduce((sum, part) => sum + part.chapters.length, 0);
  const completedChapters = project.outline.parts.reduce(
    (sum, part) => sum + part.chapters.filter(ch => ch.isComplete).length, 
    0
  );
  const totalCharacters = project.characters.length;
  const totalWorldElements = project.worldbuilding.length;
  const totalWords = project.outline.parts.reduce(
    (sum, part) => sum + part.chapters.reduce(
      (chSum, ch) => chSum + (ch.roughDraft?.split(' ').length || 0), 
      0
    ), 
    0
  );

  const progressPercentage = totalChapters > 0 ? (completedChapters / totalChapters) * 100 : 0;

  // Phase completion tracking
  const phases = [
    {
      name: 'Brainstorming',
      icon: BookOpen,
      completed: project.selectedIdea !== null,
      description: 'Story idea selected'
    },
    {
      name: 'Characters',
      icon: Users,
      completed: totalCharacters >= 3,
      description: `${totalCharacters}/3+ characters`
    },
    {
      name: 'Worldbuilding',
      icon: Globe,
      completed: totalWorldElements >= 5,
      description: `${totalWorldElements}/5+ elements`
    },
    {
      name: 'Outline',
      icon: FileText,
      completed: totalChapters >= 10,
      description: `${totalChapters}/10+ chapters`
    }
  ];

  const completedPhases = phases.filter(phase => phase.completed).length;
  const overallProgress = (completedPhases / phases.length) * 100;

  return (
    <div className="space-y-6">
      {/* Overall Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-blue-600" />
            Project Progress
          </CardTitle>
          <CardDescription>
            Track your novel creation journey from idea to completion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Completion</span>
                <span>{Math.round(overallProgress)}%</span>
              </div>
              <Progress value={overallProgress} className="h-2" />
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {phases.map((phase, index) => {
                const Icon = phase.icon;
                return (
                  <div key={index} className="text-center">
                    <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                      phase.completed 
                        ? 'bg-green-100 text-green-600' 
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {phase.completed ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        <Icon className="h-6 w-6" />
                      )}
                    </div>
                    <h4 className="font-medium text-sm">{phase.name}</h4>
                    <p className="text-xs text-gray-500">{phase.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Writing Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            Writing Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{totalChapters}</div>
              <div className="text-sm text-gray-500">Total Chapters</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{completedChapters}</div>
              <div className="text-sm text-gray-500">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{totalWords.toLocaleString()}</div>
              <div className="text-sm text-gray-500">Words Written</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {Math.round(progressPercentage)}%
              </div>
              <div className="text-sm text-gray-500">Chapter Progress</div>
            </div>
          </div>
          
          {totalChapters > 0 && (
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Chapter Completion</span>
                <span>{completedChapters}/{totalChapters}</span>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Content Statistics */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-blue-600" />
              Characters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Characters</span>
                <Badge variant="secondary">{totalCharacters}</Badge>
              </div>
              {project.characters.slice(0, 3).map((character, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">
                      {character.name.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{character.name}</div>
                    <div className="text-xs text-gray-500">{character.role}</div>
                  </div>
                </div>
              ))}
              {totalCharacters > 3 && (
                <div className="text-xs text-gray-500 text-center">
                  +{totalCharacters - 3} more characters
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-green-600" />
              World Elements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Elements</span>
                <Badge variant="secondary">{totalWorldElements}</Badge>
              </div>
              {project.worldbuilding.slice(0, 3).map((element, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-xs font-medium text-green-600">
                      {element.elementName.charAt(0)}
                    </span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-sm">{element.elementName}</div>
                    <div className="text-xs text-gray-500">{element.elementType}</div>
                  </div>
                </div>
              ))}
              {totalWorldElements > 3 && (
                <div className="text-xs text-gray-500 text-center">
                  +{totalWorldElements - 3} more elements
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-gray-600" />
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>Project created: {project.title}</span>
              <span className="text-gray-500 ml-auto">
                {new Date(project.createdAt).toLocaleDateString()}
              </span>
            </div>
            {project.selectedIdea && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Story idea selected: {project.selectedIdea}</span>
              </div>
            )}
            {totalCharacters > 0 && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>{totalCharacters} characters created</span>
              </div>
            )}
            {totalWorldElements > 0 && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                <span>{totalWorldElements} world elements added</span>
              </div>
            )}
            {totalChapters > 0 && (
              <div className="flex items-center gap-3 text-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span>{totalChapters} chapters outlined</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}