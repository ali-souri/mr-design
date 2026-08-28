import { ecosystemServiceById, type MResalatService } from '../../domains/ecosystem.ts';
import { serviceCatalogById, type AuditedServicePath, type ServiceSurfaceKind } from '../../domains/service-catalog.ts';
import { exampleDomainByKey, exampleDomains, exampleRoutes, routesForDomain, type ExampleDomain, type ExampleDomainKey, type ExampleRoute } from './example-route-registry.ts';

export type DiscoverySort = 'audit' | 'fa' | 'en' | 'count-desc' | 'count-asc';
export type DiscoveryDomainFilter = ExampleDomainKey | 'all';

export type ServiceDiscoveryItem = {
  auditIndex: number;
  service: AuditedServicePath;
  route: ExampleRoute;
  domain: ExampleDomain;
  identity: MResalatService;
  purpose: string;
  searchText: string;
};

export const surfaceKindLabels: Record<ServiceSurfaceKind, string> = {
  gate: 'ورود و مرز دسترسی',
  dashboard: 'نمای کلی و وضعیت‌ها',
  form: 'فرم تعاملی و مرور امن',
  list: 'فهرست، جزئیات و حالت‌ها',
  search: 'جستجو، فیلتر و انتخاب',
  marketplace: 'مرور و انتخاب در بازار',
  'read-only': 'پیگیری و مشاهده امن',
  'safe-stop': 'تجربه نمایشی تا مرز اقدام واقعی',
  unavailable: 'بازنمایی صادقانه وضعیت در دسترس نبودن',
  info: 'اطلاعات و راهنمای دسترسی',
  permission: 'درخواست مجوز با داده ساختگی',
};

export function normalizeDiscoveryText(value: string) {
  return value
    .normalize('NFKC')
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[ۀة]/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/[إأٱ]/g, 'ا')
    .replace(/[\u064B-\u065F\u0670]/g, '')
    .replace(/[\u200C-\u200F]/g, '')
    .replace(/[-_/+]+/g, ' ')
    .toLocaleLowerCase('fa-IR')
    .replace(/\s+/g, ' ')
    .trim();
}

function discoveryPurpose(service: AuditedServicePath) {
  return service.note ? `${surfaceKindLabels[service.surfaceKind]} · ${service.note}` : surfaceKindLabels[service.surfaceKind];
}

export const serviceDiscoveryItems: ServiceDiscoveryItem[] = exampleRoutes.map((route, auditIndex) => {
  const service = serviceCatalogById[route.serviceId];
  const domain = exampleDomainByKey[route.domain];
  const identity = ecosystemServiceById[route.ecosystemServiceId];
  if (!service) throw new Error(`Missing catalog service for example route: ${route.serviceId}`);
  if (!domain) throw new Error(`Missing example domain for example route: ${route.serviceId}`);
  if (!identity) throw new Error(`Missing ecosystem identity for example route: ${route.serviceId} -> ${route.ecosystemServiceId}`);

  const purpose = discoveryPurpose(service);
  const searchText = normalizeDiscoveryText([
    service.titleFa,
    service.titleEn,
    service.id,
    service.domain,
    service.note ?? '',
    purpose,
    domain.titleFa,
    domain.titleEn,
    domain.description,
    identity.titleFa,
    identity.titleEn ?? '',
    identity.description,
    ...identity.actions.map((action) => action.label),
  ].join(' '));

  return { auditIndex, service, route, domain, identity, purpose, searchText };
});

const faCollator = new Intl.Collator('fa', { sensitivity: 'base', numeric: true });
const enCollator = new Intl.Collator('en', { sensitivity: 'base', numeric: true });

export const pathCountByDomain = Object.fromEntries(exampleDomains.map((domain) => [domain.key, routesForDomain(domain.key).length])) as Record<ExampleDomainKey, number>;

export function filterServiceDiscoveryItems(query: string, domain: DiscoveryDomainFilter = 'all') {
  const terms = normalizeDiscoveryText(query).split(' ').filter(Boolean);
  return serviceDiscoveryItems.filter((item) => {
    if (domain !== 'all' && item.route.domain !== domain) return false;
    return terms.every((term) => item.searchText.includes(term));
  });
}

function searchRelevance(item: ServiceDiscoveryItem, query: string) {
  const normalizedQuery = normalizeDiscoveryText(query);
  if (!normalizedQuery) return 0;
  const titles = [normalizeDiscoveryText(item.service.titleFa), normalizeDiscoveryText(item.service.titleEn)];
  if (titles.some((title) => title === normalizedQuery)) return 0;
  if (titles.some((title) => title.startsWith(normalizedQuery))) return 1;
  if (titles.some((title) => title.includes(normalizedQuery))) return 2;
  if (item.identity.actions.some((action) => normalizeDiscoveryText(action.label) === normalizedQuery)) return 3;
  if ([item.identity.titleFa, item.identity.titleEn ?? ''].some((title) => normalizeDiscoveryText(title).includes(normalizedQuery))) return 4;
  return 5;
}

export function sortServiceDiscoveryItems(items: ServiceDiscoveryItem[], sort: DiscoverySort, query = '') {
  return [...items].sort((left, right) => {
    let comparison = 0;
    if (sort === 'audit' && query.trim()) comparison = searchRelevance(left, query) - searchRelevance(right, query);
    if (sort === 'fa') comparison = faCollator.compare(left.service.titleFa, right.service.titleFa);
    if (sort === 'en') comparison = enCollator.compare(left.service.titleEn, right.service.titleEn);
    if (sort === 'count-desc') comparison = pathCountByDomain[right.route.domain] - pathCountByDomain[left.route.domain];
    if (sort === 'count-asc') comparison = pathCountByDomain[left.route.domain] - pathCountByDomain[right.route.domain];
    return comparison || left.auditIndex - right.auditIndex;
  });
}

export function sortExampleDomains(domains: ExampleDomain[], sort: DiscoverySort) {
  return [...domains].sort((left, right) => {
    let comparison = 0;
    if (sort === 'fa') comparison = faCollator.compare(left.titleFa, right.titleFa);
    if (sort === 'en') comparison = enCollator.compare(left.titleEn, right.titleEn);
    if (sort === 'count-desc') comparison = pathCountByDomain[right.key] - pathCountByDomain[left.key];
    if (sort === 'count-asc') comparison = pathCountByDomain[left.key] - pathCountByDomain[right.key];
    return comparison || exampleDomains.findIndex((domain) => domain.key === left.key) - exampleDomains.findIndex((domain) => domain.key === right.key);
  });
}

export const serviceIdentityCoverage = serviceDiscoveryItems.reduce((coverage, item) => {
  coverage[item.identity.identity.source === 'official-asset' ? 'official' : 'designedFallback'] += 1;
  return coverage;
}, { official: 0, designedFallback: 0 });
