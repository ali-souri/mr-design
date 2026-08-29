import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { test } from 'node:test';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const showcase = read('app/showcase/page.tsx');
const registry = read('mresalat/docs/registry.ts');
const sidebar = read('mresalat/docs/DocumentationSidebar.tsx');
const search = read('mresalat/docs/DocsSearch.tsx');
const route = read('app/showcase/[...slug]/page.tsx');
const codeExample = read('mresalat/showcase/CodeExample.tsx');
const css = read('app/globals.css');
const inventory = read('mresalat/core/component-inventory.ts');
const references = read('mresalat/docs/ReferenceViews.tsx');

const legacyAnchors = [
  'brand', 'typography', 'color', 'foundations', 'grid', 'icons', 'service-identities',
  'core', 'navigation', 'ai', 'rag', 'journeys', 'secure', 'motion', 'mbazar',
  'segment-phase-one', 'segment-phase-two', 'segment-phase-three', 'templates',
  'catalog', 'inventory', 'segments',
];

const legacyDemos = [
  'Assistant3DDemo', 'AssistantShell', 'TrustLegend', 'SourceCitation', 'UncertainAnswer',
  'HumanHandoff', 'ProcessReviewWizard', 'MBazarShowcase', 'SegmentComponentShowcase',
  'SegmentPhaseTwoShowcase', 'PhaseThreeShowcase', 'GridLayoutDemo', 'componentInventory',
  'serviceCatalog', 'segments.map', 'showcaseSnippets',
];

test('legacy Showcase anchors remain available', () => {
  for (const anchor of legacyAnchors) assert.match(showcase, new RegExp(`['"]${anchor}['"]`), `missing #${anchor}`);
});

test('legacy Showcase demonstrations and registries remain rendered', () => {
  for (const demo of legacyDemos) assert.ok(showcase.includes(demo), `missing legacy surface ${demo}`);
  assert.ok(showcase.includes('<DocumentationLanding />'), 'developer docs landing must be additive');
  assert.ok(showcase.includes('id="legacy-showcase"'), 'legacy Showcase needs an explicit preserved target');
});

test('documentation registry slugs are unique and resolve through the catch-all route', () => {
  const slugs = [...registry.matchAll(/(?:article|component)\('([^']+)'/g)].map((match) => match[1]);
  assert.ok(slugs.length >= 70, `expected a serious routed docs set, found ${slugs.length}`);
  assert.equal(new Set(slugs).size, slugs.length, 'duplicate documentation slug');
  assert.match(route, /generateStaticParams/);
  assert.match(route, /getDocumentationPage\(slug\.join\('\/'\)\)/);
});

test('sidebar, search, breadcrumbs and previous-next share the typed registry', () => {
  assert.match(sidebar, /documentationGroups\.map/);
  assert.match(search, /documentationPages\.filter/);
  assert.match(registry, /getDocumentationNeighbors/);
  assert.match(registry, /documentationPageBySlug/);
});

test('all component inventory items receive generated reference coverage', () => {
  const names = [...inventory.matchAll(/name: '([^']+)'/g)].map((match) => match[1]);
  assert.ok(names.length >= 70);
  assert.match(references, /componentInventory\.filter/);
  assert.match(references, /Generated reference/);
  assert.match(references, /detailSlugs/);
});

test('CodeExample copy control lives in a physical right-side toolbar above code', () => {
  const toolbarIndex = codeExample.indexOf('code-example-toolbar');
  const preIndex = codeExample.indexOf('<pre');
  assert.ok(toolbarIndex > -1 && preIndex > toolbarIndex, 'toolbar must precede pre');
  assert.match(css, /\.code-example-toolbar \{[^}]*direction: ltr;[^}]*justify-content: space-between;/);
  assert.match(css, /\.code-example-copy \{[^}]*position: static;/);
  assert.doesNotMatch(css, /\.code-example-copy \{[^}]*position: absolute;/);
  assert.match(codeExample, /aria-live="polite"/);
});

test('documentation uses authored section ids and mobile dialog behavior', () => {
  const content = read('mresalat/docs/content.ts');
  assert.match(content, /section\('overview'/);
  assert.doesNotMatch(content, /slugify/i);
  assert.match(sidebar, /event\.key === 'Escape'/);
  assert.match(sidebar, /event\.key !== 'Tab'/);
  assert.match(sidebar, /document\.body\.style\.overflow = 'hidden'/);
  assert.match(sidebar, /aria-expanded/);
  assert.match(sidebar, /aria-current/);
});
