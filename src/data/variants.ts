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
      '业务方向：探索以程序化三维物理渲染合成数据提升生图大模型空间透视、物理光影理解与精准可控编辑能力的微调方法。研究方向：从事以人为本的 3D 视觉与生成式图形学研究，聚焦基于 NeRF/3DGS 与扩散模型的三维数字人表征与实时驱动。',
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
          '针对生图基座 Seedream 在精准编辑中相机、主体与光照强耦合及二维拼接缺乏物理光影自洽的问题，参与构建程序化三维物理渲染合成方案，实现三维位姿、空间尺度、材质光影与镜头参数的单变量解耦及背景稳定控制。',
        highlights: [
          '数据构建：基于百万级三维资产与上万种人体姿态库，参与设计单物体位姿变换、多物体交互、正交三视图、白模贴图分解、材质迁移、部件拆解及双参考动作驱动等十余类任务，同步导出掩码与深度信息，产出千万级高质训练样本。',
          '模型微调：参与将十余个专项训练数据桶接入 Seedream 继续预训练与监督微调流程，选取动作与空间视角等核心数据跨阶段复用，结合二维图对编辑与三联图组合训练方式，在保持通用生成能力的同时提升空间透视与物理一致性。',
          '项目成果：助力 Seedream 新版本在全集评测中整体表现与编辑一致性稳步提升，动作参考、姿态保持、几何形状、材质纹理与视角控制等专项指标提升超 30%，支撑参考生图与空间编辑落地，并参与沉淀三维合成数据训练方法论。',
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
          '方法研发：参与设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，引入对抗训练保证 360° 纹理一致性；并将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
          '数据工程：参与搭建多视图自动化生产管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集，缓解生成对抗网络的视角偏差。配合可控人脸模型开发，用生成模型补齐表情与光照缺口，为大规模单目学习与大视角人脸识别等任务提供数据。',
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
          '从事具身智能与机器人操作研究，围绕机械臂交互场景下的视觉等多模态感知信号开展表征学习与生成式建模。',
        highlights: [
          '数据工程：参与机械臂遥操作下视觉等多模态数据采集与手眼标定校验，按任务组织样本质检与落盘，支撑操作数据集构建。',
        ],
        tags: [
          'Embodied AI',
          'Multimodal Perception',
          'Teleoperation',
          'Hand-Eye Calibration',
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
      'AIGC 反事实合成数据、多模型投票打标、跨阶段数据配比与 3D 视觉研究',
    contactSubtitle:
      '欢迎就 AIGC 数据算法、合成数据工程、3D 视觉或合作研究进行交流。',
    cuhkResearch:
      '业务方向：聚焦数据驱动的生成式智能研究，探索以三维物理合成数据、投票打标与跨阶段配比驱动生图模型能力提升。研究方向：从事以人为本的 3D 视觉与生成式数据构建研究，重点为利用生成模型与三维渲染克服真实样本长尾与视角偏差。',
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
          '针对 Seedream 空间与动作编辑数据匮乏问题，参与对比视频挖掘、线下实拍与模型自蒸馏方案，针对真实视频有效转化率低且缺乏空间真值的局限，采用三维物理渲染构建反事实配对数据，打通渲染、配对与打标训练闭环。',
        highlights: [
          '数据工程：基于百万级三维资产参与构建动作、形状材质、三视图与视角变换等十余个数据桶；参与设计前期射线碰撞与接触落地门禁、中期多维逐视角过滤，以及后期多模型多轮提示词投票定标与改写，高保留率产出千万级高质数据集。',
          '配比策略：参与分析二维图对编辑与三联图组合在不同训练阶段的配比规律，推进动作与无物体视角等数百万核心样本在继续预训练与监督微调阶段跨阶段复用，并通过小模型消融实验验证白模贴图分解与尺度数据对几何理解的增益。',
          '项目成果：助力 Seedream 新版本在全集评测中编辑一致性与动作、形状、材质、视角等专项指标提升超 30%，支撑参考生图与可控编辑落地；参与搭建带契约门禁的算子开发智能体与历史调试防呆规则库，提升合成数据算子交付效率。',
        ],
        tags: [
          'Seedream',
          'Counterfactual Synthetic Data',
          'Multi-VLM Voting',
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
          '数据工程：针对单目视频大视角偏差，参与搭建多视图自动化管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集以缓解生成模型的视角偏差；配合可控人脸模型开发，用生成模型补齐表情与光照缺口，支撑大规模单目学习与大视角人脸识别。',
          '方法研发：参与设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，引入对抗训练保证 360° 纹理一致性；并将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
        ],
        tags: ['3DGS', 'FLUX', 'Qwen-VL', 'Video Diffusion', 'NeRF'],
      },
      {
        org: '英国兰卡斯特大学 · MPIL 实验室',
        role: '访学科研助理',
        period: '2026.09 — 2026.10',
        description:
          '聚焦具身智能与多模态行为理解，开展面向机械臂操作场景的视觉等多模态数据采集、时空同步与质量治理研究。',
        highlights: [
          '数据工程：参与机械臂视觉等多模态数据采集平台建设，完成相机与机械臂标定、参数配置与实时质检，支撑操作数据集生产。',
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
          '面向大模型空间智能与物理交互学习需求，基于百万级三维资产与上万种去重骨骼姿态库，参与构建程序化三维场景合成管线；支持六自由度位姿变换、精确尺度控制及复杂家电部件无碰撞拆解，同步导出深度、法线与三维包围盒。',
        highlights: [
          '几何质控：针对合成场景中的穿模、腾空与遮挡问题，参与设计十余项物理与几何门控；实现基于包围盒层次结构的射线碰撞检测与法线推离消解以抑制穿模重叠，结合最低点射线接触感知落地消除物体悬浮，并通过逐视角门禁保障构图合理。',
          '双擎管线：参与打通离线路径追踪与 UE5 实时渲染管线，完成多阶段链路复现与高分辨率逐帧几何对齐校验；结合多模态模型多轮提示词投票完成物体正面朝向标定与对称物体剔除，参与构建双语空间操作指令、三维空间问答与评测数据。',
          '项目成果：配合千卡级分布式渲染稳定产出千万级高保真动作与空间变换样本及数十 TB 训练数据；助力下游模型在空间关系、几何变换、视角参考与动作保持等任务上取得显著提升，并参与搭建算子开发智能体以规范化算子开发流程。',
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
          '数据工程：参与搭建多视图自动化生产管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集，缓解生成对抗网络的视角偏差。配合可控人脸模型开发，用生成模型补齐表情与光照缺口，为大规模单目三维学习与大视角人脸识别提供数据支撑。',
          '方法研发：参与设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，引入对抗训练保证 360° 纹理一致性；并将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
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
          '围绕具身智能机械臂操作与遥操作任务，开展视觉等多模态传感器数据采集、时空同步对齐与数据质量校验研究。',
        highlights: [
          '数据工程：参与机械臂视觉等多模态数据采集工作台建设，完成手眼标定、误差校验与异常监测，按任务分流轨迹并规范落盘。',
        ],
        tags: [
          'Robotic Teleoperation',
          'Hand-Eye Calibration',
          'Multimodal Sensing',
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
      '业务方向：聚焦大模型多模态数据基础设施开发，涵盖分布式批处理算子研发、元数据血缘契约与大规模自动化清洗管线。研究方向：从事三维视觉与多模态数据工程研究，结合生成式数据构建与多源传感器同步采集，构建稳定的数据生产闭环。',
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
          '面向 Seedream 大规模训练数据需求，参与打通三维渲染、图像配对、多模态打标、资产托管与渲染推理协同的五算子链路；参与维护数十个资产桶共百万级三维资产，构建并交付动作、形状材质与视角等十余个专项训练数据桶。',
        highlights: [
          '千卡调优：参与优化预处理输入输出、GPU 渲染推理与后处理回写三阶段异步流水线及进程常驻方案，显著提升千卡集群单卡 GPU 利用率与整体吞吐；结合低分辨率探索机位与高分辨率确定性重放机制，大幅降低单任务无效渲染算力开销。',
          '平台治理：参与开发球面多视角矩阵高频采集与分布式组装解耦流程，配合交付千万级渲染图像与数十 TB 训练数据；参与建设十余项几何曝光门控与分阶段心跳监控，排查解决批处理缓存清理、无头容器驱动异常、多地域限流与编解码问题。',
          '工程效率：参与搭建带契约门禁的算子开发智能体，串联模式对齐、代码生成、冒烟视觉抽检与线上回写流程，并从历史调试日志整理防呆规则库以提升算子交付效率；支撑数百万核心样本跨阶段训练复用，助力下游模型专项能力显著提升。',
        ],
        tags: [
          'Distributed Data Infra',
          '1000-GPU Async Pipeline',
          'Ray & Operator Dev',
          'Multi-TB Data Lake',
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
          '数据开发：参与搭建多视图自动化数据生产管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集以缓解生成对抗网络的视角偏差；参与可控人脸生成与属性补齐流水线开发，补齐表情与光照缺口，支撑大规模单目三维学习与大视角人脸识别。',
          '算法集成：参与设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，引入对抗训练保证 360° 纹理一致性；并将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
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
          '围绕机器人多模态感知与遥操作数据工程，开展机械臂交互场景下视觉等多模态数据采集、同步与存储架构研究。',
        highlights: [
          '平台开发：参与机械臂视觉等多模态采集系统开发，基于多进程队列架构完成时间戳同步、标定校验、异常监测与结构化落盘。',
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
      'Business Track: Exploring fine-tuning methods using procedural 3D physical rendering synthetic data to improve spatial perspective, physical lighting understanding, and controllable editing in large image generation models. Research Track: Human-centric 3D vision and generative graphics, focusing on NeRF/3DGS and diffusion-based 3D digital human representation and real-time driving.',
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
          'Addressed camera–subject–lighting coupling and physical shading consistency challenges in 2D compositing for the Seedream image generation model by participating in building a procedural 3D physical rendering synthesis scheme, enabling single-variable disentanglement across 3D pose, spatial scale, material shading, and camera parameters.',
        highlights: [
          'Data Construction: Based on a million-scale 3D asset library and 10k+ human poses, participated in designing 10+ task types covering single-object pose transformation, multi-object interaction, orthographic 3-views, clay-texture decomposition, material transfer, part disassembly, and dual-reference motion driving with masks and depth, producing 10M-scale training samples.',
          'Model Fine-Tuning: Participated in integrating 10+ specialized data buckets into Continue Pre-training (CPT) and Supervised Fine-Tuning (SFT) of Seedream, reusing core motion and viewpoint subsets across stages with 2D pair editing and triplet composition training to improve spatial perspective and physical consistency.',
          'Project Outcomes: Contributed to steady improvements in overall performance and editing consistency on the full benchmark for the new Seedream version, with >30% gains across motion reference, pose preservation, geometric shape, material texture, and viewpoint control.',
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
          'Methodology R&D: Participated in designing a template-free feedforward reconstruction network disentangling single images into identity, expression, and pose factors with adversarial training for 360° texture consistency; connected 3D reconstruction features with an autoregressive video diffusion pipeline for ~15 FPS upper-body synthesis and real-time 360° interactive digital humans.',
          'Data Engineering: Participated in building an automated multi-view production pipeline using FLUX and Qwen-VL to construct a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; assisted in controllable face synthesis to fill expression and lighting gaps for large-scale monocular learning and wide-angle face recognition.',
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
          'Embodied intelligence and robotic manipulation research: representation learning and generative modeling around visual and multimodal perception signals in robotic interaction scenes.',
        highlights: [
          'Data Engineering: Participated in visual and multimodal data acquisition and hand-eye calibration verification under robotic teleoperation, organizing task-level sample QA and storage to support manipulation dataset construction.',
        ],
        tags: [
          'Embodied AI',
          'Multimodal Perception',
          'Teleoperation',
          'Hand-Eye Calibration',
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
      'Counterfactual 3D synthetic data, multi-model voting labeling, cross-stage curriculum, and 3D vision',
    contactSubtitle:
      'Open to collaboration on AIGC data algorithms, synthetic data engineering, and 3D vision.',
    cuhkResearch:
      'Business Track: Data-centric generative AI research, exploring 3D physical synthetic data, VLM voting labeling, and cross-stage data mixing to improve large image generation models. Research Track: Human-centric 3D vision and generative data curation, leveraging generative models and 3D rendering to overcome long-tail and viewpoint bias in real data.',
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
          'Addressed the scarcity of spatial and motion editing data for Seedream by participating in comparing video mining (low conversion yield and limited spatial ground truth), real capture, and self-distillation; adopted 3D physical rendering to construct counterfactual paired data across the rendering, pairing, labeling, and training loop.',
        highlights: [
          'Data Engineering: Participated in constructing 10+ data buckets (motion, shape/material, 3-views, viewpoint transformation, etc.) from million-scale 3D assets; participated in designing pre-render raycast collision & ground-contact gates, mid-stage multi-dimensional per-view visual filtering, and post-stage multi-model multi-round prompt voting & rewriting to produce a 10M-scale high-retention dataset.',
          'Mixing Strategy: Participated in analyzing mixing ratios between 2D image-pair editing and triplet composition across training stages; supported cross-stage reuse of multi-million core motion and viewpoint samples across CPT and SFT, and validated geometric gains from clay-texture decomposition and scale data via small-model ablations.',
          'Project Outcomes: Contributed to >30% improvements in editing consistency and motion, shape, material, and viewpoint metrics on the full Seedream benchmark; participated in building a contract-gated operator-dev Agent and debugging rulebook to improve operator delivery efficiency.',
        ],
        tags: [
          'Seedream',
          'Counterfactual Synthetic Data',
          'Multi-VLM Voting',
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
          'Data Engineering: Participated in building an automated multi-view data production pipeline using FLUX and Qwen-VL to curate a 10M-scale balanced dataset mitigating viewpoint bias; assisted in controllable face synthesis to fill expression and lighting gaps for large-scale monocular learning and wide-angle face recognition.',
          'Methodology R&D: Participated in designing a template-free feedforward reconstruction network disentangling identity, expression, and pose with adversarial 360° texture consistency; integrated 3D features into an autoregressive video diffusion pipeline for ~15 FPS upper-body synthesis and real-time 360° interactive digital humans.',
        ],
        tags: ['3DGS', 'FLUX', 'Qwen-VL', 'Video Diffusion', 'NeRF'],
      },
      {
        org: 'Lancaster University · MPIL Lab',
        role: 'Visiting Research Assistant',
        period: 'Sep 2026 — Oct 2026',
        description:
          'Focused on embodied intelligence and multimodal behavior understanding, conducting research on visual and multimodal data acquisition, spatiotemporal synchronization, and quality governance in robotic manipulation.',
        highlights: [
          'Data Engineering: Participated in building a visual and multimodal robotic data acquisition platform, completing camera-to-arm calibration, parameter configuration, and real-time QA to support manipulation dataset production.',
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
          'Targeting spatial intelligence and physical interaction learning in foundation models, participated in building a procedural 3D scene synthesis pipeline backed by million-scale 3D assets and 10k+ deduplicated skeletal poses; supported 6-DoF pose transformations, precise scale control, and collision-free part disassembly with depth, normals, and 3D bounding boxes.',
        highlights: [
          'Geometric Quality Control: Participated in designing 10+ physical and geometric gates to address interpenetration, floating, and occlusion; implemented BVH-based raycast collision detection and normal push-apart resolution to reduce overlap, lowest-point raycast contact snapping to eliminate floating, and per-view composition gates.',
          'Dual-Engine Pipeline: Participated in integrating offline path-tracing and real-time UE5 rendering pipelines, completing multi-stage pipeline reproduction and high-resolution frame-level geometric alignment verification; combined multimodal multi-round prompt voting for front-facing orientation calibration and symmetry filtering to construct bilingual spatial instructions and 3D spatial QA data.',
          'Project Outcomes: Supported 1,000-GPU distributed rendering to steadily produce 10M-scale high-fidelity motion and spatial samples and tens of TB of training data; contributed to significant downstream gains on spatial relations, geometric transformation, viewpoint reference, and motion preservation, and assisted in building the operator-dev Agent.',
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
          'Data Engineering: Participated in building an automated multi-view production pipeline using FLUX and Qwen-VL to construct a 10M-scale balanced dataset mitigating viewpoint bias; assisted in controllable face synthesis to fill expression and lighting gaps for large-scale monocular 3D learning and wide-angle face recognition.',
          'Methodology R&D: Participated in designing a template-free feedforward reconstruction network disentangling identity, expression, and pose with adversarial 360° texture consistency; connected 3D features with an autoregressive video diffusion pipeline for ~15 FPS upper-body synthesis and real-time 360° interactive digital humans.',
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
          'Focused on embodied robotic arm manipulation and teleoperation tasks, conducting research on visual and multimodal sensor data acquisition, spatiotemporal alignment, and quality verification.',
        highlights: [
          'Data Engineering: Participated in building a visual and multimodal robotic data collection workbench, completing hand-eye calibration, error verification, and anomaly monitoring to curate and store task trajectories.',
        ],
        tags: [
          'Robotic Teleoperation',
          'Hand-Eye Calibration',
          'Multimodal Sensing',
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
      'Business Track: Multimodal data infrastructure development for foundation models, covering distributed batch operators, metadata lineage contracts, and large-scale automated cleaning pipelines. Research Track: 3D vision and multimodal data engineering, combining generative data synthesis and multi-sensor synchronous acquisition to build a reliable data production loop.',
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
          'Participated in building the 5-operator production pipeline spanning 3D rendering, image pairing, multimodal labeling, asset hosting, and render-inference coordination for Seedream; assisted in maintaining dozens of asset buckets (million-scale 3D assets) and delivering 10+ specialized training data buckets.',
        highlights: [
          '1000-GPU Optimization: Participated in optimizing the 3-stage asynchronous pipeline (I/O preprocessing, persistent GPU render/inference workers, and post-processing write-back), significantly improving per-GPU utilization and overall throughput on the 1,000-GPU cluster; combined low-resolution camera exploration with high-resolution deterministic replay to substantially cut redundant render compute.',
          'Platform Governance: Participated in developing spherical multi-view matrix capture and distributed assembly workflows to help deliver 10M-scale renders and tens of TB of training data; assisted in building 10+ geometric/exposure gates and staged heartbeat monitoring, troubleshooting batch cache cleanup, headless container driver issues, multi-region rate limiting, and codec errors.',
          'Engineering Efficiency: Participated in building a contract-gated operator-dev Agent connecting schema alignment, code generation, smoke visual QA, and production write-back, while organizing a debugging rulebook from historical logs to improve operator delivery efficiency; supported cross-stage reuse of multi-million core samples, contributing to significant downstream task gains.',
        ],
        tags: [
          'Distributed Data Infra',
          '1000-GPU Async Pipeline',
          'Ray & Operator Dev',
          'Multi-TB Data Lake',
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
          'Data Development: Participated in building an automated multi-view data production pipeline using FLUX and Qwen-VL to curate a 10M-scale balanced dataset mitigating viewpoint bias; participated in controllable face generation and attribute completion pipelines to fill expression and lighting gaps for large-scale monocular 3D learning and wide-angle face recognition.',
          'Algorithm Integration: Participated in designing a template-free feedforward reconstruction network disentangling identity, expression, and pose with adversarial 360° texture consistency; integrated 3D reconstruction features with an autoregressive video diffusion pipeline for ~15 FPS upper-body video synthesis and real-time 360° interactive digital humans.',
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
          'Focused on robotic multimodal perception and teleoperation data engineering, conducting research on visual and multimodal data acquisition, synchronization, and storage architecture in robotic interaction scenes.',
        highlights: [
          'Platform Development: Participated in developing a visual and multimodal robotic acquisition system based on a multiprocess queue architecture, implementing timestamp synchronization, calibration verification, anomaly monitoring, and structured storage.',
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
