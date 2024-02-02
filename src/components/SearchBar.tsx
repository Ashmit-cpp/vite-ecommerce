import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
export function SearchField() {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      alert("Please enter a search term");
    } else {
      // navigate(`/products/?name=${encodeURIComponent(searchTerm)}&page=1&limit=4`);
      navigate("/searched/" + encodeURIComponent(searchTerm));
    }
  };

  return (
    <div className="p-1 flex w-full max-w-sm items-center space-x-1">
      <Input
        type="search"
        placeholder="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button
        size={"icon"}
        variant="outline"
        className="p-1"
        onClick={handleSearch}
      >
        <div className="p-1 flex items-center space-x-2">
          <Search size={18} />
        </div>
      </Button>
    </div>
  );
}
