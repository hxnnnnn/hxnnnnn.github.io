import type {
  Education,
  Experience,
  Locale,
  PracticeTimelineItem,
  SiteBundle,
  SiteVariant,
} from '../i18n/types'
import { profileZh } from './profile.zh'
import { profileEn } from './profile.en'

type CustomVariant = Exclude<SiteVariant, 'default'>

interface VariantOverride {
  documentTitle: string
  identities: readonly string[]
  publicationsSummary: string
  experienceSubtitle: string
  contactSubtitle: string
  cuhkResearch: string
  scnuRankMeta: string
  experience: Experience[]
  seedTimelineRole: string
  mpilTimelineItem: PracticeTimelineItem
}

function buildVariantBundle(
  base: SiteBundle,
  variant: CustomVariant,
  override: VariantOverride,
): SiteBundle {
  const education: Education[] = base.profile.education.map((edu, idx) => {
    if (idx === 0) {
      return {
        ...edu,
        research: override.cuhkResearch,
      }
    }
    if (idx === 1) {
      return {
        ...edu,
        meta: edu.meta.map((m) =>
          m.includes('4/30') ? override.scnuRankMeta : m,
        ),
      }
    }
    return edu
  })

  const practiceTimeline: PracticeTimelineItem[] = [
    ...base.profile.practiceTimeline.map((item) =>
      item.id === 'seed-2026'
        ? { ...item, role: override.seedTimelineRole }
        : item,
    ),
    override.mpilTimelineItem,
  ]

  return {
    locale: base.locale,
    profile: {
      ...base.profile,
      identities: override.identities,
      publicationsSummary: override.publicationsSummary,
      contact: {
        ...base.profile.contact,
        site: `https://hxnnnnn.github.io/${variant}`,
      },
      education,
      experience: override.experience,
      practiceTimeline,
    },
    ui: {
      ...base.ui,
      documentTitle: override.documentTitle,
      sections: {
        ...base.ui.sections,
        experienceSubtitle: override.experienceSubtitle,
        contactSubtitle: override.contactSubtitle,
      },
    },
  }
}

