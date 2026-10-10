"use client";
import {
  BookOpen, Briefcase, Car, Cpu, Heart, Home, Palette, ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const MAP: Record<string, LucideIcon> = {
  home: Home, cpu: Cpu, book: BookOpen, briefcase: Briefcase,
  palette: Palette, car: Car, heart: Heart, shield: ShieldCheck,
};

export function CategoryIcon({ icon, size = 20 }: { icon: string; size?: number }) {
  const Cmp = MAP[icon] ?? Briefcase;
  return <Cmp size={size} strokeWidth={1.8} />;
}
