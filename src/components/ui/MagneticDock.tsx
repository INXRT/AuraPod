import * as React from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence, type MotionValue } from "framer-motion";
import { cn } from "../../utils/cn";

export interface DockItemData {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Icon component */
  icon: React.ReactNode;
  /** Click handler */
  onClick?: () => void;
  /** Whether item is active */
  isActive?: boolean;
  /** Badge count or string */
  badge?: number | string;
  /** Custom color accent */
  accentColor?: string;
}

export interface MagneticDockProps {
  /** Array of dock items */
  items: DockItemData[];
  /** Size of icons in pixels */
  iconSize?: number;
  /** Maximum scale on hover */
  maxScale?: number;
  /** Distance of magnetic effect in pixels */
  magneticDistance?: number;
  /** Show labels on hover */
  showLabels?: boolean;
  /** Dock position */
  position?: "bottom" | "top" | "left" | "right";
  /** Background style */
  variant?: "glass" | "solid" | "transparent";
  /** Custom class name */
  className?: string;
  /** Whether the dock should hide automatically on scroll down */
  autoHide?: boolean;
  /** Hide completely if a modal is open */
  isHidden?: boolean;
}

interface DockItemProps {
  item: DockItemData;
  mouseX: MotionValue<number>;
  iconSize: number;
  maxScale: number;
  magneticDistance: number;
  showLabels: boolean;
  isVertical: boolean;
}

function DockItem({
  item,
  mouseX,
  iconSize,
  maxScale,
  magneticDistance,
  showLabels,
  isVertical,
}: DockItemProps) {
  const ref = React.useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  // Calculate distance from mouse to center of item
  const distance = useTransform(mouseX, (val: number) => {
    if (!ref.current) return magneticDistance + 1;
    const rect = ref.current.getBoundingClientRect();
    const center = isVertical
      ? rect.top + rect.height / 2
      : rect.left + rect.width / 2;
    return val - center;
  });

  // Scale based on distance - closer = larger
  const scale = useTransform(distance, [-magneticDistance, 0, magneticDistance], [1, maxScale, 1]);

  // Apply spring physics for snappy, draggy mechanical feel (no bouncy oscillation)
  const springConfig = { damping: 28, stiffness: 440, mass: 0.3 };
  const smoothScale = useSpring(scale, springConfig);

  // Calculate the size based on scale
  const size = useTransform(smoothScale, (s) => s * iconSize);

  // Subtle lift without bounce
  const y = useTransform(smoothScale, (s) => (s - 1) * -3);
  const smoothY = useSpring(y, springConfig);

  return (
    <motion.button
      ref={ref}
      onClick={item.onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        "relative flex items-center justify-center",
        "rounded-2xl transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400",
        item.isActive && "bg-white/10"
      )}
      style={{
        width: size,
        height: size,
        y: isVertical ? 0 : smoothY,
        x: isVertical ? smoothY : 0,
      }}
      whileTap={{ scale: 0.92 }}
    >
      {/* Icon Container */}
      <motion.div
        className={cn(
          "relative w-full h-full rounded-2xl overflow-hidden",
          "bg-gradient-to-b from-obsidian-850 to-obsidian-950",
          "backdrop-blur-md",
          "border border-white/15",
          "shadow-xl shadow-black/40",
          "flex items-center justify-center",
          "transition-all duration-200",
          item.isActive && "border-white/35 shadow-lg"
        )}
        style={{
          boxShadow: isHovered
            ? "0 10px 28px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.25)"
            : "0 4px 14px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
        }}
      >
        {/* Icon */}
        <div className="w-[58%] h-[58%] flex items-center justify-center text-slate-300 hover:text-white transition-colors">
          {item.icon}
        </div>

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, transparent 50%, transparent 100%)",
            opacity: isHovered ? 0.7 : 0.15,
          }}
        />
      </motion.div>

      {/* Badge */}
      <AnimatePresence>
        {item.badge !== undefined && item.badge !== 0 && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className={cn(
              "absolute -top-1.5 -right-1.5",
              "min-w-[18px] h-4 px-1",
              "rounded-full",
              "bg-white text-slate-950 text-[10px] font-mono font-bold",
              "flex items-center justify-center",
              "border border-slate-900",
              "shadow-sm"
            )}
          >
            {item.badge}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Active Indicator */}
      <AnimatePresence>
        {item.isActive && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="absolute -bottom-2 w-1.5 h-1.5 rounded-full bg-white shadow-sm"
          />
        )}
      </AnimatePresence>

      {/* Tooltip */}
      <AnimatePresence>
        {showLabels && isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className={cn(
              "absolute -top-10 left-1/2 -translate-x-1/2",
              "px-2.5 py-1 rounded-lg",
              "bg-obsidian-900/95 backdrop-blur-md",
              "text-slate-100 text-xs font-mono font-semibold whitespace-nowrap",
              "border border-white/20",
              "shadow-2xl shadow-black/80",
              "pointer-events-none z-50"
            )}
          >
            {item.label}
            {/* Tooltip arrow */}
            <div
              className={cn(
                "absolute left-1/2 -translate-x-1/2 -bottom-1",
                "w-2 h-2 rotate-45",
                "bg-obsidian-900",
                "border-r border-b border-white/20"
              )}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hover subtle lift */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        animate={{
          boxShadow: isHovered
            ? "0 0 16px rgba(255,255,255,0.06)"
            : "0 0 0px rgba(0,0,0,0)",
        }}
        transition={{ duration: 0.25 }}
      />
    </motion.button>
  );
}

