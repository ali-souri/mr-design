'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { trackEvent } from '@/mresalat/core/analytics';
import { initialMBazarCart, initialMBazarDomain, mbazarAddresses, productById, productStock } from './data';
import type { MBazarAddress, MBazarCart, MBazarCheckoutDraft, MBazarDomainSnapshot, MBazarFavorite, MBazarOrder, MBazarReview, MBazarSupportCase, MBazarSupportIssueType } from './types';

const CART_KEY = 'mresalat.mbazar.v1.cart';
const CHECKOUT_KEY = 'mresalat.mbazar.v1.checkout';
const DOMAIN_KEY = 'mresalat.mbazar.v1.domain';
const defaultDraft: MBazarCheckoutDraft = { step: 'delivery', addressId: mbazarAddresses[0].id, deliveryMethod: 'standard', eligibilityScenario: 'eligible', acknowledgement: false };

function validCart(value: unknown): value is MBazarCart {
  if (!value || typeof value !== 'object') return false;
  const cart = value as MBazarCart;
  return cart.currency === 'IRT' && Array.isArray(cart.items) && cart.items.every((item) => typeof item.productId === 'string' && typeof item.sellerId === 'string' && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= (productStock[item.productId] ?? 10) && typeof item.selected === 'boolean');
}
function validDraft(value: unknown): value is MBazarCheckoutDraft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as MBazarCheckoutDraft;
  return ['delivery', 'payment', 'eligibility', 'plan', 'review', 'confirm'].includes(draft.step) && typeof draft.addressId === 'string' && ['standard', 'scheduled'].includes(draft.deliveryMethod) && ['eligible', 'conditional', 'unknown', 'ineligible'].includes(draft.eligibilityScenario) && typeof draft.acknowledgement === 'boolean';
}
function validDomain(value: unknown): value is MBazarDomainSnapshot {
  if (!value || typeof value !== 'object') return false;
  const domain = value as MBazarDomainSnapshot;
  return Array.isArray(domain.favorites) && domain.favorites.every((item) => typeof item.productId === 'string' && typeof item.savedPrice === 'number')
    && Array.isArray(domain.addresses) && domain.addresses.every((item) => typeof item.id === 'string' && typeof item.title === 'string' && typeof item.address === 'string')
    && Array.isArray(domain.orders) && domain.orders.every((item) => typeof item.id === 'string' && typeof item.reference === 'string' && Array.isArray(item.sellerGroups))
    && Array.isArray(domain.reviews) && domain.reviews.every((item) => typeof item.id === 'string' && item.rating >= 1 && item.rating <= 5)
    && Array.isArray(domain.supportCases) && domain.supportCases.every((item) => typeof item.id === 'string' && typeof item.orderId === 'string');
}

