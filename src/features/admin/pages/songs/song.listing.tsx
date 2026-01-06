import { useState } from "react";
import { Music, Loader2 } from "lucide-react";
import AdminSongTable from "../../components/songs/songTable"; 
import AdminSongFilters from "../../components/songs/song-filter"; 
import AdminPagination from "../../components/common/pagination/songPagination"; 
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";
import { useDebouncing } from "@/core/hooks/admin/useDebouncing";

const ITEMS_PER_PAGE = 10;

const AdminSongs = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [genreFilter, setGenreFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebouncing(searchQuery, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['songs', { page: currentPage, search: debouncedSearch, status: statusFilter, genre: genreFilter, sort: sortBy }],
    queryFn: () => adminApi.getAllSongs({
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      search: debouncedSearch,
      status: statusFilter === "all" ? undefined : statusFilter,
      genre: genreFilter === "all" ? undefined : genreFilter,
      sort: sortBy
    }),
    placeholderData: (prev) => prev,
  });

  console.log("dannn ", data?.songs)

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Music className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Songs Management</h1>
              <p className="text-sm text-muted-foreground">{data?.totalCount || 0} total songs</p>
            </div>
          </div>
          
        </div>

        {/* Filters */}
        <AdminSongFilters
          searchQuery={searchQuery}
          onSearchChange={(val:string) => { setSearchQuery(val); setCurrentPage(1); }}
          statusFilter={statusFilter}
          onStatusChange={(val:string) => { setStatusFilter(val); setCurrentPage(1); }}
          genreFilter={genreFilter}
          onGenreChange={(val:string) => { setGenreFilter(val); setCurrentPage(1); }}
          sortBy={sortBy}
          onSortChange={(val:string) => { setSortBy(val); setCurrentPage(1); }}
        />

        {/* Content State Management */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 bg-card rounded-lg border border-border">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <p className="text-muted-foreground">Fetching your tracks...</p>
          </div>
        ) : isError ? (
          <div className="p-12 text-center bg-destructive/10 rounded-lg border border-destructive/20">
            <p className="text-destructive font-medium">Failed to load songs. Please try again.</p>
          </div>
        ) : data?.songs && data.songs.length > 0 ? (
          <>
            <AdminSongTable songs={data.songs} startIndex={(currentPage - 1) * ITEMS_PER_PAGE} />
            <AdminPagination
              currentPage={currentPage}
              totalPages={data.totalPages}
              onPageChange={setCurrentPage}
              totalItems={data.totalCount}
              itemsPerPage={ITEMS_PER_PAGE}
            />
          </>
        ) : (
          <div className="bg-card rounded-lg border border-border p-12 text-center">
            <Music className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No songs found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminSongs;