export function MagneticDock({
  items,
  iconSize = 46,
  maxScale = 1.45,
  magneticDistance = 130,
  showLabels = true,
  position = "bottom",
  variant = "glass",
  className,
  autoHide = true,
  isHidden = false,
}: MagneticDockProps) {
  const mousePosition = useMotionValue(Infinity);
  const isVertical = position === "left" || position === "right";

  // Smart hide/reveal state
  const [isVisible, setIsVisible] = React.useState(true);
  const [isNearBottom, setIsNearBottom] = React.useState(false);
  const lastScrollY = React.useRef(0);

  // Monitor scroll direction and mouse bottom proximity
  React.useEffect(() => {
    if (!autoHide) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      // If user scrolls up or is at the very top, show dock
      if (currentScrollY < 120 || currentScrollY < lastScrollY.current - 8) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY.current + 15 && !isNearBottom) {
        // User is scrolling down
        setIsVisible(false);
      }
      lastScrollY.current = currentScrollY;
    };

    const handleWindowMouseMove = (e: MouseEvent) => {
      // If mouse comes within 85px of screen bottom, reveal dock
      const distanceFromBottom = window.innerHeight - e.clientY;
      if (distanceFromBottom <= 85) {
        setIsNearBottom(true);
        setIsVisible(true);
      } else {
        setIsNearBottom(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleWindowMouseMove, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleWindowMouseMove);
    };
  }, [autoHide, isNearBottom]);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (isVertical) {
        mousePosition.set(e.clientY);
      } else {
        mousePosition.set(e.clientX);
      }
    },
    [mousePosition, isVertical]
  );

  const handleMouseLeave = () => {
    mousePosition.set(Infinity);
  };

  const variantStyles = {
    glass: cn(
      "bg-obsidian-900/85 backdrop-blur-2xl",
      "border border-white/15",
      "shadow-2xl shadow-black/80"
    ),
    solid: cn(
      "bg-obsidian-900",
      "border border-white/10"
    ),
    transparent: "bg-transparent border-0 shadow-none",
  };

  const positionStyles = {
    bottom: "flex-row",
    top: "flex-row",
    left: "flex-col",
    right: "flex-col",
  };

  const shouldShow = isVisible && !isHidden;

  return (
    <div className="fixed bottom-5 left-0 right-0 z-40 flex flex-col items-center justify-center pointer-events-none px-4">
      {/* Subtle bottom peek indicator when dock is hidden */}
      <AnimatePresence>
        {!shouldShow && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="w-20 h-1 rounded-full bg-white/30 hover:bg-white/50 mb-1 pointer-events-auto cursor-pointer transition-colors"
            onClick={() => setIsVisible(true)}
            title="Hover or click to show Dock"
          />
        )}
      </AnimatePresence>

      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={cn(
          "pointer-events-auto inline-flex items-end gap-2 p-2.5 rounded-3xl",
          variantStyles[variant],
          positionStyles[position],
          className
        )}
        initial={{ opacity: 0, y: 40 }}
        animate={{
          opacity: shouldShow ? 1 : 0,
          y: shouldShow ? 0 : 45,
          scale: shouldShow ? 1 : 0.95,
          pointerEvents: shouldShow ? "auto" : "none",
        }}
        transition={{
          duration: 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        {items.map((item) => (
          <DockItem
            key={item.id}
            item={item}
            mouseX={mousePosition}
            iconSize={iconSize}
            maxScale={maxScale}
            magneticDistance={magneticDistance}
            showLabels={showLabels}
            isVertical={isVertical}
          />
        ))}
      </motion.div>
    </div>
  );
}
