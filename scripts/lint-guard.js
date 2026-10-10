// Cross-platform lint guard: runs `next lint` when an ESLint config exists,
// otherwise exits 0 with a note so cloud builds (Vercel/Render) never fail.
const { execSync } = require("node:child_process");
const { existsSync } = require("node:fs");
const { join } = require("node:path");

const root = join(__dirname, "..");
const hasConfig = [
  ".eslintrc.js",
  ".eslintrc.cjs",
  ".eslintrc.json",
  ".eslintrc.yaml",
  ".eslintrc.yml",
  "eslint.config.js",
  "eslint.config.mjs",
  "eslint.config.cjs",
].some((f) => existsSync(join(root, f)));

if (!hasConfig) {
  console.log("lint skipped (no eslint config)");
  process.exit(0);
}
try {
  execSync("npx next lint --no-cache", { stdio: "inherit", cwd: root });
} catch {
  process.exit(1);
}
