import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Edit2, Lock } from "lucide-react";
import { useGetUserQuery } from "@/services/api/user.api";
import { Role } from "@/enums/role.enums";

interface User {
  id: string;
  name: string;
  loginCode: string;
  image: string;
  email: string;
  role: Role;
  isActive: boolean;
  profileImage: {
    url: string;
    publicId: string;
  };
}

export default function UserTable() {
  const { data, isLoading, isError, error } = useGetUserQuery({
    refetchOnMountOrArgChange: true,
  });

  const handleEdit = (userId: string) => {
    // Implement edit functionality
    console.log("Edit user:", userId);
  };

  const getUserTypeColor = (userType: Role): string => {
    switch (userType) {
      case Role.WAITER:
        return "bg-blue-500";
      case Role.KITCHEN_STAFF:
        return "bg-green-500";
      case Role.POS_USER:
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.data?.map((user: User) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.name}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.profileImage?.url} alt={user.name} />
                  <AvatarFallback>
                    {user?.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge className={`${getUserTypeColor(user.role)} text-white`}>
                  {user.role}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleEdit(user.id)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
