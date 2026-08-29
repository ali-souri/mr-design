'use client';

import { useState } from 'react';
import { analyticsEventNames } from '@/mresalat/core/analytics';
import { componentInventory } from '@/mresalat/core/component-inventory';
import { iconGalleryNames, MResalatIcon } from '@/mresalat/core/MResalatIcon';
import { serviceCatalog } from '@/mresalat/domains/service-catalog';
import { exampleRoutes } from '@/mresalat/examples/product/example-route-registry';
import { CopyAction } from './CopyAction';
import { documentationPages } from './registry';
import { breakpointReferences, componentDocReferences, configurationReferences, riskMatrix, tokenReferences } from './references';
import type { DocumentationPage, DocumentationPageKind } from './types';
import { ComponentLivePreview } from './ComponentLivePreview';

const normalize = (value: string) => value.toLocaleLowerCase('fa').trim();

function FilterInput({ value, onChange, placeholder }: { value: string; onChange: (value: string) => void; placeholder: string }) {
  return <label className="docs-filter-input"><MResalatIcon name="search" size={16} /><span className="sr-only">فیلتر</span><input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} /></label>;
}

function TokenReferenceView() {
  const [query, setQuery] = useState('');
  const filtered = tokenReferences.filter((token) => normalize(`${token.group} ${token.name} ${token.cssVar} ${token.purpose}`).includes(normalize(query)));
  const groups = [...new Set(filtered.map((token) => token.group))];
  return <div className="docs-reference-view"><FilterInput value={query} onChange={setQuery} placeholder="فیلتر توکن‌ها…" />{groups.map((group) => <section key={group} className="docs-reference-section"><h2 id={`tokens-${group.toLowerCase()}`}>{group}</h2><div className="docs-table-wrap"><table><thead><tr><th>Token</th><th>Light</th><th>Dark</th><th>Purpose</th></tr></thead><tbody>{filtered.filter((token) => token.group === group).map((token) => <tr key={token.name}><td><div className="docs-copy-cell"><code dir="ltr">{token.name}</code><CopyAction value={token.name} label="کپی توکن" /></div><small dir="ltr">var({token.cssVar})</small></td><td><span className="docs-token-value"><i style={{ background: token.light }} /><code dir="ltr">{token.light}</code><CopyAction value={token.light} label="کپی مقدار" /></span></td><td><span className="docs-token-value"><i style={{ background: token.dark }} /><code dir="ltr">{token.dark}</code><CopyAction value={token.dark} label="کپی مقدار" /></span></td><td>{token.purpose}</td></tr>)}</tbody></table></div></section>)}</div>;
}

function IconReferenceView() {
  const [query, setQuery] = useState('');
  const icons = iconGalleryNames.filter((name) => normalize(name).includes(normalize(query)));
  return <div className="docs-reference-view"><FilterInput value={query} onChange={setQuery} placeholder="نام آیکون…" /><p className="docs-result-count">{icons.length} نام معنایی</p><div className="docs-icon-reference">{icons.map((name) => <article key={name}><MResalatIcon name={name} size={24} /><code dir="ltr">{name}</code><CopyAction value={name} /></article>)}</div></div>;
}

function ComponentInventoryView({ pageSlug }: { pageSlug: string }) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState(pageSlug.includes('marketplace') ? 'Marketplace' : 'all');
  const categories = [...new Set(componentInventory.map((item) => item.category))];
  const filtered = componentInventory.filter((item) => (category === 'all' || item.category === category) && normalize(`${item.name} ${item.purpose} ${item.variants.join(' ')} ${item.states.join(' ')}`).includes(normalize(query)));
  const detailSlugs = new Map(documentationPages.filter((page) => page.componentName).map((page) => [page.componentName, page.slug]));
  return <div className="docs-reference-view"><div className="docs-filter-row"><FilterInput value={query} onChange={setQuery} placeholder="نام، هدف، variant یا state…" /><label>دسته<span className="sr-only">جزء</span><select value={category} onChange={(event) => setCategory(event.target.value)}><option value="all">همه</option>{categories.map((item) => <option key={item}>{item}</option>)}</select></label></div><p className="docs-result-count">{filtered.length} از {componentInventory.length} جزء</p><div className="docs-component-reference">{filtered.map((item) => <article key={item.name} id={`component-${item.name.toLowerCase()}`}><header><code dir="ltr">{item.name}</code><span>{item.category}</span></header><p>{item.purpose}</p><dl><div><dt>Variants</dt><dd>{item.variants.join(' · ')}</dd></div><div><dt>States</dt><dd>{item.states.join(' · ')}</dd></div></dl>{detailSlugs.has(item.name) ? <a href={`/showcase/${detailSlugs.get(item.name)}`}>مستندات و API کامل <MResalatIcon name="next" size={15} /></a> : <small>Generated reference · صفحه اختصاصی ندارد</small>}</article>)}</div></div>;
}

