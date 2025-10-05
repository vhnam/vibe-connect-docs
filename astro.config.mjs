// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import starlight from "@astrojs/starlight";
import starlightThemeNova from "starlight-theme-nova";

export default defineConfig({
  site: "http://localhost:4321",
  redirects: {
    "/": {
      status: 302,
      destination: "/en",
    },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: {
          en: "en",
          vi: "vi",
        },
      },
    }),
    starlight({
      plugins: [starlightThemeNova()],
      title: "Vibe Connect",
      defaultLocale: "en",
      logo: {
        src: "./src/assets/logo.webp",
        alt: "Logo",
      },
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
          href: "https://github.com/vhnam/vibe-connect-docs",
        },
      ],
      sidebar: [
        {
          label: "Overview",
          items: [
            {
              label: "Description",
              slug: "description",
              translations: { vi: "Mô tả" },
            },
          ],
          translations: { vi: "Tổng quan" },
        },
        {
          label: "Market Analysis",
          items: [
            {
              label: "Target Market",
              slug: "target-market",
              translations: { vi: "Thị trường mục tiêu" },
            },
            {
              label: "Segmentation",
              slug: "segmentation",
              translations: { vi: "Phân khúc thị trường" },
            },
          ],
          translations: { vi: "Phân tích thị trường" },
        },
        {
          label: "User Research",
          items: [
            {
              label: "Target Customers",
              slug: "target-customers",
              translations: { vi: "Khách hàng mục tiêu" },
            },
            {
              label: "User Personas",
              slug: "user-personas",
              translations: { vi: "Chân dung người dùng" },
            },
            {
              label: "User Needs",
              slug: "user-needs",
              translations: { vi: "Nhu cầu người dùng" },
            },
            {
              label: "Pain Points",
              slug: "pain-points",
              translations: { vi: "Vấn đề gặp phải" },
            },
          ],
          translations: { vi: "Nghiên cứu người dùng" },
        },
        {
          label: "Strategy",
          items: [
            {
              label: "Product-Market Fit",
              slug: "product-market-fit",
              translations: { vi: "Phù hợp sản phẩm - thị trường" },
            },
            {
              label: "Value Proposition",
              slug: "value-proposition",
              translations: { vi: "Giá trị mang lại" },
            },
            {
              label: "Use Cases",
              slug: "use-cases",
              translations: { vi: "Tình huống sử dụng" },
            },
          ],
          translations: { vi: "Chiến lược" },
        },
      ],
    }),
  ],
});
