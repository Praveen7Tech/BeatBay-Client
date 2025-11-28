import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function TopSongsCard(){
    return(
        <div>
            <Card className="bg-spotify-dark border-spotify-tertiary">
            <CardHeader>
              <CardTitle className="text-spotify-text">Top Songs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {["Blinding Lights", "Starboy", "Can't Feel My Face", "The Hills", "Often"].map((song, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 rounded-lg bg-spotify-black border border-spotify-tertiary"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-spotify-tertiary font-bold">{idx + 1}</span>
                      <span className="text-spotify-text">{song}</span>
                    </div>
                    <span className="text-spotify-secondary text-sm">Millions of plays</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
    )
}