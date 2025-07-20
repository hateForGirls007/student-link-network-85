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
  FileText,
  Download,
  Eye,
  Plus,
  Filter,
  Search,
  User,
  Calendar,
  BookOpen,
  File,
  FileSpreadsheet,
  Presentation
} from "lucide-react";

const mockNotes = [
  {
    id: 1,
    title: "Calculus Integration Techniques",
    subject: "Mathematics",
    semester: "2nd Semester",
    format: "PDF",
    description: "Comprehensive notes on various integration methods with solved examples",
    contributor: "John Smith",
    uploadDate: "2024-01-20",
    downloads: 45,
    size: "2.3 MB",
    icon: File
  },
  {
    id: 2,
    title: "OOP Concepts in Java",
    subject: "Computer Science", 
    semester: "3rd Semester",
    format: "DOCX",
    description: "Object-oriented programming concepts with practical examples and code snippets",
    contributor: "Sarah Wilson",
    uploadDate: "2024-01-18",
    downloads: 62,
    size: "1.8 MB",
    icon: FileText
  },
  {
    id: 3,
    title: "Organic Chemistry Reactions",
    subject: "Chemistry",
    semester: "4th Semester",
    format: "PDF",
    description: "Important organic reactions with mechanisms and applications",
    contributor: "Mike Chen",
    uploadDate: "2024-01-15",
    downloads: 38,
    size: "4.1 MB",
    icon: File
  },
  {
    id: 4,
    title: "Database Design Presentation",
    subject: "Computer Science",
    semester: "5th Semester",
    format: "PPT",
    description: "Database normalization and design principles presentation slides",
    contributor: "Emma Davis",
    uploadDate: "2024-01-12",
    downloads: 29,
    size: "5.6 MB",
    icon: Presentation
  },
  {
    id: 5,
    title: "Physics Formula Sheet",
    subject: "Physics",
    semester: "2nd Semester",
    format: "PDF",
    description: "Quick reference sheet for important physics formulas and constants",
    contributor: "Alex Thompson",
    uploadDate: "2024-01-10",
    downloads: 78,
    size: "876 KB",
    icon: File
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

const formats = [
  "All Formats",
  "PDF",
  "DOCX",
  "PPT",
  "XLSX"
];

export default function NotesSharing() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("All Subjects");
  const [selectedSemester, setSelectedSemester] = useState("All Semesters");
  const [selectedFormat, setSelectedFormat] = useState("All Formats");
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const filteredNotes = mockNotes.filter(note => {
    const matchesSearch = note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         note.contributor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = selectedSubject === "All Subjects" || note.subject === selectedSubject;
    const matchesSemester = selectedSemester === "All Semesters" || note.semester === selectedSemester;
    const matchesFormat = selectedFormat === "All Formats" || note.format === selectedFormat;
    
    return matchesSearch && matchesSubject && matchesSemester && matchesFormat;
  });

  const handleSubmitNotes = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Notes uploaded successfully!",
      description: "Your notes have been shared with the community.",
    });
    setIsDialogOpen(false);
  };

  const getFormatColor = (format: string) => {
    switch (format) {
      case "PDF": return "bg-red-100 text-red-800";
      case "DOCX": return "bg-blue-100 text-blue-800";
      case "PPT": return "bg-orange-100 text-orange-800";
      case "XLSX": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "PDF": return File;
      case "DOCX": return FileText;
      case "PPT": return Presentation;
      case "XLSX": return FileSpreadsheet;
      default: return FileText;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Notes Sharing</h1>
        <p className="text-muted-foreground">Share and access study materials and class notes</p>
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
              <Label>Search Notes</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by title, subject, contributor..."
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
              <Label>Format</Label>
              <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                <SelectTrigger>
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  {formats.map((format) => (
                    <SelectItem key={format} value={format}>
                      {format}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNotes.map((note, index) => {
          const FormatIcon = getFormatIcon(note.format);
          return (
            <Card 
              key={note.id} 
              className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                      <FormatIcon className="w-6 h-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg line-clamp-2">{note.title}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getFormatColor(note.format)}>
                          {note.format}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {note.size}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-3">
                <CardDescription className="text-sm line-clamp-2">
                  {note.description}
                </CardDescription>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{note.subject}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-muted-foreground">{note.semester}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <User className="w-4 h-4" />
                    <span>{note.contributor}</span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4" />
                    <span>{note.uploadDate}</span>
                    <span className="ml-auto">
                      <Download className="w-4 h-4 inline mr-1" />
                      {note.downloads} downloads
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredNotes.length === 0 && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">No notes found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or be the first to upload notes!</p>
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
            <DialogTitle>Upload Notes</DialogTitle>
            <DialogDescription>
              Share your study materials with fellow students.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmitNotes} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="notes-title">Title</Label>
              <Input id="notes-title" placeholder="e.g., Calculus Integration Techniques" required />
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
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Describe what these notes cover, key topics, etc..." 
                required 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="file-upload">Upload File</Label>
              <Input 
                id="file-upload" 
                type="file" 
                accept=".pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx"
                required 
              />
              <p className="text-xs text-muted-foreground">
                Supported formats: PDF, DOC, DOCX, PPT, PPTX, XLS, XLSX (Max 10MB)
              </p>
            </div>
            
            <Button type="submit" className="w-full">
              Upload Notes
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}