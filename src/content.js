export const STORAGE_KEY = 'ecsf-site-content-v6'
export const SESSION_KEY = 'ecsf-admin-session-v1'

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export const emptyPost = {
  title: '',
  date: '',
  category: '',
  noticeType: 'community',
  excerpt: '',
  mediaId: '',
  status: 'draft',
  boardApproved: false,
  publishedTitle: '',
  publishedDate: '',
  publishedCategory: '',
  publishedNoticeType: 'community',
  publishedExcerpt: '',
  publishedMediaId: '',
  publishedAt: '',
}

export const emptyProgram = {
  title: '',
  slug: '',
  summary: '',
  description: '',
}

export const emptyEntry = {
  name: '',
  description: '',
}

export const emptyEvent = {
  title: '',
  date: '',
  location: '',
  excerpt: '',
  period: 'current',
  mediaId: '',
}

export const emptyBoardMember = {
  name: '',
  position: '',
  mediaId: '',
  anonymous: false,
}

export const emptyReport = {
  title: '',
  year: '',
  summary: '',
  link: '',
}

export const emptyStory = {
  title: '',
  author: '',
  body: '',
  mediaId: '',
}

export const emptyMedia = {
  id: '',
  type: 'image',
  title: '',
  caption: '',
  src: '',
}

export const themeOptions = [
  { id: 'vibrant', label: 'Modern Indigo' },
  { id: 'heritage', label: 'Heritage Warm' },
  { id: 'night', label: 'Indigo Night' },
]

