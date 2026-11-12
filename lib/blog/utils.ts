// Format date to Japanese locale string
export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

// Map tag color to CSS classes
export function getTagColorClass(color: string): string {
  const tagColors: Record<string, string> = {
    default: "bg-foreground/10 text-foreground",
    gray: "bg-gray-200 text-gray-700",
    brown: "bg-amber-100 text-amber-800",
    orange: "bg-orange-100 text-orange-800",
    yellow: "bg-yellow-100 text-yellow-800",
    green: "bg-green-100 text-green-800",
    blue: "bg-blue-100 text-blue-800",
    purple: "bg-purple-100 text-purple-800",
    pink: "bg-pink-100 text-pink-800",
    red: "bg-red-100 text-red-800",
  };
  return tagColors[color] || tagColors.default;
}
