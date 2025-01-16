import { Printer } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog } from "../ui/dialog";
import { DialogTrigger } from "../ui/dialog";
import { DialogContent } from "../ui/dialog";

import { OrderResponse } from "@/types/order.type";
import { KOTLayout } from "../pos/kotLayout.component";

interface KOTLayoutPopUpProps {
  order: OrderResponse;
}
const KOTLayoutPopUp = ({ order }: KOTLayoutPopUpProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        <Button>
          <Printer className="mr-2 h-4 w-4" />
          Print KOT
        </Button>
      </DialogTrigger>
      <DialogContent>
        <KOTLayout
          items={order?.orderItems || []}
          kotNumber={order?.orderNumber || ""}
          tableNumber={order?.tables?.[0]?.name || ""}
          orderType={order?.orderType || ""}
          createdAt={order?.createdAt || ""}
          remarks={order?.remarks || ""}
        />
      </DialogContent>
    </Dialog>
  );
};

export default KOTLayoutPopUp;
