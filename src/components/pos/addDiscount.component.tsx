import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from "@/components/ui/scroll-area"
import useGetDiscount from '@/hooks/useGetDiscount'
import { useDispatch } from 'react-redux'
import { DISCOUNT_TYPE } from '@/enums/discountType.enum'
import { IDiscount } from '@/types/discount.type'
import { applyDiscountOnOrder } from '@/features/pos/posSlice'
import { Percent } from 'lucide-react'

interface DiscountPopupProps {
    isOpen: boolean
    onClose: () => void
}



export function DiscountPopup({ isOpen, onClose, }: DiscountPopupProps) {

    const { discount: discountsList } = useGetDiscount({ isActive: true });
    const dispacth = useDispatch();
    const [activeTab, setActiveTab] = useState<string>(DISCOUNT_TYPE.PERCENTAGE || "");
    const [flatDiscount, setFlatDiscount] = useState<string>('')

    const handlePresetDiscount = (discount: IDiscount) => {
        dispacth(applyDiscountOnOrder({
            type: discount.type,
            value: discount.value,
            name: discount.name,
            discountId: discount.id

        }))
        onClose()
    }

    const handleFlatDiscount = () => {
        const value = parseFloat(flatDiscount)
        if (!isNaN(value) && value > 0) {
            dispacth(applyDiscountOnOrder({
                type: DISCOUNT_TYPE.FlAT,
                value: value,
                name: 'Flat Discount',
                discountId: 0
            }))
            onClose()
        }
    }

    const handleNumberClick = (num: string) => {
        setFlatDiscount(prev => {
            if (num === '.' && prev.includes('.')) return prev
            return prev + num
        })
    }

    const handleClear = () => {
        setFlatDiscount('')
    }


    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent >
                <DialogHeader>
                    <DialogTitle>Apply Discount</DialogTitle>
                </DialogHeader>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value={DISCOUNT_TYPE.PERCENTAGE}>Preset Discounts</TabsTrigger>
                        <TabsTrigger value={DISCOUNT_TYPE.FlAT}>Flat Discount</TabsTrigger>
                    </TabsList>
                    <TabsContent value={DISCOUNT_TYPE.PERCENTAGE}>
                        <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                            <div className="grid grid-cols-2 gap-4">
                                {discountsList && discountsList?.map((discount: IDiscount) => (
                                    <Card key={discount.id} className="cursor-pointer hover:bg-gray-100" onClick={() => handlePresetDiscount(discount)}>
                                        <CardContent className="flex flex-col gap-2 items-center justify-center  p-6">
                                            <Percent className="h-6 w-6" />
                                            <p className="text-sm font-semibold">{discount.name}</p>
                                            <p>{discount.value}%</p>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        </ScrollArea>
                    </TabsContent>
                    <TabsContent value={DISCOUNT_TYPE.FlAT}>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <Label htmlFor="flat-discount">Discount Amount</Label>

                            </div>
                            <Input
                                id="flat-discount"
                                value={flatDiscount}
                                type='number'
                                min={0}
                                onChange={(e) => setFlatDiscount(e.target.value)}
                                placeholder="Enter discount amount"
                                className="text-right text-2xl font-bold p-6"
                            />
                            <div className="grid grid-cols-3 gap-2">
                                {['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'].map((num) => (
                                    <Button key={num} onClick={() => handleNumberClick(num)} className="h-12 text-xl">
                                        {num}
                                    </Button>
                                ))}
                                <Button onClick={handleClear} className="h-12 text-xl" variant="outline">
                                    C
                                </Button>
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
                <DialogFooter>
                    <Button onClick={onClose} variant="outline">Cancel</Button>
                    {activeTab === DISCOUNT_TYPE.FlAT && (
                        <Button onClick={handleFlatDiscount}>Apply Discount</Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}