import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Camera, Loader2 } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useChangePasswordMutation, useUpdateProfileMutation } from '@/services/api/user.api'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '@/features/auth/authSlice'
import { toast } from '@/hooks/use-toast'

interface ProfileDialogProps {
    isOpen: boolean
    onClose: () => void
    initialData: {
        name: string
        email: string
        avatarUrl: string
    }

}

const profileSchema = z.object({
    name: z.string().min(2, 'Name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
})

const passwordSchema = z.object({
    currentPassword: z.string().min(1, 'Current password is required'),
    newPassword: z.string().min(8, 'New password must be at least 8 characters'),
    repeatNewPassword: z.string().min(8, 'Please repeat the new password'),
}).refine((data) => data.newPassword === data.repeatNewPassword, {
    message: "Passwords don't match",
    path: ["repeatNewPassword"],
})

type ProfileFormData = z.infer<typeof profileSchema>
type PasswordFormData = z.infer<typeof passwordSchema>

const ProfileDialog: React.FC<ProfileDialogProps> = ({
    isOpen,
    onClose,
    initialData,
}) => {


    const dispatch = useDispatch();
    const [avatarFile, setAvatarFile] = useState<File | null>(null)
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null)


    const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateProfileMutation();
    const [changePassword, { isLoading: isChangingPassword }] = useChangePasswordMutation();

    const profileForm = useForm<ProfileFormData>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            name: initialData.name,
            email: initialData.email,
        },
    })

    const passwordForm = useForm<PasswordFormData>({
        resolver: zodResolver(passwordSchema),
        defaultValues: {
            currentPassword: '',
            newPassword: '',
            repeatNewPassword: '',
        },
    })

    const onSubmitProfile = async (data: ProfileFormData) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('email', data.email);
        if (avatarFile) {
            formData.append('profileImage', avatarFile);
        }
        const response = await updateProfile(formData).unwrap();

        if (response?.data) {
            dispatch(setUserInfo({
                name: response.data.name,
                email: response.data.email,
                id: response.data.id,
                profileImage: response.data.profileImage
            }));

            onClose()
            toast({
                title: "Success",
                description: "Profile updated successfully",
            })
        }


    }

    const onSubmitPassword = (data: PasswordFormData) => {

        passwordForm.reset()
    }

    const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            setAvatarFile(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string)
            }
            reader.readAsDataURL(file)
        }
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                </DialogHeader>
                <Tabs defaultValue="profile" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="profile">Profile</TabsTrigger>
                        <TabsTrigger value="password">Change Password</TabsTrigger>
                    </TabsList>
                    <TabsContent value="profile">
                        <form onSubmit={profileForm.handleSubmit(onSubmitProfile)} className="space-y-6">
                            <div className="flex flex-col items-center">
                                <Avatar className="w-24 h-24">
                                    <AvatarImage src={avatarPreview || initialData.avatarUrl} />
                                    <AvatarFallback>{initialData.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                                </Avatar>
                                <Label htmlFor="avatar-upload" className="cursor-pointer mt-2">
                                    <div className="flex items-center space-x-2">
                                        <Camera className="w-4 h-4" />
                                        <span>Change Avatar</span>
                                    </div>
                                </Label>
                                <Input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAvatarChange}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Controller
                                    name="name"
                                    control={profileForm.control}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {profileForm.formState.errors.name && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{profileForm.formState.errors.name.message}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Controller
                                    name="email"
                                    control={profileForm.control}
                                    render={({ field }) => <Input {...field} />}
                                />
                                {profileForm.formState.errors.email && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{profileForm.formState.errors.email.message}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="secondary" onClick={onClose} disabled={isUpdatingProfile}>
                                    Cancel
                                </Button>
                                <Button type="submit" disabled={isUpdatingProfile}>
                                    {isUpdatingProfile ? (
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    ) : (
                                        "Save Changes"
                                    )}
                                </Button>
                            </div>
                        </form>
                    </TabsContent>
                    <TabsContent value="password">
                        <form onSubmit={passwordForm.handleSubmit(onSubmitPassword)} className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Controller
                                    name="currentPassword"
                                    control={passwordForm.control}
                                    render={({ field }) => <Input type="password" {...field} />}
                                />
                                {passwordForm.formState.errors.currentPassword && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{passwordForm.formState.errors.currentPassword.message}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Controller
                                    name="newPassword"
                                    control={passwordForm.control}
                                    render={({ field }) => <Input type="password" {...field} />}
                                />
                                {passwordForm.formState.errors.newPassword && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{passwordForm.formState.errors.newPassword.message}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="repeatNewPassword">Repeat New Password</Label>
                                <Controller
                                    name="repeatNewPassword"
                                    control={passwordForm.control}
                                    render={({ field }) => <Input type="password" {...field} />}
                                />
                                {passwordForm.formState.errors.repeatNewPassword && (
                                    <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertDescription>{passwordForm.formState.errors.repeatNewPassword.message}</AlertDescription>
                                    </Alert>
                                )}
                            </div>

                            <div className="flex justify-end space-x-2">
                                <Button type="button" variant="secondary" onClick={onClose}>
                                    Cancel
                                </Button>
                                <Button type="submit">Change Password</Button>
                            </div>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    )
}

export default ProfileDialog