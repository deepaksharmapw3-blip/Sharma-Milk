import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        {/* Decorative rotating rings */}
        <div className="absolute h-32 w-32 animate-[spin_3s_linear_infinite] rounded-full border-4 border-t-primary border-r-transparent border-b-saffron border-l-transparent opacity-80" />
        <div className="absolute h-24 w-24 animate-[spin_2s_linear_infinite_reverse] rounded-full border-4 border-t-accent border-r-transparent border-b-primary border-l-transparent opacity-60" />
        
        {/* Center icon */}
        <div className="flex h-16 w-16 animate-pulse items-center justify-center rounded-full bg-gradient-to-br from-primary to-saffron shadow-lg shadow-primary/20">
          <span className="font-serif text-2xl font-bold text-primary-foreground">SM</span>
        </div>
      </div>
      
      <p className="mt-8 animate-pulse font-serif text-lg font-medium text-primary tracking-wider">
        Preparing your sweets...
      </p>
    </div>
  );
}
