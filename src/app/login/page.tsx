import type { Metadata } from "next";
import LoginForm from "@/components/login-form";

export const metadata: Metadata = {
  title: "Login | Inventory Management System",
  description: "Login to access your inventory management dashboard",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800">
      <main className="flex flex-1 items-center justify-center p-4 md:p-8">
        <div className="grid w-full gap-6 sm:grid-cols-1 md:grid-cols-2 lg:max-w-6xl">
          <div className="flex flex-col justify-center space-y-6 p-6 md:p-10">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
                Inventory Management
              </h1>
              <p className="text-muted-foreground md:text-lg">
                Streamline your inventory operations with our powerful
                management system.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">
                Real-time inventory tracking
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M12 2v20" />
                  <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">
                Advanced financial reporting
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white"
                >
                  <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6" />
                  <path d="M9 22h9a2 2 0 0 0 2-2v-7" />
                  <path d="M13 11v5" />
                  <path d="M9 11v2" />
                  <path d="M17 11v2" />
                </svg>
              </div>
              <span className="text-sm text-muted-foreground">
                Multi-location management
              </span>
            </div>
          </div>
          <div className="flex items-center justify-center rounded-lg bg-white p-6 shadow-lg dark:bg-slate-950 md:p-10">
            <LoginForm />
          </div>
        </div>
      </main>
    </div>
  );
}
