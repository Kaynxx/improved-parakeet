import type { AssetType } from "@/types";

const TR = "tr-TR";

/** 12.400 → "12,4B" · 3.200.000 → "3,2Mn" — dar kolonlarda taşmayı önler. */
export function formatCompact(value: number): string {
  const abs = Math.abs(value);
  if (abs >= 1_000_000_000) return `${round(value / 1_000_000_000)}Mr`;
  if (abs >= 1_000_000) return `${round(value / 1_000_000)}Mn`;
  if (abs >= 1_000) return `${round(value / 1_000)}B`;
  return new Intl.NumberFormat(TR, { maximumFractionDigits: 2 }).format(value);
}

function round(value: number): string {
  return new Intl.NumberFormat(TR, { maximumFractionDigits: 1 }).format(value);
}

/**
 * Fiyat: binlik ayraçlı. Basamak sayısı varlık sınıfına göre değişir — parite
 * iki basamağa yuvarlanınca 1,0842 "1,08"e, günlük değişim de "−0,00"a düşüyor,
 * yani bilgi tamamen kayboluyor.
 */
export function formatPrice(value: number, digits = 2): string {
  return new Intl.NumberFormat(TR, {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

/** Varlık sınıfının anlamlı basamak sayısı. */
export function priceDigits(assetType: AssetType): number {
  return assetType === "fx" ? 4 : 2;
}

/** Yön işareti her zaman görünür — renk tek başına anlam taşımaz. */
export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}%${new Intl.NumberFormat(TR, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value))}`;
}

export function formatSigned(value: number, digits = 2): string {
  const sign = value > 0 ? "+" : value < 0 ? "−" : "";
  return `${sign}${formatPrice(Math.abs(value), digits)}`;
}

export type Direction = "up" | "down" | "flat";

export function directionOf(value: number): Direction {
  if (value > 0) return "up";
  if (value < 0) return "down";
  return "flat";
}

const MINUTE = 60;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** "3 dk önce" · "5 sa önce" · "2 gün önce" */
export function timeAgo(iso: string, now: Date = new Date()): string {
  const seconds = Math.floor((now.getTime() - new Date(iso).getTime()) / 1000);
  if (seconds < MINUTE) return "az önce";
  if (seconds < HOUR) return `${Math.floor(seconds / MINUTE)} dk önce`;
  if (seconds < DAY) return `${Math.floor(seconds / HOUR)} sa önce`;
  const days = Math.floor(seconds / DAY);
  if (days < 7) return `${days} gün önce`;
  return new Intl.DateTimeFormat(TR, { day: "numeric", month: "short" }).format(new Date(iso));
}

export function formatDuration(seconds: number): string {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${String(rest).padStart(2, "0")}`;
}
