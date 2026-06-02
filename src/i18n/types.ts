export type Locale = 'zh' | 'en'

export type PublicationStatus = 'submitted' | 'published'

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
  meta: string[]
  period: string
  research: string
  courses?: string[]
}

export interface Patent {
  title: string
  role: string
}

export interface Project {
  program: string
  fullTitle: string
  period: string
  role: string
  level: string
  description: string
}

export interface AwardItem {
  title: string
  date?: string
}

export interface ProfileData {
  name: string
  heroName: string
  identities: readonly string[]
  contact: {
    email: string
    location: string
    github: string
    site: string
    scholar: string
  }
  publicationsSummary: string
  education: Education[]
  publications: Publication[]
  patents: Patent[]
  experience: Experience[]
  projects: Project[]
  awards: AwardItem[]
  honors: AwardItem[]
  practiceTimeline: PracticeTimelineItem[]
  skills: string[]
}

export interface UiStrings {
  htmlLang: string
  documentTitle: string
  nav: {
    education: string
    publications: string
    experience: string
    projects: string
    awards: string
    contact: string
    langSwitch: string
  }
  hero: {
    loading: string
    scrollWebGL: string
    scrollMobile: string
  }
  sections: {
    education: string
    publications: string
    experience: string
    experienceSubtitle: string
    projects: string
    awards: string
    contact: string
    contactSubtitle: string
    awardsList: string
    honorsList: string
    practice: string
    patents: string
    skills: string
  }
  filters: {
    all: string
    submitted: string
    published: string
  }
  pubStatus: {
    submitted: string
    published: (year: number) => string
  }
  collapsible: {
    expandAbstract: string
    collapseAbstract: string
    expandProject: string
    collapseProject: string
  }
  education: {
    showCourses: string
    hideCourses: string
  }
  contact: {
    copied: string
  }
  marquee: {
    hoverHint: string
  }
  footer: {
    line1: (year: number) => string
    line2: string
  }
}

export interface SiteBundle {
  locale: Locale
  profile: ProfileData
  ui: UiStrings
}
