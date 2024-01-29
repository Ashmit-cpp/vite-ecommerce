import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchField() {
  return (
    <div className="p-1 flex w-full max-w-sm items-center space-x-1">
      <Input type="search" placeholder="Search" />
      <Button variant="secondary" className="p-1">
        <div className="p-1 flex items-center space-x-2">
          <Search size={18} />
        </div>
      </Button>
    </div>
  );
}
