import { notFound } from "next/navigation";
import { getProvider } from "@/lib/data";
import { ProfileBody } from "./profile";

export function generateStaticParams() {
  return [
    { id: "harbor-plumbing" }, { id: "northbeam-it" },
    { id: "brightpath-tutoring" }, { id: "ledgerline-accounting" },
    { id: "studio-meridian" }, { id: "apex-auto-care" },
    { id: "forma-fitness" }, { id: "cornerstone-legal" },
    { id: "greenline-landscaping" }, { id: "cleanfix-services" },
    { id: "pixelforge-studio" }, { id: "keystone-realestate" },
    { id: "clearsmile-dental" },
  ];
}

export default function ProviderPage({ params }: { params: { id: string } }) {
  const provider = getProvider(params.id);
  if (!provider) notFound();
  return <ProfileBody base={provider} />;
}
