import { formatDistanceToNow } from 'date-fns';
import { ChevronRight } from 'lucide-react';

type HistoryItemType = {
  id: string;
  date: string;
  templateName: string;
  prompt: string;
  output: string;
};

type HistoryItemProps = {
  item: HistoryItemType;
  onClick: () => void;
};

export default function HistoryItem({ item, onClick }: HistoryItemProps) {
  // Format the date to relative time (e.g., "2 days ago")
  const formattedDate = formatDistanceToNow(new Date(item.date), { addSuffix: true });
  
  // Truncate prompt and output for preview
  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <div 
      className="border border-gray-200 rounded-md p-4 hover:border-gray-300 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base font-medium text-gray-800">{item.templateName}</h3>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
          
          <div className="space-y-2">
            <div>
              <h4 className="text-xs font-medium text-gray-500">Prompt</h4>
              <p className="text-sm text-gray-700 line-clamp-1">{truncateText(item.prompt, 100)}</p>
            </div>
            
            <div>
              <h4 className="text-xs font-medium text-gray-500">Output</h4>
              <p className="text-sm text-gray-700 line-clamp-1">{truncateText(item.output, 100)}</p>
            </div>
          </div>
        </div>
        
        <ChevronRight className="h-5 w-5 text-gray-400 ml-2 flex-shrink-0 self-center" />
      </div>
    </div>
  );
}