
export function ProfilePageLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-b from-surface to-background text-foreground">
      <div className="max-w-7xl mx-auto">{children}</div>
    </div>
  );
}
