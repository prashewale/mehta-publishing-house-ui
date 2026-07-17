import { SaleOfferSlider } from "./SaleOfferSlider";

interface Props {
  /** Compact layout for 1/3 column; skips outer container */
  embedded?: boolean;
}

export function SaleOfferWithFeaturedVideo({ embedded = false }: Props) {
  if (embedded) {
    return <SaleOfferSlider compact />;
  }

  return (
    <section className="container mx-auto px-4 py-4">
      <SaleOfferSlider />
    </section>
  );
}
