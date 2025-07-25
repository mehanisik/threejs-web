import { motion } from 'motion/react'
import type React from 'react'
import { useState } from 'react'

interface PerspectiveTextProps {
  isHovered: boolean
  label: string
}

const PerspectiveText: React.FC<PerspectiveTextProps> = ({
  label,
  isHovered,
}) => {
  return (
    <div
      className="flex flex-col justify-center items-center h-full w-full font-bold"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div
        className="flex flex-col justify-center items-center h-full w-full"
        style={{
          transformStyle: 'preserve-3d',
          transform: isHovered ? 'rotateX(90deg)' : 'rotateX(0deg)',
          transition: 'transform 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
        }}
      >
        <p
          className="pointer-events-none uppercase m-0 text-sm font-medium flex items-center justify-center"
          style={{
            transform: isHovered ? 'translateY(-100%)' : 'translateY(0%)',
            opacity: isHovered ? 0 : 1,
            transition: 'all 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
            lineHeight: '1',
          }}
        >
          {label}
        </p>
        <p
          className="absolute uppercase m-0 pointer-events-none text-sm font-medium flex items-center justify-center"
          style={{
            transformOrigin: 'bottom center',
            transform: 'rotateX(-90deg) translateY(9px)',
            opacity: isHovered ? 1 : 0,
            transition: 'all 0.75s cubic-bezier(0.76, 0, 0.24, 1)',
            lineHeight: '1',
          }}
        >
          {label}
        </p>
      </div>
    </div>
  )
}

interface ButtonProps {
  isActive: boolean
  toggleMenu: () => void
}

export const NavButton: React.FC<ButtonProps> = ({ isActive, toggleMenu }) => {
  const [isHovered, setIsHovered] = useState(false)
  return (
    <div
      className="absolute top-0 right-0 cursor-pointer overflow-hidden"
      style={{ width: '100px', height: '40px', borderRadius: '25px' }}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{ top: isActive ? '-100%' : '0%' }}
        transition={{ duration: 0.5, type: 'tween', ease: [0.76, 0, 0.24, 1] }}
      >
        <button
          type="button"
          className="w-full h-full bg-foreground flex items-center text-background justify-center"
          onClick={toggleMenu}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <PerspectiveText label="Menu" isHovered={isHovered} />
        </button>
        <button
          type="button"
          className="w-full h-full bg-foreground flex items-center text-background justify-center"
          onClick={toggleMenu}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <PerspectiveText label="Close" isHovered={isHovered} />
        </button>
      </motion.div>
    </div>
  )
}
