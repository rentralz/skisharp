interface Props {
  children: React.ReactNode;
}

// The fade is pure CSS so server-rendered content is visible on first paint.
// It used to start at opacity 0 and wait for hydration, which left the page
// blank without JS and ~1.6s longer on slow phones.
export default function PageTransition({ children }: Props) {
  return <div className="page-transition page-transition-visible">{children}</div>;
}
