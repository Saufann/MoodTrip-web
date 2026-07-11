import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Profil & Tag",
  description: "Atur tag minat, temperamen Galen, dan MBTI-mu.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
