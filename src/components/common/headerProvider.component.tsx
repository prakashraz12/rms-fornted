import { Button } from "../ui/button";

interface HeaderProviderProps {
  title: string;
  buttonName?: string;
  actionButton?: boolean;
  onClick?: (type?: any) => void;
}

const HeaderProvider = ({
  title,
  buttonName,
  actionButton,
  onClick
}: HeaderProviderProps) => {
  return (
    <div className="w-full flex justify-between ">
      <h1 className="text-xl font-bold">{title}</h1>
      {actionButton && <Button onClick={onClick}>{buttonName}</Button>}
    </div>
  );
};

export default HeaderProvider;
