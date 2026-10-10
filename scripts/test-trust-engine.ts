import { computeTrustScore, rankProviders } from "../lib/trust-engine";
import { PROVIDERS } from "../lib/data";

// Minimal assertions for the trust-score engine (run: npm run test:trust).
function assert(cond: boolean, msg: string) {
  if (!cond) {
    console.error(`FAIL: ${msg}`);
    process.exitCode = 1;
  } else {
    console.log(`ok: ${msg}`);
  }
}

const ranked = rankProviders(PROVIDERS);
assert(ranked.length === PROVIDERS.length, "all providers ranked (incl. unranked tail)");

const harbor = PROVIDERS.find((p) => p.id === "harbor-plumbing")!;
const harborScore = computeTrustScore(harbor);
assert(harborScore.score !== null && harborScore.score >= 80, `harbor has strong score (${harborScore.score})`);
assert(harborScore.verifiedCount >= 3, "harbor has verified evidence");

const greenline = PROVIDERS.find((p) => p.id === "greenline-landscaping")!;
const greenScore = computeTrustScore(greenline);
assert(greenScore.score === null, "greenline (< 3 reviews) shows no score");
assert(greenScore.confidence === "Insufficient", "greenline confidence is Insufficient");

const top = ranked[0];
assert(top.result.score !== null, "rank #1 has a score");

const sponsored = PROVIDERS.filter((p) => p.sponsored);
assert(sponsored.length > 0, "sponsored demo providers exist");
for (const s of sponsored) {
  const withFlag = computeTrustScore(s).score;
  const withoutFlag = computeTrustScore({ ...s, sponsored: false }).score;
  assert(withFlag === withoutFlag, `sponsored flag does not change score for ${s.id} (${withFlag})`);
}
console.log("trust-engine tests complete");
