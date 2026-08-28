import assert from 'node:assert/strict';
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { serviceCatalog } from '../mresalat/domains/service-catalog.ts';
import { ecosystemServiceById } from '../mresalat/domains/ecosystem.ts';
import { exampleDomains, exampleRoutes, routeSlug } from '../mresalat/examples/product/example-route-registry.ts';
import { filterServiceDiscoveryItems, serviceDiscoveryItems, serviceIdentityCoverage, sortServiceDiscoveryItems } from '../mresalat/examples/product/service-discovery.ts';

const repositoryRoot = path.resolve(import.meta.dirname, '..');
const productSourceRoot = path.join(repositoryRoot, 'mresalat', 'examples');

function sourceFiles(directory) {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const absolute = path.join(directory, entry.name);
    return entry.isDirectory() ? sourceFiles(absolute) : entry.name.endsWith('.tsx') ? [absolute] : [];
  });
}

function mappedRouteHasPage(route) {
  const cleanPath = route.href.split('?')[0];
  const segments = cleanPath.split('/').filter(Boolean);
  const exactPage = path.join(repositoryRoot, 'app', ...segments, 'page.tsx');
  if (existsSync(exactPage)) return true;
  const domainRoot = path.join(repositoryRoot, 'app', 'examples', route.domain);
  if (existsSync(path.join(domainRoot, '[...slug]', 'page.tsx'))) return true;
  for (let index = segments.length - 1; index >= 2; index -= 1) {
    const parent = path.join(repositoryRoot, 'app', ...segments.slice(0, index));
    if (!existsSync(parent)) continue;
    const dynamicPage = readdirSync(parent, { withFileTypes: true })
      .filter((entry) => entry.isDirectory() && entry.name.startsWith('['))
      .some((entry) => existsSync(path.join(parent, entry.name, 'page.tsx')));
    if (dynamicPage) return true;
  }
  return false;
}

test('all 69 audited paths map one-to-one to product example routes', () => {
  assert.equal(exampleRoutes.length, 69);
  assert.equal(new Set(exampleRoutes.map((route) => route.serviceId)).size, 69, 'service route ids must be unique');
  assert.equal(new Set(exampleRoutes.map((route) => route.href)).size, 69, 'route assignments must be unique');
  assert.deepEqual(new Set(exampleRoutes.map((route) => route.serviceId)), new Set(serviceCatalog.map((service) => service.id)));
});

