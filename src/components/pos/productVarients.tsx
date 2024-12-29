
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ProductVariant } from "@/types/product.type"



interface ProductVariantPopupProps {
    isOpen: boolean
    onClose: () => void
    productName: string
    variants: ProductVariant[]
    onSelectVariant: (variant: ProductVariant) => void
}

export function ProductVariantPopup({
    isOpen,
    onClose,
    productName,
    variants,
    onSelectVariant
}: ProductVariantPopupProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{productName} Variants</DialogTitle>
                </DialogHeader>

                <div className=" flex gap-2">
                    {variants?.map((variant) => (
                        <Button
                            key={variant.id}
                            onClick={() => onSelectVariant(variant)}
                            className="w-full justify-between h-20 flex-col"
                            variant="outline"
                        >
                            <span>{variant.name}</span>
                            <span>Rs.{variant.price}</span>
                        </Button>
                    ))}
                </div>


            </DialogContent>
        </Dialog>
    )
}