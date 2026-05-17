export default function Loading() {
  return (
    <div className="min-h-screen bg-alabaster flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <p className="font-serif text-muted-foreground tracking-wide">Loading</p>
      </div>
    </div>
  );
}
