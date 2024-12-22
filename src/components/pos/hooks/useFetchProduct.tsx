import { useLazyGetProductByRestaurantIdQuery } from "@/services/api/product.api";
import { ProductType } from "@/types/product.type";
import { useCallback, useEffect, useState } from "react";
import { POS_PRODUCT_KEYS } from "../keys/keys";

const useFetchProduct = () => {
    const [products, setProducts] = useState<ProductType[]>(() => {
        const savedProducts = localStorage.getItem(POS_PRODUCT_KEYS);
        return savedProducts ? JSON.parse(savedProducts) : [];
    });

    const [getProducts, { isLoading, isFetching }] = useLazyGetProductByRestaurantIdQuery();

    const fetchProducts = useCallback(async (page: number, isRefresh: boolean = false) => {
        try {
            const response = await getProducts({
                page,
                limit: 20
            }).unwrap();

            if (response?.data) {
                const newProducts = isRefresh || page === 1
                    ? response.data.data
                    : [...products, ...response.data.data];

                setProducts(newProducts);
                localStorage.setItem(POS_PRODUCT_KEYS, JSON.stringify(newProducts));

                if (page === 1 && response.data.meta.totalPages > 1) {
                    for (let i = 2; i <= response.data.meta.totalPages; i++) {
                        const nextResponse = await getProducts({
                            page: i,
                            limit: 10
                        }).unwrap();

                        if (nextResponse?.data) {
                            const updatedProducts = [...newProducts, ...nextResponse.data.data];
                            setProducts(updatedProducts);
                            localStorage.setItem(POS_PRODUCT_KEYS, JSON.stringify(updatedProducts));
                        }
                    }
                }
            }
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, [getProducts, products]);

    useEffect(() => {
        if (products.length === 0) {
            fetchProducts(1);
        }
    }, [fetchProducts]);

    const handlePosProductRefresh = useCallback(async () => {
        localStorage.removeItem(POS_PRODUCT_KEYS);
        setProducts([]);
        await fetchProducts(1, true);
    }, [fetchProducts]);

    return {
        products,
        isLoading,
        handlePosProductRefresh,
        isFetching
    };
};

export default useFetchProduct;