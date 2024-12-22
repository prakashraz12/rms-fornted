import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { MapPin, Mail, Phone, Calendar, Hash } from "lucide-react";

interface RestaurantProfile {
  address: string;
  bannerImage: string | null;
  country: string;
  createdAt: string;
  email: string;
  id: number;
  isActive: boolean;
  isBlocked: boolean;
  isEmailVerified: boolean;
  isSubscribed: boolean;
  logo: string;
  phoneNumber: string;
  profilePicture: string | null;
  refreshToken: string;
  restaurantCode: string;
  restaurantName: string;
  role: string;
  subscriptionEndDate: string;
  subscriptionType: string | null;
}

const RestaurantProfile: React.FC<{ profile: RestaurantProfile }> = ({
  profile,
}) => {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <Card className="w-full">
        <CardHeader className="flex flex-row items-center space-x-4 pb-2">
          <Avatar className="w-20 h-20">
            {profile?.logo && (
              <AvatarImage src={profile.logo} alt={profile.restaurantName} />
            )}
            <AvatarFallback>
              {profile.restaurantName.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-2xl">{profile.restaurantName}</CardTitle>
            <p className="text-sm text-muted-foreground">
              {profile.restaurantCode}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-muted-foreground" />
                <span>
                  {profile.address}, {profile.country}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                <span>{profile.email}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                <span>{profile.phoneNumber}</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span>
                  Joined: {new Date(profile.createdAt).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-muted-foreground" />
                <span>ID: {profile.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">Role:</span>
                <Badge variant="secondary">{profile.role}</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Account Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <span>Active:</span>
              <Badge variant={profile.isActive ? "success" : "destructive"}>
                {profile.isActive ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span>Blocked:</span>
              <Badge variant={profile.isBlocked ? "destructive" : "success"}>
                {profile.isBlocked ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span>Email Verified:</span>
              <Badge variant={profile.isEmailVerified ? "success" : "warning"}>
                {profile.isEmailVerified ? "Yes" : "No"}
              </Badge>
            </div>
            <div className="flex items-center space-x-2">
              <span>Subscribed:</span>
              <Badge variant={profile.isSubscribed ? "success" : "secondary"}>
                {profile.isSubscribed ? "Yes" : "No"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Subscription Details</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">Type:</span>
              <span>{profile.subscriptionType || "Not subscribed"}</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="font-semibold">End Date:</span>
              <span>
                {profile.subscriptionEndDate
                  ? new Date(profile.subscriptionEndDate).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantProfile;
