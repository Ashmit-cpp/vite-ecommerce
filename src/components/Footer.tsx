import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer
      className=" bg-gray-100 opacity-70 dark:bg-gray-900 flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t mx-auto mt-auto"
      style={{ zIndex: 9999 }}
    >
      <p className="text-xs text-gray-500 dark:text-gray-400">
        © 2024 Acme Mice. All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          to={"/login"}
          className="text-xs hover:underline underline-offset-4"
        >
          Terms of Service
        </Link>
        <Link
          to={"/login"}
          className="text-xs hover:underline underline-offset-4"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}

export default Footer;
