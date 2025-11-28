import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import React from "react";

interface PageProps {
  page: number;
  totalPages: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  prevIcon?: LucideIcon; // optional previous icon
  nextIcon?: LucideIcon; // optional next icon
}

export function Pagination({ page, totalPages, setPage, prevIcon: PrevIcon, nextIcon: NextIcon }: PageProps) {
  return (
    <div className="flex items-center justify-between mt-6 pt-4 border-t border-spotify-tertiary">
      <p className="text-sm text-spotify-secondary">
        Showing <span className="font-semibold">{page}</span> of{" "}
        <span className="font-semibold">{totalPages}</span>
      </p>

      <div className="flex gap-2">
        <Button size="sm"
          variant="outline"
          onClick={() => setPage(prev => prev - 1)}
          disabled={page === 1}
        >
          {PrevIcon ? <PrevIcon className="w-4 h-4" /> : "Previous"}
        </Button>

        <Button size="sm"
          variant="outline"
          onClick={() => setPage(prev => prev + 1)}
          disabled={page === totalPages}
        >
          {NextIcon ? <NextIcon className="w-4 h-4" /> : "Next"}
        </Button>
      </div>
    </div>
  );
}
