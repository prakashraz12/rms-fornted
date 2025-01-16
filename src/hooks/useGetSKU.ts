import { useState, useEffect } from 'react';

interface SKU {
    id: number;
    skuCode: string;
    category: string;
    measuringUnit: string;
}

const useGetSKU = () => {
    const [sku, setSku] = useState<SKU[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchSKU = async () => {
            try {
                const response = await fetch('YOUR_API_ENDPOINT/sku');
                if (!response.ok) {
                    throw new Error('Failed to fetch SKU data');
                }
                const data = await response.json();
                setSku(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch SKU data');
                // Temporary mock data for testing
                setSku([
                    { id: 1, skuCode: 'SKU001', category: 'Electronics', measuringUnit: 'Pieces' },
                    { id: 2, skuCode: 'SKU002', category: 'Clothing', measuringUnit: 'Units' },
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchSKU();
    }, []);

    return { sku, loading, error };
};

export default useGetSKU;
