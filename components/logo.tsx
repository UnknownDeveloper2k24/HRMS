export function Logo({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="relative w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
        <span className="text-primary-foreground font-bold text-xl">A</span>
        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary/80 rounded-full" />
      </div>
      <div className="flex flex-col">
        <span className="font-bold text-lg leading-tight text-foreground">Aver</span>
        <span className="text-xs text-muted-foreground -mt-0.5">People</span>
      </div>
    </div>
  )
}

export function LogoIcon({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-10 h-10 bg-primary rounded-lg flex items-center justify-center ${className}`}>
      <span className="text-primary-foreground font-bold text-xl">A</span>
      <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-primary/80 rounded-full" />
    </div>
  )
}
