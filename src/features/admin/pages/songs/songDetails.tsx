import { useParams, Link } from "react-router-dom";
import {ArrowLeft, Play,ShieldOff,Ban,Clock,Globe,Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { SpinnerCustom } from "@/components/ui/spinner";
import { useSongDetails } from "../../api/query-hooks";
import { AlertDialog,AlertDialogAction,AlertDialogCancel,AlertDialogContent,AlertDialogDescription,
  AlertDialogFooter,AlertDialogHeader,AlertDialogTitle,AlertDialogTrigger,} from "@/components/ui/alert-dialog";
import { useMutation } from "@tanstack/react-query";
import { adminApi } from "../../services/adminApi";
import { queryClient } from "@/core/hooks/artist/queryClientSetup";
import { showError, showSuccess } from "@/core/utils/toast.config";
import { format, parseISO } from "date-fns";
import { formatTime } from "@/core/utils/formatTime";

const AdminSongDetail = () => {
  const { id } = useParams();

  const { data: song, isLoading, isError } = useSongDetails(id!);

  const isBlocked = song ? !song.status : false;

  const mutation = useMutation({
    mutationFn: (newStatus: boolean) =>
      adminApi.toggleSongStatus(id!, newStatus),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["song", id] });
      queryClient.invalidateQueries({ queryKey: ["songs"] });

      showSuccess(
        data.status ? "Song unblocked successfully" : "Song blocked successfully"
      );
    },
    onError: () => {
      showError("Failed to update song status");
    },
  });

  const handleBlockToggle = () => {
    mutation.mutate(!song.status);
  };

  if (isLoading) return <SpinnerCustom />;
  if (isError || !song)
    return <div className="text-red-500">Failed to load song details</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* HEADER */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/admin/songs"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Songs</span>
          </Link>

          {/* BLOCK / UNBLOCK */}
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                size="sm"
                variant={isBlocked ? "default" : "outline"}
                className={`gap-2 ${
                  isBlocked
                    ? "bg-primary text-primary-foreground hover:bg-primary/90"
                    : "border-destructive text-destructive hover:bg-destructive/10"
                }`}
              >
                {isBlocked ? (
                  <ShieldOff className="w-4 h-4" />
                ) : (
                  <Ban className="w-4 h-4" />
                )}
                {isBlocked ? "Unblock Song" : "Block Song"}
              </Button>
            </AlertDialogTrigger>

            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {isBlocked ? "Unblock Song" : "Block Song"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {isBlocked
                    ? "This will make the song visible and playable for all users."
                    : "This will hide the song and prevent playback for all users."}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleBlockToggle}
                  className={
                    isBlocked
                      ? "bg-primary hover:bg-primary/90"
                      : "bg-destructive hover:bg-destructive/90"
                  }
                >
                  {isBlocked ? "Unblock" : "Block"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* COVER */}
          <div className="relative group">
            <img
              src={song.coverImageUrl}
              alt={song.title}
              className="w-full lg:w-64 h-64 object-cover rounded-xl shadow-2xl"
            />
            {!isBlocked && (
              <button className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl">
                <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center">
                  <Play className="w-8 h-8 text-primary-foreground fill-current ml-1" />
                </div>
              </button>
            )}
          </div>

          {/* INFO */}
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge
                variant="outline"
                className={
                  isBlocked
                    ? "bg-destructive/20 text-destructive border-destructive/30"
                    : "bg-primary/20 text-primary border-primary/30"
                }
              >
                {isBlocked ? "Blocked" : "Active"}
              </Badge>
              {song.explicit && <Badge variant="destructive">Explicit</Badge>}
            </div>

            <h1 className="text-3xl lg:text-4xl font-bold mb-2">
              {song.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              {song.artistName}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" /> {formatTime(song.duration)}
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />{" "}
                {format(parseISO(song.updatedAt), "MMM dd, yyyy")}
              </span>
              <span className="flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> {song.genre}
              </span>
            </div>
          </div>
        </div>

        {/* DETAILS */}
        <Tabs defaultValue="metadata">
          <TabsContent value="metadata">
            <Card>
              <CardHeader>
                <CardTitle>Song Metadata</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { label: "Title", value: song.title },
                    { label: "Description", value: song.description },
                    { label: "Duration", value: formatTime(song.duration) },
                    { label: "Genre", value: song.genre },
                    { label: "Tags", value: song.tags?.join(", ") },
                    { label: "Artist", value: song.artistName },
                    {
                      label: "Release Date",
                      value: format(parseISO(song.updatedAt),"MMM dd, yyyy"),
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="flex justify-between py-2 border-b last:border-0"
                    >
                      <span className="text-muted-foreground">
                        {item.label}
                      </span>
                      <span className="font-medium">{item.value}</span>
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

export default AdminSongDetail;
