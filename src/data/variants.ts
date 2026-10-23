import type {
  Education,
  Experience,
  Locale,
  PracticeTimelineItem,
  Project,
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
  projectDescriptions: readonly string[]
  seedTimelineRole: string
  mpilTimelineItem: PracticeTimelineItem
}

const zhProjectDescriptions: readonly string[] = [
  '参与基础设施智能巡检系统的算法设计与落地，协助优化轻量化模型及边缘侧部署效率，提升低空复杂背景下小目标识别精度。参与基于遥感图像的目标识别与保险定损一体化框架搭建，配合巡检作业与定损理赔业务协同。',
  '参与构建用于测量学生课堂学习状态的评价模型，引入面部情感识别、语音语义分析等技术对学生个体状态进行多角度、持续性课堂评价，为教师改进教学设计、提升课堂质量提供反馈参考。',
  '结合传统移动通信干扰源排查流程，参与研发目标检测算法，采用无人机搭载检测器对高处、隐蔽处天线进行检测以辅助人工巡检，补充天线干扰源目标检测场景下的样本与模型方案。',
  '参与构建高校课堂学生人脸情感识别模型，采用基于边缘的双通道特征融合模型进行特征提取，通过 MSAFNet 网络进行表情分类，并引入 PAD 三维情感模型开展情感投入评估。',
]

