import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ArtistFansFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  filterBy: string;
  onFilterChange: (value: string) => void;
}

export const ArtistFansFilters = ({
  searchQuery,
  onSearchChange,
  sortBy,
  onSortChange,
  filterBy,
  onFilterChange,
}: ArtistFansFiltersProps) => {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search */}
      <div className="relative flex-1">
        <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a7a7a7]" />
        <Input
          placeholder="Search fans..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-[#282828] border-none text-white placeholder:text-[#a7a7a7] focus-visible:ring-1 focus-visible:ring-[#1DB954]"
        />
      </div>

      {/* Sort By */}
      <Select value={sortBy} onValueChange={onSortChange}>
        <SelectTrigger className="w-[180px] bg-[#282828] border-none text-white">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent className="bg-[#282828] border-[#333]">
          <SelectItem value="recent" className="text-white hover:bg-[#333]">Most Recent</SelectItem>
          <SelectItem value="streams" className="text-white hover:bg-[#333]">Most Streams</SelectItem>
          <SelectItem value="name" className="text-white hover:bg-[#333]">Name A-Z</SelectItem>
          <SelectItem value="oldest" className="text-white hover:bg-[#333]">Oldest Fans</SelectItem>
        </SelectContent>
      </Select>

      {/* Filter By */}
      <Select value={filterBy} onValueChange={onFilterChange}>
        <SelectTrigger className="w-[180px] bg-[#282828] border-none text-white">
          <SelectValue placeholder="Filter by" />
        </SelectTrigger>
        <SelectContent className="bg-[#282828] border-[#333]">
          <SelectItem value="all" className="text-white hover:bg-[#333]">All Fans</SelectItem>
          <SelectItem value="active" className="text-white hover:bg-[#333]">Active (30 days)</SelectItem>
          <SelectItem value="top" className="text-white hover:bg-[#333]">Top Listeners</SelectItem>
          <SelectItem value="new" className="text-white hover:bg-[#333]">New Fans</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
