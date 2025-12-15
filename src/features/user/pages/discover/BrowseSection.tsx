import BrowseCard from "../../components/browse/BrowseCard"; 
import album1 from "/src/assets/bg.png";
import album2 from "/src/assets/bg.png";
import album3 from "/src/assets/bg.png";

const startBrowsing = [
  { id: "1", title: "Music", color: "#E91E63", image: album1 },
  { id: "2", title: "Podcasts", color: "#009688", image: album2 },
  { id: "3", title: "Live Events", color: "#9C27B0", image: album3 },
];

const browseAll = [
  { id: "1", title: "2025 in Music", color: "#8B8000", image: album1 },
  { id: "2", title: "2025 in Podcasts", color: "#4CAF50", image: album2 },
  { id: "3", title: "Made For You", color: "#1DB954", image: album3 },
  { id: "4", title: "New Releases", color: "#689F38", image: album1 },
  { id: "5", title: "Hindi", color: "#E91E63", image: album2 },
  { id: "6", title: "Telugu", color: "#FF5722", image: album3 },
  { id: "7", title: "Punjabi", color: "#E040FB", image: album1 },
  { id: "8", title: "Tamil", color: "#FF9800", image: album2 },
  { id: "9", title: "Charts", color: "#3F51B5", image: album3 },
  { id: "10", title: "Pop", color: "#00BCD4", image: album1 },
  { id: "11", title: "Hip-Hop", color: "#795548", image: album2 },
  { id: "12", title: "Rock", color: "#F44336", image: album3 },
];

const BrowseSection = () => {
  return (
    <div className="min-h-screen bg-background p-8 space-y-8">
      {/* Start Browsing */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Start browsing</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {startBrowsing.map((item) => (
            <BrowseCard key={item.id} {...item} size="large" />
          ))}
        </div>
      </div>

      {/* Browse All */}
      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Browse all</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {browseAll.map((item) => (
            <BrowseCard key={item.id} {...item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseSection;
