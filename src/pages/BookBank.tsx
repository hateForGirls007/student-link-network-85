import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  BookOpen,
  Plus,
  Filter,
  Search,
  Heart,
  Clock,
  User,
  GraduationCap
} from "lucide-react";

const mockBooks = [
  {
    id: 1,
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    course: "Mathematics 101",
    semester: "1st Semester",
    condition: "Good",
    type: "donate",
    description: "Comprehensive calculus textbook with solved examples",
    postedBy: "John Smith",
    contact: "john.s@college.edu",
    isbn: "9781285741550",
    subject: "Mathematics"
  },
  {
    id: 2,
    title: "Introduction to Programming",
    author: "Y. Daniel Liang",
    course: "Computer Science 101",
    semester: "1st Semester", 
    condition: "Excellent",
    type: "lend",
    description: "Perfect for beginners learning Java programming",
    postedBy: "Sarah Wilson",
    contact: "sarah.w@college.edu",
    isbn: "9780133761313",
    subject: "Computer Science"
  },
  {
    id: 3,
    title: "Physics for Scientists",
    author: "Serway & Jewett",
    course: "Physics 201",
    semester: "2nd Semester",
    condition: "Fair",
    type: "donate",
    description: "Classical mechanics and thermodynamics covered",
    postedBy: "Mike Chen",
    contact: "mike.c@college.edu",
    isbn: "9781305952300",
    subject: "Physics"
  },
  {
    id: 4,
    title: "Organic Chemistry",
    author: "Paula Bruice",
    course: "Chemistry 301",
    semester: "3rd Semester",
    condition: "Good",
    type: "lend",
    description: "Essential for chemistry majors, includes practice problems",
    postedBy: "Emma Davis",
    contact: "emma.d@college.edu",
    isbn: "9780134042282",
    subject: "Chemistry"
  }
];

const subjects = [
  "All Subjects",
  "Mathematics",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Engineering",
  "Business",
  "Literature",
  "History"
];

const semesters = [
  "All Semesters",
  "1st Semester",
  "2nd Semester", 
  "3rd Semester",
  "4th Semester",
  "5th Semester",
  "6th Semester",
  "7th Semester",
  "8th Semester"
];

const conditions = ["Excellent", "Good", "Fair", "Poor"];

export default function BookBank() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [selectedType, setSelectedType] = useState("all");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredBooks = mockBooks.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "All Subjects" || book.subject === selectedSubject;
    const matchesSemester = selectedSemester === "All Semesters" || book.semester === selectedSemester;
    const matchesType = selectedType === "all" || book.type === selectedType;
    
    return matchesSearch && matchesSubject && matchesSemester && matchesType;
  });

  const handleSubmitBook = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Book added successfully!",
      description: "Your book has been added to the book bank.",
    });
    setIsDialogOpen(false);
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case "Excellent": return "bg-green-100 text-green-800";
      case "Good": return "bg-blue-100 text-blue-800";
      case "Fair": return "bg-yellow-100 text-yellow-800";
      case "Poor": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Book Bank</h1>
        <p className="text-muted-foreground">Share, donate, or borrow academic books from fellow students</p>
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
              <Label>Search Books</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by title, author, course..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Subject</Label>
              <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                <SelectTrigger>
                  <SelectValue placeholder="Select subject" />
                </SelectTrigger>
                <SelectContent>
                  {subjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                      {subject}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Semester</Label>
              <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                <SelectTrigger>
                  <SelectValue placeholder="Select semester" />
                </SelectTrigger>
                <SelectContent>
                  {semesters.map((semester) => (
                    <SelectItem key={semester} value={semester}>
                      {semester}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger>
                  <SelectValue placeholder="All types" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="donate">Donate</SelectItem>
                  <SelectItem value="lend">Lend</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book, index) => (
          <Card 
            key={book.id} 
            className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-lg line-clamp-2">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-3">
                <Badge 
                  variant={book.type === "donate" ? "default" : "secondary"}
                  className={book.type === "donate" ? "bg-success" : "bg-primary"}
                >
                  {book.type === "donate" ? "DONATE" : "LEND"}
                </Badge>
                <Badge className={getConditionColor(book.condition)}>
                  {book.condition}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <GraduationCap className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">{book.course}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{book.semester}</span>
                </div>
                
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{book.postedBy}</span>
                </div>
              </div>
              
              <CardDescription className="text-sm line-clamp-2">
                {book.description}
              </CardDescription>
              
              {book.isbn && (
                <p className="text-xs text-muted-foreground">
                  ISBN: {book.isbn}
                </p>
              )}
              
              <Button className="w-full mt-4">
                {book.type === "donate" ? (
                  <>
                    <Heart className="w-4 h-4 mr-2" />
                    Request Book
                  </>
                ) : (
                  <>
                    <Clock className="w-4 h-4 mr-2" />
                    Borrow Book
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No books found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or be the first to add a book!</p>
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
            <DialogTitle>Add a Book</DialogTitle>
            <DialogDescription>
              Share your books with fellow students by donating or lending.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitBook} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="book-title">Book Title</Label>
              <Input id="book-title" placeholder="e.g., Calculus: Early Transcendentals" required />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="book-author">Author</Label>
              <Input id="book-author" placeholder="e.g., James Stewart" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Subject</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    {subjects.slice(1).map((subject) => (
                      <SelectItem key={subject} value={subject}>
                        {subject}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Semester</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.slice(1).map((semester) => (
                      <SelectItem key={semester} value={semester}>
                        {semester}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Input id="course" placeholder="e.g., Mathematics 101" required />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select defaultValue="donate">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="donate">Donate</SelectItem>
                    <SelectItem value="lend">Lend</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Condition</Label>
                <Select defaultValue="Good">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {conditions.map((condition) => (
                      <SelectItem key={condition} value={condition}>
                        {condition}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="isbn">ISBN (Optional)</Label>
              <Input id="isbn" placeholder="e.g., 9781285741550" />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe the book condition, what topics are covered, etc..." 
              />
            </div>
            
            <Button type="submit" className="w-full">
              Add Book
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}