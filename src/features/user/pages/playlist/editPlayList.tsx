
import { zodResolver } from "@hookform/resolvers/zod";
import { X, Upload } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from 'zod';
import { usePlaylistEditForm } from "@/core/hooks/playList/usePlayListEditForm";  

interface PlaylistEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: EditPlaylistData;
  playlistId: string; 
}

export const EditPlaylistSchema = z.object({
  name: z.string().min(1, "Playlist name is required"), 
  description: z.string().max(300, "Description is too long").optional().nullable(),
  image: z.string().optional().nullable(), 
});

export type EditPlaylistData = z.infer<typeof EditPlaylistSchema>;

export const PlaylistEditDialog = ({isOpen, onClose, initialData, playlistId }: PlaylistEditDialogProps) => {
    
    const { register, handleSubmit, formState: { errors } } = useForm<EditPlaylistData>({
        resolver: zodResolver(EditPlaylistSchema),
        defaultValues: initialData 
    });

    const { preview, handleEdit, handleImageChange } = usePlaylistEditForm({ 
        playlistId, 
        initialData, 
        onClose 
    });


    if (!isOpen) return null;


    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
            <div className="bg-[#282828] rounded-lg w-full max-w-lg p-6">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Edit details</h2>
                    <button type="button" onClick={onClose} /*...*/> <X className="h-6 w-6" /> </button>
                </div>

                <form onSubmit={handleSubmit(handleEdit)}> 
                    <div className="flex gap-6 mb-6">
                        <label className="w-40 h-40 bg-[#333333] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3e3e3e] transition-colors group relative overflow-hidden">
                            {preview ? (
                                <>
                                    <img src={preview} alt="Playlist cover" className="w-full h-full object-cover" />
                                    {/* ... overlay UI ... */}
                                </>
                            ) : (
                                <Upload className="h-12 w-12 text-spotify-secondary" />
                            )}
                            <input
                              {...register('image')}
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange} 
                                className="hidden"
                            />
                            {/* Error handling for file can be complex, usually handled by backend error message */}
                        </label>

                        <div className="flex-1 space-y-4">
                            <div>
                                <input
                                    {...register("name")} // RHF handles value/onChange now
                                    type="text"
                                    defaultValue={initialData?.name}
                                    placeholder="Playlist name"
                                    className="w-full bg-[#3e3e3e] text-white px-3 py-2 rounded border border-transparent focus:border-white focus:outline-none transition-colors"
                                />
                                {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
                            </div>
                            <div>
                                <textarea
                                    {...register("description")} 
                                    placeholder="Add an optional description"
                                    rows={4}
                                    className="w-full bg-[#3e3e3e] text-white px-3 py-2 rounded border border-transparent focus:border-white focus:outline-none resize-none transition-colors"
                                />
                                {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <button 
                            type="submit" 
                            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform" >
                            Save
                        </button>
                    </div>
                </form> 
            </div>
        </div>
    );
};
