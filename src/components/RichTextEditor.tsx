import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing your blog post...",
  className = ""
}) => {
  const quillRef = useRef<ReactQuill>(null);

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
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image',
    'code-block'
  ];

  // Custom styles for the dark theme
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .ql-editor {
        background-color: hsl(var(--background));
        color: hsl(var(--foreground));
        border: 1px solid hsl(var(--border));
        border-radius: 6px;
        min-height: 200px;
        font-family: inherit;
      }
      
      .ql-editor.ql-blank::before {
        color: hsl(var(--muted-foreground));
        font-style: normal;
      }
      
      .ql-toolbar {
        background-color: hsl(var(--secondary));
        border: 1px solid hsl(var(--border));
        border-radius: 6px 6px 0 0;
        border-bottom: none;
      }
      
      .ql-toolbar button {
        color: hsl(var(--foreground));
      }
      
      .ql-toolbar button:hover {
        background-color: hsl(var(--accent));
        color: hsl(var(--accent-foreground));
      }
      
      .ql-toolbar button.ql-active {
        background-color: hsl(var(--primary));
        color: hsl(var(--primary-foreground));
      }
      
      .ql-toolbar .ql-stroke {
        stroke: hsl(var(--foreground));
      }
      
      .ql-toolbar .ql-fill {
        fill: hsl(var(--foreground));
      }
      
      .ql-toolbar .ql-picker-label {
        color: hsl(var(--foreground));
      }
      
      .ql-toolbar .ql-picker-options {
        background-color: hsl(var(--background));
        border: 1px solid hsl(var(--border));
      }
      
      .ql-toolbar .ql-picker-item {
        color: hsl(var(--foreground));
      }
      
      .ql-toolbar .ql-picker-item:hover {
        background-color: hsl(var(--accent));
      }
      
      .ql-container {
        border: 1px solid hsl(var(--border));
        border-radius: 0 0 6px 6px;
        border-top: none;
      }
      
      .ql-editor h1 {
        color: hsl(var(--foreground));
        font-size: 2rem;
        font-weight: 700;
        margin: 1rem 0;
      }
      
      .ql-editor h2 {
        color: hsl(var(--foreground));
        font-size: 1.5rem;
        font-weight: 600;
        margin: 0.75rem 0;
      }
      
      .ql-editor h3 {
        color: hsl(var(--foreground));
        font-size: 1.25rem;
        font-weight: 600;
        margin: 0.5rem 0;
      }
      
      .ql-editor p {
        color: hsl(var(--muted-foreground));
        line-height: 1.6;
        margin: 0.5rem 0;
      }
      
      .ql-editor ul, .ql-editor ol {
        margin: 0.5rem 0;
        padding-left: 1.5rem;
      }
      
      .ql-editor li {
        color: hsl(var(--muted-foreground));
        margin: 0.25rem 0;
      }
      
      .ql-editor blockquote {
        border-left: 4px solid hsl(var(--primary));
        margin: 1rem 0;
        padding-left: 1rem;
        color: hsl(var(--muted-foreground));
        font-style: italic;
      }
      
      .ql-editor code {
        background-color: hsl(var(--secondary));
        color: hsl(var(--foreground));
        padding: 0.125rem 0.25rem;
        border-radius: 4px;
        font-family: 'Courier New', monospace;
      }
      
      .ql-editor pre {
        background-color: hsl(var(--secondary));
        color: hsl(var(--foreground));
        padding: 1rem;
        border-radius: 6px;
        overflow-x: auto;
        margin: 1rem 0;
      }
      
      .ql-editor a {
        color: hsl(var(--primary));
        text-decoration: underline;
      }
      
      .ql-editor strong {
        color: hsl(var(--foreground));
        font-weight: 600;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div className={`rich-text-editor ${className}`}>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
      />
    </div>
  );
};

export default RichTextEditor;
