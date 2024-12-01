import { cn } from "@/lib/utils";
const BorderRadiusWrapper: React.FC<{ children: React.ReactNode, class?:string }> = ({
    children,
    class: className
  }) => {
    return <div className={cn("rounded-lg border p-4 shadow-sm", className)}>{children}</div>;
};
  
export default BorderRadiusWrapper;