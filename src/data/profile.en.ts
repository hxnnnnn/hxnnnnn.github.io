import type { ProfileData, SiteBundle, UiStrings } from '../i18n/types'

const profile: ProfileData = {
  name: 'MSc Student, CUHK-SZ',
  heroName: 'Xiaoning Huang',
  identities: ['CUHK-DS MSc Student', 'ByteDance Seed Algorithm Intern'],
  contact: {
    email: '225040002@link.cuhk.edu.cn',
    location: 'Based in Shenzhen',
    github: 'https://github.com/hxnnnnn',
    site: 'https://hxnnnnn.github.io',
    scholar: '',
  },
  publicationsSummary:
    'Focused on 3D and 2D computer vision, including reconstruction, detection, and segmentation.',
  education: [
    {
      school: 'The Chinese University of Hong Kong, Shenzhen',
      meta: [
        'School of Data Science',
        'Data Science',
        'English-taught MSc',
        'GPA 3.3 (out of 4.0)',
      ],
      period: 'Sep 2025 — Jun 2027',
      research:
        'Thesis track: full-parameter fine-tuning with 3D synthetic data for reference-image editing in generative image models. Research: human-centric 3D vision and graphics, focusing on NeRF/3DGS head avatars with generalization and robustness, learning disentangled full-head 3D representations from monocular images and their integration with generative models.',
      courses: [
        'Artificial Intelligence',
        'Data Mining',
        'Machine Learning',
        'Natural Language Processing',
        'Image Processing and Computer Vision',
      ],
    },
    {
      school: 'South China Normal University',
      meta: [
        'School of Data Science and Engineering',
        'Data Science and Big Data Technology',
        'B.Eng.',
        'GPA 3.8 (out of 5.0)',
        'Rank 4/30 (GPA)',
        'Rank 1/30 (Comprehensive)',
        'IELTS 6.5',
      ],
      period: 'Sep 2021 — Jun 2025',
      research:
        'As an undergraduate, I focused on computer vision and intelligent perception, including object detection, semantic and instance segmentation, edge-cloud collaborative inference, and applications in agriculture, transportation, and classroom analytics. I emphasized lightweight architectures, multi-scale fusion, and robust small-object perception, balancing efficiency, accuracy, and deployment cost for UAV inspection, pest monitoring, road damage, and classroom emotion analysis.',
      courses: [
        'Introduction to Data Mining (100)',
        'Distributed Data Structures (99)',
        'Artificial Intelligence (99)',
        'Deep Learning Algorithms (99)',
        'Data Mining and Machine Learning (97)',
        'Big Data Analytics (96)',
        'Mathematical Foundations Lab (95)',
        'Introduction to Data Science (95)',
        'Statistical Computing (95)',
        'Parallel and Distributed Computing (94)',
      ],
    },
  ],
  publications: [
    {
      title:
        'InfiHead: Learning a Feedforward Disentangled 3D Full-Head Model from Scalable Monocular 2D Data',
      venue: 'SIGGRAPH Asia 2026',
      venueMeta: 'CCF-A Conference',
      status: 'submitted',
      role: 'Co-1st & 2nd Author',
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
      venueMeta: 'SCI Q2 · IF 5.90',
      status: 'submitted',
      role: 'Student 1st Author',
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
      venueMeta: 'SCI Q1 · IF 7.20',
      status: 'submitted',
      role: '2nd Author',
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
      venueMeta: 'SCI Q2 · IF 4.30',
      status: 'published',
      publishedYear: 2023,
      role: '1st Author',
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
      venueMeta: 'SCI Q2 · IF 3.80',
      status: 'published',
      publishedYear: 2026,
      role: '2nd Author',
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
      venueMeta: 'SCI Q3 · IF 3.90',
      status: 'published',
      publishedYear: 2023,
      role: '2nd Author',
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
      venueMeta: 'International Conference',
      status: 'published',
      publishedYear: 2024,
      role: '2nd Author',
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
      venueMeta: 'IEEE Conference',
      status: 'published',
      publishedYear: 2023,
      role: '2nd Author',
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
      venueMeta: 'IEEE Conference',
      status: 'published',
      publishedYear: 2022,
      role: 'Student 1st Author',
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
      title: 'Agricultural Pest Detection with an Improved YOLOv5',
      venue: 'Journal of South China Normal University (Natural Science Edition)',
      venueMeta: 'PKU Core',
      status: 'published',
      publishedYear: 2023,
      role: 'Student 2nd Author',
      tags: [
        'Agricultural Pest Detection',
        'Object Detection',
        'Lightweight Network',
        'Field Monitoring',
        'Feature Fusion',
      ],
      abstract:
        'To address complex field backgrounds, diverse pest morphology, and hard-to-detect small targets, we improve the backbone and feature fusion of a single-stage detector for agricultural pest detection, validating accuracy and inference efficiency on public and in-house datasets for practical field monitoring.',
      url: 'https://journal-n.scnu.edu.cn/article/doi/10.6054/j.jscnun.2023048',
    },
    {
      title: 'A Lightweight High-Speed Detector for UAV Small Targets with Improved YOLO11',
      venue: 'Journal of South China Normal University (Natural Science Edition)',
      venueMeta: 'PKU Core',
      status: 'published',
      publishedYear: 2025,
      role: 'Student 3rd Author',
      tags: [
        'UAV Vision',
        'Small-Object Detection',
        'Lightweight Model',
        'Aerial Imagery',
        'Real-Time Inference',
      ],
      abstract:
        'UAV imagery faces small targets, complex backgrounds, and limited onboard compute. We introduce multi-scale feature enhancement and structural pruning on a lightweight detector to improve accuracy and stability while maintaining high inference speed in aerial scenes.',
      url: 'https://journal-n.scnu.edu.cn/article/doi/10.6054/j.jscnun.2025050',
    },
  ],
  patents: [
    {
      title:
        'Method, device, equipment and storage medium for pothole detection in road images',
      role: '1st Inventor',
    },
    {
      title:
        'Real-time antenna interference source image detection technology for UAV mounting',
      role: '2nd Inventor',
    },
    {
      title:
        'Edge-cloud collaborative UAV antenna interference inspection AIoT system',
      role: '3rd Inventor',
    },
  ],
  experience: [
    {
      org: 'ByteDance · Seed',
      role: 'Algorithm Intern',
      period: 'Mar 2026 — Present',
      description:
        'Reference-image generation fine-tuning with 3D synthetic data as the fine-tuning source, large-scale data asset and 10M-scale training pipelines, distributed full fine-tuning, and product delivery.',
      highlights: [
        'Built asset library (10k+ poses, 1M+ scenes), multi-task rendering on 1k+ GPUs, multimodal labeling prompts, and quality pipelines for stable 10M-scale datasets.',
        'Distributed full fine-tuning on Seedream with mixed multi-source ratios to boost task performance for real-world applications.',
        'Shipped pose-reference (+5%) and object-transformation (+7%) tasks, enabled reference-to-image features, and built an operator-dev Agent for large-scale automation.',
      ],
      tags: ['Seedream', '3D Synthetic Data', 'Fine-tuning', 'Blender', 'Data Pipeline'],
    },
    {
      org: 'CUHK-SZ · GAP Lab',
      role: 'Research Assistant',
      period: 'Aug 2025 — Present',
      description:
        'Human-centric 3D head reconstruction and generative vision: learning disentangled, generalizable 3D Gaussian full-head representations from monocular 2D video.',
      highlights: [
        'Multi-view auto-production pipeline; 10M-scale FLUX + Qwen-VL balanced dataset to reduce 3D GAN viewpoint bias.',
        'Controllable face models with generative fill for expression and lighting gaps, supporting large-scale monocular learning and wide-angle face recognition.',
        'Template-free feedforward recon with identity–expression–pose disentanglement and adversarial 360° consistency; video diffusion at ~15 FPS for real-time 360° avatars.',
      ],
      tags: ['3DGS', 'FLUX', 'Video Diffusion', 'NeRF'],
    },
  ],
  projects: [
    {
      program:
        'Guangdong Provincial General Project, Climbing Program for S&T Innovation',
      fullTitle:
        'Integrated Intelligent Inspection and Insurance Loss Assessment Based on Low-Altitude UAV Remote Sensing',
      period: 'Mar 2025 — Present',
      role: 'Team Member',
      level: 'Provincial General',
      description:
        'Led end-to-end algorithm design and deployment for infrastructure inspection, optimized lightweight models and edge deployment, and improved small-object recognition in complex low-altitude scenes. Built an integrated remote-sensing recognition and insurance loss assessment framework and coordinated inspection with claims workflows.',
    },
    {
      program:
        'Guangdong Provincial Key Project, Climbing Program for S&T Innovation',
      fullTitle:
        'Constructing and Applying Intelligent Process-Oriented Classroom Evaluation under the Double Reduction Policy',
      period: 'Nov 2021 — Nov 2024',
      role: 'Team Member',
      level: 'Provincial Key',
      description:
        'Built evaluation models for student classroom learning states using facial emotion recognition, speech semantics, and multi-angle continuous assessment to support instructional improvement.',
    },
    {
      program:
        'Guangdong Provincial Key Project, College Innovation and Entrepreneurship Training Program',
      fullTitle: '5G Communication Interference Source Detection with Improved YOLOv5',
      period: 'Nov 2022 — May 2024',
      role: 'Project Lead',
      level: 'Provincial Key',
      description:
        'Developed object detection for antenna interference inspection with UAV-mounted sensors, supporting or replacing manual checks on hard-to-reach antennas and addressing data and model gaps in this domain.',
    },
    {
      program: 'University General Project, Golden Seed Program',
      fullTitle:
        'University Classroom Teaching Evaluation via Facial Emotion Recognition',
      period: 'Mar 2022 — Mar 2023',
      role: 'Core Member',
      level: 'University General',
      description:
        'Built classroom facial emotion recognition with edge-based dual-channel feature fusion, MSAFNet expression classification, and PAD 3D affective modeling for engagement assessment.',
    },
  ],
  awards: [
    {
      title: 'National First Prize, 10th Teddy Cup Data Mining Challenge',
      date: '2022.06',
    },
    {
      title:
        'Provincial First Prize, 18th Challenge Cup (Guangdong, Academic Works)',
      date: '2022.11',
    },
    {
      title:
        'Provincial Third Prize, 17th Challenge Cup (Guangdong, Academic Works)',
      date: '2022.11',
    },
    {
      title:
        'Provincial Second Prize, 14th Challenge Cup (Guangdong, Business Plan)',
      date: '2023.11',
    },
    {
      title: 'Provincial First Prize, 2025 China International College Innovation Competition',
      date: '2025.11',
    },
    {
      title: 'Provincial Third Prize, 2024 China International College Innovation Competition',
      date: '2024.11',
    },
    {
      title: 'Provincial Third Prize, 2023 China Undergraduate Mathematical Contest in Modeling',
      date: '2023.11',
    },
    {
      title: 'Outstanding Team and Individual, Summer Rural Service Program',
      date: '2022 — 2024',
    },
  ],
  honors: [
    { title: 'Top 100 Outstanding Graduate', date: '2025.06' },
    { title: 'Huawei Foundation Scholarship (First Prize)', date: '2024.04' },
    { title: 'Top 100 League Member', date: '2024.04' },
    { title: 'Innovation Scholarship (Special Prize, Research)', date: '2024.04' },
    { title: 'Outstanding Student Leader', date: '2022 — 2024' },
    { title: 'Comprehensive Scholarship (First Prize)', date: '2022 — 2025' },
  ],
  practiceTimeline: [
    {
      id: 'ri-lab',
      role: 'RI Lab RA',
      org: 'Undergraduate Team Lead',
      startYear: 2021,
      endYear: 2025,
    },
    {
      id: 'class-monitor',
      role: 'Class Monitor',
      org: 'Data Science 2021',
      startYear: 2021,
      endYear: 2025,
    },
    {
      id: 'student-union',
      role: 'Student Union Presidium',
      org: 'Xingzhi College',
      startYear: 2022,
      endYear: 2023,
    },
    {
      id: 'part-time-ta',
      role: 'Part-time Class Advisor',
      org: 'Data Science 2023',
      startYear: 2023,
      endYear: 2024,
    },
    {
      id: 'conf-2022',
      role: 'ICICSP 2022',
      org: 'IEEE Conference',
      startYear: 2022,
      endYear: 2022,
    },
    {
      id: 'conf-2023-icaus',
      role: 'ICAUS 2023',
      org: 'International Conference',
      startYear: 2023,
      endYear: 2023,
    },
    {
      id: 'conf-2023',
      role: 'ICRAE 2023',
      org: 'IEEE Conference',
      startYear: 2023,
      endYear: 2023,
    },
    {
      id: 'conf-2024-iceit',
      role: 'ICEIT 2024',
      org: 'International Conference',
      startYear: 2024,
      endYear: 2024,
    },
    {
      id: 'conf-2024',
      role: 'AIIIP 2024',
      org: 'ACM Conference',
      startYear: 2024,
      endYear: 2024,
    },
    {
      id: 'conf-2025',
      role: 'SIGGRAPH Asia 2025',
      org: 'CCF-A Conference',
      startYear: 2025,
      endYear: 2025,
    },
    {
      id: 'gap-2026',
      role: 'GAP Lab',
      org: '3D Reconstruction RA',
      startYear: 2026,
      endYear: 2026,
    },
    {
      id: 'seed-2026',
      role: 'Seed Algorithm Intern',
      org: 'ByteDance',
      startYear: 2026,
      endYear: 2026,
    },
  ],
  skills: [
    'Python',
    'Linux',
    'PyTorch',
    'Blender',
    'UE',
    'Vibe-coding',
  ],
}

