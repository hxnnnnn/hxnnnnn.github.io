# 黄晓宁 · 个人网站

以「稀疏视角 → 高保真 3D 化身」为叙事隐喻的 3D 互动个人主页，托管于 GitHub Pages。

## 本地开发

```bash
cd personal-site
npm install
npm run dev
```

浏览器打开 http://localhost:5173

## 构建

```bash
npm run build
npm run preview
```

## 部署到 GitHub Pages

目标仓库：**[hxnnnnn/hxnnnnn.github.io](https://github.com/hxnnnnn/hxnnnnn.github.io)**  
上线地址：**https://hxnnnnn.github.io**

1. 在 GitHub 创建仓库 `hxnnnnn.github.io`（必须与此用户名完全匹配）
2. 推送本目录代码到 `main` 分支
3. 仓库 Settings → Pages → Source 选择 **GitHub Actions**
4. push 后 Actions 会自动构建并部署

`VITE_BASE_PATH` 已设为 `/`，适用于 `username.github.io` 根域名。

## 更新内容

所有简历文字集中在 [`src/data/profile.ts`](src/data/profile.ts)，修改后重新 build 即可。

PDF 简历放在 [`public/resume.pdf`](public/resume.pdf)。

## 技术栈

- Vite + React + TypeScript
- React Three Fiber + Three.js（3D Gaussian 粒子 Hero）
- Tailwind CSS v4
- Framer Motion
- GitHub Actions → GitHub Pages

## 交互说明

- **桌面端**：拖拽 3D 场景旋转多视角，向下滚动驱动粒子聚合为头部轮廓
- **移动端**：自动降级为 SVG 粒子动画，保证流畅
- **彩蛋**：输入 Konami Code（↑↑↓↓←→←→BA）触发「重建完成」
