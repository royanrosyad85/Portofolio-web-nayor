import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Eye, EyeOff, Plus, X, Trash2, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import NotionEditor from '../components/NotionEditor';
import ImageUploader from '../components/ImageUploader';
import DeleteConfirmation from '../components/admin/DeleteConfirmation';
import { blogData, BlogPost } from '../lib/blogData';

interface BlogAdminProps {
  onLogout?: () => void;
}

const BlogAdmin: React.FC<BlogAdminProps> = ({ onLogout }) => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditing = Boolean(id && id !== 'new');
  
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: [] as string[],
    image: '',
    isPublished: false
  });
  
  const [newTag, setNewTag] = useState('');
  const [isDraft, setIsDraft] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  
  const categories = blogData.getCategories();

  // Auto-save draft functionality
  useEffect(() => {
    if (!isEditing && (formData.title || formData.content)) {
      const timer = setTimeout(() => {
        blogData.saveDraft(formData.title, formData.content);
        setLastSaved(new Date());
        setIsDraft(true);
      }, 2000); // Auto-save after 2 seconds of inactivity

      return () => clearTimeout(timer);
    }
  }, [formData.title, formData.content, isEditing]);

  // Load existing post or draft on component mount
  useEffect(() => {
    if (isEditing && id) {
      const post = blogData.getPostById(id);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags,
          image: post.image || '',
          isPublished: post.isPublished
        });
      }
    } else if (!isEditing) {
      // Load draft if available
      const draft = blogData.loadDraft();
      if (draft) {
        setFormData(prev => ({
          ...prev,
          title: draft.title,
          content: draft.content
        }));
        setIsDraft(true);
        setLastSaved(new Date(draft.savedAt));
      }
    }
  }, [id, isEditing]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = async (file: File): Promise<string> => {
    // For demo purposes, convert to base64
    // In production, upload to cloud storage (Cloudinary, AWS S3, etc.)
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          resolve(e.target.result as string);
        } else {
          reject(new Error('Failed to read file'));
        }
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const generateExcerpt = (content: string): string => {
    // Remove HTML tags and get first 150 characters
    const textContent = content.replace(/<[^>]*>/g, '');
    return textContent.length > 150 
      ? textContent.substring(0, 150) + '...'
      : textContent;
  };

  const handleSave = (publish = false) => {
    if (!formData.title.trim()) {
      toast({
        title: "Error",
        description: "Please enter a title for your post.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.content.trim()) {
      toast({
        title: "Error", 
        description: "Please add some content to your post.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.category) {
      toast({
        title: "Error",
        description: "Please select a category for your post.",
        variant: "destructive"
      });
      return;
    }

    const postData = {
      ...formData,
      excerpt: formData.excerpt || generateExcerpt(formData.content),
      isPublished: publish || formData.isPublished
    };

    try {
      if (isEditing && id) {
        blogData.updatePost(id, postData);
        toast({
          title: "Success",
          description: `Post ${publish ? 'published' : 'updated'} successfully!`
        });
      } else {
        const newPost = blogData.createPost(postData);
        blogData.clearDraft(); // Clear draft after successful creation
        setIsDraft(false);
        toast({
          title: "Success",
          description: `Post ${publish ? 'published' : 'created'} successfully!`
        });
        navigate(`/blog-admin/${newPost.id}`);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save post. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleDelete = () => {
    if (isEditing && id) {
      setShowDeleteModal(true);
    }
  };

  const confirmDelete = () => {
    if (id) {
      blogData.deletePost(id);
      setShowDeleteModal(false);
      toast({
        title: "Success",
        description: "Post deleted successfully!"
      });
      navigate('/blog-admin');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link 
            to="/blog-admin" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-4 transition-colors"
          >
            <ArrowLeft size={16} className="mr-2" />
            Back to Admin Dashboard
          </Link>
          
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                {isEditing ? 'Edit Post' : 'Create New Post'}
              </h1>
              {isDraft && lastSaved && (
                <p className="text-sm text-muted-foreground">
                  Draft saved {lastSaved.toLocaleTimeString()}
                </p>
              )}
            </div>
            
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={onLogout}
                className="flex items-center text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <LogOut size={16} className="mr-2" />
                Logout
              </Button>
              
              <Button
                variant="outline"
                onClick={() => handleSave(false)}
                className="flex items-center"
              >
                <Save size={16} className="mr-2" />
                Save Draft
              </Button>
              
              <Button
                onClick={() => handleSave(true)}
                className="flex items-center"
              >
                <Eye size={16} className="mr-2" />
                {formData.isPublished ? 'Update' : 'Publish'}
              </Button>
              
              {isEditing && (
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  className="flex items-center"
                >
                  <Trash2 size={16} className="mr-2" />
                  Delete
                </Button>
              )}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <Label htmlFor="title" className="text-base font-medium mb-2 block">
                Title
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter your post title..."
                className="text-lg"
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-2 block">
                Content
              </Label>
              <NotionEditor
                value={formData.content}
                onChange={(value) => handleInputChange('content', value)}
                placeholder="Type '/' for commands or start writing..."
                onImageUpload={handleImageUpload}
              />
            </div>

            <div>
              <Label htmlFor="excerpt" className="text-base font-medium mb-2 block">
                Excerpt (Optional)
              </Label>
              <Textarea
                id="excerpt"
                value={formData.excerpt}
                onChange={(e) => handleInputChange('excerpt', e.target.value)}
                placeholder="Enter a custom excerpt or leave blank to auto-generate..."
                rows={3}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publication Status */}
            <div className="glass-effect rounded-lg p-4">
              <h3 className="font-semibold mb-3">Publication</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant={formData.isPublished ? "outline" : "default"}
                  size="sm"
                  onClick={() => handleInputChange('isPublished', false)}
                  className="flex items-center"
                >
                  <EyeOff size={14} className="mr-1" />
                  Draft
                </Button>
                <Button
                  variant={formData.isPublished ? "default" : "outline"}
                  size="sm"
                  onClick={() => handleInputChange('isPublished', true)}
                  className="flex items-center"
                >
                  <Eye size={14} className="mr-1" />
                  Published
                </Button>
              </div>
            </div>

            {/* Category */}
            <div className="glass-effect rounded-lg p-4">
              <Label className="font-semibold mb-3 block">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => handleInputChange('category', value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Tags */}
            <div className="glass-effect rounded-lg p-4">
              <Label className="font-semibold mb-3 block">Tags</Label>
              <div className="flex space-x-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag..."
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                />
                <Button
                  type="button"
                  size="sm"
                  onClick={handleAddTag}
                >
                  <Plus size={14} />
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {formData.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="flex items-center">
                    {tag}
                    <X
                      size={12}
                      className="ml-1 cursor-pointer hover:text-destructive"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            </div>

            {/* Featured Image */}
            <div className="glass-effect rounded-lg p-4">
              <Label className="font-semibold mb-3 block">Featured Image</Label>
              <ImageUploader
                onImageSelect={(imageData) => handleInputChange('image', imageData)}
                currentImage={formData.image}
              />
              <div className="mt-3">
                <Input
                  value={formData.image}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="Or enter image URL..."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        title="Delete Blog Post"
        description={`Are you sure you want to delete "${formData.title}"? This action cannot be undone.`}
      />
    </div>
  );
};

export default BlogAdmin;
