'use client';

import { useState } from 'react';
import { MBazarAddressCard, MBazarFavoriteCard, MBazarProfileGroup, MBazarRatingInput, MBazarReviewCard } from './MBazarAccount';
import { MBazarFulfillmentGroup, MBazarOrderCard, MBazarOrderProgress, MBazarOrderStatus } from './MBazarOrders';
import { MBazarSellerHeader } from './MBazarSeller';
import { MBazarSupportCaseCard } from './MBazarSupport';
import { initialMBazarDomain, mbazarSellers } from './data';

export function MBazarBatchCShowcase() {
  const [rating, setRating] = useState(4);
  const order = initialMBazarDomain.orders[0];
  return <div className="mbazar-batch-c-showcase"><header><span>Buyer post-purchase components</span><h3>Batch C: وضعیت، اقدام بعدی و حساب خریدار</h3></header><div className="mbazar-showcase-grid"><section><small>MBazarOrderStatus</small><MBazarOrderStatus status="preparing" prominent /></section><section><small>MBazarRatingInput</small><MBazarRatingInput value={rating} onChange={setRating} /></section></div><MBazarOrderCard order={order} /><section><small>MBazarOrderProgress</small><MBazarOrderProgress milestones={order.sellerGroups[0].milestones} /></section><MBazarFulfillmentGroup group={order.sellerGroups[0]} order={order} /><div className="mbazar-showcase-grid"><MBazarAddressCard address={initialMBazarDomain.addresses[0]} /><MBazarReviewCard review={initialMBazarDomain.reviews[0]} /></div><section><small>MBazarFavoriteCard · price drop</small><MBazarFavoriteCard favorite={initialMBazarDomain.favorites[0]} /></section><MBazarSupportCaseCard supportCase={initialMBazarDomain.supportCases[0]} /><MBazarProfileGroup title="خریدهای من" icon="orders" items={[{ label: 'سفارش‌های من', detail: 'وضعیت و اقدام بعدی', href: '/examples/mbazar/orders', badge: '۳ فعال' }, { label: 'علاقه‌مندی‌ها', detail: 'تغییر قیمت و موجودی', href: '/examples/mbazar/favorites' }]} /><MBazarSellerHeader seller={mbazarSellers[1]} /></div>;
}
