import { Music, Search } from "lucide-react";

interface SearchEmptyStateProps {
  query?: string;
}

const SearchEmptyState = ({ query }: SearchEmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      {/* Icon Container */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full bg-muted/30 flex items-center justify-center">
          <Music className="w-12 h-12 text-muted-foreground/50" />
        </div>
        <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-secondary flex items-center justify-center border-4 border-background">
          <Search className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Text Content */}
      <h3 className="text-xl font-semibold text-foreground mb-2">
        {query ? "No results found" : "Start searching"}
      </h3>
      <p className="text-muted-foreground text-center max-w-sm mb-6">
        {query
          ? `We couldn't find anything for "${query}". Try different keywords or check for typos.`
          : "Search for your favorite songs, artists, albums, or playlists."}
      </p>

      {/* Suggestions */}
      {query && (
        <div className="flex flex-wrap gap-2 justify-center max-w-md">
          <span className="text-sm text-muted-foreground">Try searching for:</span>
          {["Artists", "Albums", "Playlists"].map((suggestion) => (
            <span
              key={suggestion}
              className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm hover:bg-secondary/80 cursor-pointer transition-colors"
            >
              {suggestion}
            </span>
          ))}
        </div>
      )}

      {/* Decorative Elements */}
      <div className="flex gap-1 mt-10 opacity-30">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-1 bg-primary rounded-full animate-pulse"
            style={{
              height: `${12 + Math.random() * 24}px`,
              animationDelay: `${i * 0.15}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default SearchEmptyState;
