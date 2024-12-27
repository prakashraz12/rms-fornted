import { QueryStatus } from "@reduxjs/toolkit/query";
import { ProductType } from "./product.type";
import { SelectedPosProductType } from "./PosSelectedProductTypes";
import { OrderType } from "@/enums/orderType.enum";
import { POS_SELECTION_TYPE } from "@/enums/posSelectionType.enum";

interface BaseApi {
  queries: {
    getCarts: QueryStatus;
    getWishList: QueryStatus;
  };
  mutations: Record<string, unknown>;
  provided: {
    Cart: {
      __internal_without_id: string[];
    };
    Wishlist: {
      __internal_without_id: string[];
    };
  };
  subscriptions: {
    getCarts: Record<
      string,
      { pollingInterval: number; skipPollingIfUnfocused: boolean }
    >;
    getWishList: Record<
      string,
      { pollingInterval: number; skipPollingIfUnfocused: boolean }
    >;
  };
  config: {
    online: boolean;
    focused: boolean;
    middlewareRegistered: boolean;
    refetchOnFocus: boolean;
    refetchOnReconnect: boolean;
    refetchOnMountOrArgChange: boolean;
    keepUnusedDataFor: number;
    reducerPath: string;
    invalidationBehavior: string;
  };
}

export interface RootState {
  baseApi: BaseApi;
  pos: {
    selectedOrders: any;
    seletedProducts: SelectedPosProductType[];
    selectOrderType: OrderType | null;
    isOderSelctorOpen: boolean;
    isOrderConfirmOpen: boolean;
    selectedTableIds: number[];
    selectedDeliveryAddress: string;
    selectedFloorId: string;
    posSelectionType: POS_SELECTION_TYPE;
  };
}
