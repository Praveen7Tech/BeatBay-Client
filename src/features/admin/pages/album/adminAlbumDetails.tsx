import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Play, Ban, CheckCircle,  Globe, Calendar, Music, Star, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminAlbumCard from "../../components/album/album-card"; 
import { AlertDialog,AlertDialogAction, AlertDialogCancel,AlertDialogContent,AlertDialogDescription,
  AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useAlbumDetails } from "../../api/query-hooks";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";
import { showError, } from "@/core/utils/toast.config";
import { format } from "date-fns";
import { useToaster } from "@/core/hooks/toast/useToast";


const statusStyles = {
  active: "bg-primary/20 text-primary border-primary/30",
  blocked: "bg-destructive/20 text-destructive border-destructive/30",
};

const AdminAlbumDetail = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: album, isLoading, isError } = useAlbumDetails(id!);
  const {toast} = useToaster()

  const isActive = album?.isActive == true;

  const mutation = useMutation({
    mutationFn: (newStatus: boolean) => adminApi.toggleAlbumStatus(id!, newStatus),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["album", id] });
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      
      toast.success(data.message)
    },
    onError: () => {
      showError("Failed to update album status");
    },
  });

  const handleBlockToggle = () => {
    mutation.mutate(!isActive);
  };

  if (isLoading) return <SpinnerCustom />;
  if (isError || !album)
    return <div className="text-red-500">Failed to load song details</div>;

  console.log("is active ", album)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/admin/albums" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Albums</span>
          </Link>
          <div className="flex items-center gap-2">
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  size="sm" 
                  disabled={mutation.isPending}
                  className={`gap-2 ${isActive ? 'text-destructive border-destructive/50 hover:bg-destructive/10' : 'text-emerald-500 border-emerald-500/50 hover:bg-emerald-500/10'}`}
                >
                  {mutation.isPending ? <Loader2 className="animate-spin w-4 h-4" /> : isActive ? <Ban className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                  {isActive ? 'Block Album' : 'Unblock Album'}
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>{isActive ? 'Block Album?' : 'Unblock Album?'}</AlertDialogTitle>
                  <AlertDialogDescription>
                    {isActive 
                      ? 'This will hide the album and all its associated tracks from users.'
                      : 'This will make the album and its tracks visible to all users again.'}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction 
                    onClick={handleBlockToggle} 
                    className={isActive ? 'bg-destructive hover:bg-destructive/90' : 'bg-emerald-600 hover:bg-emerald-700'}
                  >
                    Confirm {isActive ? 'Block' : 'Unblock'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
            
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        {/* Album Info */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          <div className="relative group">
            <img
              src={album.coverImageUrl}
              alt={album.title}
              className="w-full lg:w-64 h-64 object-cover rounded-xl shadow-2xl"
            />
            <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
              <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
              </div>
            </button>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
               <Badge 
                variant="outline" 
                className={isActive ? statusStyles.active : statusStyles.blocked}
              >
                {isActive ? 'Active' : 'Blocked'}
              </Badge>
            </div>
            <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-2">{album.title}</h1>
            <p className="text-xl text-muted-foreground mb-4">{album.artistName}</p>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1.5"><Music className="w-4 h-4" /> {album.songs.length} tracks</span>
              <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> 
              {format(new Date(album.createdAt), "MMM dd, yyyy")}</span>
              <span className="flex items-center gap-1.5"><Globe className="w-4 h-4" /> {album.description}</span>
            </div>
          </div>
        </div>

        {/* Featured Songs Section */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-5 h-5 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Featured Songs</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {album.songs.map((song:any) => (
              <AdminAlbumCard key={song.id} album={song} type="song" showActions={false} />
            ))}
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="metadata" className="space-y-6">
          <TabsList className="bg-muted/50">
            <TabsTrigger value="metadata">Metadata</TabsTrigger>
          </TabsList>
          <TabsContent value="metadata">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Album Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Title", value: album.title },
                    { label: "Description", value: album.description },
                    { label: "Total Tracks",value: album.songs.length },
                    { label: "Artist Name", value: album.artistName},
                    { label: "Release Date", value: format(new Date(album.createdAt), "MMM dd, yyyy")},
                  ].map((item) => (
                    <div key={item.label} className="flex justify-between py-2 border-b border-border last:border-0">
                      <span className="text-muted-foreground">{item.label}</span>
                      <span className="font-medium text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAlbumDetail;