test('every catalog record links to its registered /examples product experience', () => {
  for (const service of serviceCatalog) {
    const route = exampleRoutes.find((candidate) => candidate.serviceId === service.id);
    assert.ok(route, `${service.id} needs a registered example route`);
    assert.equal(service.demoHref, route.href, `${service.id} catalog link must use its product route`);
    assert.match(service.demoHref, /^\/examples\//, `${service.id} must link into /examples`);
  }
});

test('every domain has a landing page and every mapped route resolves through an app page', () => {
  assert.equal(exampleDomains.length, 12);
  for (const domain of exampleDomains) {
    assert.ok(existsSync(path.join(repositoryRoot, 'app', ...domain.href.split('/').filter(Boolean), 'page.tsx')), `${domain.key} needs a landing page`);
    assert.ok(exampleRoutes.some((route) => route.domain === domain.key), `${domain.key} needs mapped services`);
  }
  for (const route of exampleRoutes) assert.ok(mappedRouteHasPage(route), `${route.serviceId} does not resolve through an app route: ${route.href}`);
});

test('examples discovery exposes all 69 routes with valid ecosystem identities', () => {
  assert.equal(serviceDiscoveryItems.length, 69);
  assert.deepEqual(new Set(serviceDiscoveryItems.map((item) => item.service.id)), new Set(serviceCatalog.map((service) => service.id)));
  for (const item of serviceDiscoveryItems) {
    assert.equal(item.route.href, item.service.demoHref, `${item.service.id} must keep its direct example route`);
    assert.equal(item.identity, ecosystemServiceById[item.route.ecosystemServiceId], `${item.service.id} must resolve its registered ecosystem identity`);
    if (item.identity.identity.source === 'official-asset') {
      assert.ok(item.identity.identity.asset, `${item.identity.id} needs its official asset path`);
      assert.ok(existsSync(path.join(repositoryRoot, 'public', item.identity.identity.asset.replace(/^\//, ''))), `${item.identity.id} official asset must exist`);
    }
  }
  assert.deepEqual(serviceIdentityCoverage, { official: 60, designedFallback: 9 });
});

test('discovery search finds representative actions in all 12 product domains', () => {
  const cases = [
    ['عضویت', 'membership', 'individual-membership'],
    ['حامی', 'mhami', 'my-supporters'],
    ['سفارش', 'mbazar', 'mbazar-orders'],
    ['ام‌آموزش', 'learning', 'mamouzesh'],
    ['برداشت اعتبار', 'mhesam', 'credit-withdrawal'],
    ['همیاری', 'heavenly-resalat', 'my-contributions'],
    ['نوبت', 'msalamat', 'my-appointments'],
    ['بیمه بدنه', 'mbime', 'comprehensive-insurance'],
    ['سایا', 'auxiliary', 'saya'],
    ['رهیار', 'rahyar', 'your-rahyar'],
    ['SATNA', 'banking', 'satna-transfer'],
    ['ام‌پیام', 'communication', 'mpayam'],
  ];
  for (const [query, domain, serviceId] of cases) {
    const results = filterServiceDiscoveryItems(query);
    assert.ok(results.some((item) => item.route.domain === domain && item.service.id === serviceId), `${query} must find ${serviceId}`);
  }
  assert.ok(filterServiceDiscoveryItems('ساتنا').some((item) => item.service.id === 'satna-transfer'));
  assert.ok(filterServiceDiscoveryItems('M-Hesam').some((item) => item.service.id === 'credit-withdrawal'));
  assert.equal(sortServiceDiscoveryItems(filterServiceDiscoveryItems('بیمه بدنه'), 'audit', 'بیمه بدنه')[0].service.id, 'comprehensive-insurance');
  assert.equal(sortServiceDiscoveryItems(filterServiceDiscoveryItems('نوبت'), 'audit', 'نوبت')[0].service.id, 'my-appointments');
});

test('domain filters reduce results and all discovery sorts are deterministic', () => {
  const expectedCounts = [4, 7, 11, 2, 10, 2, 4, 5, 4, 2, 9, 9];
  assert.deepEqual(exampleDomains.map((domain) => filterServiceDiscoveryItems('', domain.key).length), expectedCounts);
  for (const sort of ['audit', 'fa', 'en', 'count-desc', 'count-asc']) {
    const first = sortServiceDiscoveryItems(serviceDiscoveryItems, sort).map((item) => item.service.id);
    const second = sortServiceDiscoveryItems(serviceDiscoveryItems, sort).map((item) => item.service.id);
    assert.deepEqual(first, second, `${sort} sort must be deterministic`);
    assert.equal(new Set(first).size, 69, `${sort} sort must preserve all routes`);
  }
});

test('ProductGallery contains the unified search, domain filters, sort and service index', () => {
  const source = readFileSync(path.join(productSourceRoot, 'product', 'ProductGallery.tsx'), 'utf8');
  assert.match(source, /product-discovery-search/);
  assert.match(source, /product-domain-filters/);
  assert.match(source, /product-discovery-sort/);
  assert.match(source, /product-route-grid/);
  assert.match(source, /<MResalatServiceIcon service=\{identity\}/);
  assert.doesNotMatch(source, /<ServiceExamples/);
});

test('every new product experience has an explicit App Router page', () => {
  for (const route of exampleRoutes.filter((item) => item.source === 'product-example')) {
    const segments = route.href.split('?')[0].split('/').filter(Boolean);
    const exactPage = path.join(repositoryRoot, 'app', ...segments, 'page.tsx');
    assert.ok(existsSync(exactPage), `${route.serviceId} needs an explicit route page: ${route.href}`);
  }
});

test('new product routes have domain compositions and existing M-Bazar routes are reused', () => {
  const source = sourceFiles(productSourceRoot).map((file) => readFileSync(file, 'utf8')).join('\n');
  for (const route of exampleRoutes.filter((item) => item.source === 'product-example')) {
    assert.ok(source.includes(`'${route.serviceId}'`) || source.includes(`\"${route.serviceId}\"`), `${route.serviceId} needs an explicit product screen composition`);
    assert.ok(routeSlug(route.href, route.domain).length > 0 || ['/examples/mhesam', '/examples/heavenly-resalat', '/examples/msalamat', '/examples/mbime', '/examples/rahyar', '/examples/banking'].includes(route.href), `${route.serviceId} needs a reviewable route`);
  }
  const mbazarRoutes = exampleRoutes.filter((item) => item.domain === 'mbazar');
  assert.equal(mbazarRoutes.length, 11);
  assert.ok(mbazarRoutes.every((route) => route.source === 'existing-mbazar'));
});

test('observed unavailable and not-visible services have explicit product state pages', () => {
  const rahyarSource = readFileSync(path.join(productSourceRoot, 'rahyar', 'RahyarExamples.tsx'), 'utf8');
  const communicationSource = readFileSync(path.join(productSourceRoot, 'communication', 'CommunicationExamples.tsx'), 'utf8');
  assert.match(rahyarSource, /UnavailableProduct serviceId="your-rahyar"/);
  assert.match(rahyarSource, /UnavailableProduct serviceId="rahyar-id-lookup"/);
  assert.match(communicationSource, /UnavailableProduct serviceId="memorial" notVisible/);
});

test('sensitive actions stay behind visible, non-submitting boundaries', () => {
  const checkoutSource = readFileSync(path.join(repositoryRoot, 'mresalat', 'mbazar', 'MBazarPurchase.tsx'), 'utf8');
  const communicationSource = readFileSync(path.join(productSourceRoot, 'communication', 'CommunicationExamples.tsx'), 'utf8');
  assert.match(checkoutSource, /پیش از پرداخت و ثبت سفارش متوقف شد/);
  assert.doesNotMatch(checkoutSource, /onConfirm=\{\(\) => location\.assign/);
  assert.match(communicationSource, /disabled aria-label="ارسال پیام نمایشی"/);
});

test('long RTL badges use scoped responsive containment without changing global pills', () => {
  const globalCss = readFileSync(path.join(repositoryRoot, 'app', 'globals.css'), 'utf8');
  const exampleCss = readFileSync(path.join(repositoryRoot, 'app', 'product-examples.css'), 'utf8');
  assert.match(globalCss, /\.status-badge[^}]*white-space:\s*nowrap/);
  assert.match(exampleCss, /\.health-provider-grid article header[^}]*flex-wrap:\s*wrap/);
  assert.match(exampleCss, /\.health-provider-grid article header \.status-badge[^}]*white-space:\s*normal[^}]*overflow-wrap:\s*anywhere/);
  assert.match(exampleCss, /\.product-example \.status-badge[^}]*flex-shrink:\s*0[^}]*max-width:\s*100%/);
  assert.match(exampleCss, /\.external-product-gate > \.status-badge\.status-badge-warning/);
  assert.match(exampleCss, /\.health-privacy-hero > \.status-badge\.status-badge-success/);
});
