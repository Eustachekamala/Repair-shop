"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ButtonHTMLAttributes } from "react";

type Props = {
  title: string;
  className?: string;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function BackButton({ title, variant, className }: Props) {
  const router = useRouter();

  return (
    <Button
      variant={variant}
      className={className}
      onClick={() => router.back()}
      title={title}
    >
      {title}
    </Button>
  );
}
