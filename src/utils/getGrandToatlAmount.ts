type CalculateTotalParams = {
    subTotal: string;
    discount?: any; // Discount can be a number or null
    serviceChargeRate?: number; // Optional, defaults to 15%
    vatRate?: number; // Optional, defaults to 15%
    taxRate?: number; // Optional, defaults to 15%
    applyVat?: boolean; // Whether to apply VAT
};

type CalculationResult = {
    subTotal: number;
    serviceCharge: number;
    discountAmount: number;
    vat: number;
    calculatedTax: number;
    grandTotal: number;
};

export function calculateTotal({
    subTotal,
    discount,
    serviceChargeRate = 0.15,
    vatRate = 0.15,
    taxRate = 0.15,
    applyVat = true,
}: CalculateTotalParams): CalculationResult {

    

    // Calculate service charge
    const serviceCharge = parseInt(subTotal) * serviceChargeRate || 0;




    // Apply discount (percentage of subtotal + service charge)
    const discountAmount = discount?.type === "PERCENTAGE" ? (parseInt(subTotal) + serviceCharge) * (discount?.value / 100) || 0 :  discount?.value || 0;


    // Apply VAT only if enabled
    const vat = applyVat ? (parseInt(subTotal) + serviceCharge - discountAmount) * vatRate : 0;

    // Calculate additional tax
    const calculatedTax = (parseInt(subTotal) + serviceCharge - discountAmount + vat) * taxRate;

    // Calculate grand total
    const grandTotal = parseInt(subTotal) + serviceCharge - discountAmount + vat + calculatedTax;

    // Return all calculations
    return {
        subTotal: parseInt(subTotal),
        serviceCharge: serviceCharge,
        discountAmount: discountAmount,
        vat: vat,
        calculatedTax: calculatedTax,
        grandTotal: grandTotal,
    };
}


