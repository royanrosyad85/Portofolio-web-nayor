import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Edit, Trash2, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { BlogPost } from '@/lib/blogData';
import DeleteConfirmation from './DeleteConfirmation';
import PublishConfirmation from './PublishConfirmation';

interface PostRowProps {
  post: BlogPost;
  onTogglePublish: (id: string, currentStatus: boolean) => void;
  onDelete: (id: string) => void;
  getCategoryName: (categoryId: string) => string;
}

const PostRow: React.FC<PostRowProps> = ({ post, onTogglePublish, onDelete, getCategoryName }) => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    onDelete(post.id);
    setShowDeleteModal(false);
  };

  const handlePublishClick = () => {
    setShowPublishModal(true);
  };

  const handlePublishConfirm = () => {
    onTogglePublish(post.id, post.isPublished);
    setShowPublishModal(false);
  };

  return (
    <>
      <div className="glass-effect rounded-lg p-6 hover:border-primary/30 transition-colors">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-center">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="text-lg font-semibold truncate">{post.title}</h3>
              {post.isPublished ? (
                <Badge variant="default" className="flex items-center">
                  <Eye size={12} className="mr-1" />
                  Published
                </Badge>
              ) : (
                <Badge variant="secondary" className="flex items-center">
                  <EyeOff size={12} className="mr-1" />
                  Draft
                </Badge>
              )}
            </div>

            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {post.excerpt}
            </p>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center">
                <Calendar size={12} className="mr-1" />
                {formatDate(post.createdAt)}
              </div>
              <div className="flex items-center">
                <Eye size={12} className="mr-1" />
                {post.views} views
              </div>
              <Badge variant="outline">
                {getCategoryName(post.category)}
              </Badge>
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-end space-x-2">
            <Link to={`/blog/${post.id}`}>
              <Button variant="outline" size="sm">
                <Eye size={14} className="mr-1" />
                View
              </Button>
            </Link>

            <Link to={`/blog-admin/${post.id}`}>
              <Button variant="outline" size="sm">
                <Edit size={14} className="mr-1" />
                Edit
              </Button>
            </Link>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePublishClick}
            >
              {post.isPublished ? (
                <>
                  <EyeOff size={14} className="mr-1" />
                  Unpublish
                </>
              ) : (
                <>
                  <Eye size={14} className="mr-1" />
                  Publish
                </>
              )}
            </Button>

            <Button
              variant="destructive"
              size="sm"
              onClick={handleDeleteClick}
            >
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
      </div>

      <DeleteConfirmation
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
        title="Delete Post"
        description={`Are you sure you want to delete "${post.title}"? This action cannot be undone.`}
      />

      <PublishConfirmation
        isOpen={showPublishModal}
        onClose={() => setShowPublishModal(false)}
        onConfirm={handlePublishConfirm}
        isPublishing={!post.isPublished}
        postTitle={post.title}
      />
    </>
  );
};

export default PostRow;
