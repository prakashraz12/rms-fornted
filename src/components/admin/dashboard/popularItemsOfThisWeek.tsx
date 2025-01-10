import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useGetPopularItemsOfThisWeekQuery } from "@/services/api/analayticsApi";
import { useEffect, useState } from "react";
import { AvatarImage } from "@radix-ui/react-avatar";

interface PopularItem {
  name: string;
  quantity: number;
  price: number;
  rating: number;
  imageUrl?: {
    url: string;
    publicId: string;
  };
}

export default function PopularItemsOfThisWeek() {
  const { data, isLoading, isError, error, isSuccess } =
    useGetPopularItemsOfThisWeekQuery({});

  const [popularItems, setPopularItems] = useState<PopularItem[]>([]);

  useEffect(() => {
    if (isSuccess) {
      setPopularItems(data?.data);
    }
  }, [isSuccess]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">
          Popular Items of this week.
        </CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {popularItems?.map((item, index) => (
          <div key={index} className="flex items-center gap-4">
            <Avatar className="h-12 w-12 rounded-lg bg-muted">
              <AvatarImage src={item?.imageUrl?.url} alt={item.name} />
              <AvatarFallback className="rounded-lg bg-muted">
                {item.name.substring(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">{item.name}</p>
              <p className="text-sm text-muted-foreground">
                {item.quantity} orders this week
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
