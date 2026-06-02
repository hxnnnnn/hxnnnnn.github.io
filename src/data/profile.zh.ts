import type { ProfileData, SiteBundle, UiStrings } from '../i18n/types'

const profile: ProfileData = {
  name: '黄晓宁',
  heroName: 'XiaoningHuang',
  identities: ['CUHK-DS MSc Student', 'ByteDance Seed Intern'] as const,
  contact: {
    email: '225040002@link.cuhk.edu.cn',
    location: 'Base · 深圳',
    github: 'https://github.com/hxnnnnn',
    site: 'https://hxnnnnn.github.io',
    scholar: '',
  },
  publicationsSummary:
    '专注于3D和2D计算机视觉领域，包括但不限于重建、检测、分割任务。',
  education: [
    {
      school: '香港中文大学（深圳）',
      meta: [
        '数据科学学院',
        '数据科学专业',
        '英文授课硕士',
        'GPA 3.3（满分4.0）',
      ],
      period: '2025.09 — 至今',
      research:
        '在韩晓光教授指导下从事以人为本的三维计算机视觉与图形学研究，围绕单目图像学习可分解、可泛化的全头部三维表征，并探索与生成式模型的结合；研究重点为神经辐射场与三维高斯溅射驱动的高保真头部重建与实时驱动，目标是在有限算力与数据成本下，为广泛人群提供稳定、实时且表情可控的三维虚拟形象生成能力。',
      courses: [
        '人工智能',
        '数据挖掘',
        '机器学习',
        '自然语言处理',
        '图像处理与计算机视觉',
      ],
    },
    {
      school: '华南师范大学',
      meta: [
        '数据科学与工程学院',
        '数据科学与大数据技术',
        '工学学士',
        'GPA 3.8（满分5.0）',
      ],
      period: '2021.09 — 2025.06',
      research:
        '本科阶段聚焦计算机视觉与智能感知，围绕目标检测、语义与实例分割、边缘云协同推理及农业、交通、课堂等场景开展算法研究与系统落地；重点探索轻量化检测架构、多尺度特征融合与小目标鲁棒感知，力求平衡模型效率、精度与部署成本，并服务无人机巡检、害虫监测、路面病害与课堂情感分析等应用。',
      courses: [
        '数据挖掘导论（100）',
        '分布式数据结构（99）',
        '人工智能（99）',
        '深度学习算法（99）',
        '数据挖掘与机器学习（97）',
        '大数据分析技术（96）',
        '数学基础实验（95）',
        '数据科学导论（95）',
        '统计计算（95）',
        '并行与分布式计算（94）',
      ],
    },
  ],
  publications: [
    {
      title:
        'InfiHead: Learning a Feedforward Disentangled 3D Full-Head Model from Scalable Monocular 2D Data',
      venue: 'SIGGRAPH Asia 2026',
      venueMeta: 'CCF-A 会议',
      status: 'submitted',
      role: '第二作者',
      tags: [
        '3D Reconstruction',
        'Neural Radiance Fields',
        'Full-Head Avatar',
        'Monocular Learning',
        'Disentangled Representation',
      ],
      abstract:
        'While 3D Gaussian Splatting enables real-time rendering, generative head models still rely on rigid geometric priors and lack diverse multi-view training data. We propose InfiHead, a scalable framework for disentangled 3D Gaussian full heads from monocular 2D video, with an automated multi-view dataset pipeline, template-free feedforward reconstruction, and adversarial training for consistent 360° textures. Experiments show improved visual quality and structural accuracy over state-of-the-art methods.',
    },
    {
      title:
        'DAS: Deployable Dynamic Adaptation System for Pest Detection via Edge-Cloud Collaboration',
      venue: 'IEEE Transactions on Instrumentation and Measurement',
      venueMeta: 'SCI 二区 · IF 5.90',
      status: 'submitted',
      role: '学生第一作者',
      tags: [
        'Edge-Cloud Collaboration',
        'Pest Detection',
        'Dynamic Adaptation',
        'Object Detection',
        'Agricultural Vision',
      ],
      abstract:
        'Traditional agricultural pest control in IoT settings faces limits in accuracy, efficiency, and scalability. We propose DAS, integrating single-stage detection with edge-cloud collaboration, and introduce Dynamic Multi-scale Fusion (DMF) and Hybrid Local-Global Attention (HLGA) to adapt across scales and scenes. Validated on 17,725 high-resolution images and multiple benchmarks, DAS improves mAP by 7.8%–15.7% over baselines, supporting deployable field use.',
    },
    {
      title:
        'MS-FDD: A Lightweight Multi-Scale Module for Fatigue Driving Detection',
      venue: 'ACM Transactions on Intelligent Systems and Technology',
      venueMeta: 'SCI 一区 · IF 7.20',
      status: 'submitted',
      role: '第二作者',
      tags: [
        'Fatigue Driving Detection',
        'Multi-Scale Features',
        'Lightweight Architecture',
        'Driver Monitoring',
        'Real-Time Inference',
      ],
      abstract:
        'Fatigue cues can be subtle and temporal, while edge devices impose strict latency and power limits. We present MS-FDD, combining FE-MSC strip-kernel multi-scale modeling, LAPF cross-scale fusion, and SCCH for efficient compression, with sliding-window aggregation of eye and mouth cues for robust risk inference. Multi-dataset evaluation and Jetson AGX Orin benchmarks demonstrate feasible real-time edge deployment.',
    },
    {
      title:
        'LEPS: A lightweight and effective single-stage detector for pothole segmentation',
      venue: 'IEEE Sensors Journal',
      venueMeta: 'SCI 二区 · IF 4.30',
      status: 'published',
      publishedYear: 2023,
      role: '第一作者',
      tags: [
        'Pothole Segmentation',
        'Single-Stage Detector',
        'Road Damage',
        'Semantic Segmentation',
        'Lightweight Model',
      ],
      abstract:
        'Urban road potholes are increasingly severe, making timely detection a key challenge for maintenance. We propose LEPS, a lightweight single-stage instance segmentation detector that efficiently extracts edge and gradient cues via dedicated convolutional modules, delivering accurate pothole segmentation suitable for real-time monitoring.',
      url: 'https://doi.org/10.1109/JSEN.2023.3330335',
    },
    {
      title:
        'Real-time Underwater Visual Target Sensing System with Multitasking via Edge-Cloud Collaboration',
      venue: 'IEEE Journal of Oceanic Engineering',
      venueMeta: 'SCI 二区 · IF 3.80',
      status: 'published',
      publishedYear: 2026,
      role: '第二作者',
      tags: [
        'Underwater Vision',
        'Edge-Cloud Collaboration',
        'Multitask Learning',
        'Real-Time Sensing',
        'Target Detection',
      ],
      abstract:
        'Underwater images often suffer from fogging, color distortion, and edge degradation, limiting general object detectors. We propose UVTS, an underwater visual target sensing system with multitasking and edge-cloud collaboration to improve robustness and real-time throughput for marine monitoring under degraded imaging conditions.',
      url: 'https://doi.org/10.1109/JOE.2026.3678825',
    },
    {
      title:
        'Yolo-Pest: An Insect Pest Object Detection Algorithm via CAC3 Module',
      venue: 'Sensors',
      venueMeta: 'SCI 三区 · IF 3.90',
      status: 'published',
      publishedYear: 2023,
      role: '第二作者',
      tags: [
        'Insect Pest Detection',
        'Agricultural Vision',
        'Multi-Scale Features',
        'Field Monitoring',
        'Attention Mechanism',
      ],
      abstract:
        'Insect pests threaten crop yield and quality, yet small-pest detection lacks sufficient samples and tailored models. We propose Yolo-Pest with a CAC3 module for lightweight, effective small-target pest detection, improving feature extraction and performance on agricultural pest benchmarks.',
      url: 'https://doi.org/10.3390/s23063221',
    },
    {
      title:
        'Mini-SCXception: Balancing Accuracy and Efficiency in Real-Time Facial Expression Recognition',
      venue: 'AIIIP 2024',
      venueMeta: '国际会议',
      status: 'published',
      publishedYear: 2024,
      role: '第二作者',
      tags: [
        'Facial Expression Recognition',
        'Lightweight CNN',
        'Real-Time Inference',
        'Edge Computing',
        'Emotion Analysis',
      ],
      abstract:
        'Facial expression recognition models are often too large for resource-constrained devices. We propose an improved Mini-SCXception based on Mini-Xception, integrating SCConv to reduce redundant computation while preserving efficiency and strengthening feature extraction for real-time FER.',
      url: 'https://doi.org/10.1145/3707292.3707342',
    },
    {
      title:
        'A Robust Robot System via Multi-sensor Fusion Localization and Optimized Path Planning',
      venue: 'ICRAE 2023',
      venueMeta: 'IEEE 国际会议',
      status: 'published',
      publishedYear: 2023,
      role: '第二作者',
      tags: [
        'Mobile Robotics',
        'Sensor Fusion',
        'Path Planning',
        'SLAM',
        'Multi-Sensor Localization',
      ],
      abstract:
        'Reliable indoor navigation requires stable localization and efficient motion planning under sensor noise. This work presents a robust mobile robot system that fuses multi-sensor localization with optimized path planning to improve positioning accuracy and task execution in structured environments.',
      url: 'https://ieeexplore.ieee.org/document/10458454/',
    },
    {
      title:
        'Discussion on the effect of classroom concept learning based on BERT text classification',
      venue: 'ICICSP 2022',
      venueMeta: 'IEEE 国际会议',
      status: 'published',
      publishedYear: 2022,
      role: '学生第一作者',
      tags: [
        'BERT',
        'Text Classification',
        'Concept Learning',
        'Educational Mining',
        'Classroom Analytics',
      ],
      abstract:
        'Students gradually form concept systems through classroom learning, and discourse analysis helps teachers assess conceptual mastery. We introduce a BERT-based text classification pipeline to evaluate students’ concept-learning levels from classroom content and support instructional evaluation.',
      url: 'https://doi.org/10.1109/ICICSP55539.2022.10050570',
    },
    {
      title: '基于改进 YOLOv5 的农业害虫检测',
      venue: '华南师范大学学报（自然科学版）',
      venueMeta: '北大核心',
      status: 'published',
      publishedYear: 2023,
      role: '学生第二作者',
      tags: [
        '农业害虫检测',
        '目标检测',
        '轻量化网络',
        '田间监测',
        '特征融合',
      ],
      abstract:
        '针对田间复杂背景、害虫形态多样及小目标难检等问题，在主流单阶段检测框架上改进骨干网络与特征融合结构，构建面向农业场景的害虫检测模型，在公开与自建数据上验证其精度与推理效率，为田间智能监测提供可用方案。',
      url: 'https://journal-n.scnu.edu.cn/article/doi/10.6054/j.jscnun.2023048',
    },
    {
      title: '基于改进 YOLO11 的无人机小目标轻量级高速检测器',
      venue: '华南师范大学学报（自然科学版）',
      venueMeta: '北大核心',
      status: 'published',
      publishedYear: 2025,
      role: '学生第三作者',
      tags: [
        '无人机视觉',
        '小目标检测',
        '轻量化模型',
        '航拍图像',
        '实时推理',
      ],
      abstract:
        '无人机航拍存在目标尺度小、背景复杂与机载算力受限等挑战。本文在轻量级检测架构上引入多尺度特征增强与结构剪枝策略，设计面向航拍小目标的高速检测器，在保持较高推理速度的同时提升复杂场景下的检测精度与稳定性。',
      url: 'https://journal-n.scnu.edu.cn/article/doi/10.6054/j.jscnun.2025050',
    },
  ],
  patents: [
    {
      title: '道路图像的坑洞检测方法、装置、设备以及存储介质',
      role: '第一发明人',
    },
    {
      title: '可搭载无人机的实时天线干扰源图像检测技术',
      role: '第二发明人',
    },
    {
      title: '基于边缘-云协作的无人机天线干扰源巡检 AIoT 系统',
      role: '第三发明人',
    },
  ],
  experience: [
    {
      org: '港中深 · GAP 实验室',
      role: '3D重建方向科研助理',
      period: '2025.08 — 至今',
      description:
        '从事 3D 头部重建与生成式视觉研究，覆盖大规模数据构建、重建-生成管线与下游任务验证。',
      highlights: [
        '基于 FLUX 与 Qwen-VL 构建千万样本平衡数据集，缓解 3D-aware GAN 的视角分布偏差',
        '将 3D 重建特征对接自回归视频扩散模型，实现约 15 FPS 的高保真上半身视频合成',
        '实现单图重建解耦为身份–表情–姿态，驱动实时 360° 交互式数字人合成，多项指标 SOTA',
      ],
      tags: ['3DGS', 'FLUX', 'Video Diffusion', 'NeRF'],
    },
    {
      org: '字节跳动·Seed视觉',
      role: '3D 生成算法实习生',
      period: '2026.03 — 至今',
      description:
        '参与 SeeDream 相关 3D 生成训练数据方案、模型迭代支撑与数据工具链建设。',
      highlights: [
        '参与 SeeDream 训练数据方案设计，制定多模态数据配对与准入标准，提升数据一致性与训练可用性。',
        '利用 3D 渲染支持图像编辑功能与版本迭代，按实验需求构建与维护训练子集，分析回流数据策略。',
        '开发优化数据处理算子，配合 Blender 完成建模渲染，搭建维护团队工程化标准，独立交付多项数据专项。',
      ],
      tags: ['SeeDream', '3D Generation', 'Blender', 'Data Pipeline'],
    },
  ],
  projects: [
    {
      program: '「攀登计划」科技创新培育省级一般项目',
      fullTitle:
        '基于低空无人机遥感识别技术的智能巡检系统与保险定损模式一体化研究',
      period: '2025.03 — 至今',
      role: '参与成员',
      level: '省级一般项目',
      description:
        '负责基础设施智能巡检系统的端到端算法设计与落地，优化轻量化模型及边缘侧部署效率，提升低空复杂背景下小目标识别精度。主导基于遥感图像的目标识别与保险定损一体化框架搭建，协调巡检作业与定损理赔业务协同。',
    },
    {
      program: '「攀登计划」科技创新培育省级重点项目',
      fullTitle:
        '「双减」政策下课堂过程性智能评价模型的构建及其教学应用研究',
      period: '2021.11 — 2024.11',
      role: '参与成员',
      level: '省级重点项目',
      description:
        '构建用于测量学生课堂学习状态的评价模型，引入面部情感识别、语音语义分析等技术对学生个体状态进行多角度、持续性课堂评价，为教师改进教学设计、提升课堂质量提供反馈参考。',
    },
    {
      program: '「大学生创新创业训练计划项目」省级重点项目',
      fullTitle: '基于改进 Yolov5 的 5G 通信干扰源检测研究',
      period: '2022.11 — 2024.05',
      role: '负责人',
      level: '省级重点项目',
      description:
        '结合传统移动通信干扰源排查流程，创新研发目标检测算法，采用无人机搭载检测器对高处、隐蔽处天线进行检测，辅助甚至替代人工巡检，填补天线干扰源目标检测领域在学习样本与检测模型上的空白。',
    },
    {
      program: '「金种子」校级一般课题',
      fullTitle: '基于人脸情感识别的高校课堂教学评价研究',
      period: '2022.03 — 2023.03',
      role: '核心成员',
      level: '校级一般课题',
      description:
        '构建高校课堂学生人脸情感识别模型，采用基于边缘的双通道特征融合模型进行特征提取，通过 MSAFNet 网络进行表情分类，并引入 PAD 三维情感模型测量情感投入评估。',
    },
  ],
  awards: [
    { title: '第十届「泰迪杯」数据挖掘大赛国家级一等奖', date: '2022.06' },
    {
      title: '第十八届「挑战杯」广东大学生课外学术科技作品竞赛省级一等奖',
      date: '2022.11',
    },
    {
      title: '第十七届「挑战杯」广东大学生课外学术科技作品竞赛省级三等奖',
      date: '2022.11',
    },
    {
      title: '第十四届「挑战杯」广东大学生创业计划竞赛省级二等奖',
      date: '2023.11',
    },
    { title: '2025 年中国国际大学生创新大赛省级一等奖', date: '2025.11' },
    { title: '2024 年中国国际大学生创新大赛省级三等奖', date: '2024.11' },
    { title: '2023 年全国大学生数学建模竞赛省级三等奖', date: '2023.11' },
    {
      title: '「三下乡」暑期社会实践活动优秀团队、先进个人',
      date: '2022 — 2024',
    },
  ],
  honors: [
    { title: '百佳优秀毕业生', date: '2025.06' },
    { title: '华为基座奖学金一等奖', date: '2024.04' },
    { title: '百佳共青团员', date: '2024.04' },
    { title: '创新奖学金特等奖（论文类）', date: '2024.04' },
    { title: '优秀学生干部', date: '2022 — 2024' },
    { title: '综合奖学金一等奖', date: '2022 — 2025' },
  ],
  practiceTimeline: [
    {
      id: 'ri-lab',
      role: 'RI Lab 科研助理',
      org: '本科团队负责人',
      startYear: 2021,
      endYear: 2025,
    },
    {
      id: 'class-monitor',
      role: '班长',
      org: '2021 级数据科学',
      startYear: 2021,
      endYear: 2025,
    },
    {
      id: 'student-union',
      role: '学生会主席团',
      org: '行知书院',
      startYear: 2022,
      endYear: 2023,
    },
    {
      id: 'part-time-ta',
      role: '兼职班主任',
      org: '2023 级数据科学',
      startYear: 2023,
      endYear: 2024,
    },
    {
      id: 'conf-2022',
      role: 'ICICSP 2022',
      org: 'IEEE 国际会议',
      startYear: 2022,
      endYear: 2022,
    },
    {
      id: 'conf-2023',
      role: 'ICRAE 2023',
      org: 'IEEE 国际会议',
      startYear: 2023,
      endYear: 2023,
    },
    {
      id: 'conf-2024',
      role: 'AIIIP 2024',
      org: 'ACM 国际会议',
      startYear: 2024,
      endYear: 2024,
    },
    {
      id: 'conf-2025',
      role: 'SIGGRAPH Asia 2025',
      org: 'CCF-A 会议',
      startYear: 2025,
      endYear: 2025,
    },
    {
      id: 'gap-2026',
      role: 'GAP Lab',
      org: '3D重建科研助理',
      startYear: 2026,
      endYear: 2026,
    },
    {
      id: 'seed-2026',
      role: 'Seed视觉',
      org: '3D生成算法实习',
      startYear: 2026,
      endYear: 2026,
    },
  ],
  skills: [
    'Python',
    'Java',
    'C++',
    'C',
    'Linux',
    'PyTorch',
    'Microsoft 365',
    'Blender',
    'NeRF',
    '3DGS',
  ],
}

