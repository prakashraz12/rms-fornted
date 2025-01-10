"use client"

import * as React from "react"
import { format } from "date-fns"
import { Clock, DollarSign, MapPin, UtensilsCrossed, User, ClipboardList, TableIcon } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { OrderResponse } from "@/types/order.type"

interface OrderItem {
  id: number
  quantity: number
  price: string
  name: string
  variantId: number | null
  variantName: string | null
}

interface Table {
  id: number
  name: string
}



interface OrderDialogProps {
  order: OrderResponse
  trigger?: React.ReactNode
}

export function OrderDialog({ order, trigger }: OrderDialogProps) {
  const statusColors = {
    pending: "bg-yellow-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
  }

  const orderTypeLabels = {
    DINE_IN: "Dine In",
    DELIVERY: "Delivery",
    TAKEAWAY: "Take Away",
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button variant="outline">View Order</Button>}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold">Order Details</DialogTitle>
            <Badge 
              variant="secondary" 
              className={`${statusColors[order.status as keyof typeof statusColors]} text-white`}
            >
              {order.status.toUpperCase()}
            </Badge>
          </div>
        </DialogHeader>

        <div className="grid gap-4">
          {/* Order Info */}
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{order.orderNumber}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="mr-1 h-4 w-4" />
                {format(new Date(order.createdAt), "PPp")}
              </div>
            </div>

            <div className="grid gap-1">
              <div className="flex items-center text-sm">
                <User className="mr-2 h-4 w-4" />
                {order.restaurant.restaurantName}
              </div>
              <div className="flex items-center text-sm">
                <UtensilsCrossed className="mr-2 h-4 w-4" />
                {orderTypeLabels[order.orderType as keyof typeof orderTypeLabels]}
              </div>
              {order.orderType === "DINE_IN" && order.tables.length > 0 && (
                <div className="flex items-center text-sm">
                  <TableIcon className="mr-2 h-4 w-4" />
                  Tables: {order.tables.map(table => table.name).join(", ")}
                </div>
              )}
              {order.orderType === "DELIVERY" && order.deliveryAddress && (
                <div className="flex items-center text-sm">
                  <MapPin className="mr-2 h-4 w-4" />
                  {order.deliveryAddress}
                </div>
              )}
              {order.remarks && (
                <div className="flex items-center text-sm">
                  <ClipboardList className="mr-2 h-4 w-4" />
                  {order.remarks}
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Order Items */}
          <ScrollArea className="max-h-[300px]">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-right">Qty</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order.orderItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>
                      {item.name}
                      {item.variantName && (
                        <span className="text-sm text-muted-foreground block">
                          Variant: {item.variantName}
                        </span>
                      )}
                    </TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell className="text-right">
                      Rs. {parseFloat(item.price).toFixed(2)}
                    </TableCell>
                    <TableCell className="text-right">
                      Rs. {(parseFloat(item.price) * item.quantity).toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </ScrollArea>

          <Separator />

          {/* Order Summary */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>Rs. {parseFloat(order.totalAmount).toFixed(2)}</span>
            </div>
            {order.orderType === "DELIVERY" && parseFloat(order.deliveryCharges) > 0 && (
              <div className="flex justify-between text-sm">
                <span>Delivery Charges</span>
                <span>Rs. {parseFloat(order.deliveryCharges).toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>Rs. {(
                parseFloat(order.totalAmount) + 
                parseFloat(order.deliveryCharges)
              ).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}