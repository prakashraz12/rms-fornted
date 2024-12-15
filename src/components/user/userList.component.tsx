
import { useState } from 'react'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Edit2, Lock } from 'lucide-react'

type UserType = 'POS USER' | 'KITCHEN' | 'ACCOUNT' | 'MANAGER' | 'OWNER'

interface User {
  id: string
  fullName: string
  loginCode: string
  avatar: string
  email: string
  userType: UserType
  isBlocked: boolean
}

const users: User[] = [
  { id: '1', fullName: 'John Doe', loginCode: 'JD001', avatar: '/avatars/john-doe.png', email: 'john@example.com', userType: 'POS USER', isBlocked: false },
  { id: '2', fullName: 'Jane Smith', loginCode: 'JS002', avatar: '/avatars/jane-smith.png', email: 'jane@example.com', userType: 'KITCHEN', isBlocked: false },
  { id: '3', fullName: 'Bob Johnson', loginCode: 'BJ003', avatar: '/avatars/bob-johnson.png', email: 'bob@example.com', userType: 'ACCOUNT', isBlocked: true },
  { id: '4', fullName: 'Alice Brown', loginCode: 'AB004', avatar: '/avatars/alice-brown.png', email: 'alice@example.com', userType: 'MANAGER', isBlocked: false },
  { id: '5', fullName: 'Charlie Wilson', loginCode: 'CW005', avatar: '/avatars/charlie-wilson.png', email: 'charlie@example.com', userType: 'OWNER', isBlocked: false },
]

export default function UserTable() {
  const [userList, setUserList] = useState<User[]>(users)

  const handleEdit = (userId: string) => {
    // Implement edit functionality
    console.log('Edit user:', userId)
  }

  const handleToggleBlock = (userId: string) => {
    setUserList(prevUsers => 
      prevUsers.map(user => 
        user.id === userId ? { ...user, isBlocked: !user.isBlocked } : user
      )
    )
  }

  const getUserTypeColor = (userType: UserType): string => {
    switch (userType) {
      case 'POS USER': return 'bg-blue-500'
      case 'KITCHEN': return 'bg-green-500'
      case 'ACCOUNT': return 'bg-yellow-500'
      case 'MANAGER': return 'bg-purple-500'
      case 'OWNER': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="container mx-auto py-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Full Name</TableHead>
            <TableHead>Login Code</TableHead>
            <TableHead>Avatar</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>User Type</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {userList.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.id}</TableCell>
              <TableCell>{user.fullName}</TableCell>
              <TableCell>{user.loginCode}</TableCell>
              <TableCell>
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.fullName} />
                  <AvatarFallback>{user.fullName.split(' ').map(n => n[0]).join('').toUpperCase()}</AvatarFallback>
                </Avatar>
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>
                <Badge className={`${getUserTypeColor(user.userType)} text-white`}>
                  {user.userType}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon" onClick={() => handleEdit(user.id)}>
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button 
                  variant={user.isBlocked ? "destructive" : "ghost"} 
                  size="icon"
                  onClick={() => handleToggleBlock(user.id)}
                >
                  <Lock className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}