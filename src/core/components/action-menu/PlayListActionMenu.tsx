import { MoreHorizontal, Trash2, Pencil } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useState } from "react";



interface PlaylistActionsMenuProps {
  playlistId: string;
  playlistName: string;
  onDelete?: () => void;
  onEdit?: () => void;
}

export const PlaylistActionsMenu = ({
  playlistName,
  onDelete,
  onEdit,
}: PlaylistActionsMenuProps) => {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleDelete = () => {
    onDelete?.();
    setShowDeleteDialog(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded-full text-muted-foreground hover:text-foreground hover:bg-white/10 transition-colors">
            <MoreHorizontal className="w-8 h-8 text-spotify-secondary hover:text-white" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          align="start" 
          className="w-56 bg-[#282828] border-none text-white shadow-xl"
        >
          <DropdownMenuItem 
            onClick={onEdit}
            className="gap-3 py-3 px-4 cursor-pointer hover:bg-white/10 focus:bg-white"
          >
            <Pencil className="h-4 w-4" />
            <span>Edit details</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="bg-white/10" />

          <DropdownMenuItem 
            onClick={() => setShowDeleteDialog(true)}
            className="gap-3 py-3 px-4 cursor-pointer text-red-400 hover:bg-white/10 focus:bg-white/10 hover:text-red-400 focus:text-red-400"
          >
            <Trash2 className="h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-[#282828] border-none text-white max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold">
              Delete from Your Library?
            </AlertDialogTitle>
            <AlertDialogDescription className="text-muted-foreground">
              This will delete <span className="font-semibold text-white">{playlistName}</span> from Your Library.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-3 sm:gap-3">
            <AlertDialogCancel className="bg-transparent border-none text-white hover:bg-white/10 hover:text-white font-bold">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDelete}
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-full px-8"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
