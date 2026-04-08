import NavLinks, { type NavLink } from "./NavLinks";

interface Props {
  open: boolean;
  links: NavLink[];
  activeHref: string | null;
  onClose: () => void;
}

export default function MobileMenu({ open, links, activeHref, onClose }: Props) {
  if (!open) return null;

  return (
    <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 space-y-1">
      <NavLinks links={links} activeHref={activeHref} onClick={onClose} mobile />
    </div>
  );
}
