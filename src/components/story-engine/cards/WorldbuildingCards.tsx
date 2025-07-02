'use client';

import React, { useState } from 'react';
import { WorldbuildingCard, CustomField } from '@/types/kugysoul';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Plus, Edit, Trash2, MapPin, Building, Book, Calendar, Search, Wand2, Package, Cpu, Users2 } from 'lucide-react';

interface WorldbuildingCardsProps {
  worldbuilding: WorldbuildingCard[];
  onUpdateWorldbuilding: (worldbuilding: WorldbuildingCard[]) => void;
}

const ELEMENT_TYPES = [
  { value: 'setting', label: 'Setting/Lokasi', icon: MapPin, color: 'bg-green-100 text-green-800' },
  { value: 'organization', label: 'Organisasi', icon: Building, color: 'bg-blue-100 text-blue-800' },
  { value: 'knowledge', label: 'Pengetahuan', icon: Book, color: 'bg-purple-100 text-purple-800' },
  { value: 'key-event', label: 'Key Event', icon: Calendar, color: 'bg-orange-100 text-orange-800' },
  { value: 'clue', label: 'Clue/Petunjuk', icon: Search, color: 'bg-yellow-100 text-yellow-800' },
  { value: 'magic-system', label: 'Magic System', icon: Wand2, color: 'bg-pink-100 text-pink-800' },
  { value: 'item', label: 'Item/Objek', icon: Package, color: 'bg-indigo-100 text-indigo-800' },
  { value: 'technology', label: 'Technology', icon: Cpu, color: 'bg-gray-100 text-gray-800' },
  { value: 'culture', label: 'Culture/Budaya', icon: Users2, color: 'bg-red-100 text-red-800' },
  { value: 'other', label: 'Lainnya', icon: Package, color: 'bg-gray-100 text-gray-800' }
] as const;

