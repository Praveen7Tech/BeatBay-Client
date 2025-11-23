import { X, Upload } from "lucide-react";
import { useState, useRef } from "react";

interface PlaylistEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { name: string; description: string; image: string }) => void;
  initialData?: {
    name: string;
    description: string;
    image: string;
  };
}

export const PlaylistEditDialog = ({isOpen, onClose,onSave, initialData,}: PlaylistEditDialogProps) => {
  const [name, setName] = useState(initialData?.name || "");
  const [description, setDescription] = useState(initialData?.description || "");
  const [image, setImage] = useState(initialData?.image || "");
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    onSave({ name, description, image });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#282828] rounded-lg w-full max-w-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white">Edit details</h2>
          <button
            onClick={onClose}
            className="text-[#b3b3b3] hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex gap-6 mb-6">
          <div
            onClick={handleImageClick}
            className="w-40 h-40 bg-[#333333] rounded-lg flex items-center justify-center cursor-pointer hover:bg-[#3e3e3e] transition-colors group relative overflow-hidden"
          >
            {image ? (
              <>
                <img
                  src={image}
                  alt="Playlist cover"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Upload className="h-12 w-12 text-white" />
                </div>
              </>
            ) : (
              <Upload className="h-12 w-12 text-[#b3b3b3]" />
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          <div className="flex-1 space-y-4">
            <div>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Playlist name"
                className="w-full bg-[#3e3e3e] text-white px-3 py-2 rounded border border-transparent focus:border-white focus:outline-none transition-colors"
              />
            </div>
            <div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add an optional description"
                rows={4}
                className="w-full bg-[#3e3e3e] text-white px-3 py-2 rounded border border-transparent focus:border-white focus:outline-none resize-none transition-colors"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSave}
            className="bg-white text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
