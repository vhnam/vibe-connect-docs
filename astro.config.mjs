// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "Vibe Connect",
      defaultLocale: "en",
      locales: {
        en: {
          label: "English",
          lang: "en",
        },
        vi: {
          label: "Tiếng Việt",
          lang: "vi",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/withastro/starlight",
        },
      ],
      sidebar: [
        {
          label: "Product Overview",
          items: [{ label: "Description", slug: "description" }],
        },
        {
          label: "Market Analysis",
          items: [
            { label: "Target Market", slug: "target-market" },
            { label: "Segmentation", slug: "segmentation" },
          ],
        },
        {
          label: "User Research",
          items: [
            { label: "Target Customers", slug: "target-customers" },
            { label: "User Personas", slug: "user-personas" },
            { label: "User Needs", slug: "user-needs" },
            { label: "Pain Points", slug: "pain-points" },
          ],
        },
        {
          label: "Product Strategy",
          items: [
            { label: "Product-Market Fit", slug: "product-market-fit" },
            { label: "Value Proposition", slug: "value-proposition" },
            { label: "Use Cases", slug: "use-cases" },
          ],
        },
      ],
    }),
  ],
});
