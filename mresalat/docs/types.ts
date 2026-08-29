export type DocumentationGroupId =
  | 'getting-started'
  | 'foundations'
  | 'customization'
  | 'core-concepts'
  | 'components'
  | 'domains'
  | 'guides'
  | 'architecture'
  | 'reference';

export type DocumentationPageKind =
  | 'article'
  | 'components'
  | 'component-detail'
  | 'tokens'
  | 'icons'
  | 'services'
  | 'routes'
  | 'configuration'
  | 'analytics'
  | 'risk-matrix'
  | 'breakpoints';

export type DocumentationPage = {
  slug: string;
  titleFa: string;
  titleEn?: string;
  group: DocumentationGroupId;
  order: number;
  description: string;
  keywords: string[];
  sourcePaths?: string[];
  kind?: DocumentationPageKind;
  componentName?: string;
};

export type DocumentationGroup = {
  id: DocumentationGroupId;
  titleFa: string;
  titleEn: string;
  order: number;
  pages: DocumentationPage[];
};

export type DocumentationTable = {
  columns: string[];
  rows: string[][];
};

export type DocumentationSection = {
  id: string;
  title: string;
  paragraphs?: string[];
  bullets?: string[];
  code?: string;
  language?: string;
  filename?: string;
  table?: DocumentationTable;
  callout?: {
    tone: 'info' | 'tip' | 'warning' | 'security' | 'accessibility';
    title: string;
    body: string;
  };
};
