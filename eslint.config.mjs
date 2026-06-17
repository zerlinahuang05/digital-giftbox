import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

const eslintConfig = defineConfig([
  ...nextVitals,
  {
    rules: {
      // We intentionally use plain <img> tags to keep things simple for
      // beginners (no next/image setup needed for these small PNGs).
      "@next/next/no-img-element": "off",
      // We read browser-only values (localStorage, window.location) inside
      // effects after the page mounts. That is the correct, intended use of
      // an effect here, so we relax this strict React-Compiler rule.
      "react-hooks/set-state-in-effect": "off",
    },
  },
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
