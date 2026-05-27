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

### 首次上线（必做，只需一次）

若 Actions 报错 `Failed to create deployment (status: 404)`，说明 **Pages 还没开**。按下面做：

**第一步：等 Actions 跑绿**  
打开 [Actions](https://github.com/hxnnnnn/hxnnnnn.github.io/actions)，等 `Deploy to GitHub Pages` 成功（会生成 `gh-pages` 分支）。

**第二步：开启 Pages**  
1. 打开 [Settings → Pages](https://github.com/hxnnnnn/hxnnnnn.github.io/settings/pages)
2. **Build and deployment → Source** 选 **`Deploy from a branch`**
3. **Branch** 选 **`gh-pages`**，文件夹选 **`/ (root)`**
4. 点 **Save**

**第三步：访问**  
等 1–2 分钟，打开 https://hxnnnnn.github.io

> 注意：不要选 `GitHub Actions` 作为 Source（当前 workflow 用的是 `gh-pages` 分支方案）。

### 日常更新

```bash
git add .
git commit -m "update content"
git push
```

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
