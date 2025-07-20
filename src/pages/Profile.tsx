import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit,
  Trash2,
  Eye,
  Settings,
  Shield,
  BookOpen,
  Home,
  Search,
  MessageSquare,
  FileText
} from "lucide-react";

const mockUserPosts = [
  {
    id: 1,
    title: "iPhone 14 Pro Found",
    type: "Lost & Found",
    status: "Active",
    date: "2024-01-20",
    category: "found",
    views: 24,
    icon: Search,
    color: "bg-green-100 text-green-800"
  },
  {
    id: 2,
    title: "Cozy 2BHK near Campus",
    type: "Roommate",
    status: "Active", 
    date: "2024-01-18",
    category: "roommate",
    views: 45,
    icon: Home,
    color: "bg-blue-100 text-blue-800"
  },
  {
    id: 3,
    title: "Calculus Textbook",
    type: "Book Bank",
    status: "Claimed",
    date: "2024-01-15",
    category: "book",
    views: 32,
    icon: BookOpen,
    color: "bg-purple-100 text-purple-800"
  },
  {
    id: 4,
    title: "ML Workshop Notes",
    type: "Notes",
    status: "Active",
    date: "2024-01-12",
    category: "notes",
    views: 67,
    icon: FileText,
    color: "bg-orange-100 text-orange-800"
  },
  {
    id: 5,
    title: "Hackathon 2024",
    type: "Event",
    status: "Completed",
    date: "2024-01-10",
    category: "event",
    views: 156,
    icon: MessageSquare,
    color: "bg-indigo-100 text-indigo-800"
  }
];

const mockSavedItems = [
  {
    id: 1,
    title: "Database Design Book",
    type: "Book Bank",
    savedDate: "2024-01-22",
    icon: BookOpen
  },
  {
    id: 2,
    title: "Student House Share",
    type: "Roommate",
    savedDate: "2024-01-21",
    icon: Home
  },
  {
    id: 3,
    title: "Physics Formula Sheet",
    type: "Notes",
    savedDate: "2024-01-20",
    icon: FileText
  },
  {
    id: 4,
    title: "Career Fair 2024",
    type: "Event",
    savedDate: "2024-01-19",
    icon: MessageSquare
  }
];

export default function Profile() {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");

  const handleSaveProfile = () => {
    toast({
      title: "Profile updated successfully!",
      description: "Your profile information has been saved.",
    });
    setIsEditing(false);
  };

  const handleDeletePost = (postId: number) => {
    toast({
      title: "Post deleted",
      description: "Your post has been removed successfully.",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Claimed": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-gray-100 text-gray-800";
      default: return "bg-yellow-100 text-yellow-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Profile</h1>
        <p className="text-muted-foreground">Manage your account and view your activity</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info Card */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader className="text-center pb-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="w-24 h-24">
                  <AvatarImage src="" alt="Profile" />
                  <AvatarFallback className="text-2xl bg-gradient-primary text-white">
                    ST
                  </AvatarFallback>
                </Avatar>
                
                {!isEditing ? (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold">Student User</h3>
                    <p className="text-muted-foreground">Computer Science Student</p>
                    <Badge className="mt-2 bg-success">
                      <Shield className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                  </div>
                ) : (
                  <div className="w-full space-y-3">
                    <div>
                      <Label htmlFor="full-name">Full Name</Label>
                      <Input id="full-name" defaultValue="Student User" />
                    </div>
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea id="bio" defaultValue="Computer Science Student" />
                    </div>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {!isEditing ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    <span>student@college.edu</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    <span>University Campus</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span>Joined January 2024</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="student@college.edu" />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" defaultValue="University Campus" />
                  </div>
                </div>
              )}
              
              <div className="pt-4 border-t">
                {!isEditing ? (
                  <Button 
                    onClick={() => setIsEditing(true)} 
                    className="w-full"
                    variant="outline"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                ) : (
                  <div className="flex gap-2">
                    <Button onClick={handleSaveProfile} className="flex-1">
                      Save Changes
                    </Button>
                    <Button 
                      onClick={() => setIsEditing(false)} 
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
              
              <Button variant="ghost" className="w-full">
                <Settings className="w-4 h-4 mr-2" />
                Account Settings
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Activity Tabs */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="posts">My Posts ({mockUserPosts.length})</TabsTrigger>
              <TabsTrigger value="saved">Saved Items ({mockSavedItems.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="posts" className="space-y-4">
              <div className="grid gap-4">
                {mockUserPosts.map((post, index) => {
                  const Icon = post.icon;
                  return (
                    <Card 
                      key={post.id} 
                      className="hover:shadow-md transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-lg ${post.color} flex items-center justify-center`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{post.title}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge variant="outline">{post.type}</Badge>
                                <Badge className={getStatusColor(post.status)}>
                                  {post.status}
                                </Badge>
                              </div>
                              <div className="flex items-center gap-4 text-sm text-muted-foreground mt-2">
                                <span>Posted on {post.date}</span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {post.views} views
                                </span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeletePost(post.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {mockUserPosts.length === 0 && (
                <div className="text-center py-12">
                  <User className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No posts yet</h3>
                  <p className="text-muted-foreground">Start sharing with the community!</p>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="saved" className="space-y-4">
              <div className="grid gap-4">
                {mockSavedItems.map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <Card 
                      key={item.id} 
                      className="hover:shadow-md transition-all duration-200 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                              <Icon className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-lg">{item.title}</h3>
                              <div className="flex items-center gap-3 mt-1">
                                <Badge variant="outline">{item.type}</Badge>
                              </div>
                              <p className="text-sm text-muted-foreground mt-2">
                                Saved on {item.savedDate}
                              </p>
                            </div>
                          </div>
                          
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline">
                              View
                            </Button>
                            <Button size="sm" variant="outline">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              
              {mockSavedItems.length === 0 && (
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No saved items</h3>
                  <p className="text-muted-foreground">Items you save will appear here</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}