export const GISCUS_CONFIG = {
  repo: 'DeruiDENG/blog-comment',
  repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID || '',
  category: 'Announcements',
  categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID || '',
  mapping: 'specific',
  strict: '1',
  reactionsEnabled: '1',
  emitMetadata: '0',
  inputPosition: 'bottom',
  theme: 'preferred_color_scheme',
  lang: 'zh-CN',
  loading: 'lazy',
} as const;

