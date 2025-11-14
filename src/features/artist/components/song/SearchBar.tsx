import { Search } from "lucide-react";
import { Input } from "./Input"; 

export const SearchBar = () => {
  return (
    <div className="relative max-w-md">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search your songs..."
        className="pl-10 bg-surface border-border focus:border-primary transition-colors"
      />
    </div>
  );
};
