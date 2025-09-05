import React, { useState, useEffect, useRef, forwardRef } from 'react';
import { 
  Type, 
  Heading1, 
  Heading2, 
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Image,
  Minus,
  CheckSquare,
  FileText
} from 'lucide-react';

interface SlashCommand {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  keywords: string[];
  action: () => void;
}

interface SlashCommandMenuProps {
  isOpen: boolean;
  position: { top: number; left: number };
  onClose: () => void;
  onCommand: (command: SlashCommand) => void;
  searchQuery: string;
}

const SlashCommandMenu = forwardRef<HTMLDivElement, SlashCommandMenuProps>(({
  isOpen,
  position,
  onClose,
  onCommand,
  searchQuery
}, ref) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: SlashCommand[] = [
    {
      id: 'paragraph',
      title: 'Text',
      description: 'Just start writing with plain text.',
      icon: Type,
      keywords: ['text', 'paragraph', 'p'],
      action: () => {}
    },
    {
      id: 'heading1',
      title: 'Heading 1',
      description: 'Big section heading.',
      icon: Heading1,
      keywords: ['heading', 'h1', 'title'],
      action: () => {}
    },
    {
      id: 'heading2',
      title: 'Heading 2',
      description: 'Medium section heading.',
      icon: Heading2,
      keywords: ['heading', 'h2', 'subtitle'],
      action: () => {}
    },
    {
      id: 'heading3',
      title: 'Heading 3',
      description: 'Small section heading.',
      icon: Heading3,
      keywords: ['heading', 'h3'],
      action: () => {}
    },
    {
      id: 'bulleted-list',
      title: 'Bulleted list',
      description: 'Create a simple bulleted list.',
      icon: List,
      keywords: ['list', 'bullet', 'ul'],
      action: () => {}
    },
    {
      id: 'numbered-list',
      title: 'Numbered list',
      description: 'Create a list with numbering.',
      icon: ListOrdered,
      keywords: ['list', 'numbered', 'ol', 'ordered'],
      action: () => {}
    },
    {
      id: 'quote',
      title: 'Quote',
      description: 'Capture a quote.',
      icon: Quote,
      keywords: ['quote', 'blockquote', 'cite'],
      action: () => {}
    },
    {
      id: 'code',
      title: 'Code',
      description: 'Capture a code snippet.',
      icon: Code,
      keywords: ['code', 'snippet', 'programming'],
      action: () => {}
    },
    {
      id: 'image',
      title: 'Image',
      description: 'Upload or embed with link.',
      icon: Image,
      keywords: ['image', 'picture', 'photo', 'img'],
      action: () => {}
    },
    {
      id: 'divider',
      title: 'Divider',
      description: 'Visually divide blocks.',
      icon: Minus,
      keywords: ['divider', 'separator', 'line', 'hr'],
      action: () => {}
    }
  ];

  const filteredCommands = commands.filter(command => 
    command.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    command.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    command.keywords.some(keyword => keyword.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [searchQuery, filteredCommands]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => prev === 0 ? filteredCommands.length - 1 : prev - 1);
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            onCommand(filteredCommands[selectedIndex]);
          }
          break;
        case 'Escape':
          e.preventDefault();
          onClose();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, filteredCommands, onCommand, onClose]);

  if (!isOpen || filteredCommands.length === 0) return null;

  return (
    <div
      ref={ref}
      className="fixed z-50 w-80 max-h-80 overflow-y-auto bg-background border border-border rounded-lg shadow-xl"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <div className="p-2">
        <div className="text-xs text-muted-foreground px-3 py-2 border-b border-border mb-2">
          Basic blocks
        </div>
        {filteredCommands.map((command, index) => {
          const Icon = command.icon;
          return (
            <div
              key={command.id}
              className={`flex items-center px-3 py-2 rounded-md cursor-pointer transition-colors ${
                index === selectedIndex 
                  ? 'bg-primary text-primary-foreground' 
                  : 'hover:bg-secondary'
              }`}
              onClick={() => onCommand(command)}
            >
              <div className={`p-1.5 rounded mr-3 ${
                index === selectedIndex 
                  ? 'bg-primary-foreground/20' 
                  : 'bg-secondary'
              }`}>
                <Icon size={16} className={
                  index === selectedIndex 
                    ? 'text-primary-foreground' 
                    : 'text-muted-foreground'
                } />
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{command.title}</div>
                <div className={`text-xs ${
                  index === selectedIndex 
                    ? 'text-primary-foreground/70' 
                    : 'text-muted-foreground'
                }`}>
                  {command.description}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

SlashCommandMenu.displayName = 'SlashCommandMenu';

export default SlashCommandMenu;
