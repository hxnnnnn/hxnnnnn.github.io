import fs from 'node:fs'
import path from 'node:path'
import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

interface RouteMeta {
  routePath: string
  lang: string
  title: string
  description: string
  url: string
}

const ROUTE_METAS: RouteMeta[] = [
  {
    routePath: 'en',
    lang: 'en',
    title: 'Xiaoning Huang · 3D Vision & Graphics',
    description:
      'Xiaoning Huang — 3D Computer Vision & Graphics researcher focusing on NeRF/3DGS and high-fidelity digital avatars.',
    url: 'https://hxnnnnn.github.io/en',
  },
  {
    routePath: 'ai-gen',
    lang: 'zh-CN',
    title: '黄晓宁 · AI 生成算法与 3D 视觉',
    description:
      '黄晓宁 — 聚焦生图大模型微调、程序化三维物理渲染合成与 3D 数字人重建。',
    url: 'https://hxnnnnn.github.io/ai-gen',
  },
  {
    routePath: 'ai-gen/en',
    lang: 'en',
    title: 'Xiaoning Huang · Generative AI & 3D Vision',
    description:
      'Xiaoning Huang — Generative foundation model fine-tuning, procedural 3D physical synthesis, and 3D head reconstruction.',
    url: 'https://hxnnnnn.github.io/ai-gen/en',
  },
  {
    routePath: 'aigc-data',
    lang: 'zh-CN',
    title: '黄晓宁 · AIGC 数据算法与 3D 视觉',
    description:
      '黄晓宁 — 聚焦数据驱动的生成式智能、三维反事实合成数据、多模态投票打标与跨阶段配比。',
    url: 'https://hxnnnnn.github.io/aigc-data',
  },
  {
    routePath: 'aigc-data/en',
    lang: 'en',
    title: 'Xiaoning Huang · AIGC Data Algorithm & 3D Vision',
    description:
      'Xiaoning Huang — Counterfactual 3D synthetic data, dual-model voting labeling, and cross-stage curriculum for generative AI.',
    url: 'https://hxnnnnn.github.io/aigc-data/en',
  },
  {
    routePath: 'embodied',
    lang: 'zh-CN',
    title: '黄晓宁 · 具身智能数据工程与三维视觉',
    description:
      '黄晓宁 — 聚焦程序化三维物理仿真、空间几何门控质检、双擎渲染管线与机械臂多模态采集。',
    url: 'https://hxnnnnn.github.io/embodied',
  },
  {
    routePath: 'embodied/en',
    lang: 'en',
    title: 'Xiaoning Huang · Embodied AI Data Engineering & 3D Vision',
    description:
      'Xiaoning Huang — Procedural 3D physical simulation, spatial-geometric gating, dual-engine rendering, and robotic multimodal data.',
    url: 'https://hxnnnnn.github.io/embodied/en',
  },
  {
    routePath: 'data-dev',
    lang: 'zh-CN',
    title: '黄晓宁 · 多模态数据开发与三维数据工程',
    description:
      '黄晓宁 — 聚焦大模型多模态数据基础设施、千卡异步流水线调优、分布式批处理算子与多源数据采集平台。',
    url: 'https://hxnnnnn.github.io/data-dev',
  },
  {
    routePath: 'data-dev/en',
    lang: 'en',
    title:
      'Xiaoning Huang · Multimodal Data Infrastructure & 3D Data Engineering',
    description:
      'Xiaoning Huang — Multimodal data infrastructure, 1,000-GPU async pipeline optimization, distributed batch operators, and sensor platforms.',
    url: 'https://hxnnnnn.github.io/data-dev/en',
  },
]

function multiVariantPagesPlugin(): Plugin {
  return {
    name: 'multi-variant-pages',
    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist')
      const indexHtmlPath = path.join(distDir, 'index.html')
      if (!fs.existsSync(indexHtmlPath)) return

      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8')
      fs.writeFileSync(path.join(distDir, '404.html'), baseHtml, 'utf-8')

      for (const meta of ROUTE_METAS) {
        const html = baseHtml
          .replace(/<html lang="[^"]*">/, `<html lang="${meta.lang}">`)
          .replace(/<title>[\s\S]*?<\/title>/, `<title>${meta.title}</title>`)
          .replace(
            /<meta property="og:title" content="[^"]*" \/>/,
            `<meta property="og:title" content="${meta.title}" />`,
          )
          .replace(
            /<meta\s+name="description"\s+content="[^"]*"\s*\/>/,
            `<meta name="description" content="${meta.description}" />`,
          )
          .replace(
            /<meta\s+property="og:description"\s+content="[^"]*"\s*\/>/,
            `<meta property="og:description" content="${meta.description}" />`,
          )
          .replace(
            /<meta property="og:url" content="[^"]*" \/>/,
            `<meta property="og:url" content="${meta.url}" />`,
          )

        const targetDir = path.join(distDir, meta.routePath)
        fs.mkdirSync(targetDir, { recursive: true })
        fs.writeFileSync(path.join(targetDir, 'index.html'), html, 'utf-8')
      }
    },
  }
}

// GitHub Pages: set VITE_BASE_PATH=/repo-name/ for project pages, or / for username.github.io
export default defineConfig({
  base: process.env.VITE_BASE_PATH ?? '/',
  plugins: [react(), tailwindcss(), multiVariantPagesPlugin()],
})