const enProjectDescriptions: readonly string[] = [
  'Participated in algorithm design and deployment for infrastructure inspection, optimizing lightweight models and edge deployment efficiency to improve small-object recognition in complex low-altitude scenes. Participated in building an integrated remote-sensing recognition and insurance loss assessment framework.',
  'Participated in building evaluation models for student classroom learning states using facial emotion recognition, speech semantics, and multi-angle continuous assessment to support instructional improvement.',
  'Participated in developing object detection algorithms for antenna interference inspection with UAV-mounted sensors, assisting manual checks on hard-to-reach antennas and enriching training samples and detection models for this scenario.',
  'Participated in building classroom facial emotion recognition with edge-based dual-channel feature fusion, MSAFNet expression classification, and PAD 3D affective modeling for engagement assessment.',
]

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

  const projects: Project[] = base.profile.projects.map((proj, idx) => ({
    ...proj,
    description: override.projectDescriptions[idx] ?? proj.description,
  }))

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
      projects,
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
    projectDescriptions: zhProjectDescriptions,
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
          '针对生图基座 Seedream 在精准编辑中相机、主体与光照强耦合及二维拼接缺乏物理光影自洽的问题，参与构建程序化三维物理渲染合成方案，实现六自由度位姿、厘米级尺度、材质光影与镜头焦段的单变量解耦及背景稳定控制。',
        highlights: [
          '数据构建：基于 256.8 万件三维资产库，参与设计单物体入景与位姿变换、多物体交互、正交三视图、白模与贴图内在分解、跨物体材质迁移、部件拆解及双参考动作驱动等任务，同步导出掩码与深度信息，累计入表 524.5 万高质量训练样本。',
          '模型微调：参与将 17 个专项训练数据桶接入 Seedream 继续预训练与监督微调流程，选取动作与空间视角等 10 个核心桶共 337 万样本跨阶段复用，结合二维图对编辑与三联图组合训练方式，在保持通用生成能力的同时提升空间透视与物理一致性。',
          '项目成果：助力 Seedream 新版本在七千余条全集评测中总分提升 5.31%、编辑一致性达 93.99%；其中动作参考、实体动作保持、形状轮廓保持、材质纹理与视角参考分别提升 34.64%、36.26%、36.36%、38.89% 与 41.07%，支撑参考与空间编辑落地。',
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
          '方法研发：参与设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，引入对抗训练保证 360° 纹理一致性。进一步将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 的高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
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
      '业务方向：聚焦数据驱动的生成式智能研究，探索以三维物理合成数据、投票打标与跨阶段配比驱动生图模型能力提升。研究方向：从事以人为本的 3D 视觉与生成式数据构建研究，重点为利用生成模型与三维渲染克服真实样本长尾与视角偏差。',
    scnuRankMeta: '绩点排名 1/30',
    projectDescriptions: zhProjectDescriptions,
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
          '针对 Seedream 空间与动作编辑数据匮乏问题，参与对比视频挖掘、线下实拍与模型自蒸馏方案，针对视频挖掘仅 1.5% 转化率且缺乏空间真值的局限，采用三维物理渲染构建反事实配对数据，打通渲染、配对、打标与训练评测完整链路。',
        highlights: [
          '数据工程：基于 256.8 万件三维资产参与构建动作、形状材质、三视图与视角变换等 17 个数据桶；参与设计前期射线碰撞与接触落地几何门禁、中期 12 项逐视角视觉过滤，以及后期双模型三轮提示词投票定标与改写，以 79.6% 保留率入表 524.5 万样本。',
          '配比策略：参与分析二维图对编辑与三联图组合在不同训练阶段的配比规律，推进动作与无物体视角共 337 万核心样本在继续预训练与监督微调阶段跨阶段复用，并通过小模型消融实验验证三维白模贴图分解与厘米级尺度数据对几何理解的增益。',
          '项目成果：助力 Seedream 新版本全集评测编辑一致性达 93.99%，动作参考、动作保持、形状保持、材质与视角参考分别提升 34.64% 至 41.07%；参与搭建带契约门禁的算子开发智能体与历史调试防呆规则库，有效提升合成数据算子的开发与交付效率。',
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
          '数据工程：针对单目视频大视角偏差，参与搭建多视图自动化管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集以缓解生成对抗网络的视角偏差；配合可控人脸模型开发，用生成模型补齐表情与光照缺口，支撑大规模单目学习与大视角人脸识别。',
          '方法研发：参与设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，引入对抗训练保证 360° 纹理一致性。进一步将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 的高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
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
    projectDescriptions: zhProjectDescriptions,
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
          '面向大模型空间智能与物理交互学习需求，基于 256.8 万件三维资产与万种去重骨骼姿态库，参与构建程序化三维场景合成管线；支持六自由度位姿变换、厘米级尺度及复杂家电部件无碰撞拆解，同步导出深度、法线与三维包围盒信息。',
        highlights: [
          '几何质控：针对合成场景中的穿模、腾空与遮挡问题，参与设计 16 项物理与几何门控；实现基于包围盒层次结构的射线碰撞检测与法线推离消解以抑制穿模重叠，结合最低点射线接触感知落地消除物体悬浮，并通过 12 项逐视角门禁保障构图合理。',
          '双擎管线：参与打通离线路径追踪与 UE5 实时渲染管线，完成双卡 L20 下八阶段链路复现与 4096 分辨率逐帧几何对齐校验；结合双模型三轮提示词投票完成物体正面朝向标定与对称剔除，参与构建双语空间操作指令、三维空间问答与评测数据。',
          '项目成果：参与完成 2,783 万张高保真动作与空间渲染、524.5 万样本入表及 23.1 TB 数据交付；助力下游模型在空间关系、几何变换、视角参考与动作保持任务上分别提升 12.60%、20.59%、41.07% 与 36.26%，并参与搭建算子开发智能体。',
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
          '方法研发：参与设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，引入对抗训练保证 360° 纹理一致性。进一步将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 的高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
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
          '数据工程：参与机械臂多模态采集工作台建设，打通正侧腕三路彩色相机、左右触觉阵列、热成像与遥操作同步采集链路；参与手眼标定、重投影误差校验与过曝截断监测，按场景、任务与回合分流正常、失败与废弃轨迹并落盘，支撑具身数据集生产。',
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
      '业务方向：聚焦大模型多模态数据基础设施开发，涵盖分布式批处理算子研发、元数据血缘契约与大规模自动化清洗管线。研究方向：从事三维视觉与多模态数据工程研究，结合生成式数据构建与多源传感器同步采集，构建稳定的数据生产闭环。',
    scnuRankMeta: '绩点排名 1/30',
    projectDescriptions: zhProjectDescriptions,
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
          '面向 Seedream 大规模训练数据需求，参与打通三维渲染、图像配对、多模态打标、资产托管与渲染推理协同的五算子链路；参与维护 45 个资产桶共 256.8 万件三维资产，构建并交付动作、形状材质与视角等 17 个训练桶共 524.5 万样本。',
        highlights: [
          '千卡调优：参与优化预处理输入输出、GPU 渲染推理与后处理回写三阶段异步流水线及进程常驻方案，将集群单卡 GPU 利用率从 3.84% 提升至 74.89%；结合 1024 分辨率探索机位与 4096 分辨率确定性重放机制，单任务节省约 72% 渲染耗时。',
          '平台治理：参与开发 244 球面视角矩阵采集与分布式组装解耦流程，配合交付 2,783 万张渲染图与 23.1 TB 训练数据；参与建设 16 项几何曝光门控与分阶段心跳监控，排查解决批处理缓存清理、无头容器驱动异常、多地域限流退避及编解码问题。',
          '工程效率：参与搭建带契约门禁的算子开发智能体，串联模式对齐、代码生成、冒烟视觉抽检与线上回写流程，并从历史调试日志整理防呆规则库以提升算子开发效率；支撑训练数据跨阶段复用，助力下游模型编辑一致性达 93.99%、专项提升超 34%。',
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
          '数据开发：参与搭建多视图自动化数据生产管线，基于 FLUX 与 Qwen-VL 构建千万级样本平衡数据集以缓解生成对抗网络的视角偏差；参与可控人脸生成与属性补齐流水线开发，补齐表情与光照缺口，支撑大规模单目三维学习与大视角人脸识别。',
          '算法集成：参与设计无模板前馈重建网络，将单图解耦为身份、表情与姿态三类可控因子，引入对抗训练保证 360° 纹理一致性。进一步将 3D 重建特征对接自回归视频扩散管线，实现约 15 FPS 的高保真上半身视频合成，支撑实时 360° 交互式数字人合成。',
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
      'Business Track: Exploring fine-tuning methods using procedural 3D physical rendering synthetic data to improve spatial perspective, physical lighting understanding, and controllable editing in image generation models. Research Track: Human-centric 3D vision and generative graphics, focusing on NeRF/3DGS and diffusion-based 3D digital human representation and real-time driving.',
    scnuRankMeta: 'Rank 1/30 (GPA)',
    projectDescriptions: enProjectDescriptions,
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
          'To address camera–subject–lighting coupling and lack of physical shading consistency in 2D compositing for Seedream, participated in building a procedural 3D physical rendering synthesis scheme, enabling single-variable disentanglement across 6-DoF pose, centimeter-level scale, material shading, and focal length with stable background control.',
        highlights: [
          'Data Construction: Based on a 2.568M 3D asset library, participated in designing tasks including single-object insertion & pose transformation, multi-object interaction, orthographic 3-views, clay-to-texture intrinsic decomposition, cross-object material transfer, part disassembly, and dual-reference motion driving with masks and depth maps, contributing 5.245M training samples.',
          'Model Fine-Tuning: Participated in integrating 17 specialized data buckets into Seedream Continue Pre-training (CPT) and Supervised Fine-Tuning (SFT), reusing 10 core motion and viewpoint buckets (3.37M samples) across stages with 2D pair editing and triplet composition training to improve spatial perspective and physical consistency.',
          'Project Outcomes: Supported the new Seedream version in achieving a +5.31% overall score improvement and 93.99% editing consistency across 7,000+ evaluation prompts, with gains in motion reference (+34.64%), entity motion preservation (+36.26%), shape contour preservation (+36.36%), material texture (+38.89%), and viewpoint reference (+41.07%).',
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
          'Data Engineering: Participated in building an automated multi-view production pipeline using FLUX and Qwen-VL to construct a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; contributed to controllable face model development to fill expression and lighting gaps for large-scale monocular learning and wide-angle face recognition.',
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
          'Data Engineering: Participated in building a multimodal robotic teleoperation collection platform synchronously recording 3 RGB views (front, side, wrist), left/right tactile arrays, thermal imaging, and joint poses; completed hand-eye calibration, extrinsic alignment, and pixel-error verification to curate scene/task/episode datasets for policy learning and generative interaction modeling.',
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
      'Business Track: Data-centric generative AI research, exploring 3D physical synthetic data, multi-round voting labeling, and cross-stage data mixing to improve image generation models. Research Track: Human-centric 3D vision and generative data construction, leveraging generative models and 3D rendering to mitigate long-tail and viewpoint bias in real samples.',
    scnuRankMeta: 'Rank 1/30 (GPA)',
    projectDescriptions: enProjectDescriptions,
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
          'To address the shortage of spatial and motion editing data for Seedream, participated in comparing video mining (1.5% conversion yield and lacking spatial ground truth), real capture, and self-distillation, adopting 3D physical rendering to construct counterfactual paired data across the rendering, pairing, labeling, and training evaluation pipeline.',
        highlights: [
          'Data Engineering: Participated in building 17 data buckets (motion, shape/material, 3-views, viewpoint transformation, etc.) from 2.568M 3D assets; contributed to pre-render raycast collision & ground-contact gates, mid-stage 12-metric per-view visual filtering, and post-stage dual-model 3-round prompt voting & rewriting, achieving a 79.6% retention rate and 5.245M ingested samples.',
          'Mixing Strategy: Participated in analyzing mixing ratios between 2D image-pair editing and triplet composition across training stages, reusing 3.37M core motion and viewpoint samples across CPT and SFT, and validating geometric gains from clay-texture intrinsic decomposition and centimeter-scale data via small-model ablations.',
          'Project Outcomes: Supported the new Seedream version in reaching 93.99% editing consistency on the full benchmark, with motion reference, motion preservation, shape preservation, material, and viewpoint reference improving by +34.64% to +41.07%; participated in building a contract-gated operator-dev Agent and debugging rulebook to improve operator delivery efficiency.',
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
          'Data Engineering: Participated in building an automated multi-view data production pipeline using FLUX and Qwen-VL to curate a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; contributed to controllable face model development to fill expression and lighting gaps for large-scale monocular learning and wide-angle face recognition.',
          'Methodology R&D: Participated in designing a template-free feedforward reconstruction network disentangling identity, expression, and pose with adversarial 360° texture consistency; integrated 3D features into an autoregressive video diffusion pipeline for ~15 FPS upper-body synthesis and real-time 360° interactive digital humans.',
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
          'Data Engineering: Participated in building a multimodal robotic collection platform synchronizing 3 RGB cameras (front, side, wrist), left/right tactile arrays, and thermal sensors; completed hand-eye calibration, exposure/gain tuning, and real-time overexposure/clipping QA, logging normal, failed, and discarded episodes by scene and task.',
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
    projectDescriptions: enProjectDescriptions,
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
          'Targeting spatial intelligence and physical interaction learning in foundation models, participated in building a procedural 3D scene synthesis pipeline based on 2.568M 3D assets and 10k+ deduplicated skeletal poses; supported 6-DoF pose transformations, centimeter-level scale control, and collision-free part disassembly with depth, normals, and 3D bounding boxes.',
        highlights: [
          'Geometric Quality Control: Participated in designing 16 physical and geometric gates to address interpenetration, floating, and occlusion; implemented BVH-based raycast collision detection and normal push-apart resolution to suppress overlap, lowest-point raycast contact snapping to eliminate floating, and 12 per-view composition gates.',
          'Dual-Engine Pipeline: Participated in connecting offline path-tracing (Blender Cycles) and real-time UE5 rendering pipelines, completing 8-stage pipeline reproduction on dual L20 GPUs and 4096px per-frame geometric alignment verification; combined dual-model 3-round prompt voting for front-facing orientation calibration and symmetry filtering to build bilingual spatial instructions, 3D spatial QA, and evaluation data.',
          'Project Outcomes: Participated in delivering 27.83M motion and spatial renders, 5.245M ingested samples, and 23.1 TB of training data; supported downstream gains on spatial relations (+12.60%), geometric transformation (+20.59%), viewpoint reference (+41.07%), and motion preservation (+36.26%), and contributed to building an operator-dev Agent.',
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
          'Data Engineering: Participated in building an automated multi-view production pipeline using FLUX and Qwen-VL to construct a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; contributed to controllable face model development to fill expression and lighting gaps for large-scale monocular 3D learning and wide-angle face recognition.',
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
          'Fine-grained robotic manipulation and teleoperation: multi-sensor data acquisition and quality verification across vision, tactile arrays, thermal imaging, and proprioceptive states.',
        highlights: [
          'Data Engineering: Participated in building a multimodal robotic collection workbench connecting 3 RGB cameras (front, side, wrist), left/right tactile arrays, thermal imaging, and teleoperation; participated in hand-eye calibration, reprojection error verification, and overexposure/clipping monitoring, routing normal, failed, and discarded trajectories to storage by scene, task, and episode.',
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
      'Business Track: Multimodal data infrastructure development for foundation models, covering distributed batch operators, metadata lineage contracts, and large-scale automated cleaning pipelines. Research Track: 3D vision and multimodal data engineering, combining generative data synthesis and multi-sensor synchronous acquisition to build a reliable data production loop.',
    scnuRankMeta: 'Rank 1/30 (GPA)',
    projectDescriptions: enProjectDescriptions,
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
          'Targeting large-scale training data needs for Seedream, participated in connecting the 5-operator production pipeline spanning 3D rendering, image pairing, multimodal labeling, asset hosting, and render-inference coordination; participated in maintaining 45 asset buckets (2.568M 3D assets) and delivering 17 training buckets with 5.245M ingested samples.',
        highlights: [
          '1000-GPU Optimization: Participated in optimizing the 3-stage asynchronous pipeline (I/O preprocessing, persistent GPU render/inference workers, and post-processing write-back), improving per-GPU utilization from 3.84% to 74.89%; combined 1024px camera exploration with 4096px deterministic replay to reduce per-task render time by ~72%.',
          'Platform Governance: Participated in developing decoupled 244-view spherical matrix capture and distributed assembly workflows, helping deliver 27.83M renders and 23.1 TB of training data; contributed to 16 geometric/exposure gates and staged heartbeat monitoring, troubleshooting batch cache cleanup, headless container driver issues, multi-region rate-limit backoff, and codec errors.',
          'Engineering Efficiency: Participated in building a contract-gated operator-dev Agent connecting schema alignment, code generation, smoke visual QA, and online write-back, and compiled a debugging rulebook from historical logs to improve operator development efficiency; supported cross-stage data reuse, helping downstream models reach 93.99% editing consistency and >34% task gains.',
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
          'Data Development: Participated in building an automated multi-view data production pipeline using FLUX and Qwen-VL to curate a 10M-scale balanced dataset mitigating viewpoint bias in 3D GANs; participated in developing controllable face generation and attribute completion pipelines to fill expression and lighting gaps for large-scale monocular 3D learning and wide-angle face recognition.',
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
          'Robotic multimodal perception and teleoperation data engineering: multi-source data acquisition and storage architecture across vision, tactile arrays, thermal imaging, and proprioception.',
        highlights: [
          'Platform Development: Participated in developing a multimodal robotic acquisition system using a multiprocess queue-buffered architecture to ingest 3 RGB cameras (front, side, wrist), left/right tactile arrays, thermal sensors, and teleoperation devices; implemented hardware/host timestamp synchronization, hand-eye calibration verification, overexposure/frame-drop monitoring, and structured storage by scene, task, and episode.',
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
