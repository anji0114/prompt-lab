"use client";

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import HistoryItem from '@/components/HistoryItem';
import { Dialog } from '@/components/ui/Dialog';

// Mock data for history items
const mockHistoryItems = [
  {
    id: '1',
    date: '2025-04-01T14:30:00Z',
    templateName: 'Basic Analysis',
    prompt: 'Analyze the following text from the perspective of a historian:\n\nThe Renaissance was a period in European history marking the transition from the Middle Ages to modernity.',
    output: 'As a historian examining the Renaissance, I would note that this period (roughly 14th to 17th centuries) represented a profound intellectual, artistic, and cultural transformation in Europe. While the traditional view positions it as a "rebirth" of classical learning after the "dark ages," modern historians recognize greater continuity with medieval achievements.\n\nKey aspects include:\n\n1. Intellectual changes: Humanism emerged, focusing on human potential and achievements\n2. Artistic innovations: New techniques in perspective, realism, and subject matter\n3. Political shifts: Rise of powerful city-states in Italy and strong nation-states in Northern Europe\n4. Economic developments: Growth of banking, commerce, and early capitalism\n5. Religious evolution: Reform movements culminating in the Protestant Reformation\n\nThe transition from medieval to modern was not abrupt but rather a complex, gradual process with significant regional variations. The Renaissance both built upon medieval foundations and developed new approaches that would help shape modernity.'
  },
  {
    id: '2',
    date: '2025-03-28T09:15:00Z',
    templateName: 'Email Writer',
    prompt: 'Write a professional email to Dr. Johnson about quarterly budget review.',
    output: 'Subject: Quarterly Budget Review Meeting Request\n\nDear Dr. Johnson,\n\nI hope this email finds you well. I am writing to schedule our quarterly budget review meeting to discuss the financial performance for Q1 2025 and align on our projections for the upcoming quarter.\n\nBased on initial analysis, we have several positive developments to highlight, as well as a few areas where adjustments may be necessary to maintain alignment with our annual targets.\n\nWould you be available next Tuesday (April 8th) at 2:00 PM for a 60-minute session? If this time doesn\'t work with your schedule, please suggest alternative times that would be convenient for you.\n\nI will prepare the necessary documentation and distribute it 24 hours before our meeting to ensure we can have a productive discussion.\n\nThank you for your time and consideration.\n\nBest regards,\n[Your Name]\n[Your Position]\n[Contact Information]'
  },
  {
    id: '3',
    date: '2025-03-25T16:45:00Z',
    templateName: 'Code Explanation',
    prompt: 'Explain the following JavaScript code:\n\nconst memoize = (fn) => {\n  const cache = {};\n  return (...args) => {\n    const key = JSON.stringify(args);\n    if (cache[key]) return cache[key];\n    const result = fn(...args);\n    cache[key] = result;\n    return result;\n  };\n};',
    output: 'This JavaScript code defines a higher-order function called `memoize` that implements a technique called memoization. Memoization is an optimization technique that stores the results of expensive function calls and returns the cached result when the same inputs occur again.\n\nHere\'s a breakdown of how it works:\n\n1. `memoize` takes a function `fn` as its argument and returns a new function.\n\n2. Inside `memoize`, a `cache` object is created to store previous results.\n\n3. The returned function:\n   - Takes any number of arguments (using the rest parameter syntax `...args`).\n   - Converts these arguments into a string using `JSON.stringify(args)` to create a unique cache key.\n   - Checks if the result for these arguments already exists in the cache.\n   - If it does, returns the cached result immediately without executing the original function.\n   - If not, calls the original function `fn` with the arguments, stores the result in the cache, and returns it.\n\nThis is particularly useful for functions with expensive computations (like recursive calculations) as it can significantly improve performance by avoiding redundant calculations.\n\nFor example, if you wrapped a factorial function with memoize, calculating factorial(5) would compute all values for factorial(1) through factorial(5), but a subsequent call to factorial(3) would retrieve the value directly from the cache instead of recalculating it.'
  }
];

export default function HistoryPage() {
  const [historyItems] = useState(mockHistoryItems);
  const [selectedItem, setSelectedItem] = useState<typeof mockHistoryItems[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  const handleItemClick = (item: typeof mockHistoryItems[0]) => {
    setSelectedItem(item);
    setIsDialogOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h1 className="text-2xl font-medium text-gray-800 mb-6">Prompt History</h1>
          
          <div className="space-y-4">
            {historyItems.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No history items yet.</p>
            ) : (
              historyItems.map(item => (
                <HistoryItem 
                  key={item.id}
                  item={item}
                  onClick={() => handleItemClick(item)}
                />
              ))
            )}
          </div>
        </div>
      </div>
      
      {/* Detail Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        title={selectedItem?.templateName || ''}
      >
        {selectedItem && (
          <div className="space-y-4 max-h-[calc(100vh-12rem)] overflow-y-auto pr-2">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Date</h3>
              <p className="text-gray-800">
                {new Date(selectedItem.date).toLocaleString()}
              </p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Prompt</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3 whitespace-pre-wrap text-sm">
                {selectedItem.prompt}
              </div>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-gray-500">Output</h3>
              <div className="bg-gray-50 border border-gray-200 rounded-md p-3 whitespace-pre-wrap text-sm">
                {selectedItem.output}
              </div>
            </div>
          </div>
        )}
      </Dialog>
    </main>
  );
}