export const defaultContent = {
  theme: 'vibrant',
  siteName: 'Ethiopian Community',
  region: 'San Francisco',
  shortName: 'ECSF',

  // Home / dashboard
  heroEyebrow: 'Serve • Embrace • Welcome',
  heroTitle: 'Serving Ethiopians in San Francisco and the Bay Area.',
  heroText:
    'Ethiopian Community in San Francisco (ECSF) is a California-registered community organization dedicated to serving, embracing, and welcoming Ethiopians and Ethiopian Americans through cultural preservation, community support, education, youth development, and social engagement.',
  heroCardTitle: 'One community, many cultures, one purpose',
  heroCardText:
    'A welcoming civic home for families, elders, youth, students, professionals, newcomers, volunteers, and friends of the Ethiopian community across the Bay Area.',
  heroFocusPoints: ['Unity', 'Culture', 'Youth', 'Elders', 'Newcomers', 'Service'],
  dashboardSpotlightTitle: 'Community Spotlight',
  dashboardSpotlightText:
    'This space will feature announcements, advertisements, and community reports. Admins can post updates from the dashboard.',

  // About
  missionTitle: 'Our Mission',
  missionText:
    'The Ethiopian Community in San Francisco (ECSF) exists to serve, embrace, and welcome Ethiopians and Ethiopian Americans throughout San Francisco and the Bay Area. We are committed to strengthening community unity, preserving Ethiopian culture and heritage, supporting youth, families, elders, and newcomers, promoting educational and economic opportunities, and building a transparent, inclusive, and service-oriented organization that empowers our community to thrive and contribute positively to society.',
  visionTitle: 'Our Vision',
  visionText:
    'To build a united, thriving, and well-represented Ethiopian community in San Francisco and the Bay Area where culture and heritage are preserved, families are supported, youth are empowered, elders are respected, newcomers are welcomed, and community members work together with transparency, accountability, and mutual respect to create opportunities for current and future generations.',
  coreValuesTitle: 'Our Core Values',
  coreValues: [
    { name: 'Unity', description: 'We bring the community together across generations and backgrounds with a shared sense of belonging.' },
    { name: 'Respect', description: 'We honor the dignity, diversity, and autonomy of every member.' },
    { name: 'Inclusiveness', description: 'We create a safe, welcoming space where members feel comfortable expressing all aspects of their identities.' },
    { name: 'Transparency', description: 'We act with accountability and openness in our decisions, resources, and reporting.' },
    { name: 'Service', description: 'We willingly give our time and talents to meet community needs and model servant leadership.' },
    { name: 'Cultural Preservation', description: 'We promote and protect Ethiopian history, language, and heritage for future generations.' },
  ],
  aboutIntro:
    'Learn about who we are, how ECSF began, the people who lead and power our work, and the documents and reports that keep us transparent and accountable.',

  historyTitle: 'Our History',
  historyText:
    'The Ethiopian Community in San Francisco (ECSF) was established after a series of meetings and discussions among like-minded individuals who recognized the need for a unified community organization to serve Ethiopians living in San Francisco and the greater Bay Area. Community leaders and volunteers came together to discuss how best to address the social, educational, cultural, and economic needs of Ethiopians and Ethiopian-American families while preserving our heritage and strengthening community connections.\n\nFollowing months of planning, collaboration, and community outreach, ECSF was legally established in the State of California and began developing the organizational foundation necessary to serve the community. A Board of Directors was formed, bylaws were adopted, committees were organized, and a two-year strategic plan was developed to guide the future growth of the organization.\n\nAlthough ECSF is still in its early stages, we are encouraged by the growing interest and participation of community members throughout San Francisco and the Bay Area. Our membership and supporter base continues to grow, demonstrating the desire for a strong, transparent, and inclusive Ethiopian community organization.\n\nOur future is full of hope as we see increasing numbers of supporters participating in our programs, activities, and community-building efforts. We believe our mission, vision, and values will help create a lasting organization that serves current and future generations. Through volunteerism, partnerships, fundraising, and responsible stewardship, ECSF is laying the groundwork for long-term success and meaningful impact.\n\nOur volunteers and Board members are the foundation of our organization. Together, we have begun assessing community needs, identifying priorities, and developing programs that will benefit Ethiopians throughout the Bay Area. Through strategic planning and community engagement, we are committed to building a sustainable organization that responds to the evolving needs of our community.\n\nECSF is organized through committees and volunteer-led initiatives that focus on areas such as youth development, education, cultural preservation, newcomer support, elderly engagement, community outreach, and economic empowerment. Our long-term goals include educational workshops, Amharic language programs, youth mentoring, job and career development programs, health and wellness initiatives, cultural celebrations, elderly support services, and community resource referrals.\n\nA key part of our strategy is to continue building a strong and sustainable community organization through careful planning, transparency, and collaboration. As you learn more about ECSF and our vision for the future, we invite you to become a member, volunteer, supporter, or community partner and help us build a stronger Ethiopian community in San Francisco and the Bay Area.',
  historyTagline: 'Serve • Embrace • Welcome — One Community, Many Cultures, One Purpose',

  boardIntro: 'Our Board of Directors provides oversight, sets direction, and ensures ECSF acts in line with its mission and bylaws.',
  boardMembers: [
    { name: 'Estifanos Gebereselassie', position: 'Board of Directors', mediaId: '', anonymous: true },
    { name: 'Tesfaye Worku', position: 'Board of Directors', mediaId: '', anonymous: true },
    { name: 'Yohannes Gebreselasie', position: 'Board of Directors', mediaId: '', anonymous: true },
    { name: 'Gashaw Gebru', position: 'Board of Directors', mediaId: '', anonymous: true },
    { name: 'Rahel Abebe', position: 'Board of Directors', mediaId: '', anonymous: true },
  ],
  volunteersIntro:
    'Volunteers are the heart of ECSF. As our volunteer team grows, members will be featured here. Interested in joining? Complete the Volunteer Interest & Service Request Form to share how you would like to serve.',
  volunteers: [],
  annualReportsIntro: 'Our annual reports will be published here to keep the community informed about our work, impact, and stewardship.',
  annualReports: [],
  bylawsIntro: 'The bylaws in both English and Amharic are attached below.',
  bylawsEnglish: 'Download the English bylaws PDF below.',
  bylawsAmharic: 'የአማርኛ ህገ-ደንብን PDF ከዚህ በታች ያውርዱ።',
  bylawsDocuments: [
    {
      title: 'ECSF Bylaws (English — 2026)',
      description: 'Official bylaws of the Ethiopian Community in San Francisco and the Bay Area.',
      url: '/documents/ECSF_English_Bylaws_2026.pdf',
      fileName: 'ECSF_English_Bylaws_2026.pdf',
      language: 'English',
    },
    {
      title: 'ECSF Bylaws (Amharic — Revised)',
      titleAm: 'የECSF ህገ-ደንብ (አማርኛ — የማሻሻያ)',
      description: 'Official revised bylaws of the Ethiopian Community in San Francisco and the Bay Area.',
      descriptionAm: 'የኢትዮጵያውያን ማህበረሰብ በሳንፍራንሲስኮ እና በቤይ ኤሪያ (ECSF) የማሻሻያ ህገ-ደንብ።',
      url: '/documents/ECSF_Amharic_Bylaw_Revised.pdf',
      fileName: 'ECSF_Amharic_Bylaw_Revised.pdf',
      language: 'Amharic',
    },
  ],
  financialsIntro:
    'ECSF is committed to financial transparency. Financial summaries and statements will be shared here as they become available, under Board oversight.',
  financialsText: 'Financial information is being prepared and will be published here soon.',
  storiesIntro: 'Stories and voices from across our community. Have a story to share? We would love to hear from you.',
  stories: [],

  // Programs / What We Do
  programsIntro:
    'Our work is organized around the focus areas in our two-year business plan. Each area is led by committees and volunteers working to meet real community needs.',
  programs: [
    {
      title: 'Youth and Education',
      slug: 'youth-and-education',
      summary: 'Tutoring, STEM learning, college and career guidance, Amharic language, and mentorship for young people.',
      description:
        'Youth and Education is at the center of ECSF\u2019s long-term vision. We focus on helping students and young people succeed academically, culturally, and personally.\n\nPlanned and ongoing efforts include tutoring and educational workshops, Amharic language programs, youth mentoring that connects students with Ethiopian professionals, STEM learning, and college and career counseling.\n\nThrough these programs we aim to empower the next generation while keeping them connected to their heritage.',
    },
    {
      title: 'Cultural and Social Affairs',
      slug: 'cultural-and-social-affairs',
      summary: 'Cultural celebrations and social gatherings that preserve Ethiopian heritage and bring the community together.',
      description:
        'Cultural and Social Affairs promotes and preserves Ethiopian history, language, music, food, and heritage for current and future generations.\n\nWe organize cultural celebrations, community gatherings, and social events that strengthen connections, welcome newcomers, and create intergenerational spaces where culture is shared and celebrated.',
    },
    {
      title: 'Health and Wellness',
      slug: 'health-and-wellness',
      summary: 'Community health fairs, bilingual education, and culturally aware wellness and mental health resources.',
      description:
        'Health and Wellness works to improve the wellbeing of our community through culturally aware and bilingual resources.\n\nPlanned initiatives include community health fairs, bilingual public health panels, wellness education, and mental health resources and referrals that meet members where they are.',
    },
    {
      title: 'Community Outreach',
      slug: 'community-outreach',
      summary: 'Welcoming newcomers, connecting members to resources, and building partnerships across the Bay Area.',
      description:
        'Community Outreach focuses on connecting members to the resources and support they need, and welcoming newly arrived community members as they settle in the Bay Area.\n\nWe provide community resource referrals, newcomer support, and outreach that keeps the community informed, connected, and engaged.',
    },
    {
      title: 'Fundraising and Partnership',
      slug: 'fundraising-and-partnership',
      summary: 'Raising resources and building partnerships to sustain community programs and operations.',
      description:
        'Fundraising and Partnership raises the resources needed to sustain ECSF programs and operations and builds relationships with partners who share our mission.\n\nThrough fundraising, sponsorships, grants, and community partnerships, we lay the financial groundwork for long-term, responsible growth and meaningful impact.',
    },
    {
      title: 'Elder Support',
      slug: 'elder-support',
      summary: 'Engagement, social connection, and assistance that help our elders stay active and respected.',
      description:
        'Elder Support honors and assists the elders of our community.\n\nWe focus on engagement, social connection, and support services that help elders stay active, respected, and connected, ensuring their wisdom and experience remain a valued part of community life.',
    },
  ],

  // Membership
  membershipIntro:
    'Membership is open to community members who meet the eligibility requirements below and agree to abide by the ECSF bylaws. Joining gives you a voice in the community and a way to support its work.',
  membershipEligibility: [
    'Be Ethiopian, Ethiopian-American, or married to an Ethiopian',
    'Be 18 years of age or older',
    'Complete the membership registration',
    'Agree to abide by the ECSF bylaws',
  ],
  memberships: [
    {
      name: 'Regular Membership',
      price: '$50 / year',
      amount: 50,
      checkoutUrl: '',
      note: 'Standard annual membership for community members 18 years and older.',
      inactive: false,
    },
    {
      name: 'Senior Membership',
      price: '$25 / year',
      amount: 25,
      checkoutUrl: '',
      note: 'Reduced annual dues for senior community members.',
      inactive: false,
    },
    {
      name: 'Unemployment / Low-Income',
      price: 'Reduced or $0',
      amount: 0,
      checkoutUrl: '',
      note: 'For members experiencing unemployment, a reduced fee or no-fee membership is available with an eligibility check.',
      inactive: false,
    },
    {
      name: 'Monthly Membership',
      price: 'Coming soon',
      note: 'A future monthly payment option is planned. This option is not active yet.',
      inactive: true,
    },
  ],
  memberRights: [
    'Participation in community programs and events',
    'Service and volunteer opportunities',
    'Committee participation',
    'Community engagement and networking',
    'Ability to submit recommendations and feedback to ECSF leadership',
    'Access to community resources and services',
  ],
  memberResponsibilities: ['Follow the ECSF bylaws', 'Pay membership dues', 'Support community activities'],
  membershipNote:
    'Membership dues are billed annually. A monthly payment option is planned for the future and is not active yet.',

  // Governance
  governanceTitle: 'How ECSF is governed.',
  governanceIntro:
    'As recently amended in our bylaws, ECSF will not operate under the traditional General Assembly model during its first phase. For the first two years, the Board of Directors serves as the highest governing and decision-making authority of the organization. The General Assembly serves as an advisory and community engagement body that provides recommendations and feedback but does not have voting authority over governance matters.',
  governanceBodies: [
    { name: 'Board of Directors', description: 'The highest governing and decision-making authority of ECSF. For the organization\u2019s first two years, the Board holds final authority over governance matters and sets the strategic direction in line with our mission and bylaws.' },
    { name: 'Advisory Board', description: 'Experienced advisors who provide guidance, expertise, and community perspective to the Board of Directors.' },
    { name: 'Executive Director', description: 'Leads the day-to-day implementation of programs and operations under the direction of the Board, and oversees the organization\u2019s committees.' },
    { name: 'Executive Committee', description: 'Handles day-to-day governance decisions between Board meetings, under the direction of the Executive Director and Board.' },
    { name: 'Audit Committee', description: 'Provides independent review of finances and ensures transparency and accountability.' },
    { name: 'Standing Committees', description: 'Working groups that carry out ECSF programs and initiatives in specific focus areas.' },
    { name: 'General Assembly', description: 'An advisory and community engagement body made up of members. It provides recommendations and feedback to ECSF leadership but does not hold voting authority over governance matters during the first phase of the organization.' },
  ],
  governanceChart: [
    ['Board of Directors'],
    ['Advisory Board', 'Executive Director'],
    ['Executive Committee', 'Audit Committee', 'Standing Committees'],
    ['General Assembly (Advisory & Community Input)'],
  ],
  governanceDisclaimer:
    'Detailed leadership names and contact information are shared publicly only after the Board approves wider disclosure.',

  // Events
  eventsIntro: 'Programs, gatherings, and celebrations for the ECSF community. Browse past, current, and upcoming events.',
  events: [
    {
      title: 'San Francisco Ethiopian Culture Day',
      date: 'Spring 2026',
      location: 'San Francisco, CA',
      excerpt: 'A family-friendly celebration of Ethiopian music, food, history, and art.',
      period: 'future',
      mediaId: '',
    },
    {
      title: 'Youth STEM & Mentorship Workshop',
      date: 'Summer 2026',
      location: 'Bay Area',
      excerpt: 'A hands-on workshop connecting students with Ethiopian professionals.',
      period: 'future',
      mediaId: '',
    },
    {
      title: 'Community Welcome Gathering',
      date: 'Winter 2026',
      location: 'San Francisco, CA',
      excerpt: 'An open gathering to welcome members and introduce ECSF programs.',
      period: 'current',
      mediaId: '',
    },
  ],

  // News / announcements (dashboard)
  posts: [
    {
      title: 'ECSF Membership Drive Now Open',
      date: 'Winter 2026',
      category: 'Community',
      excerpt: 'Become a member and help shape a stronger Ethiopian community in San Francisco and the Bay Area.',
      mediaId: '',
      status: 'published',
      noticeType: 'community',
      publishedTitle: 'ECSF Membership Drive Now Open',
      publishedDate: 'Winter 2026',
      publishedCategory: 'Community',
      publishedNoticeType: 'community',
      publishedExcerpt: 'Become a member and help shape a stronger Ethiopian community in San Francisco and the Bay Area.',
      publishedMediaId: '',
      publishedAt: '2026-01-01T00:00:00.000Z',
    },
  ],

  // Privacy
  privacyTitle: 'Privacy & Data Protection',
  privacyIntro: 'ECSF is committed to protecting member information in line with our bylaws.',
  privacyPoints: [
    'We protect member information and handle it with care.',
    'We collect only the limited information needed to serve our members and run our programs.',
    'We keep member information confidential and do not sell or share it without consent, except where required by law.',
  ],

  // Donation
  donationCheckoutUrl:
    'https://checkout.square.site/merchant/ML3ZEYXPP70Y3/checkout/A6L4EYYYAYORBP3OKMKRUJP5',
  donationTitle: 'Your support keeps culture, service, and care moving forward.',
  donationText:
    'Donations support our community programs and day-to-day operations. ECSF is committed to financial transparency, and all funds are managed under Board oversight.',
  donationDisclaimer:
    'Please note: ECSF does not currently represent that donations are tax-deductible. Tax and legal status information will be shared only once it has been confirmed.',

  // Contact
  contactTitle: 'Get involved with ECSF.',
  contactIntro:
    'Reach the right place using the forms below. To protect privacy, we direct inquiries through official ECSF channels rather than personal phone numbers or personal emails.',
  siteUrl: 'https://ethiopiancommunitysf.org',
  contactEmail: 'info@ethiopiancommunitysf.org',
  contactPhone: '',
  contactLocation: 'San Francisco & the Bay Area, California',

  // Media
  heroMediaId: '',
  media: [],
}

