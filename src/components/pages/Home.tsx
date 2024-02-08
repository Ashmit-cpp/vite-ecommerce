import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../ui/button";
import CarouselCard from "../ProductCarousel";

export default function Component() {
  const targetContainerRef = useRef<HTMLDivElement>(null);
  const scrollToContainer = () => {
    targetContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <div className="mt-16 flex flex-col justify-center min-h-screen   ">
      <main className="flex-1 	 ">
        <section className="w-full py-48 md:py-52 lg:py-48">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  Welcome to Acme Mice
                </h1>
                <p className="max-w-[600px] md:text-xl dark:text-gray-400">
                  We provide the best mice for all your needs.
                </p>
              </div>
              <div className="space-x-4">
                <Button
                  onClick={scrollToContainer}
                  className="inline-flex h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                >
                  Explore
                </Button>
                <Link
                  to={"/contact"}
                  className="inline-flex h-9 items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section
          className=" flex w-full py-4 md:py-8 lg:py-16"
          ref={targetContainerRef}
        >
          <div className="container flex-grid items-center justify-center gap-4 px-4 md:px-6 ">
            <div className="space-y-3">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter">
                Our Features
              </h2>
              <p className="max-w-[600px] text-sm md:text-base lg:text-xl dark:text-gray-400">
                We provide the best mice for all your needs.
              </p>
            </div>
            <div className="mt-2 grid gap-4 md:grid-cols-2 lg:gap-8 ">
              <div className="bg-gray-200 bg-opacity-20 flex flex-col space-y-2 border-gray-300 border-solid border-spacing-1 border-2 p-2 md:p-4">
                <h3 className="text-base md:text-lg lg:text-xl font-bold">
                  High Quality
                </h3>
                <p className="text-xs md:text-sm lg:text-base">
                  Our mice are made with the highest quality materials.
                </p>
              </div>

              <div className="bg-gray-200 bg-opacity-20 flex flex-col space-y-2 border-gray-300 border-solid border-spacing-1 border-2 p-2 md:p-4">
                <h3 className="text-base md:text-lg lg:text-xl font-bold">
                  Fast
                </h3>
                <p className="text-xs md:text-sm lg:text-base">
                  Our mice are designed for speed and efficiency.
                </p>
              </div>
              <div className="bg-gray-200 bg-opacity-20 flex flex-col space-y-2 border-gray-300 border-solid border-spacing-1 border-2 p-2 md:p-4">
                <h3 className="text-base md:text-lg lg:text-xl font-bold">
                  Reliable
                </h3>
                <p className="text-xs md:text-sm lg:text-base">
                  Our mice are built to last.
                </p>
              </div>
              <div className="bg-gray-200 bg-opacity-20 flex flex-col space-y-2 border-gray-300 border-solid border-spacing-1 border-2 p-2 md:p-4">
                <h3 className="text-base md:text-lg lg:text-xl font-bold">
                  Comfortable
                </h3>
                <p className="text-xs md:text-sm lg:text-base">
                  Our mice are designed for comfort.
                </p>
              </div>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter mt-6 md:mt-8 p-4">
              Explore New Products
            </h2>
            <CarouselCard />
          </div>
        </section>
      </main>
    </div>
  );
}
