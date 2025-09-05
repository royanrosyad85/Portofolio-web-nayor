import React from 'react';
import { useTheme } from 'next-themes';
import ThemeToggle from '@/components/ThemeToggle';
import Divider from '@/components/ui/divider';

const TestPage: React.FC = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Theme & Divider Test</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Current theme: {theme}
            </span>
            <ThemeToggle />
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-effect p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Different Divider Styles</h2>
            
            <p className="text-muted-foreground">Default divider:</p>
            <Divider />
            
            <p className="text-muted-foreground">Thick divider:</p>
            <Divider variant="thick" />
            
            <p className="text-muted-foreground">Gradient divider:</p>
            <Divider variant="gradient" />
            
            <p className="text-muted-foreground">Dashed divider:</p>
            <Divider variant="dashed" />
            
            <p className="text-muted-foreground">Large spacing:</p>
            <Divider spacing="xl" />
          </div>

          <div className="blog-content glass-effect p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Blog Content Divider (Notion-style)</h2>
            <p>This is some sample blog content above the divider.</p>
            <hr />
            <p>This is some sample blog content below the divider. Hover over the divider to see the animation.</p>
            
            <h3 className="text-lg font-medium mt-6 mb-3">Notion-style divider:</h3>
            <p>Sample content above.</p>
            <hr className="notion-divider" />
            <p>Sample content below with the thinner Notion-style divider.</p>
          </div>

          <div className="glass-effect p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Simple Theme Toggle</h2>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-muted-foreground mb-2">
                  Click the button to toggle between light and dark mode instantly
                </p>
                <ul className="list-disc pl-6 space-y-1 text-sm text-muted-foreground">
                  <li>Single button toggle (no dropdown menu)</li>
                  <li>Smooth transitions</li>
                  <li>Persistent theme selection</li>
                  <li>Icon changes based on current theme</li>
                </ul>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestPage;
