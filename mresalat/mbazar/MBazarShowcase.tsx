'use client';

import { useState } from 'react';
import { mbazarCategories, mbazarProducts } from './data';
import { MBazarCategoryCard, MBazarFilterBar, MBazarProductCard, MBazarProductQuickView, MBazarSearch, MarketplaceContext, PriceDisplay, PurchaseModeBadge } from './MBazarComponents';
import { MBazarBatchBShowcase } from './MBazarPurchase';
import { MBazarBatchCShowcase } from './MBazarBatchCShowcase';

export function MBazarShowcase() {
  const [quickProduct, setQuickProduct] = useState<(typeof mbazarProducts)[number]>();
  const [installment, setInstallment] = useState(true);
  const [available, setAvailable] = useState(false);
  return <div className="mbazar-showcase"><MarketplaceContext /><MBazarSearch /><div className="mbazar-showcase-row"><MBazarCategoryCard category={mbazarCategories[0]} /><article className="mbazar-showcase-price"><span>PriceDisplay + PurchaseModeBadge</span><PriceDisplay product={mbazarProducts[0]} /><PurchaseModeBadge eligible /></article></div><div className="mbazar-showcase-products"><div><small>grid</small><MBazarProductCard product={mbazarProducts[0]} variant="grid" onQuickView={setQuickProduct} /></div><div><small>carousel</small><MBazarProductCard product={mbazarProducts[1]} variant="carousel" onQuickView={setQuickProduct} /></div><div><small>list</small><MBazarProductCard product={mbazarProducts[2]} variant="list" onQuickView={setQuickProduct} /></div><div><small>recommendation</small><MBazarProductCard product={mbazarProducts[3]} variant="recommendation" onQuickView={setQuickProduct} /></div></div><MBazarFilterBar resultCount={6} installmentOnly={installment} availableOnly={available} onInstallmentChange={setInstallment} onAvailableChange={setAvailable} onOpenDrawer={() => setQuickProduct(mbazarProducts[0])} /><button type="button" className="button button-secondary" onClick={() => setQuickProduct(mbazarProducts[0])}>باز کردن Product Quick View</button><MBazarBatchBShowcase /><MBazarBatchCShowcase /><MBazarProductQuickView product={quickProduct} onClose={() => setQuickProduct(undefined)} /></div>;
}
