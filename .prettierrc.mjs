// .prettierrc.mjs
/** @type {import("prettier").Config} */
export default {
  plugins: ["prettier-plugin-astro", "prettier-plugin-svelte"],
  overrides: [
    {
      files: ["*.astro", "*.svelte"],
      options: {
        parser: "astro",
      },
    },
  ],
};
