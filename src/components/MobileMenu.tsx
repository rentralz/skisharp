import NavLinks, { type NavLink } from "./NavLinks";

export interface MobileMenuSection {
  heading?: string;
  links: NavLink[];
}

interface Props {
  open: boolean;
  sections: MobileMenuSection[];
  activeHref: string | null;
  onClose: () => void;
}

export default function MobileMenu({ open, sections, activeHref, onClose }: Props) {
  if (!open) return null;

  return (
    <div id="mobile-menu" className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
      {sections.map(({ heading, links }, index) =>
        heading ? (
          <div key={heading} role="group" aria-labelledby={`mobile-menu-heading-${index}`} className="py-1">
            <p
              id={`mobile-menu-heading-${index}`}
              className="px-3 pb-1 pt-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#6b635b]"
            >
              {heading}
            </p>
            <div className="space-y-1 pl-3">
              <NavLinks links={links} activeHref={activeHref} onClick={onClose} mobile />
            </div>
          </div>
        ) : (
          <NavLinks key={index} links={links} activeHref={activeHref} onClick={onClose} mobile />
        ),
      )}
    </div>
  );
}
