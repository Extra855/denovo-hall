export default function BlogLoading() {
  return (
    <main id="main-content">
      <div className="pt-24 pb-10 md:pb-16 px-4 md:px-6">
        <div className="max-w-7xl mx-auto text-center">
          <div className="h-6 w-32 bg-champagne/20 mx-auto mb-4 animate-pulse" />
          <div className="h-12 w-64 bg-champagne/20 mx-auto mb-6 animate-pulse" />
          <div className="h-px w-24 bg-champagne/20 mx-auto mb-6 animate-pulse" />
          <div className="h-5 w-80 bg-champagne/20 mx-auto animate-pulse" />
        </div>
      </div>
      <section className="pb-24 px-4 md:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[16/10] bg-champagne/20 mb-4" />
              <div className="h-6 bg-champagne/20 mb-2 w-3/4" />
              <div className="h-4 bg-champagne/20 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
