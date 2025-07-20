import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Search,
  Users,
  BookOpen,
  MessageSquare,
  FileText,
  ArrowRight,
  Shield,
  Heart,
  Zap,
  Github,
  Mail
} from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const features = [
  {
    title: "Lost & Found",
    description: "Report and find lost items across campus",
    icon: Search,
    href: "/lost-found",
    color: "bg-red-50 text-red-600",
    count: "24 items"
  },
  {
    title: "Roommate Finder",
    description: "Find the perfect roommate or housing",
    icon: Users,
    href: "/roommate",
    color: "bg-blue-50 text-blue-600",
    count: "15 listings"
  },
  {
    title: "Book Bank",
    description: "Share, donate, or borrow academic books",
    icon: BookOpen,
    href: "/books",
    color: "bg-green-50 text-green-600",
    count: "120 books"
  },
  {
    title: "Noticeboard",
    description: "Campus events, workshops, and announcements",
    icon: MessageSquare,
    href: "/noticeboard",
    color: "bg-purple-50 text-purple-600",
    count: "8 events"
  },
  {
    title: "Notes Sharing",
    description: "Share study materials and class notes",
    icon: FileText,
    href: "/notes",
    color: "bg-orange-50 text-orange-600",
    count: "45 notes"
  }
];

const benefits = [
  {
    title: "Built by Students",
    description: "Created by students, for students",
    icon: Heart,
  },
  {
    title: "Secure & Free",
    description: "Safe platform with verified users",
    icon: Shield,
  },
  {
    title: "Lightning Fast",
    description: "Quick and responsive interface",
    icon: Zap,
  }
];

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent z-10" />
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        <div className="relative z-20 container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 animate-fade-in">
              Connect. Share.{" "}
              <span className="bg-gradient-to-r from-white to-primary-light bg-clip-text text-transparent">
                Collaborate.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 animate-fade-in [animation-delay:200ms]">
              Your campus community platform for sharing resources, finding roommates, 
              and staying connected with fellow students.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in [animation-delay:400ms]">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-6 hover:scale-105 transition-transform duration-200">
                Start Exploring
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 py-6 border-white text-white hover:bg-white hover:text-primary transition-all duration-200">
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything You Need for Campus Life
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover all the tools and resources to make your student life easier and more connected.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Link key={feature.title} to={feature.href}>
                  <Card 
                    className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 bg-gradient-card animate-fade-in cursor-pointer"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader className="pb-6">
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 rounded-lg ${feature.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {feature.count}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-primary transition-colors duration-200">
                        {feature.title}
                      </CardTitle>
                      <CardDescription className="text-base">
                        {feature.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose CampusConnect?
            </h2>
            <p className="text-xl text-muted-foreground">
              Trusted by students across campus for a reason
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div 
                  key={benefit.title} 
                  className="text-center group animate-fade-in"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-200">
                    {benefit.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
                C
              </div>
              <span className="font-bold text-lg">CampusConnect</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="text-background hover:text-background hover:bg-background/10">
                <Github className="w-4 h-4 mr-2" />
                GitHub
              </Button>
              <Button variant="ghost" size="sm" className="text-background hover:text-background hover:bg-background/10">
                <Mail className="w-4 h-4 mr-2" />
                Contact
              </Button>
            </div>
          </div>
          
          <div className="border-t border-background/20 mt-8 pt-8 text-center text-sm text-background/70">
            <p>&copy; 2024 CampusConnect. Built with ❤️ for students, by students.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}