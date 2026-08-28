import assert from 'node:assert/strict';
import test from 'node:test';
import { serviceCatalog, serviceCatalogChapters, serviceCatalogSource } from '../mresalat/domains/service-catalog.ts';
import { serviceComponentRegistry } from '../mresalat/domains/service-component-registry.ts';

const expectedChapterCounts = [4, 7, 11, 2, 10, 2, 4, 5, 4, 2, 9, 9];
const allowedStatuses = new Set(['authenticated', 'public', 'safe-stop', 'gated', 'unavailable', 'not-visible']);
const allowedRisks = new Set(['L0', 'L1', 'L2', 'L3']);

test('catalog contains exactly 69 unique audited paths across 12 chapters', () => {
  assert.equal(serviceCatalogSource.expectedPathCount, 69);
  assert.equal(serviceCatalog.length, 69);
  assert.equal(new Set(serviceCatalog.map((item) => item.id)).size, 69, 'service ids must be unique');
  assert.equal(serviceCatalogChapters.length, 12);
  assert.deepEqual(serviceCatalogChapters.map((chapter) => serviceCatalog.filter((item) => item.chapter === chapter.id).length), expectedChapterCounts);
});

test('every audited path has complete bilingual evidence, safety and demo metadata', () => {
  for (const item of serviceCatalog) {
    assert.ok(item.id.trim(), 'id is required');
    assert.ok(item.titleFa.trim(), `${item.id} needs a Persian title`);
    assert.ok(item.titleEn.trim(), `${item.id} needs an English title`);
    assert.ok(allowedStatuses.has(item.verificationStatus), `${item.id} has an invalid evidence status`);
    assert.ok(allowedRisks.has(item.riskLevel), `${item.id} has an invalid risk level`);
    assert.ok(item.safeStopFa.trim(), `${item.id} needs a Persian safe-stop boundary`);
    assert.ok(item.safeStopEn.trim(), `${item.id} needs an English safe-stop boundary`);
    assert.ok(item.surfaceKind.trim(), `${item.id} needs a surface kind`);
    assert.equal(item.isMock, true, `${item.id} must be explicitly mock-only`);
    assert.ok(item.componentKeys.length > 0, `${item.id} needs at least one component mapping`);
  }
});

test('every component key resolves to the reusable component registry', () => {
  for (const item of serviceCatalog) {
    for (const key of item.componentKeys) assert.ok(serviceComponentRegistry[key], `${item.id} references unregistered component ${key}`);
  }
});

test('showcase registry exposes all chapters and high-risk paths have an explicit boundary component', () => {
  assert.deepEqual([...new Set(serviceCatalog.map((item) => item.chapter))], serviceCatalogChapters.map((item) => item.id));
  for (const item of serviceCatalog.filter((entry) => entry.riskLevel === 'L2' || entry.riskLevel === 'L3')) {
    assert.ok(item.componentKeys.includes('safe-stop-notice'), `${item.id} needs SafeStopNotice`);
  }
});
