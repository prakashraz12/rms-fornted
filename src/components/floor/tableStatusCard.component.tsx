import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { QrCode } from "lucide-react";
import { TableStatusCardProps } from "./types/floor.types";

export function TableStatusCard({
  tableNumber,
  status,
  seats,
}: TableStatusCardProps) {
  const [isBookingDialogOpen, setIsBookingDialogOpen] = useState(false);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);
  const [bookingName, setBookingName] = useState("");

  const handleBook = () => {
    // Here you would typically send a request to your backend to book the table
    console.log(`Booking table ${tableNumber} for ${bookingName}`);
    setIsBookingDialogOpen(false);
    setBookingName("");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Available":
        return "bg-green-100 text-green-800";
      case "Reserved":
        return "bg-red-500 text-yellow-800";
      case "Occupied":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Table {tableNumber}</span>
          <Badge className={getStatusColor(status)}>{status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 dark:text-white">Seats: {seats}</p>
      </CardContent>
      <CardFooter className="flex flex-col justify-between gap-3">
        <div className="flex gap-2">
          <Dialog
            open={isBookingDialogOpen}
            onOpenChange={setIsBookingDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                disabled={status !== "Available"}
                className="bg-green-500 hover:bg-green-600 dark:bg-slate-800 dark:hover:bg-slate-900 text-white"
              >
                {status === "Available" ? "Book Now" : "Unavailable"}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Book Table {tableNumber}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    value={bookingName}
                    onChange={(e) => setBookingName(e.target.value)}
                    className="col-span-3"
                  />
                </div>
              </div>
              <Button onClick={handleBook}>Confirm Booking</Button>
            </DialogContent>
          </Dialog>

          <Dialog open={isQRDialogOpen} onOpenChange={setIsQRDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <QrCode className="h-4 w-4" />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Table {tableNumber} QR Code</DialogTitle>
              </DialogHeader>
              <div className="flex justify-center p-4">
                {/* Add QR code component here */}
                <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                  QR Code Placeholder
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </CardFooter>
    </Card>
  );
}