export function publishPost(post) {
  return {
    ...post,
    status: 'published',
    publishedTitle: post.title,
    publishedDate: post.date,
    publishedCategory: post.category,
    publishedNoticeType: post.noticeType || 'community',
    publishedExcerpt: post.excerpt,
    publishedMediaId: post.mediaId,
    publishedAt: new Date().toISOString(),
  }
}

export function normalizePost(post) {
  const status = post.status || 'published'
  const nextPost = { ...emptyPost, ...post, status }

  if (status === 'published' && !nextPost.publishedAt) {
    return publishPost(nextPost)
  }

  return nextPost
}

export function getPublishedPost(post) {
  if (post.status !== 'published') {
    return null
  }

  return {
    title: post.publishedTitle,
    date: post.publishedDate,
    category: post.publishedCategory,
    noticeType: post.publishedNoticeType || 'community',
    excerpt: post.publishedExcerpt,
    mediaId: post.publishedMediaId,
    publishedAt: post.publishedAt,
  }
}

export function hasUnpublishedPostChanges(post) {
  if (post.status !== 'published') {
    return false
  }

  return (
    post.title !== post.publishedTitle ||
    post.date !== post.publishedDate ||
    post.category !== post.publishedCategory ||
    (post.noticeType || 'community') !== (post.publishedNoticeType || 'community') ||
    post.excerpt !== post.publishedExcerpt ||
    post.mediaId !== post.publishedMediaId
  )
}

export function loadContent() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    const parsedContent = saved ? { ...defaultContent, ...JSON.parse(saved) } : defaultContent
    return {
      ...parsedContent,
      posts: (parsedContent.posts || []).map(normalizePost),
      programs: (parsedContent.programs || []).map((program) => ({
        ...program,
        slug: program.slug || slugify(program.title),
      })),
    }
  } catch {
    return defaultContent
  }
}