type AddressInput = Omit<MBazarAddress, 'id' | 'isDefault'> & { id?: string; isDefault?: boolean };
type ReviewInput = Omit<MBazarReview, 'id' | 'createdAt'>;
type SupportInput = { orderId: string; type: MBazarSupportIssueType; summary: string; sellerId?: string };
type CartContextValue = {
  cart: MBazarCart; draft: MBazarCheckoutDraft; domain: MBazarDomainSnapshot;
  favorites: MBazarFavorite[]; addresses: MBazarAddress[]; orders: MBazarOrder[]; reviews: MBazarReview[]; supportCases: MBazarSupportCase[];
  hydrated: boolean; announcement: string;
  addItem: (productId: string) => void; setQuantity: (productId: string, quantity: number) => void; removeItem: (productId: string) => void; replaceCart: (cart: MBazarCart) => void; updateDraft: (patch: Partial<MBazarCheckoutDraft>) => void;
  toggleFavorite: (productId: string) => void; isFavorite: (productId: string) => boolean;
  saveAddress: (input: AddressInput) => MBazarAddress; deleteAddress: (id: string) => boolean; setDefaultAddress: (id: string) => void;
  submitReview: (input: ReviewInput) => MBazarReview; createSupportCase: (input: SupportInput) => MBazarSupportCase; transitionOrder: (id: string) => void; resetDemo: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function MBazarCartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<MBazarCart>(initialMBazarCart);
  const [draft, setDraft] = useState<MBazarCheckoutDraft>(defaultDraft);
  const [domain, setDomain] = useState<MBazarDomainSnapshot>(initialMBazarDomain);
  const [hydrated, setHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedCart = JSON.parse(localStorage.getItem(CART_KEY) ?? localStorage.getItem('mresalat.mbazar.batch-b.cart.v1') ?? 'null');
        const storedDraft = JSON.parse(localStorage.getItem(CHECKOUT_KEY) ?? localStorage.getItem('mresalat.mbazar.batch-b.checkout.v1') ?? 'null');
        const storedDomain = JSON.parse(localStorage.getItem(DOMAIN_KEY) ?? 'null');
        if (validCart(storedCart)) setCart(storedCart);
        if (validDraft(storedDraft)) setDraft(storedDraft);
        if (validDomain(storedDomain)) setDomain(storedDomain);
      } catch { /* Invalid QA storage falls back to deterministic defaults. */ }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(CHECKOUT_KEY, JSON.stringify(draft)); }, [draft, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(DOMAIN_KEY, JSON.stringify(domain)); }, [domain, hydrated]);

  const addItem = useCallback((productId: string) => {
    const product = productById(productId);
    if (product.availability === 'unavailable') { setAnnouncement(`${product.title} در حال حاضر ناموجود است.`); return; }
    setCart((current) => {
      const existing = current.items.find((item) => item.productId === productId);
      if (existing) return { ...current, items: current.items.map((item) => item.productId === productId ? { ...item, quantity: Math.min(item.quantity + 1, productStock[productId] ?? 10), selected: true } : item) };
      return { ...current, items: [...current.items, { productId, sellerId: product.seller.id, quantity: 1, selected: true }] };
    });
    setAnnouncement(`${product.title} به سبد خرید اضافه شد.`);
  }, []);
  const setQuantity = useCallback((productId: string, quantity: number) => setCart((current) => ({ ...current, items: current.items.map((item) => item.productId === productId ? { ...item, quantity: Math.max(1, Math.min(quantity, productStock[productId] ?? 10)) } : item) })), []);
  const removeItem = useCallback((productId: string) => { const product = productById(productId); setCart((current) => ({ ...current, items: current.items.filter((item) => item.productId !== productId) })); setAnnouncement(`${product.title} از سبد خرید حذف شد.`); }, []);
  const replaceCart = useCallback((next: MBazarCart) => setCart(next), []);
  const updateDraft = useCallback((patch: Partial<MBazarCheckoutDraft>) => setDraft((current) => ({ ...current, ...patch })), []);
  const isFavorite = useCallback((productId: string) => domain.favorites.some((favorite) => favorite.productId === productId), [domain.favorites]);
  const toggleFavorite = useCallback((productId: string) => {
    const product = productById(productId);
    setDomain((current) => {
      const exists = current.favorites.some((item) => item.productId === productId);
      trackEvent({ event: exists ? 'mbazar_favorite_removed' : 'mbazar_favorite_added', surface: 'marketplace', entityId: productId });
      setAnnouncement(`${product.title} ${exists ? 'از علاقه‌مندی‌ها حذف شد' : 'به علاقه‌مندی‌ها افزوده شد'}.`);
      return { ...current, favorites: exists ? current.favorites.filter((item) => item.productId !== productId) : [...current.favorites, { productId, savedPrice: product.price.current, savedAt: 'امروز', savedInstallmentEligible: product.installmentEligible }] };
    });
  }, []);
  const saveAddress = useCallback((input: AddressInput) => {
    const address: MBazarAddress = { ...input, id: input.id ?? `address-${Date.now()}`, isDefault: Boolean(input.isDefault) };
    setDomain((current) => {
      const exists = current.addresses.some((item) => item.id === address.id);
      trackEvent({ event: exists ? 'mbazar_address_updated' : 'mbazar_address_added', surface: 'marketplace', entityId: address.id });
      let addresses = exists ? current.addresses.map((item) => item.id === address.id ? address : item) : [...current.addresses, address];
      if (address.isDefault || addresses.length === 1) addresses = addresses.map((item) => ({ ...item, isDefault: item.id === address.id }));
      setAnnouncement(`آدرس ${address.title} ${exists ? 'ویرایش' : 'افزوده'} شد.`);
      return { ...current, addresses };
    });
    return address;
  }, []);
  const setDefaultAddress = useCallback((id: string) => { setDomain((current) => ({ ...current, addresses: current.addresses.map((item) => ({ ...item, isDefault: item.id === id })) })); setDraft((current) => ({ ...current, addressId: id })); setAnnouncement('آدرس پیش‌فرض تغییر کرد.'); }, []);
  const deleteAddress = useCallback((id: string) => {
    let deleted = false;
    setDomain((current) => {
      const target = current.addresses.find((item) => item.id === id);
      if (!target || current.addresses.length <= 1 || target.isDefault) { setAnnouncement(target?.isDefault ? 'پیش از حذف، آدرس دیگری را پیش‌فرض کنید.' : 'حداقل یک آدرس باید باقی بماند.'); return current; }
      deleted = true; setAnnouncement(`آدرس ${target.title} حذف شد.`); return { ...current, addresses: current.addresses.filter((item) => item.id !== id) };
    });
    return deleted;
  }, []);
  const submitReview = useCallback((input: ReviewInput) => {
    const review: MBazarReview = { ...input, id: `review-${Date.now()}`, createdAt: 'امروز' };
    trackEvent({ event: 'mbazar_review_submitted', surface: 'marketplace', entityId: input.productId, metadata: { orderId: input.orderId, rating: input.rating } });
    setDomain((current) => ({ ...current, reviews: [review, ...current.reviews], orders: current.orders.map((order) => order.id === input.orderId ? { ...order, reviewedProductIds: [...new Set([...(order.reviewedProductIds ?? []), input.productId])] } : order) }));
    setAnnouncement('نظر شما ثبت شد.'); return review;
  }, []);
  const createSupportCase = useCallback((input: SupportInput) => {
    const supportCase: MBazarSupportCase = { ...input, id: `MBS-1405-${String(500 + domain.supportCases.length).padStart(4, '0')}`, status: 'created', createdAt: 'امروز', nextAction: 'درخواست شما در صف بررسی کارشناس قرار گرفت' };
    trackEvent({ event: 'mbazar_support_case_created', surface: 'marketplace', entityId: input.orderId, metadata: { issueType: input.type } });
    setDomain((current) => ({ ...current, supportCases: [supportCase, ...current.supportCases] })); setAnnouncement('درخواست پشتیبانی ایجاد شد.'); return supportCase;
  }, [domain.supportCases.length]);
  const transitionOrder = useCallback((id: string) => setDomain((current) => ({ ...current, orders: current.orders.map((order) => {
    if (order.id !== id) return order;
    const next = order.status === 'placed' || order.status === 'seller-confirmed' ? 'preparing' : order.status === 'preparing' ? 'shipped' : order.status === 'shipped' ? 'delivered' : order.status;
    const sellerGroups = order.sellerGroups.map((group) => next === 'shipped' && group.status !== 'delivered' ? { ...group, status: 'in-transit' as const, statusLabel: 'ارسال شده', nextStep: 'تحویل مرسوله', milestones: group.milestones.map((step, index) => ({ ...step, status: index < 4 ? 'completed' as const : index === 4 ? 'current' as const : 'upcoming' as const })) } : next === 'delivered' ? { ...group, status: 'delivered' as const, statusLabel: 'تحویل شده', nextStep: 'اقدامی لازم نیست', milestones: group.milestones.map((step) => ({ ...step, status: 'completed' as const })) } : group);
    const nextAction = next === 'delivered' ? { label: 'ثبت نظر', href: `/examples/mbazar/reviews/new?order=${order.id}&product=${order.items[0].productId}`, kind: 'review' as const } : order.nextAction;
    return { ...order, status: next, sellerGroups, nextAction, isNew: true };
  }) })), []);
  const resetDemo = useCallback(() => { setCart(initialMBazarCart); setDraft(defaultDraft); setDomain(initialMBazarDomain); setAnnouncement('داده‌های نمایشی ام‌بازار بازنشانی شد.'); }, []);

  const value = useMemo(() => ({ cart, draft, domain, favorites: domain.favorites, addresses: domain.addresses, orders: domain.orders, reviews: domain.reviews, supportCases: domain.supportCases, hydrated, announcement, addItem, setQuantity, removeItem, replaceCart, updateDraft, toggleFavorite, isFavorite, saveAddress, deleteAddress, setDefaultAddress, submitReview, createSupportCase, transitionOrder, resetDemo }), [cart, draft, domain, hydrated, announcement, addItem, setQuantity, removeItem, replaceCart, updateDraft, toggleFavorite, isFavorite, saveAddress, deleteAddress, setDefaultAddress, submitReview, createSupportCase, transitionOrder, resetDemo]);
  return <CartContext.Provider value={value}>{children}<div className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div></CartContext.Provider>;
}

export function useMBazarCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useMBazarCart must be used inside MBazarCartProvider');
  return value;
}
