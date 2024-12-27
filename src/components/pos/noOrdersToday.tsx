import { Card, CardContent } from "@/components/ui/card";
import { ClipboardList, Utensils } from "lucide-react";

export default function NoOrdersToday({ type }: { type: string }) {
  return (
    <Card className="w-full max-w-md mx-auto overflow-hidden shadow-none border-none">
      <CardContent className="p-0">
        <div className=" p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-full bg-white bg-opacity-20 flex items-center justify-center">
              <ClipboardList className="w-8 h-8" />
            </div>
            <h2 className="text-xl font-bold">{`No Orders ${type} yet!`}</h2>
          </div>
          <Utensils className="w-12 h-12 opacity-20" />
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-center">
            <div className="w-24 h-1 bg-green-600 rounded-full" />
            <div className="w-3 h-3 bg-green-600 rounded-full mx-2" />
            <div className="w-24 h-1 bg-green-600 rounded-full" />
          </div>
          <p className="text-center text-gray-600">
            It's quiet in the kitchen today! No orders have been placed yet. Why
            not start the day off with a delicious meal?
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