function ServiceReferenceView({ routesOnly = false }: { routesOnly?: boolean }) {
  const [query, setQuery] = useState('');
  const [risk, setRisk] = useState('all');
  const [domain, setDomain] = useState('all');
  const domains = [...new Set(serviceCatalog.map((item) => item.domain))].sort();
  const routeByService = new Map(exampleRoutes.map((route) => [route.serviceId, route]));
  const filtered = serviceCatalog.filter((item) => (risk === 'all' || item.riskLevel === risk) && (domain === 'all' || item.domain === domain) && normalize(`${item.id} ${item.titleFa} ${item.titleEn} ${item.domain} ${item.verificationStatus} ${item.demoHref ?? ''}`).includes(normalize(query)));
  return <div className="docs-reference-view"><div className="docs-filter-row"><FilterInput value={query} onChange={setQuery} placeholder="خدمت، route، domain یا status…" /><label>ریسک<select value={risk} onChange={(event) => setRisk(event.target.value)}><option value="all">همه</option>{['L0', 'L1', 'L2', 'L3'].map((item) => <option key={item}>{item}</option>)}</select></label><label>دامنه<select value={domain} onChange={(event) => setDomain(event.target.value)}><option value="all">همه</option>{domains.map((item) => <option key={item}>{item}</option>)}</select></label></div><p className="docs-result-count">{filtered.length} از {serviceCatalog.length} مسیر</p><div className="docs-table-wrap docs-service-table"><table><thead><tr><th>Service</th><th>Domain / Route</th><th>Risk</th><th>Status</th>{!routesOnly && <th>Safe stop</th>}</tr></thead><tbody>{filtered.map((item) => { const route = routeByService.get(item.id); const href = item.demoHref ?? route?.href; return <tr key={item.id}><td><strong>{item.titleFa}</strong><small dir="ltr">{item.titleEn}</small></td><td><code dir="ltr">{item.domain}</code>{href ? <a dir="ltr" href={href}>{href}</a> : <span>route ثبت نشده</span>}</td><td><bdi dir="ltr">{item.riskLevel}</bdi></td><td>{item.verificationStatus}</td>{!routesOnly && <td>{item.safeStopFa}</td>}</tr>; })}</tbody></table></div></div>;
}

function ConfigurationReferenceView() {
  const [query, setQuery] = useState('');
  const filtered = configurationReferences.filter((item) => normalize(Object.values(item).join(' ')).includes(normalize(query)));
  const groups = [...new Set(filtered.map((item) => item.group))];
  return <div className="docs-reference-view"><FilterInput value={query} onChange={setQuery} placeholder="تنظیم، type، مقدار یا source…" />{groups.map((group) => <section className="docs-reference-section" key={group}><h2 id={`config-${group.toLowerCase()}`}>{group}</h2><div className="docs-table-wrap"><table><thead><tr><th>Setting</th><th>Type / Values</th><th>Default</th><th>Source</th><th>Scope</th></tr></thead><tbody>{filtered.filter((item) => item.group === group).map((item) => <tr key={`${item.group}-${item.setting}`}><td><code dir="ltr">{item.setting}</code></td><td><code dir="ltr">{item.type}</code><small>{item.values}</small></td><td><code dir="ltr">{item.defaultValue}</code></td><td><code dir="ltr">{item.source}</code></td><td>{item.scope}</td></tr>)}</tbody></table></div></section>)}</div>;
}

