"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProviderPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to provider dashboard
    router.replace("/provider/dashboard");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-96 text-white">
      <div>Redirecting to dashboard...</div>
    </div>
  );
}
