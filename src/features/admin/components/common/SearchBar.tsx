import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/core/components/input/Input";
import { Search } from "lucide-react";
interface SearchBarProps {
  value: string
  onChange: (value: string) => void
  className?: string
}
export function SearchBar({value, onChange}: SearchBarProps){
    return(
        <Card className="bg-background border-spotify-tertiary">
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-spotify-tertiary" />
            <Input
              type="text"
              placeholder="Search by name or email..."
              value={value}
              onChange={(e) => onChange(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    )
}