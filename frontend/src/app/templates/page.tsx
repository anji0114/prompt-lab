"use client";

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import TemplateList from '@/components/TemplateList';

// Mock data for existing templates
const initialTemplates = [
  { 
    id: '1', 
    title: 'Basic Analysis', 
    content: 'Analyze the following text from the perspective of {{perspective}}:\n\n{{text}}' 
  },
  { 
    id: '2', 
    title: 'Email Writer', 
    content: 'Write a professional email to {{recipient}} about {{subject}}.' 
  },
  { 
    id: '3', 
    title: 'Code Explanation', 
    content: 'Explain the following {{language}} code:\n\n{{code}}' 
  },
];

export default function TemplatesPage() {
  const [templates, setTemplates] = useState(initialTemplates);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const handleSaveTemplate = () => {
    if (!title.trim() || !content.trim()) return;
    
    if (editingId) {
      // Update existing template
      setTemplates(templates.map(template => 
        template.id === editingId ? { ...template, title, content } : template
      ));
      setEditingId(null);
    } else {
      // Create new template
      const newTemplate = {
        id: Date.now().toString(),
        title,
        content,
      };
      setTemplates([...templates, newTemplate]);
    }
    
    // Reset form
    setTitle('');
    setContent('');
  };
  
  const handleEditTemplate = (id: string) => {
    const templateToEdit = templates.find(t => t.id === id);
    if (templateToEdit) {
      setTitle(templateToEdit.title);
      setContent(templateToEdit.content);
      setEditingId(id);
    }
  };
  
  const handleDeleteTemplate = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    if (editingId === id) {
      setTitle('');
      setContent('');
      setEditingId(null);
    }
  };
  
  const handleCancelEdit = () => {
    setTitle('');
    setContent('');
    setEditingId(null);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid gap-8 md:grid-cols-[1fr_1fr]">
          {/* Template Form */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h1 className="text-2xl font-medium text-gray-800 mb-6">
              {editingId ? 'Edit Template' : 'Create Template'}
            </h1>
            
            <div className="space-y-6">
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                  Template Title
                </label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a descriptive title"
                />
              </div>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                  Template Content
                </label>
                <Textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Write your template with variables like {{variable_name}}"
                  rows={10}
                />
                <p className="mt-2 text-sm text-gray-500">
                  Use {'{{'}<span>variable_name</span>{'}}'}  syntax for replaceable values
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button onClick={handleSaveTemplate} className="flex-1">
                  {editingId ? 'Update Template' : 'Save Template'}
                </Button>
                
                {editingId && (
                  <Button onClick={handleCancelEdit} variant="outline">
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
          
          {/* Template List */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-medium text-gray-800 mb-6">Your Templates</h2>
            <TemplateList 
              templates={templates}
              onEdit={handleEditTemplate}
              onDelete={handleDeleteTemplate}
            />
          </div>
        </div>
      </div>
    </main>
  );
}