import { Doc, P } from "../legal-doc";

export default function TermsPage() {
  return (
    <Doc title="Terms of Service" kicker="Legal">
      <P>TRUSTORA provides provider discovery, transparent rankings, and review infrastructure. Scores are computed from available evidence and represent our good-faith assessment — not a guarantee of any provider's future work.</P>
      <P>Customers agree to write honest, first-hand reviews. Providers agree not to post fake reviews, incentivise ratings without disclosure, or attempt to manipulate scoring inputs. Violations lead to review removal, verification revocation, or account suspension.</P>
      <P>Subscriptions and sponsored placements never affect organic rankings. All paid promotion is labelled.</P>
      <P>This demo build uses synthetic data; nothing here constitutes real-world verification of any business.</P>
    </Doc>
  );
}
