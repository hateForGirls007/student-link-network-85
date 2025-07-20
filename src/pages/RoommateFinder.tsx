import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  MapPin,
  DollarSign,
  Users,
  MessageCircle,
  Plus,
  Filter,
  Home,
  Wifi,
  Car,
  Utensils
} from "lucide-react";

const mockListings = [
  {
    id: 1,
    title: "Cozy 2BHK near Campus",
    rent: 800,
    location: "University District",
    distance: "0.5 km from campus",
    gender: "Any",
    furnished: true,
    description: "Spacious apartment with all amenities. Looking for a clean and studious roommate.",
    amenities: ["WiFi", "Parking", "Kitchen"],
    postedBy: "Alex Chen",
    contact: "alex.chen@email.com"
  },
  {
    id: 2,
    title: "Student House Share",
    rent: 600,
    location: "Downtown Area",
    distance: "1.2 km from campus",
    gender: "Female",
    furnished: false,
    description: "Female-only house with great community vibe. Perfect for serious students.",
    amenities: ["WiFi", "Kitchen", "Laundry"],
    postedBy: "Sarah Wilson",
    contact: "sarah.w@email.com"
  },
  {
    id: 3,
    title: "Modern Studio Apartment",
    rent: 1200,
    location: "Campus Village",
    distance: "0.2 km from campus",
    gender: "Male",
    furnished: true,
    description: "Brand new studio with modern furnishing. Quiet environment for studies.",
    amenities: ["WiFi", "Parking", "Kitchen", "Gym"],
    postedBy: "Michael Brown",
    contact: "m.brown@email.com"
  },
  {
    id: 4,
    title: "Shared Apartment",
    rent: 500,
    location: "Greenfield",
    distance: "2.1 km from campus",
    gender: "Any",
    furnished: true,
    description: "Looking for a friendly roommate to share this beautiful apartment.",
    amenities: ["WiFi", "Kitchen"],
    postedBy: "Emma Davis",
    contact: "emma.d@email.com"
  }
];

export default function RoommateFinder() {
  const [budgetRange, setBudgetRange] = useState([500, 1500]);
  const [genderPreference, setGenderPreference] = useState("Any");
  const [furnished, setFurnished] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredListings = mockListings.filter(listing => {
    const matchesSearch = listing.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         listing.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBudget = listing.rent >= budgetRange[0] && listing.rent <= budgetRange[1];
    const matchesGender = genderPreference === "Any" || listing.gender === genderPreference || listing.gender === "Any";
    const matchesFurnished = !furnished || listing.furnished;
    
    return matchesSearch && matchesBudget && matchesGender && matchesFurnished;
  });

  const handleSubmitListing = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Listing posted successfully!",
      description: "Your room listing has been added to the board.",
    });
    setIsDialogOpen(false);
  };

  const getGenderBadgeColor = (gender: string) => {
    switch (gender) {
      case "Male": return "bg-blue-100 text-blue-800";
      case "Female": return "bg-pink-100 text-pink-800";
      default: return "bg-green-100 text-green-800";
    }
  };

  const amenityIcons: { [key: string]: any } = {
    "WiFi": Wifi,
    "Parking": Car,
    "Kitchen": Utensils,
    "Gym": Users,
    "Laundry": Home
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Roommate Finder</h1>
        <p className="text-muted-foreground">Find the perfect roommate or housing near campus</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-2">
              <Label>Search Location</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search area..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Gender Preference</Label>
              <Select value={genderPreference} onValueChange={setGenderPreference}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Any">Any</SelectItem>
                  <SelectItem value="Male">Male</SelectItem>
                  <SelectItem value="Female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              <Label>Budget Range: ${budgetRange[0]} - ${budgetRange[1]}</Label>
              <Slider
                value={budgetRange}
                onValueChange={setBudgetRange}
                max={2000}
                min={300}
                step={50}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="furnished">Furnished Only</Label>
                <Switch
                  id="furnished"
                  checked={furnished}
                  onCheckedChange={setFurnished}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredListings.map((listing, index) => (
          <Card 
            key={listing.id} 
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{listing.title}</CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge className={getGenderBadgeColor(listing.gender)}>
                      {listing.gender}
                    </Badge>
                    {listing.furnished && (
                      <Badge variant="outline">Furnished</Badge>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">
                    ${listing.rent}
                  </div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <CardDescription>
                {listing.description}
              </CardDescription>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{listing.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Home className="w-4 h-4" />
                  <span>{listing.distance}</span>
                </div>
              </div>

              {listing.amenities && listing.amenities.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => {
                    const Icon = amenityIcons[amenity] || Home;
                    return (
                      <div key={amenity} className="flex items-center gap-1 text-xs bg-muted px-2 py-1 rounded-full">
                        <Icon className="w-3 h-3" />
                        <span>{amenity}</span>
                      </div>
                    );
                  })}
                </div>
              )}
              
              <div className="pt-2">
                <p className="text-sm text-muted-foreground mb-3">
                  Posted by: <span className="font-medium">{listing.postedBy}</span>
                </p>
                <Button className="w-full">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Message Poster
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredListings.length === 0 && (
        <div className="text-center py-12">
          <Home className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No listings found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or be the first to post a listing!</p>
        </div>
      )}

      {/* Floating Action Button */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <Button 
            size="lg"
            className="fixed bottom-8 right-8 rounded-full w-14 h-14 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Post a Room Listing</DialogTitle>
            <DialogDescription>
              Find your perfect roommate by posting your room details.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitListing} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="room-title">Room Title</Label>
              <Input id="room-title" placeholder="e.g., Cozy 2BHK near Campus" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="rent">Monthly Rent ($)</Label>
                <Input id="rent" type="number" placeholder="800" required />
              </div>
              
              <div className="space-y-2">
                <Label>Gender Preference</Label>
                <Select defaultValue="Any">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Any">Any</SelectItem>
                    <SelectItem value="Male">Male Only</SelectItem>
                    <SelectItem value="Female">Female Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input id="location" placeholder="e.g., University District" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe your room, house rules, and what you're looking for in a roommate..." 
                required 
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="furnished-post" />
              <Label htmlFor="furnished-post">Furnished</Label>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contact">Contact Information</Label>
              <Input id="contact" type="email" placeholder="your.email@college.edu" required />
            </div>
            
            <Button type="submit" className="w-full">
              Post Listing
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}