const zhOverrides: Record<CustomVariant, VariantOverride> = {
  'ai-gen': {
    documentTitle: '黄晓宁 · AI 生成算法与 3D 视觉',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Algorithm Intern',
    ] as const,
    publicationsSummary:
      '专注于 3D 与 2D 计算机视觉及生成式图形学，涵盖三维数字人重建、可控生成、目标检测与分割任务。',
    experienceSubtitle:
      '生图大模型微调、程序化三维物理渲染合成、3D 头部重建与具身多模态感知',
    contactSubtitle:
      '欢迎就 AI 生成算法、3D 视觉与图形学或合作研究进行交流。',
    cuhkResearch:
      '业务方向：探索以程序化三维物理渲染合成数据为生图大模型注入空间透视、物理光影与精准可控编辑能力的新范式研究。研究方向：从事以人为本的 3D 视觉与生成式图形学研究，聚焦基于 NeRF/3DGS 与扩散模型的三维数字人表征与实时驱动。',
    scnuRankMeta: '绩点排名 1/30',
    seedTimelineRole: 'Seed 数据算法实习',
    mpilTimelineItem: {
      id: 'mpil-2026',
      role: 'MPIL 访学科研助理',
      org: '英国兰卡斯特大学',
      startYear: 2026,
      endYear: 2026,
    },
    experience: [
      {
        org: '字节跳动 · Seed',
        role: '数据算法实习生',
        period: '2026.03 — 至今',
        description:
          '针对生图基座 Seedream 在精准编辑中相机、主体与光照强耦合及二维拼接缺乏物理光影自洽的痛点，主导构建程序化三维物理渲染合成范式，实现六自由度位姿、厘米级尺度、材质光影与镜头焦段的单变量解耦及背景零漂移控制。',
        highlights: [
          '数据构建：依托 256.8 万件三维资产底座，设计单物体入景与位姿变换、多物体交互、正交三视图、白模与贴图内在分解、跨物体材质迁移、部件爆炸拆解及双参考动作驱动等任务，同步导出掩码与深度真值，累计入表 524.5 万高质量训练样本。',
          '模型微调：将 17 个专项训练数据桶跨阶段注入 Seedream 继续预训练与监督微调流程，选取动作与空间视角等 10 个核心桶共 337 万样本跨阶段复用，结合二维图对编辑与三联图组合训练范式，在保持通用生成能力的同时强化空间透视与物理直觉。',
          '项目成果：赋能 Seedream 最新定版在七千余条全集评测中总分提升 5.31%、编辑一致性达 93.99%；其中动作参考、实体动作保持、形状轮廓保持、材质纹理与视角参考分别提升 34.64%、36.26%、36.36%、38.89% 与 41.07%，支撑参考与空间编辑落地。',
        ],
        tags: [
          'Seedream',
          '3D Physical Synthesis',
          'CPT & SFT',
          'Disentangled Editing',
          'Blender & UE5',
        ],
      },
      {
        org: '香港中文大学（深圳） · GAP 实验室',
        role: '科研助理',
        period: '2025.08 — 至今',
        description:
          '从事以人为本的 3D 头部重建与生成式视觉研究，围绕从单目 2D 视频学习可分解、可泛化的 3D 高斯全头部表征。',
        highlights: [
          '方法研发：设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，并引入对抗训练保证 360° 纹理一致性。进一步将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 的高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
          '数据工程：搭建多视图自动化生产管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集，缓解生成对抗网络的视角分布偏差。负责可控人脸模型，用生成模型补齐表情与光照缺口，为大规模单目学习与大视角人脸识别等任务提供数据。',
        ],
        tags: [
          '3DGS',
          'Feedforward Reconstruction',
          'Video Diffusion',
          'FLUX',
          'NeRF',
        ],
      },
      {
        org: '英国兰卡斯特大学 · MPIL 实验室',
        role: '访学科研助理',
        period: '2026.09 — 2026.10',
        description:
          '从事具身智能多模态感知与机械臂操作研究，围绕视觉、触觉与热成像信号构建面向物理交互的时空对齐表征。',
        highlights: [
          '数据工程：参与机械臂遥操作多模态数据采集平台建设，同步录制正侧腕三路彩色视觉、左右触觉阵列、热成像及机械臂关节位姿；完成手眼标定、外参对齐与像素误差校验，按场景、任务与回合构建具身操作数据集，支撑策略学习与生成式交互建模。',
        ],
        tags: [
          'Embodied AI',
          'Multimodal Perception',
          'Teleoperation',
          'Hand-Eye Calibration',
          'Visuotactile',
        ],
      },
    ],
  },

  'aigc-data': {
    documentTitle: '黄晓宁 · AIGC 数据算法与 3D 视觉',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Algorithm Intern',
    ] as const,
    publicationsSummary:
      '专注于数据驱动的生成式智能及 3D/2D 计算机视觉，涵盖合成数据工程、三维重建、目标检测与分割任务。',
    experienceSubtitle:
      'AIGC 反事实合成数据、双模型投票打标、跨阶段数据配比与 3D 视觉研究',
    contactSubtitle:
      '欢迎就 AIGC 数据算法、合成数据工程、3D 视觉或合作研究进行交流。',
    cuhkResearch:
      '业务方向：聚焦数据驱动的生成式智能研究，探索以三维物理合成数据、投票打标与跨阶段配比驱动生图模型能力跃升。研究方向：从事以人为本的 3D 视觉与生成式数据构建研究，重点为利用生成模型与三维渲染克服真实样本长尾与视角偏差。',
    scnuRankMeta: '绩点排名 1/30',
    seedTimelineRole: 'Seed 数据算法实习',
    mpilTimelineItem: {
      id: 'mpil-2026',
      role: 'MPIL 访学科研助理',
      org: '英国兰卡斯特大学',
      startYear: 2026,
      endYear: 2026,
    },
    experience: [
      {
        org: '字节跳动 · Seed',
        role: '数据算法实习生',
        period: '2026.03 — 至今',
        description:
          '针对 Seedream 空间与动作编辑数据匮乏难题，系统对比视频挖掘、线下实拍与模型自蒸馏方案，针对视频挖掘仅 1.5% 转化率且缺乏空间真值的缺陷，首创以三维物理渲染构建反事实配对数据，打通渲染、配对、打标与训练评测全链路。',
        highlights: [
          '数据工程：依托 256.8 万件三维资产构建动作、形状材质、三视图与视角变换等 17 个数据桶；设计前期射线碰撞与接触落地几何门禁、中期 12 项逐视角视觉过滤，以及后期双模型三轮提示词投票定标与改写，以 79.6% 保留率入表 524.5 万样本。',
          '配比策略：系统研究二维图对编辑与三联图组合在不同训练阶段的配比规律，设计动作与无物体视角共 337 万核心样本在继续预训练与监督微调阶段跨阶段复用，并通过小模型消融实验验证三维白模贴图分解与厘米级尺度数据对几何理解的净增益。',
          '项目成果：驱动 Seedream 最新定版全集评测编辑一致性达 93.99%，动作参考、动作保持、形状保持、材质与视角参考分别跃升 34.64% 至 41.07%；搭建十步契约门禁的算子开发智能体与历史故障自进化规则库，实现合成数据算子小时级自动化交付。',
        ],
        tags: [
          'Seedream',
          'Counterfactual Synthetic Data',
          'Dual-VLM Voting',
          'Data Curriculum & Ablation',
          'Operator Agent',
        ],
      },
      {
        org: '香港中文大学（深圳） · GAP 实验室',
        role: '科研助理',
        period: '2025.08 — 至今',
        description:
          '从事以人为本的 3D 头部重建与生成式视觉研究，围绕从单目 2D 视频学习可分解、可泛化的 3D 高斯全头部表征。',
        highlights: [
          '数据工程：针对单目视频大视角偏差，搭建多视图自动化生产管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集以缓解生成对抗网络的视角偏差；负责可控人脸模型，用生成模型补齐表情与光照缺口，支撑大规模单目学习与大视角人脸识别。',
          '方法研发：设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，并引入对抗训练保证 360° 纹理一致性。进一步将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 的高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
        ],
        tags: ['3DGS', 'FLUX', 'Qwen-VL', 'Video Diffusion', 'NeRF'],
      },
      {
        org: '英国兰卡斯特大学 · MPIL 实验室',
        role: '访学科研助理',
        period: '2026.09 — 2026.10',
        description:
          '聚焦具身智能与多模态行为理解，开展面向机械臂精细操作的多源传感器数据采集、时空同步与质量治理研究。',
        highlights: [
          '数据工程：参与机械臂多模态数据采集平台建设，同步采集正侧腕三路彩色相机、左右触觉阵列与热成像数据；完成手眼标定、曝光增益联调与过曝截断实时质检，按场景、任务与回合记录正常、失败与废弃样本并落盘，支撑具身数据集生产与评测。',
        ],
        tags: [
          'Embodied Data',
          'Multimodal Curation',
          'Quality Governance',
          'Sensor Synchronization',
        ],
      },
    ],
  },

  embodied: {
    documentTitle: '黄晓宁 · 具身智能数据工程与三维视觉',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Algorithm Intern',
    ] as const,
    publicationsSummary:
      '专注于三维视觉、具身智能多模态感知与空间智能数据工程，涵盖三维重建、机器人定位与目标检测分割。',
    experienceSubtitle:
      '程序化三维物理仿真、空间几何门控质检、双擎渲染管线与机械臂多模态采集',
    contactSubtitle:
      '欢迎就具身智能数据工程、三维仿真合成、空间智能或合作研究进行交流。',
    cuhkResearch:
      '业务方向：聚焦程序化三维物理仿真合成管线、空间几何门控算子研发，以及面向空间智能的多模态数据清洗、打标与治理。研究方向：从事三维视觉与几何表征研究，结合机械臂多模态采集与多传感器融合定位积累，构建可扩展的三维数据闭环。',
    scnuRankMeta: '绩点排名 1/30',
    seedTimelineRole: 'Seed 数据算法实习',
    mpilTimelineItem: {
      id: 'mpil-2026',
      role: 'MPIL 访学科研助理',
      org: '英国兰卡斯特大学',
      startYear: 2026,
      endYear: 2026,
    },
    experience: [
      {
        org: '字节跳动 · Seed',
        role: '数据算法实习生',
        period: '2026.03 — 至今',
        description:
          '面向大模型空间智能与物理交互学习需求，依托 256.8 万件三维资产与万种去重骨骼姿态底座，主导构建程序化三维场景合成引擎；支持六自由度位姿变换、厘米级尺度及复杂家电总成零穿模拆解，同步导出深度、法线与三维包围盒真值。',
        highlights: [
          '几何质控：针对合成场景中的穿模、腾空与遮挡难题，设计 16 项物理与几何门控；实现基于包围盒层次结构的射线碰撞检测与法线推离消解以达成零穿模重叠，结合最低点射线接触感知落地消除物体悬浮，并通过 12 项逐视角门禁保障构图合理。',
          '双擎管线：打通离线路径追踪与 UE5 实时渲染双擎管线，完成双卡 L20 下八阶段全链路复现与 4096 分辨率逐帧零误差几何对齐；结合双模型三轮提示词投票完成物体正面朝向重定标与对称剔除，衍生双语空间操作指令、三维空间问答与评测基准。',
          '项目成果：累计完成 2,783 万张高保真动作与空间渲染、524.5 万样本入表及 23.1 TB 数据交付；赋能下游模型在空间关系、几何变换、视角参考与动作保持任务上分别提升 12.60%、20.59%、41.07% 与 36.26%，并沉淀十步契约门禁的算子开发智能体。',
        ],
        tags: [
          '3D Simulation Engine',
          'BVH Raycast & Collision',
          'Blender Cycles & UE5',
          '6-DoF Spatial Data',
          'Embodied Benchmark',
        ],
      },
      {
        org: '香港中文大学（深圳） · GAP 实验室',
        role: '科研助理',
        period: '2025.08 — 至今',
        description:
          '从事以人为本的 3D 头部重建与生成式视觉研究，围绕从单目 2D 视频学习可分解、可泛化的 3D 高斯全头部表征。',
        highlights: [
          '数据工程：搭建多视图自动化生产管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集，缓解生成对抗网络的视角分布偏差。负责可控人脸模型，用生成模型补齐表情与光照缺口，为大规模单目三维学习与大视角人脸识别提供数据支撑。',
          '方法研发：设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，并引入对抗训练保证 360° 纹理一致性。进一步将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 的高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
        ],
        tags: [
          '3DGS',
          'Multi-View Pipeline',
          'FLUX',
          'Video Diffusion',
          'NeRF',
        ],
      },
      {
        org: '英国兰卡斯特大学 · MPIL 实验室',
        role: '访学科研助理',
        period: '2026.09 — 2026.10',
        description:
          '围绕具身机械臂精细操作与遥操作任务，开展视觉、触觉、热成像与本体状态的多源传感采集与质量校验研究。',
        highlights: [
          '数据工程：参与机械臂多模态采集工作台建设，打通正侧腕三路彩色相机、左右触觉阵列、热成像与遥操作同步采集链路；负责手眼标定、重投影误差校验与过曝截断监测，按场景、任务与回合分流正常、失败与废弃轨迹并落盘，支撑具身数据集生产。',
        ],
        tags: [
          'Robotic Teleoperation',
          'Hand-Eye Calibration',
          'Tactile & Thermal Sensing',
          'Trajectory Curation',
        ],
      },
    ],
  },

  'data-dev': {
    documentTitle: '黄晓宁 · 多模态数据开发与三维数据工程',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Development Intern',
    ] as const,
    publicationsSummary:
      '专注于多模态数据工程、分布式视觉计算及 3D/2D 计算机视觉，涵盖三维重建、边缘云协同推理与检测分割。',
    experienceSubtitle:
      '大模型多模态数据基础设施：千卡异步流水线调优、分布式批处理算子与多源数据采集平台',
    contactSubtitle:
      '欢迎就大模型数据基础设施、分布式数据开发、三维数据工程或合作研究进行交流。',
    cuhkResearch:
      '业务方向：聚焦大模型多模态数据基础设施开发，涵盖分布式批处理算子研发、元数据血缘契约与大规模自动化清洗管线。研究方向：从事三维视觉与多模态数据工程研究，结合生成式数据构建与多源传感器同步采集，打造高吞吐数据生产闭环。',
    scnuRankMeta: '绩点排名 1/30',
    seedTimelineRole: 'Seed 数据开发实习',
    mpilTimelineItem: {
      id: 'mpil-2026',
      role: 'MPIL 访学科研助理',
      org: '英国兰卡斯特大学',
      startYear: 2026,
      endYear: 2026,
    },
    experience: [
      {
        org: '字节跳动 · Seed',
        role: '数据开发实习生',
        period: '2026.03 — 至今',
        description:
          '面向 Seedream 大规模训练数据需求，主导打通三维渲染、图像配对、多模态打标、资产托管与渲染推理协同的五算子链路；管理 45 个资产桶共 256.8 万件三维资产底座，构建并交付动作、形状材质与视角等 17 个训练桶共 524.5 万样本。',
        highlights: [
          '千卡调优：重构预处理输入输出、GPU 渲染推理与后处理回写三阶段异步流水线及进程常驻架构，将千卡集群单卡 GPU 利用率从 3.84% 提升至 74.89%，实现约 20 倍吞吐跃升；设计 1024 探索机位与 4096 确定性重放机制，单任务节省 72% 渲染算力。',
          '平台治理：设计 244 球面视角矩阵高频采集与分布式组装解耦架构，稳定交付 2,783 万张渲染图与 23.1 TB 训练数据；建设 16 项几何曝光门控与分阶段心跳监控，独立攻克批处理缓存自删、无头容器驱动崩溃、多地域限流轮询退避及编解码故障。',
          '工程赋能：搭建十步契约门禁的算子开发智能体，打通模式对齐、代码生成、冒烟视觉抽检与线上回写闭环，从历史调试日志自动提炼防呆规则库实现小时级交付；高吞吐支撑跨阶段训练复用，驱动下游模型编辑一致性达 93.99%、专项提升超 34%。',
        ],
        tags: [
          'Distributed Data Infra',
          '1000-GPU Async Pipeline',
          'Ray & Operator Dev',
          '23.1 TB Data Lake',
          'Agentic Engineering',
        ],
      },
      {
        org: '香港中文大学（深圳） · GAP 实验室',
        role: '科研助理',
        period: '2025.08 — 至今',
        description:
          '从事以人为本的 3D 头部重建与生成式视觉研究，围绕从单目 2D 视频学习可分解、可泛化的 3D 高斯全头部表征。',
        highlights: [
          '数据开发：搭建多视图自动化数据生产管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集以缓解生成对抗网络的视角偏差；开发可控人脸生成与属性补齐流水线，补齐表情与光照数据缺口，支撑大规模单目三维学习与大视角人脸识别。',
          '算法集成：设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，并引入对抗训练保证 360° 纹理一致性。进一步将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 的高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
        ],
        tags: [
          'Data Pipeline',
          '3DGS',
          'FLUX',
          'Qwen-VL',
          'Video Diffusion',
        ],
      },
      {
        org: '英国兰卡斯特大学 · MPIL 实验室',
        role: '访学科研助理',
        period: '2026.09 — 2026.10',
        description:
          '围绕机器人多模态感知与遥操作数据工程，开展视觉、触觉、热成像与本体状态的多源数据采集与存储架构研究。',
        highlights: [
          '平台开发：参与机械臂多模态采集系统开发，基于多进程队列缓冲架构接入正侧腕三路彩色相机、左右触觉阵列、热成像与遥操作设备；实现硬件与主机时间戳同步、手眼标定误差校验、过曝丢帧监测及按场景、任务与回合的原始数据规范落盘。',
        ],
        tags: [
          'Multiprocess Queue',
          'Timestamp Sync',
          'Data Storage Architecture',
          'Robotic Data Platform',
        ],
      },
    ],
  },
}

