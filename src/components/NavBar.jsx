import { auth } from '@clerk/nextjs/server';
import Link from "next/link";
import { SignInButton, SignUpButton, UserButton } from '@clerk/nextjs';
import Image from 'next/image';

const NavBar = () => {
      const { userId } = auth();
      return (
            <div className="navbar sticky bg-base-100 shadow-md px-4 lg:px-8">
                  {/* Left Side - Logo and Home Link */}
                  <div className="navbar-start">
                        <div className="dropdown">
                              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                    <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-6 w-6"
                                          fill="none"
                                          viewBox="0 0 24 24"
                                          stroke="currentColor"
                                    >
                                          <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M4 6h16M4 12h8m-8 6h16"
                                          />
                                    </svg>
                              </div>
                              <ul
                                    tabIndex={0}
                                    className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
                              >
                                    <li>
                                          <Link href="/">Home</Link>
                                    </li>
                                    <li>
                                          <Link href="/stories" className="hover:text-primary">Story</Link>
                                    </li>
                              </ul>
                        </div>
                        <Link href="/" className="flex items-center gap-2 text-xl italic">
                              <span className='hidden md:block'>
                                    LJites&apos; Fetialis Aevum
                              </span>
                              <span className='block md:hidden'>
                                    LFA
                              </span>
                        </Link>
                  </div>

                  {/* Center - Navigation Links */}
                  <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 space-x-4">
                              <li>
                                    <Link href="/" className="hover:text-primary">Home</Link>
                              </li>
                              <li>
                                    <Link href="/stories" className="hover:text-primary">Story</Link>
                              </li>
                        </ul>
                  </div>

                  {/* Right Side - Authentication Buttons or User Profile */}
                  <div className="navbar-end space-x-4 lg:space-x-0">
                        {userId === null ? (
                              <div className="flex flex-col space-y-2 md:flex-row md:space-y-0 md:space-x-4">
                                    <SignInButton mode="modal">
                                          <button className="btn btn-outline btn-primary block lg:inline">Sign In</button>
                                    </SignInButton>
                                    <SignUpButton mode="modal">
                                          <button className="btn btn-primary block lg:inline">Sign Up</button>
                                    </SignUpButton>
                              </div>
                        ) : (
                              <UserButton />
                        )}
                  </div>

            </div>
      );
};

export default NavBar;
