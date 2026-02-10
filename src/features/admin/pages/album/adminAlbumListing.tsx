import { useState } from "react";
import { Disc, Loader2 } from "lucide-react";
import AdminPagination from "../../components/common/pagination/songPagination"; 
import AdminAlbumCard from "../../components/album/album-card"; 
import AdminSongFilters from "../../components/songs/song-filter"; 
import { useDebouncing } from "@/core/hooks/admin/useDebouncing";
import { useQuery } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";

const ITEMS_PER_PAGE = 12;

const AdminAlbums = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const debouncedSearch = useDebouncing(searchQuery, 500);

  const { data, isLoading, isError } = useQuery({
    queryKey: ['albums', { page: currentPage, search: debouncedSearch, status: statusFilter, sort: sortBy }],
    queryFn: () => adminApi.getAllAlbums({ 
      page: currentPage,
      limit: ITEMS_PER_PAGE,
      search: debouncedSearch,
      status: statusFilter === "all" ? undefined : statusFilter,
      sort: sortBy
    }),
    placeholderData: (prev) => prev,
  });

  return (
    <div className="min-h-screen p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
              <Disc className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Albums Management</h1>
              <p className="text-sm text-muted-foreground">{data?.totalCount || 0} total albums</p>
            </div>
          </div>
        </div>

        {/* Filters - Updated to hide genre */}
        <AdminSongFilters
          searchQuery={searchQuery}
          onSearchChange={(val: string) => { setSearchQuery(val); setCurrentPage(1); }}
          statusFilter={statusFilter}
          onStatusChange={(val: string) => { setStatusFilter(val); setCurrentPage(1); }}
          sortBy={sortBy}
          onSortChange={(val: string) => { setSortBy(val); setCurrentPage(1); }}
          showGenre={false} 
        />


        {/* Content Section */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 border rounded-xl bg-card/50">
            <Loader2 className="w-8 h-8 animate-spin text-primary mb-2" />
            <p className="text-muted-foreground">Loading albums...</p>
          </div>
        ) : isError ? (
          <div className="p-12 text-center bg-destructive/10 rounded-xl border border-destructive/20">
            <p className="text-destructive">Failed to fetch albums. Please try again.</p>
          </div>
        ) : data?.albums && data.albums.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {data.albums.map((album: any) => (
                <AdminAlbumCard key={album.id} type="album" album={album} />
              ))}
            </div>

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
            <Disc className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No albums found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminAlbums;
