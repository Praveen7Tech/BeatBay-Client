interface FilterTabsProps<T extends string> {
  items: readonly T[];
  active: T;
  onChange: (value: T) => void;
}

export function FilterTabs<T extends string>({
  items,
  active,
  onChange,
}: FilterTabsProps<T>) {
  return (
    <div className="flex gap-2 mb-6 flex-wrap">
      {items.map((item) => (
        <button
          key={item}
          onClick={() => onChange(item)}
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            active === item
              ? "bg-white text-black"
              : "bg-[#232323] text-white hover:bg-[#2a2a2a]"
          }`}
        >
          {item}
        </button>
      ))}
    </div>
  );
}
