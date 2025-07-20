import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Search,
  Plus,
  MapPin,
  Calendar as CalendarIcon,
  Clock,
  Package,
  Smartphone,
  Key,
  Backpack,
  Filter
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const mockItems = [
  {
    id: 1,
    title: "iPhone 14 Pro",
    description: "Black iPhone found near the library entrance",
    status: "found",
    location: "Main Library",
    date: "2024-01-15",
    category: "Electronics",
    icon: Smartphone
  },
  {
    id: 2,
    title: "Blue Backpack",
    description: "Lost blue backpack with laptop inside",
    status: "lost",
    location: "Engineering Building",
    date: "2024-01-14",
    category: "Bags",
    icon: Backpack
  },
  {
    id: 3,
    title: "Car Keys",
    description: "Toyota key ring with multiple keys",
    status: "found",
    location: "Parking Lot A",
    date: "2024-01-13",
    category: "Keys",
    icon: Key
  },
  {
    id: 4,
    title: "Textbook - Physics 101",
    description: "Lost physics textbook with name inside",
    status: "lost",
    location: "Science Building",
    date: "2024-01-12",
    category: "Books",
    icon: Package
  }
];

const categories = [
  "All Categories",
  "Electronics",
  "Books", 
  "Bags",
  "Keys",
  "Clothing",
  "Other"
];

const locations = [
  "All Locations",
  "Main Library",
  "Engineering Building",
  "Science Building",
  "Student Center",
  "Cafeteria",
  "Parking Lot A",
  "Parking Lot B"
];

export default function LostAndFound() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
  const [date, setDate] = useState();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredItems = mockItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || item.category === selectedCategory;
    const matchesLocation = selectedLocation === "All Locations" || item.location === selectedLocation;
    
    return matchesSearch && matchesCategory && matchesLocation;
  });

  const handleSubmitItem = (e) => {
    e.preventDefault();
    toast({
      title: "Item reported successfully!",
      description: "Your item has been added to the lost & found board.",
    });
    setIsDialogOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Lost & Found</h1>
        <p className="text-muted-foreground">Help your fellow students find their lost items</p>
      </div>

      {/* Filters */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search items..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                <SelectTrigger>
                  <SelectValue placeholder="Select location" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Items Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Card 
              key={item.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{item.title}</CardTitle>
                      <Badge 
                        variant={item.status === "found" ? "default" : "secondary"}
                        className={item.status === "found" ? "bg-success" : "bg-warning"}
                      >
                        {item.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <CardDescription className="text-sm">
                  {item.description}
                </CardDescription>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span>{item.location}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{item.date}</span>
                </div>
                
                <Button 
                  className="w-full mt-4"
                  variant={item.status === "found" ? "default" : "outline"}
                >
                  {item.status === "found" ? "Claim Item" : "I Found This"}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No items found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or be the first to report an item!</p>
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
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Report Lost/Found Item</DialogTitle>
            <DialogDescription>
              Help your fellow students by reporting lost or found items.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitItem} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="item-title">Item Title</Label>
              <Input id="item-title" placeholder="e.g., iPhone 14 Pro" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-description">Description</Label>
              <Textarea 
                id="item-description" 
                placeholder="Provide details to help identify the item..." 
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Status</Label>
                <Select defaultValue="lost">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lost">Lost</SelectItem>
                    <SelectItem value="found">Found</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Category</Label>
                <Select defaultValue="Other">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.slice(1).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="item-location">Location</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Where was it lost/found?" />
                </SelectTrigger>
                <SelectContent>
                  {locations.slice(1).map((location) => (
                    <SelectItem key={location} value={location}>
                      {location}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button type="submit" className="w-full">
              Report Item
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}