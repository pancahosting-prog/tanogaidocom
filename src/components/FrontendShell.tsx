'use client';

import React, { useState } from 'react';
import { SiteNavbar } from '@/components/SiteNavbar';
import { MobileMenuDrawer } from '@/components/MobileMenuDrawer';
import { ShopBagProvider } from '@/context/ShopBagContext';
import type { Service } from '@/types/cms';

interface FrontendShellProps {
  services: Service[];
  children: React.ReactNode;
}

export function FrontendShell({ services, children }: FrontendShellProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <ShopBagProvider>
      <SiteNavbar
        services={services}
        onOpenMobileMenu={() => setMobileMenuOpen(true)}
      />
      <MobileMenuDrawer
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        services={services}
      />
      {children}
    </ShopBagProvider>
  );
}
