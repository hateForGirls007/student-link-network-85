import { useEffect, useState } from "react";
import { Book, CreditCard, MessageCircle, Calendar } from "lucide-react";
import { campusConnectLogo } from "@/assets";

export default function LoadingScreen() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-[#E0F7FA] to-[#F8F9FA]">
      <div className="flex flex-col items-center justify-center space-y-8">
        {/* Logo with Orbiting Icons */}
        <div className="relative flex items-center justify-center">
          {/* Central Logo */}
          <div className="relative z-10 flex items-center justify-center w-32 h-32 bg-white rounded-full shadow-lg">
            <img 
              src={campusConnectLogo} 
              alt="CampusConnect" 
              className="w-24 h-auto object-contain"
            />
          </div>

          {/* Orbiting Icons */}
          <div className="absolute inset-0 animate-spin" style={{ animationDuration: '4s' }}>
            {/* Book Icon */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-md">
              <Book className="w-4 h-4 text-primary-foreground" />
            </div>
            
            {/* ID Card Icon */}
            <div className="absolute top-1/2 -right-4 -translate-y-1/2 w-8 h-8 bg-success rounded-full flex items-center justify-center shadow-md">
              <CreditCard className="w-4 h-4 text-success-foreground" />
            </div>
            
            {/* Chat Bubble Icon */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-warning rounded-full flex items-center justify-center shadow-md">
              <MessageCircle className="w-4 h-4 text-warning-foreground" />
            </div>
            
            {/* Calendar Icon */}
            <div className="absolute top-1/2 -left-4 -translate-y-1/2 w-8 h-8 bg-primary-light rounded-full flex items-center justify-center shadow-md">
              <Calendar className="w-4 h-4 text-primary-foreground" />
            </div>
          </div>
        </div>

        {/* Loading Text */}
        <p className="text-sm font-medium text-[#888] animate-pulse">
          Connecting your campus...
        </p>
      </div>
    </div>
  );
}