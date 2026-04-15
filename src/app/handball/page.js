import CategoryShowcase from "../components/CategoryShowcase";

export const metadata = {
  title: "Handball - Evan Sports",
  description: "Premium handball collection for training and leagues.",
};

export default function HandballPage() {
  return (
    <CategoryShowcase
      title="Handball Equipment"
      subtitle="Performance-focused handball collection with strong grip, balanced weight, and all-court reliability."
      icon="🤾"
      points={[
        "Official size balls for teams and academies",
        "Training cones and tactical accessories",
        "Durable products for indoor practice",
        "Fast fulfillment for clubs and schools",
      ]}
      ctaHref="/contact"
      ctaText="Request Handball Inventory"
    />
  );
}