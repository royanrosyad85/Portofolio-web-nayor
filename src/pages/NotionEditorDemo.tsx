import React, { useState } from 'react';
import { ArrowLeft, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import NotionEditor from '../components/NotionEditor';

const NotionEditorDemo = () => {
  const [content, setContent] = useState(`
    <h1>Welcome to Notion-style Editor!</h1>
    <p>Try typing <strong>/</strong> to see the slash commands menu.</p>
    <p>Available commands:</p>
    <ul>
      <li><strong>/h1</strong> - Large heading</li>
      <li><strong>/h2</strong> - Medium heading</li>
      <li><strong>/h3</strong> - Small heading</li>
      <li><strong>/ul</strong> - Bulleted list</li>
      <li><strong>/ol</strong> - Numbered list</li>
      <li><strong>/quote</strong> - Quote block</li>
      <li><strong>/code</strong> - Code block</li>
      <li><strong>/image</strong> - Insert image</li>
      <li><strong>/divider</strong> - Add divider</li>
    </ul>
    <p>Start typing below to try it out!</p>
  `);

  const handleImageUpload = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link 
          to="/blog-admin" 
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 transition-colors"
        >
          <ArrowLeft size={16} className="mr-2" />
          Back to Blog Admin
        </Link>
        
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <BookOpen size={24} className="mr-3 text-primary" />
            <h1 className="text-3xl font-bold">Notion-Style Editor Demo</h1>
          </div>
          <p className="text-muted-foreground">
            Experience the familiar Notion-like editing with slash commands. Type "/" anywhere to see the command menu.
          </p>
        </div>

        <div className="space-y-6">
          <div className="glass-effect rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">Try the Editor</h2>
            <NotionEditor
              value={content}
              onChange={setContent}
              placeholder="Type '/' for commands or start writing..."
              onImageUpload={handleImageUpload}
            />
          </div>

          <div className="glass-effect rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Features</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <h4 className="font-medium">Text Formatting:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Headers (H1, H2, H3)</li>
                  <li>• Bold, italic, underline</li>
                  <li>• Bulleted & numbered lists</li>
                  <li>• Blockquotes</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium">Media & Blocks:</h4>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Image upload</li>
                  <li>• Code blocks</li>
                  <li>• Dividers</li>
                  <li>• Links</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotionEditorDemo;
