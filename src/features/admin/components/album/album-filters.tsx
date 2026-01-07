import { Search, Filter } from "lucide-react";
import { Input } from "@/core/components/input/Input"; 
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface AdminAlbumFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  onStatusChange: (value: string) => void;
  genreFilter: string;
  onGenreChange: (value: string) => void;
}

const AdminAlbumFilters = ({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
  genreFilter,
  onGenreChange,
}: AdminAlbumFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between mb-6">
      <div className="relative w-full sm:w-72">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search albums..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex gap-3 w-full sm:w-auto">
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-full sm:w-36 bg-muted/50 border-border">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>
        <Select value={genreFilter} onValueChange={onGenreChange}>
          <SelectTrigger className="w-full sm:w-36 bg-muted/50 border-border">
            <SelectValue placeholder="Genre" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            <SelectItem value="pop">Pop</SelectItem>
            <SelectItem value="rock">Rock</SelectItem>
            <SelectItem value="hip-hop">Hip-Hop</SelectItem>
            <SelectItem value="electronic">Electronic</SelectItem>
            <SelectItem value="jazz">Jazz</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" size="icon" className="shrink-0">
          <Filter className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

export default AdminAlbumFilters;
