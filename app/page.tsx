import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HomeSections } from "@/components/home/HomeSections";

export const metadata: Metadata = {
  title: "Silong — Find shelter. Feel at home.",
  description: "Find comfortable boarding houses, rooms, and bedspaces for students and working professionals in Taguig City.",
  openGraph: { title: "Silong — Find shelter. Feel at home.", description: "A simpler way to find your next place in Taguig City." },
};

export default function Home() {
  return <><Header /><main><HomeSections /></main><Footer /></>;
}
