export function Logo() {
  return (
    <div className="inline-flex items-center justify-center">
      <div className="relative">
        {/* Outer glow effect */}
        <div className="absolute inset-0 bg-yellow-400/30 rounded-xl blur-md scale-110"></div>
        
        {/* Shadow layers for depth */}
        <div className="absolute inset-0 bg-yellow-500 rounded-xl transform rotate-6 translate-x-1 translate-y-1"></div>
        <div className="absolute inset-0 bg-yellow-400 rounded-xl transform rotate-3"></div>
        
        {/* Main logo container */}
        <div className="relative bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 rounded-xl px-6 py-3 shadow-xl border-2 border-yellow-300">
          <div className="flex items-center gap-1">
            {/* Stylized "TAG" text */}
            <span className="text-4xl font-black text-black tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
              TAG
            </span>
            {/* Decorative play icon */}
            <div className="flex flex-col gap-0.5 ml-1">
              <div className="w-2 h-2 bg-black rounded-full"></div>
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>
          
          {/* Bottom accent line */}
          <div className="absolute bottom-1 left-0 right-0 h-1 bg-black/20 rounded-full mx-2"></div>
        </div>
        
        {/* Corner decorations */}
        <div className="absolute -top-1 -right-1 w-3 h-3 bg-white rounded-full shadow-sm"></div>
        <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-white rounded-full shadow-sm"></div>
      </div>
    </div>
  );
}