import Link from "next/link";

export default function Home() {
  return (
    <main className="container flex flex-col items-center justify-center" style={{ minHeight: "100vh" }}>
      <div className="neo-card flex flex-col items-center gap-6" style={{ maxWidth: "600px", textAlign: "center" }}>
        <h1 className="text-brand" style={{ fontSize: "3rem" }}>Rhockstar Connect</h1>
        <p className="text-secondary text-lg">
          The premier hybrid professional networking and dating platform. 
          Connect, build your career, and find your match.
        </p>
        
        <div className="flex gap-4 mt-4">
          <Link href="/login" className="neo-button neo-button-primary text-lg">
            Sign In
          </Link>
          <Link href="/register" className="neo-button text-lg">
            Create Account
          </Link>
        </div>
      </div>
      
      {/* Decorative glass panel */}
      <div className="glass-panel mt-8 p-4 text-sm text-tertiary" style={{ maxWidth: "400px", textAlign: "center" }}>
        Phase 1 • V2 Rebuild • Next.js 15
      </div>
    </main>
  );
}
