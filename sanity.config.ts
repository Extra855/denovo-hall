import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { post } from "./src/sanity/schemas/post";
import { category } from "./src/sanity/schemas/category";
import { tag } from "./src/sanity/schemas/tag";
import { author } from "./src/sanity/schemas/author";

export default defineConfig({
  name: "denovo-blog",
  title: "De Novo Blog",
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  basePath: "/admin",
  plugins: [structureTool()],
  schema: {
    types: [post, category, tag, author],
  },
});
