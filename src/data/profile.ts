export type PublicationStatus = '在投' | 'published'

export interface Publication {
  title: string
  venue: string
  status: PublicationStatus
  publishedYear?: number
  role: string
  venueMeta: string
  tags: string[]
  abstract: string
  url?: string
}

export interface PracticeTimelineItem {
  id: string
  role: string
  org: string
  startYear: number
  endYear: number
}

export interface Experience {
  org: string
  role: string
  period: string
  description: string
  highlights?: string[]
  tags: string[]
}

export interface Education {
  school: string
  department: string
  degree: string
  period: string
  details: string[]
  courses?: string[]
}

export interface Patent {
  title: string
  role: string
}

export interface Project {
  name: string
  period: string
  role: string
  level: string
  description: string
}

export interface AwardItem {
  title: string
  date?: string
}

export function getPublicationStatusLabel(pub: Publication): string {
  if (pub.status === '在投') return '在投'
  return `${pub.publishedYear ?? ''}年发表`
}

export const profile = {
  name: '黄晓宁',
  heroName: 'XiaoningHuang',
  identities: ['CUHK-DS-硕士生', 'ByteDance-Seed-实习生'] as const,
  contact: {
    email: '225040002@link.cuhk.edu.cn',
    github: 'https://github.com/hxnnnnn',
    site: 'https://hxnnnnn.github.io',
    scholar: '',
  },
  publicationsSummary:
    '专注于3D和2D计算机视觉领域，包括但不限于重建、检测、分割任务。',
  education: [
    {
      school: '香港中文大学（深圳）',
      department: '数据科学学院 · 数据科学专业',
      degree: '英文授课硕士 · GPA 3.3/4.0',
      period: '2025.09 — 至今',
      details: [
        '在韩晓光教授指导下从事以人为本的 3D 计算机视觉与图形学研究，围绕单目图像学习可分解、可泛化的全头部 3D 表征，并探索其与生成式模型的结合路径。',
        '研究重点为 NeRF/3DGS 驱动的高保真头部重建与实时驱动；目标是在有限算力与数据成本下，为广泛人群提供稳定、实时且表情可控的 3D 虚拟形象生成能力。',
      ],
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
      department: '数据科学与工程学院 · 数据科学与大数据技术',
      degree: '工学学士 · GPA 3.8/5.0',
      period: '2021.09 — 2025.06',
      details: [
        '本科阶段聚焦计算机视觉与智能感知，围绕目标检测、语义/实例分割、边缘-云协同推理及农业、交通、课堂等场景开展算法研究与系统落地。',
        '研究重点为轻量化检测架构、多尺度特征融合与小目标鲁棒感知；目标是将模型效率、精度与部署成本平衡，并支撑无人机巡检、害虫监测、路面病害与课堂情感分析等应用。',
      ],
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
  ] satisfies Education[],
  publications: [
    {
      title:
        'InfiHead: Learning a Feedforward Disentangled 3D Full-Head Model from Scalable Monocular 2D Data',
      venue: 'SIGGRAPH Asia 2026',
      venueMeta: 'CCF-A 会议',
      status: '在投',
      role: '第二作者',
      tags: [
        '3D Reconstruction',
        'Neural Radiance Fields',
        'Full-Head Avatar',
        'Monocular Learning',
        'Disentangled Representation',
      ],
      abstract:
        'Proposes a feedforward disentangled 3D full-head model learned from large-scale monocular 2D data, enabling scalable avatar creation with explicit control over identity, expression, and appearance without per-subject optimization.',
    },
    {
      title:
        'DAS: A Dynamic Adaptation System for Pest Detection via Edge-Cloud Collaboration',
      venue: 'IEEE Transactions on Instrumentation and Measurement',
      venueMeta: 'SCI 二区 · IF 5.90',
      status: '在投',
      role: '学生第一作者',
      tags: [
        'Edge-Cloud Collaboration',
        'Pest Detection',
        'Dynamic Adaptation',
        'Object Detection',
        'Agricultural Vision',
      ],
      abstract:
        'Introduces a dynamic adaptation system that coordinates edge devices and cloud servers for pest detection, adjusting models and inference strategies under shifting field conditions to improve accuracy and deployment efficiency.',
    },
    {
      title:
        'MS-FDD: A Lightweight Multi-Scale Module for Fatigue Driving Detection',
      venue: 'ACM Transactions on Intelligent Systems and Technology',
      venueMeta: 'SCI 一区 · IF 7.20',
      status: '在投',
      role: '第二作者',
      tags: [
        'Fatigue Driving Detection',
        'Multi-Scale Features',
        'Lightweight Architecture',
        'Driver Monitoring',
        'Real-Time Inference',
      ],
      abstract:
        'Presents MS-FDD, a lightweight multi-scale module designed for fatigue driving detection that captures fine-grained facial and behavioral cues while maintaining low latency suitable for in-vehicle deployment.',
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
        'Proposes LEPS, a lightweight single-stage detector tailored for pothole segmentation in road images, balancing detection speed and segmentation quality for practical infrastructure inspection pipelines.',
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
        'Develops a real-time underwater visual sensing system that performs multitask perception through edge-cloud collaboration, improving robustness and throughput for marine target monitoring in bandwidth-limited environments.',
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
        'Introduces Yolo-Pest with a CAC3 module to enhance multi-scale representation for insect pest detection in complex agricultural scenes, improving recall on small pests while keeping the detector efficient.',
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
        'Presents Mini-SCXception, a compact network architecture that balances accuracy and efficiency for real-time facial expression recognition in classroom and human-computer interaction scenarios.',
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
        'Designs a robust mobile robot system that fuses multi-sensor localization with optimized path planning to improve navigation stability and task completion in structured indoor environments.',
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
        'Investigates classroom concept learning effects using BERT-based text classification, analyzing student-generated content to support formative assessment and instructional feedback.',
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
        '针对复杂田间背景与小目标害虫识别难题，改进检测骨干与特征融合策略，在保持推理效率的同时提升农业害虫检测精度与鲁棒性。',
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
        '面向无人机航拍场景中的小目标检测需求，设计轻量级高速检测器，在算力受限的机载平台上实现较高帧率与检测精度的平衡。',
      url: 'https://journal-n.scnu.edu.cn/article/doi/10.6054/j.jscnun.2025050',
    },
  ] satisfies Publication[],
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
  ] satisfies Patent[],
  experience: [
    {
      org: '港中深 · GAP 实验室',
      role: '3D重建方向科研助理',
      period: '2025.08 — 至今',
      description:
        '从事 3D 头部重建与生成式视觉研究，覆盖大规模数据构建、重建-生成管线与下游任务验证。',
      highlights: [
        '基于 FLUX.1 与 Qwen2.5-VL 构建约 1120 万样本平衡数据集，缓解 3D-aware GAN 的视角分布偏差',
        '将 3D 重建特征对接自回归视频扩散模型，实现约 15 FPS 的高保真上半身视频合成',
        '通过生成式增广补齐表情与光照数据缺口，支撑大视角人脸识别等下游实验',
      ],
      tags: ['3DGS', 'FLUX', 'Video Diffusion', 'NeRF'],
    },
    {
      org: '字节跳动·Seed视觉',
      role: '3D 生成算法实习生',
      period: '2026.03 — 至今',
      description:
        '负责 3D 生成方向训练数据的全链路建设与多模态场景内容生产。',
      highlights: [
        '协同算法、工程与产品团队处理视角不一致与多模态融合问题，保障数据里程碑按期交付',
        '搭建并维护团队内部 3D 生成数据集及清洗、标注与标准化流程',
        '使用 Blender / Unity 完成场景建模与渲染，独立交付 3 项数据专项',
      ],
      tags: ['3D Generation', 'Blender', 'Unity', 'Data Pipeline'],
    },
  ] satisfies Experience[],
  projects: [
    {
      name: '智保百千村—多领域基础设施智能巡检与保险定损一体化研究',
      period: '2025.03 — 至今',
      role: '参与成员',
      level: '省级一般项目',
      description:
        '负责基础设施智能巡检系统的端到端算法设计与落地，优化轻量化模型及边缘侧部署效率，提升低空复杂背景下小目标识别精度。主导基于遥感图像的目标识别与保险定损一体化框架搭建，协调巡检作业与定损理赔业务协同。',
    },
    {
      name: '基于改进 YOLOv5 的 5G 通信干扰源检测研究',
      period: '2022.11 — 2024.05',
      role: '负责人',
      level: '省级重点项目',
      description:
        '结合传统移动通信干扰源排查流程，创新研发目标检测算法，采用无人机搭载检测器对高处、隐蔽处天线进行检测，辅助甚至替代人工巡检，填补天线干扰源目标检测领域在学习样本与检测模型上的空白。',
    },
    {
      name: '基于人脸情感识别的高校课堂教学评价研究',
      period: '2022.03 — 2023.03',
      role: '核心成员',
      level: '校级一般课题',
      description:
        '构建高校课堂学生人脸情感识别模型，采用基于边缘的双通道特征融合模型进行特征提取，通过 MSAFNet 网络进行表情分类，并引入 PAD 三维情感模型测量情感投入评估。',
    },
    {
      name: '「双减」政策下课堂过程性智能评价模型的构建及其教学应用研究',
      period: '2021.11 — 2024.11',
      role: '参与成员',
      level: '省级重点项目',
      description:
        '构建用于测量学生课堂学习状态的评价模型，引入面部情感识别、语音语义分析等技术对学生个体状态进行多角度、持续性课堂评价，为教师改进教学设计、提升课堂质量提供反馈参考。',
    },
  ] satisfies Project[],
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
  ] satisfies AwardItem[],
  honors: [
    { title: '百佳优秀毕业生', date: '2025.06' },
    { title: '华为基座奖学金一等奖', date: '2024.04' },
    { title: '百佳共青团员', date: '2024.04' },
    { title: '创新奖学金特等奖（论文类）', date: '2024.04' },
    { title: '优秀学生干部', date: '2022 — 2024' },
    { title: '综合奖学金一等奖', date: '2022 — 2025' },
  ] satisfies AwardItem[],
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
  ] satisfies PracticeTimelineItem[],
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
} as const

export const venueColors: Record<string, string> = {
  SIGGRAPH: 'from-orange-500 to-amber-400',
  IEEE: 'from-blue-500 to-sky-400',
  ACM: 'from-emerald-500 to-teal-400',
  Sensors: 'from-violet-500 to-purple-400',
  default: 'from-indigo-500 to-cyan-400',
}

export function getVenueColor(venue: string): string {
  if (venue.includes('SIGGRAPH')) return venueColors.SIGGRAPH
  if (venue.includes('IEEE')) return venueColors.IEEE
  if (venue.includes('ACM')) return venueColors.ACM
  if (venue.includes('Sensors')) return venueColors.Sensors
  return venueColors.default
}

export function isPublished(pub: Publication): boolean {
  return pub.status === 'published'
}
