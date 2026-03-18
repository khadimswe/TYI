import graduation from "figma:asset/8ec1697dd6addd74754aa5d531e423d213e8ef0c.png";
import studying from "figma:asset/b8a7baad07afed66324139b7a8cbdfb3284e8628.png";
import chalkboard from "figma:asset/877705e49b263234ba7a25b0be42ac5d46fa9a0e.png";
import workshop from "figma:asset/9110c7863b665ec9fd8fb14ef7fd124182067095.png";
import family from "figma:asset/40c2cbddf83c2690068fec0f18bc7b546a1c3695.png";
import logo from "figma:asset/aea554c9327d36d679a26d16641e67d8c9c23b96.png";

export function BackgroundCollage() {
  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Grid collage layout */}
      <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-2 p-4">
        {/* Top row */}
        <div className="relative overflow-hidden rounded-lg opacity-80">
          <img src={studying} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-lg opacity-70">
          <img src={logo} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-lg opacity-80">
          <img src={workshop} alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Middle row */}
        <div className="relative overflow-hidden rounded-lg opacity-70">
          <img src={chalkboard} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-lg opacity-30">
          {/* Empty space for login form */}
        </div>
        <div className="relative overflow-hidden rounded-lg opacity-70">
          <img src={family} alt="" className="w-full h-full object-cover" />
        </div>
        
        {/* Bottom row */}
        <div className="relative overflow-hidden rounded-lg opacity-80">
          <img src={graduation} alt="" className="w-full h-full object-cover scale-110" />
        </div>
        <div className="relative overflow-hidden rounded-lg opacity-70">
          <img src={workshop} alt="" className="w-full h-full object-cover" />
        </div>
        <div className="relative overflow-hidden rounded-lg opacity-80">
          <img src={studying} alt="" className="w-full h-full object-cover" />
        </div>
      </div>
      
      {/* Overlay gradient for better contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-yellow-50/10"></div>
    </div>
  );
}