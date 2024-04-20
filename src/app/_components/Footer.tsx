import Link from "next/link";
import { Icon, Typography } from "~/ui";

const ResponsiveComponent: React.FC = () => {
  return (
    <footer className=" relative  pb-4 pt-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap text-left lg:text-left">
          <Typography.div className="w-full px-4 lg:w-6/12">
            <h2 className="fonat-semibold text-3xl text-primary">
              Let's keep in touch!
            </h2>
            <p className="text-blueGray-600 mb-2 mt-0 text-lg">
              Find us on any of these platforms, we respond 1-2 business days.
            </p>
            <div className="mb-6 mt-6 flex lg:mb-0">
              <Link
                href="#"
                className="  mr-2  flex items-center  justify-center rounded-full bg-white  p-2 font-normal shadow-lg  "
              >
                <Icon.twitter className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="  mr-2  flex items-center  justify-center rounded-full bg-white  p-2 font-normal shadow-lg  "
              >
                <Icon.facebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className=" mr-2  flex items-center  justify-center rounded-full bg-white  p-2 font-normal text-pink-400 shadow-lg  "
              >
                <Icon.instagram className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className="  mr-2  flex items-center  justify-center rounded-full bg-white  p-2 font-normal shadow-lg  "
              >
                <Icon.github className="h-6 w-6" />
              </Link>
            </div>
          </Typography.div>
          <div className="w-full px-4 lg:w-6/12">
            <div className="items-top mb-6 flex flex-wrap">
              <div className="ml-auto w-full px-4 lg:w-4/12">
                <span className="text-blueGray-500 mb-2 block text-sm font-semibold uppercase">
                  Useful Links
                </span>
                <Typography.ul className="list-unstyled">
                  <li>
                    <Link
                      className=" hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                      href="#"
                    >
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                      href="#"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                      href="#"
                    >
                      Github
                    </Link>
                  </li>
                  <li>
                    <Link
                      className=" hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                      href="#"
                    >
                      Free Products
                    </Link>
                  </li>
                </Typography.ul>
              </div>
              <div className="w-full px-4 lg:w-4/12">
                <span className="text-blueGray-500 mb-2 block text-sm font-semibold uppercase">
                  Other Resources
                </span>
                <ul className="list-unstyled">
                  <li>
                    <Link
                      className=" hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                      href="#"
                    >
                      MIT License
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                      href="#"
                    >
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                      href="#"
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link
                      className="text-blueGray-600 hover:text-blueGray-800 block pb-2 text-sm font-semibold"
                      href="#"
                    >
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default ResponsiveComponent;
