'use client'

import { ReactNode } from 'react';
import { MenuIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SideMenuProps {
  renderSidebar: () => ReactNode;
}

export function SideMenu({ renderSidebar = () => null }: SideMenuProps) {
  return (
    <Sheet>
      <SheetTrigger className="lg:hidden" asChild>
        <Button className="h-8" variant="outline" size="icon">
          <MenuIcon size={20} />
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:w-72 px-3 h-full flex flex-col" side="left">
        {renderSidebar()}
      </SheetContent>
    </Sheet>
  );
}
