export type PublicationStatus = '在投' | '已发表'

export interface Publication {
  title: string
  venue: string
  status: PublicationStatus
  role: string
  tags: string[]
  impact?: string
}

export interface Experience {
  org: string
  role: string
  period: string
  description: string
  tags: string[]
}

export interface Education {
  school: string
  department: string
  degree: string
  period: string
  details: string[]
}

export interface Patent {
  title: string
  role: string
}

export interface Project {
  title: string
  role: string
}

export const profile = {
  name: '黄晓宁',
  tagline: '3D 计算机视觉与图形学研究者',
  heroSubtitle:
    '致力于以有限成本为所有人实时生成并驱动高保真 3D 虚拟形象',
  contact: {
    email: '225040002@link.cuhk.edu.cn',
    phone: '+86 150-1521-3166',
    github: 'https://github.com/hxnnnnn',
    site: 'https://hxnnnnn.github.io',
    scholar: '',
  },
  research: {
    intro:
      '在香港中文大学（深圳）数据科学学院攻读硕士，于韩晓光教授指导下从事以人为本的 3D 计算机视觉与图形学研究。',
    focus: [
      {
        title: '泛化性',
        description:
          '基于 NeRF/3DGS 技术，从大规模单目 2D 数据学习可泛化的全头部 3D 模型，应对不同身份与外观。',
        icon: '◈',
      },
      {
        title: '实时性',
        description:
          '探索前馈式 3D 重建与自回归视频扩散的结合，实现 15 FPS 级别的高保真化身驱动与合成。',
        icon: '⧖',
      },
      {
        title: '鲁棒性',
        description:
          '针对大视角、光照与表情变化，用生成模型补齐数据缺口，提升虚拟形象在真实场景下的稳定性。',
        icon: '◎',
      },
    ],
  },
  education: [
    {
      school: '香港中文大学（深圳）',
      department: '数据科学学院 · 数据科学专业',
      degree: '英文授课硕士',
      period: '2025.09 — 2027.06',
      details: [
        '研究方向：以人为本的 3D 计算机视觉与图形学',
        '研究重点：NeRF/3DGS 头部虚拟形象泛化性与鲁棒性',
      ],
    },
    {
      school: '华南师范大学',
      department: '数据科学与工程学院 · 数据科学与大数据技术',
      degree: '工学学士',
      period: '2021.09 — 2025.06',
      details: [
        'GPA 3.8/5.0 · 绩点排名 4/30 · 综测排名 1/30',
        'IELTS 6.5',
      ],
    },
  ] satisfies Education[],
  publications: [
    {
      title:
        'InfiHead: Learning a Feedforward Disentangled 3D Full-Head Model from Scalable Monocular 2D Data',
      venue: 'SIGGRAPH Asia 2026',
      status: '在投',
      role: '第二作者',
      tags: ['3D', 'NeRF', 'Full-Head'],
    },
    {
      title:
        'DAS: A Dynamic Adaptation System for Pest Detection via Edge-Cloud Collaboration',
      venue: 'IEEE Transactions on Instrumentation and Measurement',
      status: '在投',
      role: '第二作者',
      tags: ['Edge-Cloud', 'Detection'],
      impact: 'Q2, IF=5.90',
    },
    {
      title:
        'MS-FDD: A Lightweight Multi-Scale Module for Fatigue Driving Detection',
      venue: 'ACM Transactions on Intelligent Systems and Technology',
      status: '在投',
      role: '第二作者',
      tags: ['Fatigue', 'Lightweight'],
      impact: 'Q1, IF=7.20',
    },
    {
      title:
        'LEPS: A lightweight and effective single-stage detector for pothole segmentation',
      venue: 'IEEE Sensors Journal',
      status: '已发表',
      role: '第一作者',
      tags: ['Segmentation', 'Detection'],
      impact: 'Q2, IF=4.30',
    },
    {
      title:
        'Real-time Underwater Visual Target Sensing System with Multitasking via Edge-Cloud Collaboration',
      venue: 'IEEE Journal of Oceanic Engineering',
      status: '已发表',
      role: '第二作者',
      tags: ['Underwater', 'Edge-Cloud'],
      impact: 'Q2, IF=3.80',
    },
    {
      title:
        'Yolo-Pest: An Insect Pest Object Detection Algorithm via CAC3 Module',
      venue: 'Sensors',
      status: '已发表',
      role: '第二作者',
      tags: ['Agriculture', 'YOLO'],
      impact: 'Q3, IF=3.90',
    },
    {
      title:
        'Mini-SCXception: Balancing Accuracy and Efficiency in Real-Time Facial Expression Recognition',
      venue: 'AIIIP 2024',
      status: '已发表',
      role: '第二作者',
      tags: ['FER', 'Real-time'],
    },
    {
      title:
        'A Robust Robot System via Multi-sensor Fusion Localization and Optimized Path Planning',
      venue: 'ICRAE 2023',
      status: '已发表',
      role: '第二作者',
      tags: ['Robotics', 'SLAM'],
    },
    {
      title:
        'Discussion on the effect of classroom concept learning based on BERT text classification',
      venue: 'ICICSP 2022',
      status: '已发表',
      role: '第二作者',
      tags: ['NLP', 'Education'],
    },
    {
      title: '基于改进 YOLOv5 的农业害虫检测',
      venue: '华南师范大学学报（自然科学版）',
      status: '已发表',
      role: '第三作者',
      tags: ['Agriculture', 'YOLO'],
    },
    {
      title: '基于改进 YOLO11 的无人机小目标轻量级高速检测器',
      venue: '华南师范大学学报（自然科学版）',
      status: '已发表',
      role: '第三作者',
      tags: ['UAV', 'Detection'],
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
      org: '字节跳动',
      role: '3D 生成算法实习生',
      period: '2026.03 — 至今',
      description:
        '聚焦 3D 生成方向，协同算法、工程及产品团队攻克视角不一致、多模态融合等技术难题。负责多类型 3D 数据的生成、清洗、标注与标准化预处理，构建并维护团队内部 3D 生成专用数据集。使用 Blender/Unity 进行 3D 场景建模与渲染，独立完成 3 项数据专项任务交付。',
      tags: ['3D Generation', 'Blender', 'Unity', 'Data Pipeline'],
    },
    {
      org: '港中深 GAP 实验室',
      role: '科研助理',
      period: '2025.08 — 至今',
      description:
        '深度参与前沿 3D 视觉与生成式 AI 研究。利用 FLUX.1 与 Qwen2.5-VL 构建 1120 万样本平衡数据集。协助开发实时上半身化身生成框架，将 3D 重建特征与自回归视频扩散模型结合，实现 15 FPS 高保真视频合成。负责可控人脸模型数据代码，用生成模型补齐表情与光照数据缺口。',
      tags: ['3DGS', 'FLUX', 'Video Diffusion', 'NeRF'],
    },
    {
      org: '华南师范大学 RI Lab',
      role: '科研助理 / 本科团队负责人',
      period: '2021 — 2025',
      description:
        '参与机器人感知、目标检测与边缘-云协作等方向研究，带领本科团队完成多项竞赛与论文产出。',
      tags: ['Robotics', 'Detection', 'Edge-Cloud'],
    },
  ] satisfies Experience[],
  projects: [
    {
      title:
        '「攀登计划」科技创新培育省级一般项目：基于低空无人机遥感识别技术的智能巡检系统与保险定损模式一体化研究',
      role: '参与成员',
    },
    {
      title:
        '「攀登计划」科技创新培育省级重点项目：双减政策下课堂过程性智能评价模型的构建及其教学应用研究',
      role: '参与成员',
    },
    {
      title:
        '「大学生创新创业训练计划」省级重点项目：基于改进 YOLOv5 的 5G 通信干扰源检测研究',
      role: '负责人',
    },
    {
      title: '「金种子」校级一般课题：基于人脸情感识别的高校课堂教学评价研究',
      role: '核心成员',
    },
  ] satisfies Project[],
  awards: [
    '数据挖掘大赛国家级一等奖',
    '广东大学生课外学术科技作品竞赛省级一等奖',
    '「挑战杯」广东大学生课外学术科技作品竞赛省级一等奖',
    '中国国际大学生创新大赛省级一等奖',
    '「三下乡」暑期社会实践活动优秀团队、先进个人',
    '百佳优秀毕业生',
    '华为基座奖学金一等奖',
    '百佳共青团员',
    '创新奖学金特等奖',
    '大学优秀学生干部',
    '综合奖学金一等奖',
  ],
  practice: [
    '曾参与 SIGGRAPH Asia 2025、AIIIP 2024、ICEIT 2024、ICAUS 2023、ICICSP 2022 等国际学术会议',
    '曾任华南师范大学 2021 级数据科学与大数据技术班长、学生兼职班主任、学生会主席团成员',
  ],
  skills: [
    'Python',
    'Linux',
    'PyTorch',
    'Blender',
    'Unreal Engine',
    'NeRF / 3DGS',
    'Vibe-coding',
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