const ui: UiStrings = {
  htmlLang: 'en',
  documentTitle: 'Xiaoning Huang · 3D Vision & Graphics',
  nav: {
    education: 'Education',
    publications: 'Publications',
    experience: 'Experience',
    projects: 'Projects',
    awards: 'Awards',
    contact: 'Contact',
    langSwitch: '中文',
  },
  theme: {
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
  },
  hero: {
    loading: 'Reconstructing 3D model...',
    scrollWebGL: 'Drag to rotate · Scroll down',
    scrollMobile: 'Scroll to explore',
  },
  sections: {
    education: 'Education',
    publications: 'Publications',
    experience: 'Experience',
    experienceSubtitle:
      'Image-model fine-tuning, 3D synthetic data, and head reconstruction across research and industry',
    projects: 'Projects',
    awards: 'Awards & Activities',
    contact: 'Contact',
    contactSubtitle:
      'Open to collaboration on 3D vision, graphics, and related research.',
    awardsList: 'Awards',
    honorsList: 'Honors',
    practice: 'Activities',
    patents: 'Patents',
    skills: 'Skills',
  },
  filters: {
    all: 'All',
    submitted: 'Under Review',
    published: 'Published',
  },
  pubStatus: {
    submitted: 'Under Review',
    published: (year) => `Published ${year}`,
  },
  collapsible: {
    expandAbstract: 'Show abstract',
    collapseAbstract: 'Hide abstract',
    expandProject: 'Show details',
    collapseProject: 'Hide details',
  },
  education: {
    showCourses: 'Show key courses',
    hideCourses: 'Hide key courses',
  },
  contact: {
    copied: 'Copied ✓',
  },
  marquee: {
    hoverHint: 'Hover to speed up',
  },
  footer: {
    line1: (year) => `© ${year} Xiaoning Huang · Built with React & Three.js`,
    line2: 'InfiHead: reconstruction complete ✓',
  },
}

export const profileEn: SiteBundle = {
  locale: 'en',
  profile,
  ui,
}
