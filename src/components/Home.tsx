import { Link } from "react-router-dom";

export default function Component() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Acme Mice
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  We provide the best mice for all your needs.
                </p>
              </div>
              <div className="space-x-4">
                <Link
                  to={"/login"}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  Explore
                </Link>
                <Link
                  to={"/login"}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container grid items-center justify-center gap-4 px-4 md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                Our Features
              </h2>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                We provide the best mice for all your needs.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:gap-12 ">
              <div className="flex flex-col space-y-4 border-solid border-spacing-1 border-2 p-4">
                <h3 className="text-lg font-bold">High Quality</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our mice are made with the highest quality materials.
                </p>
              </div>

              <div className="flex flex-col space-y-4 border-solid border-spacing-1 border-2 p-4">
                <h3 className="text-lg font-bold">Fast</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our mice are designed for speed and efficiency.
                </p>
              </div>
              <div className="flex flex-col space-y-4 border-solid border-spacing-1 border-2 p-4">
                <h3 className="text-lg font-bold">Reliable</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our mice are built to last.
                </p>
              </div>
              <div className="flex flex-col space-y-4 border-solid border-spacing-1 border-2 p-4">
                <h3 className="text-lg font-bold">Comfortable</h3>
                <p className="text-gray-500 dark:text-gray-400">
                  Our mice are designed for comfort.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
    </div>
  );
}
