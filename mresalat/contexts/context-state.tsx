'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { trackEvent } from '@/mresalat/core/analytics';
import { children, demoUsers } from './fixtures';
import type { DemoUserFixture, UserContext, UserContextType } from './types';

const STORAGE_KEY = 'mresalat.context.v1';
type DemoUserKey = keyof typeof demoUsers;

type ContextValue = {
  userKey: DemoUserKey;
  user: DemoUserFixture;
  activeContext: UserContext;
  selectedChildId: string;
  setActiveContext: (contextId: string, navigate?: boolean) => void;
  setSelectedChildId: (childId: string) => void;
  setDemoUser: (userKey: DemoUserKey) => void;
  hasPermission: (permission: string) => boolean;
};

const MResalatContext = createContext<ContextValue | null>(null);

function inferContextType(pathname: string): UserContextType | null {
  if (pathname.startsWith('/segments/parent')) return 'parent';
  if (pathname.startsWith('/segments/organization-employee')) return 'organization-employee';
  if (pathname.startsWith('/segments/organization')) return 'organization-manager';
  if (pathname.startsWith('/segments/under-18')) return 'youth';
  if (pathname.startsWith('/seller')) return 'seller';
  if (pathname.startsWith('/segments/individual')) return 'personal';
  return null;
}

export function MResalatContextProvider({ children: content }: { children: ReactNode }) {
  const [userKey, setUserKey] = useState<DemoUserKey>('multi');
  const [activeId, setActiveId] = useState(demoUsers.multi.defaultContextId);
  const [selectedChildId, setSelectedChild] = useState(children[0].id);
  const [hydrated, setHydrated] = useState(false);
  const user = demoUsers[userKey];
  const activeContext = user.contexts.find((item) => item.id === activeId) ?? user.contexts.find((item) => item.id === user.defaultContextId) ?? user.contexts[0];

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as { userKey?: string; contextId?: string; childId?: string };
        const safeUserKey: DemoUserKey = saved.userKey === 'manager' ? 'manager' : 'multi';
        const savedUser = demoUsers[safeUserKey];
        const inferred = inferContextType(location.pathname);
        const routeContext = inferred ? savedUser.contexts.find((item) => item.type === inferred) : undefined;
        const safeContext = routeContext ?? savedUser.contexts.find((item) => item.id === saved.contextId) ?? savedUser.contexts.find((item) => item.id === savedUser.defaultContextId) ?? savedUser.contexts[0];
        const safeChild = children.some((item) => item.id === saved.childId) ? saved.childId! : children[0].id;
        setUserKey(safeUserKey);
        setActiveId(safeContext.id);
        setSelectedChild(safeChild);
        setHydrated(true);
      } catch {
        setUserKey('multi');
        setActiveId(demoUsers.multi.defaultContextId);
        setSelectedChild(children[0].id);
        setHydrated(true);
      }
    }, 0);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify({ userKey, contextId: activeContext.id, type: activeContext.type, childId: selectedChildId })); } catch { /* UI preference persistence is optional. */ }
  }, [activeContext.id, activeContext.type, hydrated, selectedChildId, userKey]);

  const setActiveContext = useCallback((contextId: string, navigate = true) => {
    const next = user.contexts.find((item) => item.id === contextId);
    if (!next) return;
    setActiveId(next.id);
    trackEvent({ event: 'context_switched', surface: 'segment', entityId: next.id, metadata: { contextType: next.type } });
    if (navigate) window.location.assign(next.defaultHome);
  }, [user.contexts]);

  const setSelectedChildId = useCallback((childId: string) => {
    if (!children.some((item) => item.id === childId)) return;
    setSelectedChild(childId);
    trackEvent({ event: 'child_context_selected', surface: 'segment', entityId: childId });
  }, []);

  const setDemoUser = useCallback((nextKey: DemoUserKey) => {
    const next = demoUsers[nextKey];
    setUserKey(nextKey);
    setActiveId(next.defaultContextId);
  }, []);

  const value = useMemo<ContextValue>(() => ({ userKey, user, activeContext, selectedChildId, setActiveContext, setSelectedChildId, setDemoUser, hasPermission: (permission) => activeContext.permissions.includes(permission as never) }), [activeContext, selectedChildId, setActiveContext, setDemoUser, setSelectedChildId, user, userKey]);
  return <MResalatContext.Provider value={value}>{content}</MResalatContext.Provider>;
}

export function useMResalatContext() {
  const value = useContext(MResalatContext);
  if (!value) throw new Error('useMResalatContext must be used inside MResalatContextProvider');
  return value;
}
