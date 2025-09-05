import React, { useEffect, useRef, useState, useCallback } from 'react';
import ReactQuill, { Quill } from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import SlashCommandMenu from './SlashCommandMenu';

// Get the Block Embed class for extending
const BlockEmbed = Quill.import('blots/block/embed') as any;

class ImageBlot extends BlockEmbed {
  static blotName = 'customImage';
  static tagName = 'div';
  static className = 'custom-image-blot';

  static create(value: any) {
    const node = super.create();
    const img = document.createElement('img');
    img.setAttribute('src', value.url);
    img.setAttribute('alt', value.alt || '');
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.margin = '1rem 0';
    img.style.borderRadius = '8px';
    img.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    node.appendChild(img);
    return node;
  }

  static value(node: any) {
    const img = node.querySelector('img');
    return {
      url: img?.getAttribute('src') || '',
      alt: img?.getAttribute('alt') || ''
    };
  }
}

class DividerBlot extends BlockEmbed {
  static blotName = 'divider';
  static tagName = 'hr';
  static className = 'notion-divider';

  static create() {
    const node = super.create();
    node.style.border = 'none';
    node.style.borderTop = '1px solid hsl(var(--border))';
    node.style.margin = '1.5rem 0';
    node.style.width = '100%';
    node.style.opacity = '0.6';
    return node;
  }
}

// Register the custom blots
try {
  Quill.register('formats/customImage', ImageBlot);
  Quill.register('formats/divider', DividerBlot);
} catch (e) {
  // Blots might already be registered
}

interface NotionEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  onImageUpload?: (file: File) => Promise<string>;
}

