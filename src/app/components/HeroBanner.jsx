import Link from "next/link";

export default function HeroBanner() {
  return (
    <section className="relative h-[90vh] w-full">
      
      {/* Background Image */}
      <img
        src="/evan1.png"
        alt="Sports Banner"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
        <div className="max-w-2xl text-white">
          
          <h1 className="text-3xl md:text-5xl font-bold leading-tight">
            Upgrade Your Game With
            <span className="text-blue-400"> Premium Sports Gear</span>
          </h1>

          <p className="mt-4 text-lg text-gray-200">
            ক্রিকেট ব্যাট, ফুটবল বুট, গ্লাভস থেকে শুরু করে সব ধরনের
            স্পোর্টস প্রোডাক্ট এখন এক জায়গায়।
          </p>

          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            
            <Link
              href="/footballs"
              className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              Shop Now
            </Link>

            <Link
              href="/footballs"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black transition"
            >
              Explore
            </Link>

          </div>

        </div>
      </div>
    </section>
  );
}