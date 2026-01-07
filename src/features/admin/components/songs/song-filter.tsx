import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/core/components/input/Input"; 
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface AdminSongFiltersProps {
  searchQuery: string;
  onSearchChange: (val: string) => void;
  statusFilter: string;
  onStatusChange: (val: string) => void;
  genreFilter?: string;      
  onGenreChange?: (val: string) => void; 
  sortBy: string;
  onSortChange: (val: string) => void;
  showGenre?: boolean;       
}

const AdminSongFilters = ({ 
  searchQuery, onSearchChange, statusFilter, onStatusChange, 
  genreFilter, onGenreChange, sortBy, onSortChange, 
  showGenre = true 
}: AdminSongFiltersProps) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between mb-6">
      <div className="relative w-full lg:w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input
          placeholder="Search by title..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="flex flex-wrap gap-3 w-full lg:w-auto">
        {/* Sort Select */}
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-40 bg-muted/30 border-none">
            <ArrowUpDown className="w-3.5 h-3.5 mr-2" />
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="popularity">Most Popular</SelectItem>
            <SelectItem value="az">A-Z Order</SelectItem>
          </SelectContent>
        </Select>

        {/* Status Select */}
        <Select value={statusFilter} onValueChange={onStatusChange}>
          <SelectTrigger className="w-[140px] bg-muted/30 border-none">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>  
            <SelectItem value="blocked">Blocked</SelectItem>
          </SelectContent>
        </Select>

        {/* Conditional Genre Select */}
        {showGenre && (
          <Select value={genreFilter} onValueChange={onGenreChange}>
            <SelectTrigger className="w-[140px] bg-muted/30 border-none">
              <SelectValue placeholder="Genre" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Genres</SelectItem>
              <SelectItem value="electronic">Electronic</SelectItem>
              <SelectItem value="pop">Pop</SelectItem>
              <SelectItem value="rock">Rock</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
    </div>
  );
};

export default AdminSongFilters;
