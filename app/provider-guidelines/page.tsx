import { Doc, P } from "../legal-doc";

export default function GuidelinesPage() {
  return (
    <Doc title="Provider Guidelines" kicker="For providers">
      <P><strong className="text-white">1. Be verifiable.</strong> Keep licenses, insurance and business registration current. Verification badges are revoked when documents lapse.</P>
      <P><strong className="text-white">2. Never fake feedback.</strong> No self-reviews, no paid reviews without disclosure, no review gating (soliciting only happy customers). Detection leads to score quarantine and public flagging.</P>
      <P><strong className="text-white">3. Respond, don't retaliate.</strong> Public review responses must stay professional. Harassment of reviewers results in suspension.</P>
      <P><strong className="text-white">4. Price honestly.</strong> Estimates shown on TRUSTORA must match invoicing within a reasonable tolerance; systematic overruns damage your value dimension.</P>
      <P><strong className="text-white">5. Resolve complaints.</strong> Engage with disputes promptly — resolution behaviour is 10% of your trust score, and ignored complaints compound.</P>
      <P><strong className="text-white">6. Sponsorship is labelled.</strong> Paid promotion is welcome and always disclosed; it never buys rank.</P>
    </Doc>
  );
}
