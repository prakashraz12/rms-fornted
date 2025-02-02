import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { motion } from "framer-motion";
import usePopularItems from "@/hooks/usePopularItems";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function PopularItemsOfTheDay() {
  const startDate = new Date();
  startDate.setHours(0, 0, 0, 0);
  const startDateOffset = new Date(
    startDate.getTime() - startDate.getTimezoneOffset() * 60000
  ).toISOString();

  const endDate = new Date();
  endDate.setHours(23, 0, 0, 0);
  const endDateOffset = new Date(
    endDate.getTime() - endDate.getTimezoneOffset() * 60000
  ).toISOString();

  const { data, isLoading } = usePopularItems({
    startDate: startDateOffset,
    endDate: endDateOffset,
  });

  console.log(data, "popular items");
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>Popular Items</CardTitle>
          <CardDescription>Most ordered items today</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {!isLoading &&
              data?.map((item) => (
                <div key={item?.name} className="space-y-2">
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={item?.imageUrl?.url} />
                      <AvatarFallback>{item?.name?.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item?.quantity} orders
                      </p>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
