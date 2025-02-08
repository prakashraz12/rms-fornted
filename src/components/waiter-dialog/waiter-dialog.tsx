import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle } from 'lucide-react'

interface WaiterLoginDialogProps {
  isOpen: boolean
  onClose: () => void
}

const WaiterLoginDialog: React.FC<WaiterLoginDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const handlePlayStoreRedirect = () => {
    // Replace this URL with your actual Play Store app link
    window.open('https://play.google.com/store/apps/details?id=your.app.id', '_blank')
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-red-500" />
            Waiter Access Restricted
          </DialogTitle>
          <DialogDescription>
            Waiters cannot log in through this portal. Please download our mobile app to access your account.
          </DialogDescription>
        </DialogHeader>
       
        <DialogFooter className="sm:justify-start">
          <Button type="button" variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button type="button" onClick={handlePlayStoreRedirect}>
            Download from Play Store
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default WaiterLoginDialog