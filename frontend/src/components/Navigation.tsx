"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Code, History, Sparkles } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  
  const isActive = (path: string) => {
    return pathname === path;
  };
  
  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Sparkles className="h-6 w-6 text-indigo-600" />
            <span className="ml-2 text-xl font-semibold text-gray-800">PromptLab</span>
          </div>
          
          <div className="flex space-x-1">
            <NavLink 
              href="/" 
              isActive={isActive('/')}
              icon={<Sparkles className="h-4 w-4" />}
              label="Generate"
            />
            <NavLink 
              href="/templates" 
              isActive={isActive('/templates')}
              icon={<Code className="h-4 w-4" />}
              label="Templates"
            />
            <NavLink 
              href="/history" 
              isActive={isActive('/history')}
              icon={<History className="h-4 w-4" />}
              label="History"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}

type NavLinkProps = {
  href: string;
  isActive: boolean;
  icon: React.ReactNode;
  label: string;
};

function NavLink({ href, isActive, icon, label }: NavLinkProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
        isActive 
          ? 'bg-indigo-50 text-indigo-700' 
          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
      }`}
    >
      <span className="mr-1.5">{icon}</span>
      {label}
    </Link>
  );
}