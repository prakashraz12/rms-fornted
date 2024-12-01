export const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    Sandwich: "text-orange-500 bg-orange-50",
    Pastry: "text-green-500 bg-green-50",
    Donut: "text-purple-500 bg-purple-50",
    Cake: "text-pink-500 bg-pink-50",
    Bread: "text-blue-500 bg-blue-50",
    Tart: "text-yellow-500 bg-yellow-50",
  };
  return colors[category] || "text-gray-500 bg-gray-50";
};
