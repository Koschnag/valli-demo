"use client";

import { motion, useMotionValue, useTransform } from "motion/react";
import Image from "next/image";
import type { MoodCard as MoodCardType, SwipeDirection } from "@/types/mood";

interface MoodCardProps {
  card: MoodCardType;
  onSwipe: (direction: SwipeDirection) => void;
  isTop: boolean;
}

export default function MoodCard({ card, onSwipe, isTop }: MoodCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-15, 15]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.5, 1, 1, 1, 0.5]);

  // Swipe indicators
  const likeOpacity = useTransform(x, [0, 100], [0, 1]);
  const nopeOpacity = useTransform(x, [-100, 0], [1, 0]);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } }
  ) => {
    const threshold = 100;
    const velocityThreshold = 500;

    if (
      info.offset.x > threshold ||
      info.velocity.x > velocityThreshold
    ) {
      onSwipe("right");
    } else if (
      info.offset.x < -threshold ||
      info.velocity.x < -velocityThreshold
    ) {
      onSwipe("left");
    }
  };

  return (
    <motion.div
      className="absolute inset-0 cursor-grab active:cursor-grabbing"
      style={{
        x: isTop ? x : 0,
        rotate: isTop ? rotate : 0,
        opacity: isTop ? opacity : 1,
        zIndex: isTop ? 10 : 0,
      }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      onDragEnd={isTop ? handleDragEnd : undefined}
      initial={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      animate={{ scale: isTop ? 1 : 0.95, y: isTop ? 0 : 10 }}
      exit={{
        x: x.get() > 0 ? 300 : -300,
        opacity: 0,
        transition: { duration: 0.3 },
      }}
    >
      <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
        {/* Background Image */}
        <Image
          src={card.image}
          alt={card.title}
          fill
          className="object-cover"
          priority
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Swipe indicators */}
        {isTop && (
          <>
            <motion.div
              style={{ opacity: likeOpacity }}
              className="absolute top-8 left-8 z-20 px-6 py-3 border-4 border-[var(--color-accent-500)] rounded-xl rotate-[-12deg]"
            >
              <span className="text-3xl font-black text-[var(--color-accent-500)]">
                JA!
              </span>
            </motion.div>
            <motion.div
              style={{ opacity: nopeOpacity }}
              className="absolute top-8 right-8 z-20 px-6 py-3 border-4 border-[var(--color-error)] rounded-xl rotate-[12deg]"
            >
              <span className="text-3xl font-black text-[var(--color-error)]">
                NOPE
              </span>
            </motion.div>
          </>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="text-5xl mb-3">{card.emoji}</div>
          <h3 className="text-3xl font-bold text-white mb-2">{card.title}</h3>
          <p className="text-lg text-white/80 leading-relaxed">
            {card.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
