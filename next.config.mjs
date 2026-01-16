import createMDX from "@next/mdx"

import path from "path"

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  // Optionally, add any other Next.js config below

  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
    })

    config.module.rules.push({
      test: /\.mdx$/,
      use: "raw-loader",
    })
    config.resolve.fallback = {
      fs: false,
      path: false,
    }

    // Fix for @dagrejs/dagre requiring @dagrejs/graphlib
    config.resolve.alias = {
      ...config.resolve.alias,
    }

    return config
  },
}

const withMDX = createMDX({
  extension: /\.(md|mdx)$/,
  options: {
    remarkPlugins: [["remark-gfm", { strict: true, throwOnError: true }]],
    rehypePlugins: [],
  },
})

// Merge MDX config with Next.js config
export default withMDX(nextConfig)
