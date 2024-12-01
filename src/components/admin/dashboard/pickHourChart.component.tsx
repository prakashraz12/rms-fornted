import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { MAIN_COLOR } from "@/constant";

// Sample data for today's orders by hour
const orderData = [
  { name: "12 AM", total: 4 },
  { name: "1 AM", total: 3 },
  { name: "2 AM", total: 2 },
  { name: "3 AM", total: 3 },
  { name: "4 AM", total: 4 },
  { name: "5 AM", total: 3 },
  { name: "6 AM", total: 5 },
  { name: "7 AM", total: 6 },
  { name: "8 AM", total: 9 },
  { name: "9 AM", total: 11 },
  { name: "10 AM", total: 13 },
  { name: "11 AM", total: 15 },
  { name: "12 PM", total: 16 },
  { name: "1 PM", total: 17 },
  { name: "2 PM", total: 18 },
  { name: "3 PM", total: 14 },
  { name: "4 PM", total: 11 },
  { name: "5 PM", total: 9 },
  { name: "6 PM", total: 12 },
  { name: "7 PM", total: 14 },
  { name: "8 PM", total: 16 },
  { name: "9 PM", total: 13 },
  { name: "10 PM", total: 9 },
  { name: "11 PM", total: 5 },
];

export function PickHourChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Analysis</CardTitle>
        <CardDescription>Your order volume throughout the day</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={orderData}>
            <XAxis
              dataKey="name"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.1)" }}
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "6px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="total" fill={MAIN_COLOR} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
