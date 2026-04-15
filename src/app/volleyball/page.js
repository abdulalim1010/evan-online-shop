import CategoryShowcase from "../components/CategoryShowcase";

export const metadata = {
  title: "Volleyball - Evan Sports",
  description: "Shop training and competition volleyball gear.",
};

export default function VolleyballPage() {
  return (
    <CategoryShowcase
      title="Volleyball Essentials"
      subtitle="From indoor pro match balls to outdoor practice collections, choose quality built for control and durability."
      icon="🏐"
      points={[
        "Indoor and beach volleyball options",
        "Knee pads and grip-enhancing accessories",
        "Club-friendly bulk order support",
        "Products selected for long-term performance",
      ]}
      ctaHref="/contact"
      ctaText="Get Volleyball Deals"
    />
  );
}