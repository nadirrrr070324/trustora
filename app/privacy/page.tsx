import { Doc, P } from "../legal-doc";

export default function PrivacyPage() {
  return (
    <Doc title="Privacy Policy" kicker="Legal">
      <P>TRUSTORA collects the minimum data needed to run transparent rankings: account details, enquiries you send, reviews you write, and provider business information. Demo builds store this in your browser only.</P>
      <P>In production (Supabase), personal data is protected by row-level security: customers see only their own enquiries and drafts; providers see enquiries addressed to them; admins access moderation queues under audit logging. We never sell personal data.</P>
      <P>You may request export or deletion of your account data at any time via the Help Center. Review content that has been published may be retained in anonymised form for ranking integrity.</P>
      <P>Analytics are aggregated and never used to alter individual trust scores.</P>
    </Doc>
  );
}
