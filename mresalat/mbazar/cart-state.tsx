'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { initialMBazarCart, mbazarAddresses, productById, productStock } from './data';
import type { MBazarCart, MBazarCheckoutDraft } from './types';

const CART_KEY = 'mresalat.mbazar.batch-b.cart.v1';
const CHECKOUT_KEY = 'mresalat.mbazar.batch-b.checkout.v1';
const defaultDraft: MBazarCheckoutDraft = { step: 'delivery', addressId: mbazarAddresses[0].id, deliveryMethod: 'standard', eligibilityScenario: 'eligible', acknowledgement: false };

function validCart(value: unknown): value is MBazarCart {
  if (!value || typeof value !== 'object') return false;
  const cart = value as MBazarCart;
  return cart.currency === 'IRT' && Array.isArray(cart.items) && cart.items.every((item) => typeof item.productId === 'string' && typeof item.sellerId === 'string' && Number.isInteger(item.quantity) && item.quantity >= 1 && item.quantity <= (productStock[item.productId] ?? 10) && typeof item.selected === 'boolean');
}

function validDraft(value: unknown): value is MBazarCheckoutDraft {
  if (!value || typeof value !== 'object') return false;
  const draft = value as MBazarCheckoutDraft;
  return ['delivery', 'payment', 'eligibility', 'plan', 'review', 'confirm'].includes(draft.step) && mbazarAddresses.some((address) => address.id === draft.addressId) && ['standard', 'scheduled'].includes(draft.deliveryMethod) && ['eligible', 'conditional', 'unknown', 'ineligible'].includes(draft.eligibilityScenario) && typeof draft.acknowledgement === 'boolean';
}

type CartContextValue = {
  cart: MBazarCart;
  draft: MBazarCheckoutDraft;
  hydrated: boolean;
  announcement: string;
  addItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  replaceCart: (cart: MBazarCart) => void;
  updateDraft: (patch: Partial<MBazarCheckoutDraft>) => void;
  resetDemo: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function MBazarCartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<MBazarCart>(initialMBazarCart);
  const [draft, setDraft] = useState<MBazarCheckoutDraft>(defaultDraft);
  const [hydrated, setHydrated] = useState(false);
  const [announcement, setAnnouncement] = useState('');

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const storedCart = JSON.parse(localStorage.getItem(CART_KEY) ?? 'null');
        const storedDraft = JSON.parse(localStorage.getItem(CHECKOUT_KEY) ?? 'null');
        if (validCart(storedCart)) setCart(storedCart);
        if (validDraft(storedDraft)) setDraft(storedDraft);
      } catch { /* Invalid QA storage falls back to deterministic defaults. */ }
      setHydrated(true);
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => { if (hydrated) localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart, hydrated]);
  useEffect(() => { if (hydrated) localStorage.setItem(CHECKOUT_KEY, JSON.stringify(draft)); }, [draft, hydrated]);

  const addItem = useCallback((productId: string) => {
    const product = productById(productId);
    if (product.availability === 'unavailable') {
      setAnnouncement(`${product.title} در حال حاضر ناموجود است.`);
      return;
    }
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
  const resetDemo = useCallback(() => { setCart(initialMBazarCart); setDraft(defaultDraft); setAnnouncement('داده‌های نمایشی ام‌بازار بازنشانی شد.'); }, []);
  const value = useMemo(() => ({ cart, draft, hydrated, announcement, addItem, setQuantity, removeItem, replaceCart, updateDraft, resetDemo }), [cart, draft, hydrated, announcement, addItem, setQuantity, removeItem, replaceCart, updateDraft, resetDemo]);
  return <CartContext.Provider value={value}>{children}<div className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</div></CartContext.Provider>;
}

export function useMBazarCart() {
  const value = useContext(CartContext);
  if (!value) throw new Error('useMBazarCart must be used inside MBazarCartProvider');
  return value;
}