function AnalyticsReferenceView() {
  const [query, setQuery] = useState('');
  const events = analyticsEventNames.filter((event) => event.includes(normalize(query)));
  return <div className="docs-reference-view"><FilterInput value={query} onChange={setQuery} placeholder="نام event…" /><p className="docs-result-count">{events.length} رویداد تایپ‌شده</p><div className="docs-event-reference">{events.map((event) => <article key={event}><code dir="ltr">{event}</code><CopyAction value={event} /></article>)}</div><div className="docs-callout docs-callout-info"><strong>وضعیت فعلی</strong><p>trackEvent یک CustomEvent محلی با نام mresalat:analytics dispatch می‌کند؛ vendor یا backend analytics متصل نیست.</p></div></div>;
}

function RiskReferenceView() {
  return <div className="docs-reference-view"><div className="docs-table-wrap"><table><thead><tr><th>Level</th><th>Meaning</th><th>Auth</th><th>Review</th><th>Confirmation</th><th>Step-up</th><th>Safe stop / receipt</th></tr></thead><tbody>{riskMatrix.map((row) => <tr key={row[0]}><td><code dir="ltr">{row[0]}</code></td>{row.slice(1).map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}

function BreakpointReferenceView() {
  return <div className="docs-reference-view"><div className="docs-table-wrap"><table><thead><tr><th>Width</th><th>Typical behavior</th><th>Navigation</th><th>Grid</th></tr></thead><tbody>{breakpointReferences.map((row) => <tr key={row[0]}>{row.map((cell, index) => <td key={index} dir={index === 0 ? 'ltr' : undefined}>{cell}</td>)}</tr>)}</tbody></table></div><p className="docs-reference-note">نام‌های breakpoint فریم‌ورکی ساخته نشده‌اند؛ جدول مستقیماً widthهای موجود در CSS را بیان می‌کند.</p></div>;
}

function ComponentDetailView({ page }: { page: DocumentationPage }) {
  const detail = page.componentName ? componentDocReferences[page.componentName] : undefined;
  if (!detail) return null;
  return <div className="docs-reference-view docs-component-detail"><section className="docs-component-meta"><div><span>API status</span><strong>{detail.status}</strong></div><div><span>Stability</span><strong>{detail.stability}</strong></div><div><span>Source</span><code dir="ltr">{detail.sourcePath}</code></div></section><section><h2 id="live-example">نمونه زنده</h2><ComponentLivePreview name={detail.name} /></section><section><h2 id="import">Import</h2><pre className="docs-inline-code" dir="ltr"><code>{detail.importPath}</code></pre></section><section><h2 id="props">Props / API</h2><div className="docs-table-wrap"><table><thead><tr><th>Prop</th><th>Type</th><th>Default</th><th>Required</th><th>Description</th></tr></thead><tbody>{detail.props.map((prop) => <tr key={prop.name}><td><code dir="ltr">{prop.name}</code></td><td><code dir="ltr">{prop.type}</code></td><td><code dir="ltr">{prop.defaultValue}</code></td><td>{prop.required ? 'بله' : 'خیر'}</td><td>{prop.description}</td></tr>)}</tbody></table></div></section><section className="docs-two-column-notes"><div><h2 id="component-accessibility">Accessibility</h2><ul>{detail.accessibility.map((item) => <li key={item}>{item}</li>)}</ul></div><div><h2 id="component-rtl">RTL</h2><ul>{detail.rtl.map((item) => <li key={item}>{item}</li>)}</ul></div></section><section><h2 id="related-components">Related</h2><div className="docs-related-links">{detail.related.map((item) => <a key={item} href={`/showcase/components#component-${item.toLowerCase()}`}><code dir="ltr">{item}</code></a>)}</div></section></div>;
}

export function ReferenceView({ kind, page }: { kind?: DocumentationPageKind; page: DocumentationPage }) {
  switch (kind) {
    case 'tokens': return <TokenReferenceView />;
    case 'icons': return <IconReferenceView />;
    case 'components': return <ComponentInventoryView pageSlug={page.slug} />;
    case 'services': return <ServiceReferenceView />;
    case 'routes': return <ServiceReferenceView routesOnly />;
    case 'configuration': return <ConfigurationReferenceView />;
    case 'analytics': return <AnalyticsReferenceView />;
    case 'risk-matrix': return <RiskReferenceView />;
    case 'breakpoints': return <BreakpointReferenceView />;
    case 'component-detail': return <ComponentDetailView page={page} />;
    default: return null;
  }
}
