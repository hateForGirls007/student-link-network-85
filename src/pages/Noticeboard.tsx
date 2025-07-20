import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  Users,
  Plus,
  Filter,
  Search,
  ExternalLink,
  Code,
  Palette,
  Trophy,
  Music,
  Briefcase
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const mockEvents = [
  {
    id: 1,
    title: "Annual Hackathon 2024",
    description: "48-hour coding competition with amazing prizes. Build innovative solutions for real-world problems.",
    type: "Tech",
    department: "Computer Science",
    date: "2024-02-15",
    time: "09:00 AM",
    location: "Tech Hub",
    organizer: "CS Society",
    tags: ["Hackathon", "Coding", "Competition"],
    rsvpLink: "https://forms.google.com/hackathon-2024",
    poster: "",
    icon: Code
  },
  {
    id: 2,
    title: "Cultural Festival Opening",
    description: "Join us for the grand opening of our annual cultural festival with performances from various cultural groups.",
    type: "Cultural",
    department: "Student Affairs",
    date: "2024-02-10",
    time: "06:00 PM",
    location: "Main Auditorium",
    organizer: "Cultural Committee",
    tags: ["Cultural", "Festival", "Performance"],
    rsvpLink: "https://forms.google.com/cultural-fest",
    poster: "",
    icon: Music
  },
  {
    id: 3,
    title: "Machine Learning Workshop",
    description: "Learn the fundamentals of ML and build your first neural network. Laptops will be provided.",
    type: "Workshop",
    department: "Computer Science",
    date: "2024-02-20",
    time: "02:00 PM",
    location: "Lab 301",
    organizer: "AI Club",
    tags: ["ML", "AI", "Workshop"],
    rsvpLink: "https://forms.google.com/ml-workshop",
    poster: "",
    icon: Code
  },
  {
    id: 4,
    title: "Art Exhibition Opening",
    description: "Showcase of student artwork from various departments. Refreshments will be served.",
    type: "Cultural",
    department: "Fine Arts",
    date: "2024-02-12",
    time: "04:00 PM",
    location: "Art Gallery",
    organizer: "Art Department",
    tags: ["Art", "Exhibition", "Creative"],
    rsvpLink: "",
    poster: "",
    icon: Palette
  },
  {
    id: 5,
    title: "Career Fair 2024",
    description: "Meet with top companies and explore internship and job opportunities. Dress code: Business formal.",
    type: "Career",
    department: "Career Services",
    date: "2024-02-25",
    time: "10:00 AM",
    location: "Sports Complex",
    organizer: "Career Center",
    tags: ["Career", "Jobs", "Internships"],
    rsvpLink: "https://forms.google.com/career-fair",
    poster: "",
    icon: Briefcase
  },
  {
    id: 6,
    title: "Sports Championship Finals",
    description: "Watch the exciting finals of our inter-department sports championship. Free snacks for all attendees!",
    type: "Sports",
    department: "Sports Committee",
    date: "2024-02-18",
    time: "03:00 PM",
    location: "Sports Ground",
    organizer: "Sports Committee",
    tags: ["Sports", "Championship", "Finals"],
    rsvpLink: "",
    poster: "",
    icon: Trophy
  }
];

const eventTypes = [
  "All Types",
  "Cultural",
  "Tech",
  "Workshop",
  "Sports",
  "Career",
  "Academic"
];

const departments = [
  "All Departments",
  "Computer Science",
  "Engineering",
  "Business",
  "Fine Arts",
  "Student Affairs",
  "Career Services",
  "Sports Committee"
];

export default function Noticeboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All Types");
  const [selectedDepartment, setSelectedDepartment] = useState("All Departments");
  const [date, setDate] = useState<Date>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredEvents = mockEvents.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         event.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = selectedType === "All Types" || event.type === selectedType;
    const matchesDepartment = selectedDepartment === "All Departments" || event.department === selectedDepartment;
    
    return matchesSearch && matchesType && matchesDepartment;
  });

  const handleSubmitEvent = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Event posted successfully!",
      description: "Your event has been added to the noticeboard.",
    });
    setIsDialogOpen(false);
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Tech": return "bg-blue-100 text-blue-800";
      case "Cultural": return "bg-purple-100 text-purple-800";
      case "Workshop": return "bg-green-100 text-green-800";
      case "Sports": return "bg-orange-100 text-orange-800";
      case "Career": return "bg-indigo-100 text-indigo-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Noticeboard</h1>
        <p className="text-muted-foreground">Stay updated with campus events, workshops, and announcements</p>
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
              <Label>Search Events</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Event Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {eventTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Department</Label>
              <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map((dept) => (
                    <SelectItem key={dept} value={dept}>
                      {dept}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
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

      {/* Events Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event, index) => {
          const Icon = event.icon;
          return (
            <Card 
              key={event.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in overflow-hidden group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Event Image/Poster Placeholder */}
              <div className="h-48 bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center relative overflow-hidden">
                <Icon className="w-16 h-16 text-primary/60" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <Badge 
                  className={`absolute top-3 left-3 ${getTypeColor(event.type)}`}
                >
                  {event.type}
                </Badge>
                {event.rsvpLink && (
                  <Button
                    size="sm"
                    className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
                    asChild
                  >
                    <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </Button>
                )}
              </div>

              <CardHeader className="pb-3">
                <CardTitle className="text-lg group-hover:text-primary transition-colors duration-200">
                  {event.title}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="w-4 h-4" />
                  <span>{event.organizer}</span>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <CardDescription className="text-sm line-clamp-3">
                  {event.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{event.date}</span>
                    <Clock className="w-4 h-4 ml-2" />
                    <span>{event.time}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>

                {event.tags && event.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                )}
                
                <div className="pt-2">
                  {event.rsvpLink ? (
                    <Button className="w-full" asChild>
                      <a href={event.rsvpLink} target="_blank" rel="noopener noreferrer">
                        RSVP Now
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  ) : (
                    <Button className="w-full" variant="outline">
                      View Details
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <CalendarIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No events found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or be the first to post an event!</p>
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
            <DialogTitle>Post an Event</DialogTitle>
            <DialogDescription>
              Share campus events, workshops, and announcements with the community.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitEvent} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="event-title">Event Title</Label>
              <Input id="event-title" placeholder="e.g., Annual Hackathon 2024" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event-description">Description</Label>
              <Textarea 
                id="event-description" 
                placeholder="Describe your event, what to expect, requirements, etc..." 
                required 
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Event Type</Label>
                <Select defaultValue="Cultural">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {eventTypes.slice(1).map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.slice(1).map((dept) => (
                      <SelectItem key={dept} value={dept}>
                        {dept}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="event-date">Date</Label>
                <Input id="event-date" type="date" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="event-time">Time</Label>
                <Input id="event-time" type="time" required />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="event-location">Location</Label>
              <Input id="event-location" placeholder="e.g., Main Auditorium" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="organizer">Organizer</Label>
              <Input id="organizer" placeholder="e.g., CS Society" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="rsvp-link">RSVP Link (Optional)</Label>
              <Input id="rsvp-link" type="url" placeholder="https://forms.google.com/..." />
            </div>
            
            <Button type="submit" className="w-full">
              Post Event
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}