const ui: UiStrings = {
  htmlLang: 'zh-CN',
  documentTitle: '黄晓宁 · 3D 计算机视觉与图形学',
  nav: {
    education: '教育',
    publications: '论文',
    experience: '实习',
    projects: '项目',
    awards: '荣誉',
    contact: '联系',
    langSwitch: 'EN',
  },
  theme: {
    switchToLight: '切换到浅色模式',
    switchToDark: '切换到深色模式',
  },
  hero: {
    loading: '正在重建 3D 模型...',
    scrollWebGL: '拖拽旋转 · 向下滚动',
    scrollMobile: '向下滚动探索',
  },
  sections: {
    education: '教育背景',
    publications: '科研论文',
    experience: '实习经历',
    experienceSubtitle:
      '3D视觉在科研界与工业界的算法研究、数据工程、业务应用',
    projects: '项目经历',
    awards: '荣誉与实践',
    contact: '联系我',
    contactSubtitle: '欢迎就 3D 视觉、图形学或合作研究进行交流。',
    awardsList: '获奖情况',
    honorsList: '个人荣誉',
    practice: '实践经历',
    patents: '发明专利',
    skills: '专业技能',
  },
  filters: {
    all: '全部',
    submitted: '在投',
    published: '已发表',
  },
  pubStatus: {
    submitted: '在投',
    published: (year) => `${year}年发表`,
  },
  collapsible: {
    expandAbstract: '展开摘要',
    collapseAbstract: '收起摘要',
    expandProject: '展开项目内容',
    collapseProject: '收起项目内容',
  },
  education: {
    showCourses: '查看核心课程',
    hideCourses: '收起核心课程',
  },
  contact: {
    copied: '已复制 ✓',
  },
  marquee: {
    hoverHint: '悬停可加速滚动',
  },
  footer: {
    line1: (year) => `© ${year} 黄晓宁 · Built with React & Three.js`,
    line2: 'InfiHead: reconstruction complete ✓',
  },
}

export const profileZh: SiteBundle = {
  locale: 'zh',
  profile,
  ui,
}
