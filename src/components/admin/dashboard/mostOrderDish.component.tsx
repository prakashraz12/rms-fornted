"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Define the type for our data
type DishOrder = {
  name: string
  orders: number
}

// Mock data for the most ordered dishes
const mostOrderedDishes: DishOrder[] = [
  { name: "Margherita Pizza", orders: 145 },
  { name: "Spaghetti Carbonara", orders: 123 },
  { name: "Caesar Salad", orders: 98 },
  { name: "Grilled Salmon", orders: 87 },
  { name: "Chicken Tikka Masala", orders: 76 },
]

// Custom colors for the pie chart
const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']

export function MostOrderedDishesChart() {
  const total = mostOrderedDishes.reduce((sum, dish) => sum + dish.orders, 0)

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader>
        <CardTitle>Most Ordered Dishes of the Day</CardTitle>
        <CardDescription>Breakdown of top 5 dishes by number of orders</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            orders: {
              label: "Orders",
            },
          }}
          className="h-[400px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={mostOrderedDishes}
                dataKey="orders"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label={({ name, orders }) => `${name} (${((orders / total) * 100).toFixed(1)}%)`}
                labelLine={false}
              >
                {mostOrderedDishes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