const NotionEditor: React.FC<NotionEditorProps> = ({
  value,
  onChange,
  placeholder = "Type '/' for commands...",
  className = "",
  onImageUpload
}) => {
  const quillRef = useRef<ReactQuill>(null);
  const [showSlashMenu, setShowSlashMenu] = useState(false);
  const [slashMenuPosition, setSlashMenuPosition] = useState({ top: 0, left: 0 });
  const [slashQuery, setSlashQuery] = useState('');
  const [slashIndex, setSlashIndex] = useState(0);

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      [{ 'indent': '-1'}, { 'indent': '+1' }],
      ['link', 'image'],
      ['blockquote', 'code-block'],
      ['clean']
    ],
    clipboard: {
      matchVisual: false,
    },
    history: {
      delay: 2000,
      maxStack: 500,
      userOnly: true
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video',
    'code-block', 'customImage', 'divider'
  ];

  const getCaretPosition = useCallback(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return { top: 0, left: 0 };

    const selection = quill.getSelection();
    if (!selection) return { top: 0, left: 0 };

    const bounds = quill.getBounds(selection.index);
    const editorRect = quill.root.getBoundingClientRect();
    
    return {
      top: editorRect.top + bounds.top + bounds.height + window.scrollY + 5,
      left: editorRect.left + bounds.left + window.scrollX
    };
  }, []);

  const handleTextChange = useCallback((content: string, delta: any, source: string) => {
    onChange(content);

    if (source !== 'user') return;

    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const selection = quill.getSelection();
    if (!selection) return;

    // More robust slash detection
    try {
      const [line, offset] = quill.getLine(selection.index);
      if (!line || !line.domNode) return;
      
      const lineText = line.domNode.textContent || '';
      
      // Check if cursor is immediately after a slash (with optional word characters after)
      const beforeCursor = lineText.substring(0, offset);
      const slashMatch = beforeCursor.match(/(?:^|\s)\/(\w*)$/);
      
      if (slashMatch && slashMatch.index !== undefined) {
        const query = slashMatch[1] || '';
        const matchStart = slashMatch.index + (slashMatch[0].startsWith(' ') ? 1 : 0);
        const absoluteSlashIndex = selection.index - offset + matchStart;
        
        setSlashQuery(query);
        setSlashIndex(absoluteSlashIndex);
        
        // Get position for menu display
        const menuPosition = getCaretPosition();
        setSlashMenuPosition(menuPosition);
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }
    } catch (error) {
      // Fallback - simple detection
      const text = quill.getText();
      const cursorPos = selection.index;
      const beforeCursor = text.substring(Math.max(0, cursorPos - 20), cursorPos);
      const simpleMatch = beforeCursor.match(/\/(\w*)$/);
      
      if (simpleMatch) {
        setSlashQuery(simpleMatch[1] || '');
        setSlashIndex(cursorPos - simpleMatch[0].length);
        setSlashMenuPosition(getCaretPosition());
        setShowSlashMenu(true);
      } else {
        setShowSlashMenu(false);
      }
    }
  }, [onChange, getCaretPosition]);

  const handleSlashCommand = useCallback((command: any) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    // Remove the slash command text
    const slashLength = slashQuery.length + 1; // +1 for the slash
    quill.deleteText(slashIndex, slashLength);

    // Insert the appropriate content based on command
    switch (command.id) {
      case 'heading1':
        quill.formatLine(slashIndex, 1, 'header', 1);
        break;
      case 'heading2':
        quill.formatLine(slashIndex, 1, 'header', 2);
        break;
      case 'heading3':
        quill.formatLine(slashIndex, 1, 'header', 3);
        break;
      case 'bulleted-list':
        quill.formatLine(slashIndex, 1, 'list', 'bullet');
        // Ensure the line has some content
        if (quill.getLength() <= slashIndex + 1) {
          quill.insertText(slashIndex, ' ');
        }
        break;
      case 'numbered-list':
        quill.formatLine(slashIndex, 1, 'list', 'ordered');
        // Ensure the line has some content
        if (quill.getLength() <= slashIndex + 1) {
          quill.insertText(slashIndex, ' ');
        }
        break;
      case 'quote':
        quill.formatLine(slashIndex, 1, 'blockquote', true);
        break;
      case 'code':
        quill.formatLine(slashIndex, 1, 'code-block', true);
        break;
      case 'image':
        handleImageCommand();
        break;
      case 'divider':
        // Insert a proper divider using the custom blot
        const range = quill.getSelection();
        if (range) {
          // Delete the slash and command text
          quill.deleteText(slashIndex, range.index - slashIndex);
          // Insert the custom divider
          quill.insertEmbed(slashIndex, 'divider', true);
          // Add some spacing
          quill.insertText(slashIndex + 1, '\n');
          quill.setSelection(slashIndex + 2);
        }
        break;
      default:
        // For paragraph/text, just continue typing
        break;
    }

    setShowSlashMenu(false);
    // Set cursor position after the formatting
    setTimeout(() => {
      quill.setSelection(slashIndex + 1);
    }, 10);
  }, [slashQuery, slashIndex]);

  const handleImageCommand = useCallback(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    
    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      const quill = quillRef.current?.getEditor();
      if (!quill) return;

      try {
        let imageUrl: string;
        
        if (onImageUpload) {
          // Use custom image upload handler
          imageUrl = await onImageUpload(file);
        } else {
          // Fallback to base64
          imageUrl = await new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve(e.target?.result as string);
            reader.readAsDataURL(file);
          });
        }

        // Insert image at current position
        const range = quill.getSelection();
        const index = range ? range.index : slashIndex;
        
        // Use standard image insertion
        quill.insertEmbed(index, 'image', imageUrl);
        
        // Move cursor after image
        quill.setSelection(index + 1);
        
      } catch (error) {
        console.error('Error uploading image:', error);
        // Insert a placeholder or show error message
        quill.insertText(slashIndex, '\n[Image upload failed]\n');
      }
    };

    input.click();
  }, [slashIndex, onImageUpload]);

  // Handle clicks outside slash menu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showSlashMenu && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setShowSlashMenu(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      // Close slash menu on Escape
      if (event.key === 'Escape' && showSlashMenu) {
        setShowSlashMenu(false);
        event.preventDefault();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showSlashMenu]);

  // Create ref for slash menu to handle clicks
  const menuRef = useRef<HTMLDivElement>(null);

  // Custom styles for Notion-like appearance
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .notion-editor .ql-editor {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        border: 1px solid hsl(var(--border));
        border-radius: 6px;
        min-height: 400px;
        font-family: 'Crimson Text', 'Times New Roman', serif;
        font-size: 18px;
        line-height: 1.7;
        padding: 32px;
        max-width: none;
      }
      
      .notion-editor .ql-editor.ql-blank::before {
        color: hsl(var(--muted-foreground));
        font-style: normal;
        font-size: 16px;
      }
      
      .notion-editor .ql-toolbar {
        background-color: hsl(var(--secondary));
        border: 1px solid hsl(var(--border));
        border-radius: 6px 6px 0 0;
        border-bottom: none;
      }
      
      .notion-editor .ql-toolbar button {
        color: hsl(var(--foreground));
      }
      
      .notion-editor .ql-toolbar button:hover {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
      }
      
      .notion-editor .ql-toolbar button.ql-active {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
      
      .notion-editor .ql-container {
        border: 1px solid hsl(var(--border));
        border-radius: 0 0 6px 6px;
        border-top: none;
      }
      
      .notion-editor .ql-editor h1 {
        color: hsl(var(--foreground));
        font-size: 2.5rem;
        font-weight: 700;
        margin: 1.5rem 0 1rem 0;
        line-height: 1.2;
      }
      
      .notion-editor .ql-editor h2 {
        color: hsl(var(--foreground));
        font-size: 2rem;
        font-weight: 600;
        margin: 1.25rem 0 0.75rem 0;
        line-height: 1.3;
      }
      
      .notion-editor .ql-editor h3 {
        color: hsl(var(--foreground));
        font-size: 1.5rem;
        font-weight: 600;
        margin: 1rem 0 0.5rem 0;
        line-height: 1.4;
      }
      
      .notion-editor .ql-editor p {
        color: hsl(var(--foreground));
        line-height: 1.6;
        margin: 0.75rem 0;
        font-size: 16px;
      }
      
      .notion-editor .ql-editor ul, .notion-editor .ql-editor ol {
        margin: 0.75rem 0;
        padding-left: 1.5rem;
      }
      
      .notion-editor .ql-editor li {
        color: hsl(var(--foreground));
        margin: 0.25rem 0;
        line-height: 1.6;
      }
      
      .notion-editor .ql-editor blockquote {
        border-left: 4px solid hsl(var(--primary));
        margin: 1.5rem 0;
        padding: 1rem 1.5rem;
        color: hsl(var(--foreground));
        font-style: italic;
        background-color: hsl(var(--secondary));
        border-radius: 0 6px 6px 0;
      }
      
      .notion-editor .ql-editor .ql-code-block-container {
        background-color: hsl(var(--secondary));
        border: 1px solid hsl(var(--border));
        border-radius: 6px;
        margin: 1rem 0;
        overflow-x: auto;
      }
      
      .notion-editor .ql-editor pre {
        background-color: transparent;
        color: hsl(var(--foreground));
        padding: 1rem;
        margin: 0;
        font-family: 'Courier New', monospace;
        font-size: 14px;
      }
      
      .notion-editor .ql-editor a {
        color: hsl(var(--primary));
        text-decoration: underline;
      }
      
      .notion-editor .ql-editor strong {
        color: hsl(var(--foreground));
        font-weight: 600;
      }
      
      .notion-editor .ql-editor img {
        max-width: 100%;
        height: auto;
        margin: 1rem 0;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`notion-editor ${className}`}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={handleTextChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
      
      <SlashCommandMenu
        ref={menuRef}
        isOpen={showSlashMenu}
        position={slashMenuPosition}
        onClose={() => setShowSlashMenu(false)}
        onCommand={handleSlashCommand}
        searchQuery={slashQuery}
      />
    </div>
  );
};

export default NotionEditor;
