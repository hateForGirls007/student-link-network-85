import { useEffect, useState } from "react";

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
        {/* SVG Campus Walking Scene */}
        <div className="w-80 h-64">
          <svg
            viewBox="0 0 400 300"
            className="w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background Buildings */}
            <rect x="50" y="80" width="60" height="120" fill="#C8B9E8" opacity="0.3" />
            <rect x="120" y="60" width="50" height="140" fill="#A8D8E8" opacity="0.3" />
            <rect x="180" y="90" width="70" height="110" fill="#88D1C2" opacity="0.3" />
            <rect x="260" y="70" width="55" height="130" fill="#C8B9E8" opacity="0.3" />
            
            {/* Trees */}
            <circle cx="40" cy="180" r="15" fill="#88D1C2" opacity="0.5" />
            <rect x="38" y="180" width="4" height="20" fill="#A8D8E8" opacity="0.7" />
            
            <circle cx="340" cy="170" r="18" fill="#88D1C2" opacity="0.5" />
            <rect x="338" y="170" width="4" height="25" fill="#A8D8E8" opacity="0.7" />
            
            {/* Ground */}
            <rect x="0" y="200" width="400" height="100" fill="#F8F9FA" opacity="0.8" />
            
            {/* Walking Students */}
            <g className="animate-pulse">
              {/* Student 1 with Chat Bubble */}
              <g transform="translate(80,220)">
                <ellipse cx="0" cy="0" rx="8" ry="20" fill="#6C63FF" />
                <circle cx="0" cy="-18" r="6" fill="#6C63FF" />
                <rect x="-4" y="-8" width="8" height="15" fill="#6C63FF" />
                <ellipse cx="-8" cy="8" rx="3" ry="8" fill="#6C63FF" />
                <ellipse cx="8" cy="8" rx="3" ry="8" fill="#6C63FF" />
                
                {/* Chat Bubble */}
                <circle cx="15" cy="-25" r="8" fill="#88D1C2" opacity="0.8" />
                <polygon points="7,-20 12,-18 7,-16" fill="#88D1C2" opacity="0.8" />
                <circle cx="12" cy="-27" r="1.5" fill="white" />
                <circle cx="15" cy="-27" r="1.5" fill="white" />
                <circle cx="18" cy="-27" r="1.5" fill="white" />
              </g>
              
              {/* Student 2 with Book */}
              <g transform="translate(150,220)">
                <ellipse cx="0" cy="0" rx="8" ry="20" fill="#88D1C2" />
                <circle cx="0" cy="-18" r="6" fill="#88D1C2" />
                <rect x="-4" y="-8" width="8" height="15" fill="#88D1C2" />
                <ellipse cx="-8" cy="8" rx="3" ry="8" fill="#88D1C2" />
                <ellipse cx="8" cy="8" rx="3" ry="8" fill="#88D1C2" />
                
                {/* Book */}
                <rect x="-15" y="-12" width="8" height="10" fill="#C8B9E8" rx="1" />
                <line x1="-15" y1="-7" x2="-7" y2="-7" stroke="white" strokeWidth="1" />
                <line x1="-15" y1="-4" x2="-7" y2="-4" stroke="white" strokeWidth="1" />
              </g>
              
              {/* Student 3 with ID Badge */}
              <g transform="translate(220,220)">
                <ellipse cx="0" cy="0" rx="8" ry="20" fill="#C8B9E8" />
                <circle cx="0" cy="-18" r="6" fill="#C8B9E8" />
                <rect x="-4" y="-8" width="8" height="15" fill="#C8B9E8" />
                <ellipse cx="-8" cy="8" rx="3" ry="8" fill="#C8B9E8" />
                <ellipse cx="8" cy="8" rx="3" ry="8" fill="#C8B9E8" />
                
                {/* ID Badge */}
                <rect x="8" y="-12" width="10" height="12" fill="white" stroke="#6C63FF" strokeWidth="1" rx="1" />
                <circle cx="13" cy="-8" r="2" fill="#6C63FF" />
                <rect x="10" y="-4" width="6" height="1" fill="#6C63FF" />
                <rect x="10" y="-2" width="4" height="1" fill="#6C63FF" />
              </g>
              
              {/* Student 4 with Calendar */}
              <g transform="translate(290,220)">
                <ellipse cx="0" cy="0" rx="8" ry="20" fill="#6C63FF" />
                <circle cx="0" cy="-18" r="6" fill="#6C63FF" />
                <rect x="-4" y="-8" width="8" height="15" fill="#6C63FF" />
                <ellipse cx="-8" cy="8" rx="3" ry="8" fill="#6C63FF" />
                <ellipse cx="8" cy="8" rx="3" ry="8" fill="#6C63FF" />
                
                {/* Calendar */}
                <rect x="-18" y="-15" width="12" height="10" fill="white" stroke="#88D1C2" strokeWidth="1" rx="1" />
                <rect x="-18" y="-15" width="12" height="3" fill="#88D1C2" />
                <circle cx="-15" cy="-17" r="1" fill="white" />
                <circle cx="-9" cy="-17" r="1" fill="white" />
                <rect x="-16" y="-11" width="2" height="2" fill="#88D1C2" />
                <rect x="-13" y="-11" width="2" height="2" fill="#88D1C2" />
                <rect x="-10" y="-11" width="2" height="2" fill="#88D1C2" />
              </g>
            </g>
            
            {/* CampusConnect Logo */}
            <g transform="translate(200,120)">
              <circle cx="0" cy="0" r="25" fill="white" opacity="0.9" />
              <text x="0" y="-5" textAnchor="middle" fontSize="12" fill="#6C63FF" fontWeight="bold">Campus</text>
              <text x="0" y="8" textAnchor="middle" fontSize="12" fill="#6C63FF" fontWeight="bold">Connect</text>
              <circle cx="0" cy="0" r="25" fill="none" stroke="#6C63FF" strokeWidth="2" opacity="0.3" />
            </g>
            
            {/* Floating Academic Icons */}
            <g className="animate-bounce" style={{ animationDuration: '2s', animationDelay: '0s' }}>
              <circle cx="100" cy="50" r="4" fill="#88D1C2" opacity="0.6" />
            </g>
            <g className="animate-bounce" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }}>
              <circle cx="300" cy="60" r="3" fill="#C8B9E8" opacity="0.6" />
            </g>
            <g className="animate-bounce" style={{ animationDuration: '3s', animationDelay: '1s' }}>
              <circle cx="350" cy="40" r="4" fill="#6C63FF" opacity="0.6" />
            </g>
          </svg>
        </div>

        {/* Loading Text */}
        <p className="text-sm font-medium text-[#888] animate-pulse">
          Connecting your campus...
        </p>
      </div>
    </div>
  );
}