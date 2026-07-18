import {motion} from 'framer-motion'
 

export default function FloatingCard({icon,text,className = "",delay = 0}) {
  return (
    <motion.div
      className={`hidden lg:flex absolute ${className} items-center gap-3 bg-white/65  backdrop-blur-xl px-6 py-4 rounded-2xl shadow-xl z-30  border border-white/20`}
    animate={{y: [0, -5, 0], }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay}}
   >
      <div className="text-[#16C7C5]">
        {icon}
      </div>
      
      <p className="font-semibold text-slate-800">
        {text}
      </p>
    </motion.div>
  );
}
