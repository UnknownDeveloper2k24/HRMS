import Image from "next/image"

export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image 
        src="/logo.png" 
        alt="BM Averance Logo" 
        width={120} 
        height={40}
        className="object-contain"
      />
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-10 h-10 flex items-center justify-center ${className}`}>
      <Image 
        src="/logo.png" 
        alt="BM Averance Logo" 
        width={40} 
        height={40}
        className="object-contain"
      />
    </div>
  )
}