const enOverrides: Record<CustomVariant, VariantOverride> = {
  'ai-gen': {
    documentTitle: 'Xiaoning Huang · Generative AI & 3D Vision',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Algorithm Intern',
    ],
    publicationsSummary:
      'Focused on 3D/2D computer vision and generative graphics, covering 3D digital human reconstruction, controllable generation, object detection, and segmentation.',
    experienceSubtitle:
      'Generative foundation model fine-tuning, procedural 3D physical synthesis, 3D head reconstruction, and embodied perception',
    contactSubtitle:
      'Open to collaboration on generative AI algorithms, 3D vision, graphics, and related research.',
    cuhkResearch:
      'Business Track: Exploring a new paradigm of using procedural 3D physical rendering synthetic data to inject spatial perspective, physical lighting, and precise controllable editing capabilities into large image generation models. Research Track: Human-centric 3D vision and generative graphics, focusing on NeRF/3DGS and diffusion-based 3D digital human representation and real-time driving.',
    scnuRankMeta: 'Rank 1/30 (GPA)',
    seedTimelineRole: 'Seed Data Algo Intern',
    mpilTimelineItem: {
      id: 'mpil-2026',
      role: 'MPIL Visiting RA',
      org: 'Lancaster Univ.',
      startYear: 2026,
      endYear: 2026,
    },
    experience: [
      {
        org: 'ByteDance · Seed',
        role: 'Data Algorithm Intern',
        period: 'Mar 2026 — Present',
        description:
          'Addressed strong camera–subject–lighting coupling and lack of physical shading consistency in 2D compositing for the Seedream image generation foundation model by spearheading a procedural 3D physical rendering synthesis paradigm, achieving single-variable disentanglement across 6-DoF pose, centimeter-level scale, material shading, and focal length with zero background drift.',
        highlights: [
          'Data Construction: Leveraging a 2.568M 3D asset base, designed tasks covering single-object insertion & pose transformation, multi-object interaction, orthographic 3-views, clay-to-texture intrinsic decomposition, cross-object material transfer, exploded part disassembly, and dual-reference motion driving with ground-truth masks and depth, delivering 5.245M high-quality training samples.',
          'Model Fine-Tuning: Injected 17 specialized data buckets across Continue Pre-training (CPT) and Supervised Fine-Tuning (SFT) of Seedream, reusing 10 core motion and viewpoint buckets (3.37M samples) across stages with 2D pair editing and triplet composition training to strengthen spatial perspective and physical intuition without degrading general generation.',
          'Impact: Boosted the latest Seedream release by +5.31% overall score and 93.99% editing consistency across 7,000+ full-benchmark prompts; improved motion reference (+34.64%), entity motion preservation (+36.26%), shape contour preservation (+36.36%), material texture (+38.89%), and viewpoint reference (+41.07%).',
        ],
        tags: [
          'Seedream',
          '3D Physical Synthesis',
          'CPT & SFT',
          'Disentangled Editing',
          'Blender & UE5',
        ],
      },
      {
        org: 'CUHK-SZ · GAP Lab',
        role: 'Research Assistant',
        period: 'Aug 2025 — Present',
        description:
          'Human-centric 3D head reconstruction and generative vision: learning disentangled, generalizable 3D Gaussian full-head representations from monocular 2D video.',
        highlights: [
          'Methodology R&D: Designed a template-free feedforward reconstruction network disentangling single images into identity, expression, and pose factors with adversarial training for 360° texture consistency; bridged 3D reconstruction features with an autoregressive video diffusion pipeline for ~15 FPS high-fidelity upper-body synthesis and real-time 360° interactive digital humans.',
          'Data Engineering: Built an automated multi-view production pipeline using FLUX and Qwen-VL to construct a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; developed controllable face synthesis to fill expression and lighting gaps for large-scale monocular learning and wide-angle face recognition.',
        ],
        tags: [
          '3DGS',
          'Feedforward Reconstruction',
          'Video Diffusion',
          'FLUX',
          'NeRF',
        ],
      },
      {
        org: 'Lancaster University · MPIL Lab',
        role: 'Visiting Research Assistant',
        period: 'Sep 2026 — Oct 2026',
        description:
          'Embodied AI multimodal perception and robotic manipulation: constructing spatiotemporally aligned representations across visual, tactile, and thermal signals for physical interaction.',
        highlights: [
          'Data Engineering: Built a multimodal robotic teleoperation collection platform synchronously recording 3 RGB views (front, side, wrist), left/right tactile arrays, thermal imaging, and joint poses; completed hand-eye calibration, extrinsic alignment, and pixel-error verification to curate scene/task/episode datasets for policy learning and generative interaction modeling.',
        ],
        tags: [
          'Embodied AI',
          'Multimodal Perception',
          'Teleoperation',
          'Hand-Eye Calibration',
          'Visuotactile',
        ],
      },
    ],
  },

  'aigc-data': {
    documentTitle: 'Xiaoning Huang · AIGC Data Algorithm & 3D Vision',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Algorithm Intern',
    ],
    publicationsSummary:
      'Focused on data-centric generative AI and 3D/2D computer vision, including synthetic data engineering, 3D reconstruction, object detection, and segmentation.',
    experienceSubtitle:
      'Counterfactual 3D synthetic data, dual-model voting labeling, cross-stage curriculum, and 3D vision',
    contactSubtitle:
      'Open to collaboration on AIGC data algorithms, synthetic data engineering, and 3D vision.',
    cuhkResearch:
      'Business Track: Data-centric generative AI research, exploring 3D physical synthetic data, multi-round VLM voting labeling, and cross-stage data curriculum to drive capability leaps in large image generation models. Research Track: Human-centric 3D vision and generative data curation, leveraging generative models and 3D rendering to overcome long-tail and viewpoint bias in real data.',
    scnuRankMeta: 'Rank 1/30 (GPA)',
    seedTimelineRole: 'Seed Data Algo Intern',
    mpilTimelineItem: {
      id: 'mpil-2026',
      role: 'MPIL Visiting RA',
      org: 'Lancaster Univ.',
      startYear: 2026,
      endYear: 2026,
    },
    experience: [
      {
        org: 'ByteDance · Seed',
        role: 'Data Algorithm Intern',
        period: 'Mar 2026 — Present',
        description:
          'Addressed the scarcity of spatial and motion editing data for Seedream by systematically benchmarking video mining (only 1.5% yield and no spatial ground truth), real-world capture, and self-distillation; pioneered counterfactual paired data synthesis via 3D physical rendering across the full rendering, pairing, labeling, training, and evaluation loop.',
        highlights: [
          'Data Engineering: Constructed 17 data buckets (motion, shape/material, 3-views, viewpoint transformation, etc.) from 2.568M 3D assets; designed pre-render raycast collision & ground-contact gates, mid-stage 12-metric per-view visual filtering, and post-stage dual-model 3-round prompt voting & rewriting, achieving a 79.6% retention rate and 5.245M ingested samples.',
          'Curriculum & Mixing Strategy: Studied scaling and mixing ratios between 2D image-pair editing and triplet composition across training stages; designed cross-stage reuse of 3.37M core motion and viewpoint samples across CPT and SFT, and validated net geometric gains from clay-texture intrinsic decomposition and centimeter-scale data via small-model ablations.',
          'Impact: Drove 93.99% editing consistency on the full Seedream benchmark, with motion reference, motion preservation, shape preservation, material, and viewpoint reference surging by +34.64% to +41.07%; built a 10-step contract-gated operator-dev Agent with a self-evolving fault rulebook for hour-level operator delivery.',
        ],
        tags: [
          'Seedream',
          'Counterfactual Synthetic Data',
          'Dual-VLM Voting',
          'Data Curriculum & Ablation',
          'Operator Agent',
        ],
      },
      {
        org: 'CUHK-SZ · GAP Lab',
        role: 'Research Assistant',
        period: 'Aug 2025 — Present',
        description:
          'Human-centric 3D head reconstruction and generative vision: learning disentangled, generalizable 3D Gaussian full-head representations from monocular 2D video.',
        highlights: [
          'Data Engineering: Built an automated multi-view data production pipeline using FLUX and Qwen-VL to curate a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; developed controllable face synthesis to fill expression and lighting gaps for large-scale monocular learning and wide-angle face recognition.',
          'Methodology R&D: Designed a template-free feedforward reconstruction network disentangling identity, expression, and pose with adversarial 360° texture consistency; integrated 3D features into an autoregressive video diffusion pipeline for ~15 FPS upper-body synthesis and real-time 360° interactive digital humans.',
        ],
        tags: ['3DGS', 'FLUX', 'Qwen-VL', 'Video Diffusion', 'NeRF'],
      },
      {
        org: 'Lancaster University · MPIL Lab',
        role: 'Visiting Research Assistant',
        period: 'Sep 2026 — Oct 2026',
        description:
          'Embodied intelligence and multimodal behavior understanding: multi-sensor data collection, spatiotemporal synchronization, and quality governance for fine-grained robotic manipulation.',
        highlights: [
          'Data Engineering: Built a multimodal robotic collection platform synchronizing 3 RGB cameras (front, side, wrist), left/right tactile arrays, and thermal sensors; performed hand-eye calibration, exposure/gain tuning, and real-time overexposure/clipping QA, logging normal, failed, and discarded episodes by scene and task.',
        ],
        tags: [
          'Embodied Data',
          'Multimodal Curation',
          'Quality Governance',
          'Sensor Synchronization',
        ],
      },
    ],
  },

  embodied: {
    documentTitle: 'Xiaoning Huang · Embodied AI Data Engineering & 3D Vision',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Algorithm Intern',
    ],
    publicationsSummary:
      'Focused on 3D vision, embodied multimodal perception, and spatial intelligence data engineering, covering 3D reconstruction, robot localization, and detection/segmentation.',
    experienceSubtitle:
      'Procedural 3D physical simulation, spatial-geometric gating, dual-engine rendering, and robotic multimodal collection',
    contactSubtitle:
      'Open to collaboration on embodied AI data engineering, 3D physical simulation, and spatial intelligence.',
    cuhkResearch:
      'Business Track: Procedural 3D physical simulation synthesis pipelines, spatial-geometric gating operators, and multimodal data cleaning, labeling, and governance for spatial intelligence. Research Track: 3D vision and geometric representation, combining robotic multimodal collection and multi-sensor fusion localization to build a scalable 3D data loop.',
    scnuRankMeta: 'Rank 1/30 (GPA)',
    seedTimelineRole: 'Seed Data Algo Intern',
    mpilTimelineItem: {
      id: 'mpil-2026',
      role: 'MPIL Visiting RA',
      org: 'Lancaster Univ.',
      startYear: 2026,
      endYear: 2026,
    },
    experience: [
      {
        org: 'ByteDance · Seed',
        role: 'Data Algorithm Intern',
        period: 'Mar 2026 — Present',
        description:
          'Targeting spatial intelligence and physical interaction learning in foundation models, built a procedural 3D scene synthesis engine backed by 2.568M 3D assets and 10k+ deduplicated skeletal poses; supported 6-DoF pose transformations, centimeter-level scale control, and zero-interpenetration part disassembly of complex assemblies with ground-truth depth, normals, and 3D bounding boxes.',
        highlights: [
          'Geometric Quality Control: Designed 16 physical and geometric gates to resolve interpenetration, floating, and occlusion; implemented BVH-based raycast collision detection and normal push-apart resolution for zero-overlap placement, lowest-point raycast contact snapping to eliminate floating, and 12 per-view composition gates.',
          'Dual-Engine Pipeline: Unified offline path-tracing (Blender Cycles) and real-time UE5 rendering pipelines, achieving 8-stage end-to-end reproduction on dual L20 GPUs and 4096px frame-exact geometric alignment; combined dual-model 3-round prompt voting for canonical front-facing orientation calibration and symmetry filtering to derive bilingual spatial instructions, 3D spatial QA, and benchmarks.',
          'Impact: Delivered 27.83M high-fidelity motion and spatial renders, 5.245M ingested samples, and 23.1 TB of training data; boosted downstream performance on spatial relations (+12.60%), geometric transformation (+20.59%), viewpoint reference (+41.07%), and motion preservation (+36.26%), alongside a 10-step contract-gated operator-dev Agent.',
        ],
        tags: [
          '3D Simulation Engine',
          'BVH Raycast & Collision',
          'Blender Cycles & UE5',
          '6-DoF Spatial Data',
          'Embodied Benchmark',
        ],
      },
      {
        org: 'CUHK-SZ · GAP Lab',
        role: 'Research Assistant',
        period: 'Aug 2025 — Present',
        description:
          'Human-centric 3D head reconstruction and generative vision: learning disentangled, generalizable 3D Gaussian full-head representations from monocular 2D video.',
        highlights: [
          'Data Engineering: Built an automated multi-view production pipeline using FLUX and Qwen-VL to construct a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; developed controllable face synthesis to fill expression and lighting gaps for large-scale monocular 3D learning and wide-angle face recognition.',
          'Methodology R&D: Designed a template-free feedforward reconstruction network disentangling identity, expression, and pose with adversarial 360° texture consistency; connected 3D features with an autoregressive video diffusion pipeline for ~15 FPS upper-body synthesis and real-time 360° interactive digital humans.',
        ],
        tags: [
          '3DGS',
          'Multi-View Pipeline',
          'FLUX',
          'Video Diffusion',
          'NeRF',
        ],
      },
      {
        org: 'Lancaster University · MPIL Lab',
        role: 'Visiting Research Assistant',
        period: 'Sep 2026 — Oct 2026',
        description:
          'Fine-grained robotic manipulation and teleoperation: multi-sensor data acquisition and quality verification across vision, tactile arrays, thermal imaging, and proprioceptive states.',
        highlights: [
          'Data Engineering: Built a multimodal robotic collection workbench integrating 3 RGB cameras (front, side, wrist), left/right tactile arrays, thermal imaging, and teleoperation; handled hand-eye calibration, reprojection error verification, and overexposure/clipping monitoring, routing normal, failed, and discarded trajectories to storage by scene, task, and episode.',
        ],
        tags: [
          'Robotic Teleoperation',
          'Hand-Eye Calibration',
          'Tactile & Thermal Sensing',
          'Trajectory Curation',
        ],
      },
    ],
  },

  'data-dev': {
    documentTitle:
      'Xiaoning Huang · Multimodal Data Infrastructure & 3D Data Engineering',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Development Intern',
    ],
    publicationsSummary:
      'Focused on multimodal data infrastructure, distributed visual computing, and 3D/2D computer vision, covering 3D reconstruction, edge-cloud collaborative inference, and detection/segmentation.',
    experienceSubtitle:
      'Multimodal data infrastructure for foundation models: 1,000-GPU async pipeline optimization, distributed batch operators, and multi-sensor platforms',
    contactSubtitle:
      'Open to collaboration on multimodal data infrastructure, distributed data engineering, and 3D vision.',
    cuhkResearch:
      'Business Track: Multimodal data infrastructure development for foundation models, covering distributed batch operators, metadata lineage contracts, and large-scale automated cleaning pipelines. Research Track: 3D vision and multimodal data engineering, combining generative data synthesis and multi-sensor synchronous acquisition to build a high-throughput data production loop.',
    scnuRankMeta: 'Rank 1/30 (GPA)',
    seedTimelineRole: 'Seed Data Dev Intern',
    mpilTimelineItem: {
      id: 'mpil-2026',
      role: 'MPIL Visiting RA',
      org: 'Lancaster Univ.',
      startYear: 2026,
      endYear: 2026,
    },
    experience: [
      {
        org: 'ByteDance · Seed',
        role: 'Data Development Intern',
        period: 'Mar 2026 — Present',
        description:
          'Spearheaded the 5-operator end-to-end production pipeline spanning 3D rendering, image pairing, multimodal labeling, asset hosting, and render-inference coordination for Seedream; managed 45 asset buckets (2.568M 3D assets) and delivered 17 training buckets with 5.245M ingested samples.',
        highlights: [
          '1000-GPU Optimization: Refactored the 3-stage asynchronous pipeline (I/O preprocessing, persistent GPU render/inference workers, and post-processing write-back), raising per-GPU utilization on a 1,000-GPU cluster from 3.84% to 74.89% (~20× throughput gain); designed 1024px camera exploration with 4096px deterministic replay, cutting per-task render compute by 72%.',
          'Platform Governance: Architected decoupled 244-view spherical matrix capture and distributed assembly to deliver 27.83M renders and 23.1 TB of training data; built 16 geometric/exposure gates and staged heartbeat monitoring, resolving batch cache auto-eviction, headless container driver crashes, multi-region rate-limit backoff, and codec faults.',
          'Engineering Enablement: Built a 10-step contract-gated operator-dev Agent automating schema alignment, code generation, local smoke visual QA, and production write-back with a self-evolving fault rulebook for hour-level delivery; high-throughput pipelines powered cross-stage reuse, driving 93.99% editing consistency and >34% task gains.',
        ],
        tags: [
          'Distributed Data Infra',
          '1000-GPU Async Pipeline',
          'Ray & Operator Dev',
          '23.1 TB Data Lake',
          'Agentic Engineering',
        ],
      },
      {
        org: 'CUHK-SZ · GAP Lab',
        role: 'Research Assistant',
        period: 'Aug 2025 — Present',
        description:
          'Human-centric 3D head reconstruction and generative vision: learning disentangled, generalizable 3D Gaussian full-head representations from monocular 2D video.',
        highlights: [
          'Data Development: Built an automated multi-view data production pipeline using FLUX and Qwen-VL to curate a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; developed controllable face generation and attribute completion pipelines to fill expression and lighting gaps for large-scale monocular 3D learning and wide-angle face recognition.',
          'Algorithm Integration: Designed a template-free feedforward reconstruction network disentangling identity, expression, and pose with adversarial 360° texture consistency; integrated 3D reconstruction features with an autoregressive video diffusion pipeline for ~15 FPS upper-body video synthesis and real-time 360° interactive digital humans.',
        ],
        tags: [
          'Data Pipeline',
          '3DGS',
          'FLUX',
          'Qwen-VL',
          'Video Diffusion',
        ],
      },
      {
        org: 'Lancaster University · MPIL Lab',
        role: 'Visiting Research Assistant',
        period: 'Sep 2026 — Oct 2026',
        description:
          'Robotic multimodal perception and teleoperation data engineering: multi-source data acquisition and storage architecture across vision, tactile arrays, thermal imaging, and proprioception.',
        highlights: [
          'Platform Development: Co-developed a multimodal robotic acquisition system using a multiprocess queue-buffered architecture to ingest 3 RGB cameras (front, side, wrist), left/right tactile arrays, thermal sensors, and teleoperation devices; implemented hardware/host timestamp synchronization, hand-eye calibration verification, overexposure/frame-drop monitoring, and structured storage by scene, task, and episode.',
        ],
        tags: [
          'Multiprocess Queue',
          'Timestamp Sync',
          'Data Storage Architecture',
          'Robotic Data Platform',
        ],
      },
    ],
  },
}

const variantBundles: Record<CustomVariant, Record<Locale, SiteBundle>> = {
  'ai-gen': {
    zh: buildVariantBundle(profileZh, 'ai-gen', zhOverrides['ai-gen']),
    en: buildVariantBundle(profileEn, 'ai-gen', enOverrides['ai-gen']),
  },
  'aigc-data': {
    zh: buildVariantBundle(profileZh, 'aigc-data', zhOverrides['aigc-data']),
    en: buildVariantBundle(profileEn, 'aigc-data', enOverrides['aigc-data']),
  },
  embodied: {
    zh: buildVariantBundle(profileZh, 'embodied', zhOverrides.embodied),
    en: buildVariantBundle(profileEn, 'embodied', enOverrides.embodied),
  },
  'data-dev': {
    zh: buildVariantBundle(profileZh, 'data-dev', zhOverrides['data-dev']),
    en: buildVariantBundle(profileEn, 'data-dev', enOverrides['data-dev']),
  },
}

export function getVariantSiteData(
  locale: Locale,
  variant: SiteVariant = 'default',
): SiteBundle {
  if (variant === 'default') {
    return locale === 'en' ? profileEn : profileZh
  }
  return variantBundles[variant][locale]
}
