import type {
  Education,
  Experience,
  Locale,
  PracticeTimelineItem,
  Publication,
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
  publications?: Publication[]
  seedTimelineRole: string
  mpilTimelineItem: PracticeTimelineItem
}

function build1112Publications(
  basePubs: Publication[],
  locale: Locale,
): Publication[] {
  const cutTex: Publication =
    locale === 'zh'
      ? {
          title:
            'CutTex: Sharp Heat Kernel Textures via Learnable Cuts and Heights',
          venue:
            'The IEEE / CVF Computer Vision and Pattern Recognition Conference (CVPR) 2027',
          venueMeta: 'CCF-A 会议',
          status: 'submitted',
          role: '第二作者',
          tags: [
            'Surface Texture',
            '3D Representation',
            'Computer Graphics',
          ],
          abstract:
            'We explore a UV-free surface texture representation defined directly on 3D meshes to preserve sharp boundaries and high-contrast patterns with compact storage. (Under review.)',
        }
      : {
          title:
            'CutTex: Sharp Heat Kernel Textures via Learnable Cuts and Heights',
          venue:
            'The IEEE / CVF Computer Vision and Pattern Recognition Conference (CVPR) 2027',
          venueMeta: 'CCF-A Conference',
          status: 'submitted',
          role: '2nd Author',
          tags: [
            'Surface Texture',
            '3D Representation',
            'Computer Graphics',
          ],
          abstract:
            'We explore a UV-free surface texture representation defined directly on 3D meshes to preserve sharp boundaries and high-contrast patterns with compact storage. (Under review.)',
        }

  const findPub = (keyword: string) =>
    basePubs.find((p) => p.title.includes(keyword))!

  const leps = findPub('LEPS:')
  const infiHead = {
    ...findPub('InfiHead:'),
    role: locale === 'zh' ? '共一作者' : 'Co-1st Author',
  }
  const msFdd = findPub('MS-FDD:')
  const das = {
    ...findPub('DAS:'),
    role: locale === 'zh' ? '第二作者' : '2nd Author',
  }
  const rest = basePubs.filter(
    (p) =>
      !p.title.includes('LEPS:') &&
      !p.title.includes('InfiHead:') &&
      !p.title.includes('MS-FDD:') &&
      !p.title.includes('DAS:'),
  )

  return [leps, cutTex, infiHead, msFdd, das, ...rest]
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
      publications: override.publications ?? base.profile.publications,
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

const zhGapExperience: Experience = {
  org: '香港中文大学（深圳） · GAP 实验室',
  role: '科研助理',
  period: '2025.08 — 至今',
  description:
    '从事以人为本的三维视觉与数字人研究，围绕单目三维头部表征与可控生成开展探索。',
  highlights: [
    '数据构建：参与多视角头部与人脸数据自动化处理管线搭建，缓解单目数据在大视角与光照分布上的偏差。',
    '方法研究：参与可解耦三维头部重建与数字人驱动算法研发，提升多视角几何与纹理一致性。',
  ],
  tags: ['3DGS', '3D Head Avatar', 'Monocular Reconstruction'],
}

const zhMpilExperience: Experience = {
  org: '英国兰卡斯特大学 · MPIL 实验室',
  role: '访学科研助理',
  period: '2026.09 — 2026.10',
  description:
    '围绕具身智能与机器人操作场景，参与视觉等多模态数据采集与质量治理研究。',
  highlights: [
    '工作内容：参与机械臂多模态数据采集平台搭建、手眼标定校验与数据质检整理，支撑操作数据集构建。',
  ],
  tags: ['Embodied AI', 'Multimodal Data', 'Robotic Manipulation'],
}

const enGapExperience: Experience = {
  org: 'CUHK-SZ · GAP Lab',
  role: 'Research Assistant',
  period: 'Aug 2025 — Present',
  description:
    'Human-centric 3D vision and digital avatar research, focusing on monocular 3D head representation and controllable generation.',
  highlights: [
    'Data Curation: Participated in building automated multi-view head and face data pipelines to mitigate wide-angle and lighting distribution bias.',
    'Method R&D: Participated in developing disentangled 3D head reconstruction and avatar driving methods for multi-view geometric and appearance consistency.',
  ],
  tags: ['3DGS', '3D Head Avatar', 'Monocular Reconstruction'],
}

const enMpilExperience: Experience = {
  org: 'Lancaster University · MPIL Lab',
  role: 'Visiting Research Assistant',
  period: 'Sep 2026 — Oct 2026',
  description:
    'Focused on embodied intelligence and robotic manipulation, participating in visual and multimodal data acquisition and quality governance.',
  highlights: [
    'Work Content: Participated in building a robotic multimodal data collection platform, hand-eye calibration verification, and data quality inspection.',
  ],
  tags: ['Embodied AI', 'Multimodal Data', 'Robotic Manipulation'],
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
      '生图大模型微调、三维物理渲染合成、3D 头部重建与具身多模态感知',
    contactSubtitle:
      '欢迎就 AI 生成算法、3D 视觉与图形学或合作研究进行交流。',
    cuhkResearch:
      '业务方向：探索以三维物理渲染合成数据提升生成模型空间透视、光影理解与可控编辑能力的微调方法。研究方向：从事以人为本的 3D 视觉与生成式图形学研究，聚焦三维数字人表征与实时驱动。',
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
          '参与生成模型的三维合成数据构建、可控编辑训练与效果优化。',
        highlights: [
          '数据构建：参与设计三维物理渲染合成方案，构建姿态、视角、材质与光影解耦的多任务配对样本。',
          '模型训练：参与合成数据在预训练与微调阶段的接入与混合训练，提升模型空间透视与物理一致性。',
          '应用落地：配合完成多维度评测验证，支撑参考生图与空间可控编辑能力的迭代落地。',
        ],
        tags: ['3D Synthetic Data', 'Controllable Generation', 'Model Fine-Tuning'],
      },
      zhGapExperience,
      zhMpilExperience,
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
      'AIGC 合成数据构建、多模态打标质检、数据配比研究与 3D 视觉',
    contactSubtitle:
      '欢迎就 AIGC 数据算法、合成数据工程、3D 视觉或合作研究进行交流。',
    cuhkResearch:
      '业务方向：聚焦数据驱动的生成式智能研究，探索以三维合成数据、多模态打标与配比优化提升生成模型能力。研究方向：从事以人为本的 3D 视觉与生成式数据构建研究，缓解真实样本长尾与视角偏差。',
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
          '围绕生成模型的数据瓶颈，参与三维合成数据构建、自动标注质检与训练配比研究。',
        highlights: [
          '数据工程：参与构建多类型三维合成数据管线，结合几何校验、视觉过滤与多模态改写产出高质量样本。',
          '配比策略：参与探索不同训练阶段的数据配比与消融实验，验证合成数据对几何与编辑理解的增益。',
          '评测闭环：配合建设自动化数据处理工具与评测闭环，支撑生成模型可控编辑能力提升。',
        ],
        tags: ['3D Synthetic Data', 'Multimodal Curation', 'Data Curriculum'],
      },
      zhGapExperience,
      zhMpilExperience,
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
      '程序化三维仿真合成、空间几何质检、渲染管线与机械臂多模态采集',
    contactSubtitle:
      '欢迎就具身智能数据工程、三维仿真合成、空间智能或合作研究进行交流。',
    cuhkResearch:
      '业务方向：聚焦程序化三维物理仿真管线、空间几何校验算子以及面向空间智能的多模态数据清洗与治理。研究方向：从事三维视觉与几何表征研究，结合机械臂多模态采集构建三维数据闭环。',
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
          '面向空间智能与三维场景理解需求，参与程序化三维场景合成与几何质量控制管线建设。',
        highlights: [
          '几何质控：参与设计碰撞检测、接触落地与多视角构图校验规则，提升合成场景的物理合理性。',
          '渲染管线：参与离线与实时渲染流程对接及多模态空间标注构建，产出多视角对齐的三维场景数据。',
          '数据交付：配合完成大规模空间与动作合成数据生产，支撑下游模型在空间关系与几何变换上的提升。',
        ],
        tags: ['3D Simulation', 'Spatial Geometry QA', 'Rendering Pipeline'],
      },
      zhGapExperience,
      zhMpilExperience,
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
      '多模态数据基础设施：分布式异步渲染流水线、批处理算子与多源数据采集平台',
    contactSubtitle:
      '欢迎就多模态数据基础设施、分布式数据开发、三维数据工程或合作研究进行交流。',
    cuhkResearch:
      '业务方向：聚焦多模态数据基础设施开发，涵盖分布式批处理算子研发、元数据规范与自动化清洗管线。研究方向：从事三维视觉与多模态数据工程研究，结合生成式数据构建与多源传感器采集构建数据闭环。',
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
          '参与大规模多模态训练数据管线开发，覆盖三维资产管理、分布式渲染、样本配对与打标入库。',
        highlights: [
          '管线调优：参与异步渲染与数据处理流水线优化，提升分布式集群吞吐效率并降低算力开销。',
          '平台治理：参与多视角数据采集组装、质量门控与运行监控建设，保障训练数据稳定交付。',
          '工具建设：参与算子开发辅助工具与规范沉淀，提升数据处理算子的开发、测试与上线效率。',
        ],
        tags: ['Distributed Data Infra', 'Batch Operators', 'Data Pipeline'],
      },
      zhGapExperience,
      zhMpilExperience,
    ],
  },

  '1112': {
    documentTitle: '黄晓宁 · 3D 计算机视觉与图形学',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Algorithm Intern',
    ] as const,
    publicationsSummary:
      '专注于 3D 与 2D 计算机视觉及图形学，涵盖表面纹理与几何表征、三维数字人重建、目标检测与分割任务。',
    experienceSubtitle:
      '三维物理渲染数据合成、几何材质光影解耦、数据管线建设与 3D 视觉研究',
    contactSubtitle: '欢迎就 3D 视觉、图形学或合作研究进行交流。',
    cuhkResearch:
      '业务方向：探索以数据为中心的多模态生成，用三维合成数据补齐空间、材质与光影等难获取样本，并服务生成模型训练。研究方向：从事 3D 视觉与生成式数据研究，围绕几何、材质与光照解耦表征及物理渲染数据管线开展探索。',
    scnuRankMeta: '绩点排名 1/30',
    publications: build1112Publications(profileZh.profile.publications, 'zh'),
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
          '参与生成模型相关的三维合成数据构建、分布式渲染管线开发与训练数据优化。',
        highlights: [
          '数据合成：参与构建三维物理渲染数据合成流程，生成涵盖几何、材质、视角与光影解耦控制的配对样本。',
          '技术管线：参与分布式批渲染算子、几何质量校验及多模态自动标注链路建设，提升合成数据质量与产出效率。',
          '评测与应用：参与训练数据配比消融与评测闭环验证，支撑生成模型在参考生图与可控编辑方向的能力迭代。',
        ],
        tags: [
          '3D Synthetic Data',
          'Physical Rendering',
          'Data Pipeline',
          'Generative Models',
        ],
      },
      zhGapExperience,
      zhMpilExperience,
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
      'Generative model fine-tuning, 3D physical synthesis, 3D head reconstruction, and embodied perception',
    contactSubtitle:
      'Open to collaboration on generative AI algorithms, 3D vision, graphics, and related research.',
    cuhkResearch:
      'Business Track: Exploring fine-tuning methods using 3D physical rendering synthetic data to improve spatial perspective, lighting understanding, and controllable editing in generative models. Research Track: Human-centric 3D vision and generative graphics, focusing on 3D digital human representation and real-time driving.',
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
          'Participated in 3D synthetic data construction, controllable editing training, and optimization for generative models.',
        highlights: [
          'Data Synthesis: Participated in designing 3D physical rendering workflows to produce paired samples with disentangled pose, viewpoint, material, and lighting.',
          'Model Training: Participated in integrating synthetic data across pre-training and fine-tuning stages to improve spatial perspective and physical consistency.',
          'Application: Supported multi-dimensional benchmark evaluations and iterative delivery of reference-guided and spatially controllable editing.',
        ],
        tags: ['3D Synthetic Data', 'Controllable Generation', 'Model Fine-Tuning'],
      },
      enGapExperience,
      enMpilExperience,
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
      'AIGC synthetic data curation, multimodal labeling & QA, data curriculum, and 3D vision',
    contactSubtitle:
      'Open to collaboration on AIGC data algorithms, synthetic data engineering, and 3D vision.',
    cuhkResearch:
      'Business Track: Data-centric generative AI research, exploring 3D synthetic data, multimodal labeling, and data curriculum to improve generative models. Research Track: Human-centric 3D vision and generative data curation, mitigating long-tail and viewpoint bias in real data.',
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
          'Participated in 3D synthetic data construction, automated labeling & QA, and training data mixing research for generative models.',
        highlights: [
          'Data Engineering: Participated in building 3D synthetic data pipelines combining geometric checks, visual filtering, and multimodal caption rewriting.',
          'Mixing Strategy: Participated in studying cross-stage data mixing ratios and ablation experiments to validate geometric and editing gains.',
          'Evaluation Loop: Assisted in building automated data tooling and evaluation loops to support controllable editing improvements.',
        ],
        tags: ['3D Synthetic Data', 'Multimodal Curation', 'Data Curriculum'],
      },
      enGapExperience,
      enMpilExperience,
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
      'Procedural 3D simulation, spatial-geometric QA, rendering pipelines, and robotic multimodal collection',
    contactSubtitle:
      'Open to collaboration on embodied AI data engineering, 3D simulation, and spatial intelligence.',
    cuhkResearch:
      'Business Track: Procedural 3D physical simulation pipelines, spatial-geometric QA operators, and multimodal data governance for spatial intelligence. Research Track: 3D vision and geometric representation, combining robotic multimodal collection to build a scalable 3D data loop.',
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
          'Participated in building procedural 3D scene synthesis and geometric quality control pipelines for spatial intelligence.',
        highlights: [
          'Geometric QA: Participated in designing collision detection, ground-contact, and multi-view composition checks to ensure physical plausibility.',
          'Rendering Pipeline: Participated in connecting offline and real-time rendering workflows with multimodal spatial annotations to produce view-aligned 3D scene data.',
          'Data Delivery: Assisted in large-scale spatial and motion synthetic data production to support downstream spatial reasoning and transformation tasks.',
        ],
        tags: ['3D Simulation', 'Spatial Geometry QA', 'Rendering Pipeline'],
      },
      enGapExperience,
      enMpilExperience,
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
      'Multimodal data infrastructure: distributed async rendering pipelines, batch operators, and multi-sensor platforms',
    contactSubtitle:
      'Open to collaboration on multimodal data infrastructure, distributed data engineering, and 3D vision.',
    cuhkResearch:
      'Business Track: Multimodal data infrastructure development, covering distributed batch operators, metadata contracts, and automated cleaning pipelines. Research Track: 3D vision and multimodal data engineering, combining generative data synthesis and multi-sensor acquisition.',
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
          'Participated in developing large-scale multimodal training data pipelines spanning 3D asset management, distributed rendering, sample pairing, and ingestion.',
        highlights: [
          'Pipeline Optimization: Participated in optimizing asynchronous rendering and data processing workflows to improve cluster throughput and reduce compute overhead.',
          'Platform Governance: Participated in multi-view data assembly, quality gating, and runtime monitoring for reliable training data delivery.',
          'Tooling: Participated in building operator development tooling and standards to streamline operator development, testing, and deployment.',
        ],
        tags: ['Distributed Data Infra', 'Batch Operators', 'Data Pipeline'],
      },
      enGapExperience,
      enMpilExperience,
    ],
  },

  '1112': {
    documentTitle: 'Xiaoning Huang · 3D Vision & Graphics',
    identities: [
      'CUHK-DS MSc Student',
      'ByteDance Seed Data Algorithm Intern',
    ],
    publicationsSummary:
      'Focused on 3D/2D computer vision and graphics, covering surface texture & geometry representation, 3D digital human reconstruction, object detection, and segmentation.',
    experienceSubtitle:
      '3D physical rendering synthesis, geometry-material-lighting disentanglement, data pipelines, and 3D vision',
    contactSubtitle:
      'Open to collaboration on 3D vision, graphics, and related research.',
    cuhkResearch:
      'Business Track: Data-centric multimodal generation, using 3D synthetic data to complement hard-to-acquire spatial, material, and lighting samples for generative model training. Research Track: 3D vision and generative data research, focusing on disentangled geometry, material, and lighting representations and physical rendering data pipelines.',
    scnuRankMeta: 'Rank 1/30 (GPA)',
    publications: build1112Publications(profileEn.profile.publications, 'en'),
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
          'Participated in 3D synthetic data construction, distributed rendering pipeline development, and training data optimization for generative models.',
        highlights: [
          'Data Synthesis: Participated in building 3D physical rendering workflows to produce paired samples with disentangled geometry, material, viewpoint, and lighting control.',
          'Technical Pipeline: Participated in distributed batch rendering operators, geometric quality filtering, and multimodal auto-labeling pipelines to improve data quality and throughput.',
          'Evaluation & Application: Participated in data mixing ablations and benchmark evaluations to support reference-guided and controllable editing in generative models.',
        ],
        tags: [
          '3D Synthetic Data',
          'Physical Rendering',
          'Data Pipeline',
          'Generative Models',
        ],
      },
      enGapExperience,
      enMpilExperience,
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
  '1112': {
    zh: buildVariantBundle(profileZh, '1112', zhOverrides['1112']),
    en: buildVariantBundle(profileEn, '1112', enOverrides['1112']),
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
