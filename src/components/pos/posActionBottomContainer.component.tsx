import { HandPlatter, Pause, Percent } from "lucide-react";
import { Button } from "../ui/button";

const PosActionBottomContainer = () => {
  return (
    <div className=" h-16 flex items-center justify-center border-r ">
      <Button className="w-full bg-blue-500 hover:bg-blue-600 h-16 rounded-none">
        Add Discount <Percent />
      </Button>
      <Button className="w-full bg-yellow-500 hover:bg-yellow-600 h-16 rounded-none outline-none border-none">
        Hold Order <Pause />
      </Button>
      <Button className="w-full bg-green-500 h-16 rounded-none border-none hover:bg-green-600 outline-none">
        Place Order <HandPlatter/>
      </Button>
    </div>
  );
};

export default PosActionBottomContainer;
