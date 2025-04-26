import { ExternalLink, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';

type Template = {
  id: string;
  title: string;
  content: string;
};

type TemplateListProps = {
  templates: Template[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function TemplateList({ templates, onEdit, onDelete }: TemplateListProps) {
  if (templates.length === 0) {
    return (
      <div className="text-center py-10 text-gray-500">
        <p>No templates yet. Create your first template!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {templates.map((template) => (
        <div 
          key={template.id}
          className="border border-gray-200 rounded-md p-4 hover:border-gray-300 transition-colors"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-base font-medium text-gray-800">{template.title}</h3>
              <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                {template.content}
              </p>
            </div>
            
            <div className="flex space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(template.id)}
                title="Edit template"
              >
                <Pencil className="h-4 w-4 text-gray-500" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(template.id)}
                title="Delete template"
              >
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}