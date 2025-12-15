interface BrowseCardProps {
  title: string;
  color: string;
  image?: string;
  size?: "small" | "large";
}

const BrowseCard = ({ title, color, image, size = "small" }: BrowseCardProps) => {
  return (
    <div
      className={`relative rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform ${
        size === "large" ? "h-48" : "h-32"
      }`}
      style={{ backgroundColor: color }}
    >
      <span className="absolute top-4 left-4 text-white font-bold text-lg z-10">
        {title}
      </span>
      {image && (
        <img
          src={image}
          alt={title}
          className="absolute bottom-0 right-0 w-24 h-24 object-cover rotate-25 translate-x-4 translate-y-2 shadow-lg rounded"
        />
      )}
    </div>
  );
};

export default BrowseCard;
