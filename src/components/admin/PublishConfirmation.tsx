import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Eye, EyeOff } from 'lucide-react';

interface PublishConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isPublishing: boolean;
  postTitle: string;
}

const PublishConfirmation: React.FC<PublishConfirmationProps> = ({
  isOpen,
  onClose,
  onConfirm,
  isPublishing,
  postTitle
}) => {
  const action = isPublishing ? 'publish' : 'unpublish';
  const actionTitle = isPublishing ? 'Publish Post' : 'Unpublish Post';
  const Icon = isPublishing ? Eye : EyeOff;
  const iconColor = isPublishing ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400';
  const iconBg = isPublishing ? 'bg-green-100 dark:bg-green-950' : 'bg-orange-100 dark:bg-orange-950';

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex items-center space-x-2">
            <div className={`w-8 h-8 rounded-full ${iconBg} flex items-center justify-center`}>
              <Icon className={`w-4 h-4 ${iconColor}`} />
            </div>
            <AlertDialogTitle>{actionTitle}</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-left">
            Are you sure you want to {action} "{postTitle}"?
            {isPublishing && (
              <span className="block mt-2 text-sm text-muted-foreground">
                This will make the post visible to all visitors.
              </span>
            )}
            {!isPublishing && (
              <span className="block mt-2 text-sm text-muted-foreground">
                This will hide the post from public view.
              </span>
            )}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={isPublishing 
              ? "bg-green-600 hover:bg-green-700 dark:bg-green-600 dark:hover:bg-green-700"
              : "bg-orange-600 hover:bg-orange-700 dark:bg-orange-600 dark:hover:bg-orange-700"
            }
          >
            {isPublishing ? 'Publish' : 'Unpublish'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default PublishConfirmation;
