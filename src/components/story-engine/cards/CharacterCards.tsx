'use client';

import React, { useState } from 'react';
import { CharacterCard, CustomField } from '@/types/kugysoul';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
// Removed unused: DialogTrigger
import { Plus, Edit, Trash2, User, Heart, Users, UserMinus, Crown } from 'lucide-react';

interface CharacterCardsProps {
  characters: CharacterCard[];
  onUpdateCharacters: (characters: CharacterCard[]) => void;
}

const CHARACTER_ROLES = [
  { value: 'protagonist', label: 'Protagonis', icon: Crown, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'antagonist', label: 'Antagonis', icon: UserMinus, color: 'bg-red-100 text-red-800' },
  { value: 'love-interest', label: 'Love Interest', icon: Heart, color: 'bg-pink-100 text-pink-800' },
  { value: 'supporting', label: 'Supporting', icon: Users, color: 'bg-blue-100 text-blue-800' },
  { value: 'minor', label: 'Minor', icon: User, color: 'bg-gray-100 text-gray-800' }
] as const;

export function CharacterCards({ characters, onUpdateCharacters }: CharacterCardsProps) {
  const [editingCharacter, setEditingCharacter] = useState<CharacterCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const createNewCharacter = (): CharacterCard => ({
    id: Date.now().toString(),
    name: '',
    alias: '',
    personality: '',
    background: '',
    physicalDescription: '',
    dialogueStyle: '',
    role: 'supporting',
    customFields: [],
    createdAt: new Date(),
    lastModified: new Date()
  });

  const handleAddCharacter = () => {
    setEditingCharacter(createNewCharacter());
    setIsDialogOpen(true);
  };

  const handleEditCharacter = (character: CharacterCard) => {
    setEditingCharacter({ ...character });
    setIsDialogOpen(true);
  };

  const handleSaveCharacter = () => {
    if (!editingCharacter) return;

    const updatedCharacters = characters.find(c => c.id === editingCharacter.id)
      ? characters.map(c => c.id === editingCharacter.id ? editingCharacter : c)
      : [...characters, editingCharacter];

    onUpdateCharacters(updatedCharacters);
    setIsDialogOpen(false);
    setEditingCharacter(null);
  };

  const handleDeleteCharacter = (id: string) => {
    onUpdateCharacters(characters.filter(c => c.id !== id));
  };

  const updateEditingCharacter = (field: keyof CharacterCard, value: any) => {
    if (!editingCharacter) return;
    setEditingCharacter({
      ...editingCharacter,
      [field]: value,
      lastModified: new Date()
    });
  };

  const addCustomField = () => {
    if (!editingCharacter) return;
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      value: '',
      type: 'text'
    };
    updateEditingCharacter('customFields', [...editingCharacter.customFields, newField]);
  };

  const updateCustomField = (fieldId: string, updates: Partial<CustomField>) => {
    if (!editingCharacter) return;
    const updatedFields = editingCharacter.customFields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );
    updateEditingCharacter('customFields', updatedFields);
  };

  const removeCustomField = (fieldId: string) => {
    if (!editingCharacter) return;
    updateEditingCharacter('customFields', 
      editingCharacter.customFields.filter(field => field.id !== fieldId)
    );
  };

  const getRoleInfo = (role: string) => {
    return CHARACTER_ROLES.find(r => r.value === role) || CHARACTER_ROLES[3];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Character Cards</h2>
          <p className="text-gray-600">
            Buat dan kelola karakter-karakter dalam cerita Anda
          </p>
        </div>
        <Button onClick={handleAddCharacter}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Karakter
        </Button>
      </div>

      {/* Character Grid */}
      {characters.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <User className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Belum Ada Karakter
            </h3>
            <p className="text-gray-500 mb-4">
              Mulai dengan membuat karakter protagonis untuk cerita Anda
            </p>
            <Button onClick={handleAddCharacter}>
              <Plus className="h-4 w-4 mr-2" />
              Buat Karakter Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {characters.map((character) => {
            const roleInfo = getRoleInfo(character.role);
            const RoleIcon = roleInfo.icon;
            
            return (
              <Card key={character.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{character.name || 'Unnamed Character'}</CardTitle>
                      {character.alias && (
                        <CardDescription>&ldquo;{character.alias}&rdquo;</CardDescription>
                      )}
                    </div>
                    <Badge className={roleInfo.color}>
                      <RoleIcon className="h-3 w-3 mr-1" />
                      {roleInfo.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {character.personality && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Personality</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{character.personality}</p>
                    </div>
                  )}
                  
                  {character.background && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Background</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{character.background}</p>
                    </div>
                  )}

                  {character.physicalDescription && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Physical</h4>
                      <p className="text-sm text-gray-600 line-clamp-2">{character.physicalDescription}</p>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditCharacter(character)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteCharacter(character.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Character Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingCharacter?.name ? `Edit ${editingCharacter.name}` : 'Tambah Karakter Baru'}
            </DialogTitle>
            <DialogDescription>
              Isi informasi karakter untuk membantu AI memahami kepribadian dan peran mereka dalam cerita
            </DialogDescription>
          </DialogHeader>

          {editingCharacter && (
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nama Karakter *</Label>
                  <Input
                    id="name"
                    value={editingCharacter.name}
                    onChange={(e) => updateEditingCharacter('name', e.target.value)}
                    placeholder="Nama lengkap karakter"
                  />
                </div>
                <div>
                  <Label htmlFor="alias">Alias/Julukan</Label>
                  <Input
                    id="alias"
                    value={editingCharacter.alias}
                    onChange={(e) => updateEditingCharacter('alias', e.target.value)}
                    placeholder="Nama panggilan atau julukan"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="role">Role/Peran</Label>
                <Select 
                  value={editingCharacter.role} 
                  onValueChange={(value) => updateEditingCharacter('role', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CHARACTER_ROLES.map((role) => {
                      const Icon = role.icon;
                      return (
                        <SelectItem key={role.value} value={role.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {role.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Character Details */}
              <div>
                <Label htmlFor="personality">Personality</Label>
                <Textarea
                  id="personality"
                  value={editingCharacter.personality}
                  onChange={(e) => updateEditingCharacter('personality', e.target.value)}
                  placeholder="Sifat, kepribadian, motivasi, ketakutan, dll"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="background">Background</Label>
                <Textarea
                  id="background"
                  value={editingCharacter.background}
                  onChange={(e) => updateEditingCharacter('background', e.target.value)}
                  placeholder="Latar belakang, sejarah hidup, keluarga, pendidikan, dll"
                  rows={3}
                />
              </div>

              <div>
                <Label htmlFor="physicalDescription">Deskripsi Fisik</Label>
                <Textarea
                  id="physicalDescription"
                  value={editingCharacter.physicalDescription}
                  onChange={(e) => updateEditingCharacter('physicalDescription', e.target.value)}
                  placeholder="Penampilan fisik, tinggi, warna rambut, ciri khas, dll"
                  rows={2}
                />
              </div>

              <div>
                <Label htmlFor="dialogueStyle">Dialog Style</Label>
                <Textarea
                  id="dialogueStyle"
                  value={editingCharacter.dialogueStyle}
                  onChange={(e) => updateEditingCharacter('dialogueStyle', e.target.value)}
                  placeholder="Cara bicara, aksen, kata-kata favorit, gaya bahasa, dll"
                  rows={2}
                />
              </div>

              {/* Custom Fields */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <Label>Custom Fields</Label>
                  <Button variant="outline" size="sm" onClick={addCustomField}>
                    <Plus className="h-3 w-3 mr-1" />
                    Add Field
                  </Button>
                </div>
                
                {editingCharacter.customFields.map((field) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <Input
                      placeholder="Label"
                      value={field.label}
                      onChange={(e) => updateCustomField(field.id, { label: e.target.value })}
                      className="w-1/3"
                    />
                    <Input
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) => updateCustomField(field.id, { value: e.target.value })}
                      className="flex-1"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => removeCustomField(field.id)}
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                  Cancel
                </Button>
                <Button 
                  onClick={handleSaveCharacter} 
                  disabled={!editingCharacter.name.trim()}
                  className="flex-1"
                >
                  Save Character
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}