export function WorldbuildingCards({ worldbuilding, onUpdateWorldbuilding }: WorldbuildingCardsProps) {
  const [editingElement, setEditingElement] = useState<WorldbuildingCard | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>('all');

  const createNewElement = (): WorldbuildingCard => ({
    id: Date.now().toString(),
    elementName: '',
    elementType: 'setting',
    alias: '',
    description: '',
    customFields: [],
    createdAt: new Date(),
    lastModified: new Date()
  });

  const handleAddElement = () => {
    setEditingElement(createNewElement());
    setIsDialogOpen(true);
  };

  const handleEditElement = (element: WorldbuildingCard) => {
    setEditingElement({ ...element });
    setIsDialogOpen(true);
  };

  const handleSaveElement = () => {
    if (!editingElement) return;

    const updatedElements = worldbuilding.find(e => e.id === editingElement.id)
      ? worldbuilding.map(e => e.id === editingElement.id ? editingElement : e)
      : [...worldbuilding, editingElement];

    onUpdateWorldbuilding(updatedElements);
    setIsDialogOpen(false);
    setEditingElement(null);
  };

  const handleDeleteElement = (id: string) => {
    onUpdateWorldbuilding(worldbuilding.filter(e => e.id !== id));
  };

  const updateEditingElement = (field: keyof WorldbuildingCard, value: any) => {
    if (!editingElement) return;
    setEditingElement({
      ...editingElement,
      [field]: value,
      lastModified: new Date()
    });
  };

  const addCustomField = () => {
    if (!editingElement) return;
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      value: '',
      type: 'text'
    };
    updateEditingElement('customFields', [...editingElement.customFields, newField]);
  };

  const updateCustomField = (fieldId: string, updates: Partial<CustomField>) => {
    if (!editingElement) return;
    const updatedFields = editingElement.customFields.map(field =>
      field.id === fieldId ? { ...field, ...updates } : field
    );
    updateEditingElement('customFields', updatedFields);
  };

  const removeCustomField = (fieldId: string) => {
    if (!editingElement) return;
    updateEditingElement('customFields', 
      editingElement.customFields.filter(field => field.id !== fieldId)
    );
  };

  const getTypeInfo = (type: string) => {
    return ELEMENT_TYPES.find(t => t.value === type) || ELEMENT_TYPES[9];
  };

  const filteredElements = filterType === 'all' 
    ? worldbuilding 
    : worldbuilding.filter(e => e.elementType === filterType);

  const elementsByType = ELEMENT_TYPES.reduce((acc, type) => {
    acc[type.value] = worldbuilding.filter(e => e.elementType === type.value).length;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Worldbuilding Cards</h2>
          <p className="text-gray-600">
            Bangun dunia cerita dengan elemen-elemen penting seperti lokasi, organisasi, dan sistem magic
          </p>
        </div>
        <Button onClick={handleAddElement}>
          <Plus className="h-4 w-4 mr-2" />
          Tambah Element
        </Button>
      </div>

      {/* Filter and Stats */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Label htmlFor="filter">Filter by type:</Label>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Semua ({worldbuilding.length})</SelectItem>
              {ELEMENT_TYPES.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label} ({elementsByType[type.value] || 0})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          {ELEMENT_TYPES.slice(0, 5).map((type) => {
            const count = elementsByType[type.value] || 0;
            if (count === 0) return null;
            return (
              <Badge key={type.value} variant="secondary" className={type.color}>
                {type.label}: {count}
              </Badge>
            );
          })}
        </div>
      </div>

      {/* Elements Grid */}
      {filteredElements.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-300">
          <CardContent className="p-12 text-center">
            <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {filterType === 'all' ? 'Belum Ada Element Worldbuilding' : `Belum Ada ${getTypeInfo(filterType).label}`}
            </h3>
            <p className="text-gray-500 mb-4">
              Mulai membangun dunia cerita dengan menambahkan lokasi, organisasi, atau elemen lainnya
            </p>
            <Button onClick={handleAddElement}>
              <Plus className="h-4 w-4 mr-2" />
              Buat Element Pertama
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredElements.map((element) => {
            const typeInfo = getTypeInfo(element.elementType);
            const TypeIcon = typeInfo.icon;
            
            return (
              <Card key={element.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{element.elementName || 'Unnamed Element'}</CardTitle>
                      {element.alias && (
                        <CardDescription>&ldquo;{element.alias}&rdquo;</CardDescription>
                      )}
                    </div>
                    <Badge className={typeInfo.color}>
                      <TypeIcon className="h-3 w-3 mr-1" />
                      {typeInfo.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  {element.description && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Description</h4>
                      <p className="text-sm text-gray-600 line-clamp-3">{element.description}</p>
                    </div>
                  )}

                  {element.customFields.length > 0 && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700">Additional Info</h4>
                      <div className="space-y-1">
                        {element.customFields.slice(0, 2).map((field) => (
                          <div key={field.id} className="text-xs">
                            <span className="font-medium">{field.label}:</span> {field.value}
                          </div>
                        ))}
                        {element.customFields.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{element.customFields.length - 2} more fields
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex gap-2 pt-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleEditElement(element)}
                      className="flex-1"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => handleDeleteElement(element.id)}
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

      {/* Element Editor Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingElement?.elementName ? `Edit ${editingElement.elementName}` : 'Tambah Element Baru'}
            </DialogTitle>
            <DialogDescription>
              Isi informasi element worldbuilding untuk memperkaya latar belakang cerita
            </DialogDescription>
          </DialogHeader>

          {editingElement && (
            <div className="space-y-4">
              {/* Basic Info */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="elementName">Nama Element *</Label>
                  <Input
                    id="elementName"
                    value={editingElement.elementName}
                    onChange={(e) => updateEditingElement('elementName', e.target.value)}
                    placeholder="Nama lokasi, organisasi, dll"
                  />
                </div>
                <div>
                  <Label htmlFor="alias">Alias/Nama Lain</Label>
                  <Input
                    id="alias"
                    value={editingElement.alias}
                    onChange={(e) => updateEditingElement('alias', e.target.value)}
                    placeholder="Nama alternatif atau julukan"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="elementType">Jenis Element</Label>
                <Select 
                  value={editingElement.elementType} 
                  onValueChange={(value) => updateEditingElement('elementType', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {ELEMENT_TYPES.map((type) => {
                      const Icon = type.icon;
                      return (
                        <SelectItem key={type.value} value={type.value}>
                          <div className="flex items-center gap-2">
                            <Icon className="h-4 w-4" />
                            {type.label}
                          </div>
                        </SelectItem>
                      );
                    })}
                  </SelectContent>
                </Select>
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Deskripsi Element (Sensory)</Label>
                <Textarea
                  id="description"
                  value={editingElement.description}
                  onChange={(e) => updateEditingElement('description', e.target.value)}
                  placeholder="Deskripsi detail dengan fokus pada sensory (penglihatan, pendengaran, penciuman, dll)"
                  rows={4}
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
                
                {editingElement.customFields.map((field) => (
                  <div key={field.id} className="flex gap-2 mb-2">
                    <Input
                      placeholder="Label (contoh: Populasi, Iklim)"
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
                  onClick={handleSaveElement} 
                  disabled={!editingElement.elementName.trim()}
                  className="flex-1"
                >
                  Save Element
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}