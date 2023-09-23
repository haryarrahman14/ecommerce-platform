"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

import { INavigation } from "./Interface";

const Topbar = ({ navigation }: INavigation) => {
  const [open, setOpen] = useState(false);
  const currentPathname = usePathname();

  return (
    <>
      <div className="w-full h-[72px] flex justify-between items-center px-[40px] gap-[12px] border-b-[1px] border-solid border-[rgba(245, 240, 252, 0.16)] bg-n-000 shadow-lg">
        <p className="typography-h700 text-n-900">Ecommerce</p>

        <Image
          className="cursor-pointer lg:hidden block"
          width={24}
          height={24}
          src={open ? "/navigation/close.svg" : "/navigation/hamburger.svg"}
          alt={open ? "close" : "open"}
          onClick={() => setOpen(!open)}
        />

        {/* Min : Large Screen */}
        <div className="hidden lg:flex flex-row items-center gap-[8px] ">
          {navigation?.map((item, idx) => {
            const isActive = currentPathname == item?.href;
            return (
              <Link key={idx} href={item?.href}>
                <div
                  className={`flex flex-row items-center gap-[12px] py-[12px] px-[16px] rounded-[8px] min-w-[200px] ${
                    isActive ? "bg-blue-500" : "bg-n-100 hover:bg-n-300"
                  }`}
                >
                  <Image
                    width={20}
                    height={20}
                    src={isActive ? item?.iconActive : item?.icon}
                    alt={`icon-${idx}`}
                  />
                  <p
                    className={`typography-h500 ${
                      isActive ? "text-n-000" : "text-n-800"
                    } `}
                  >
                    {item?.title}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Mobile Screen */}
        {open && (
          <motion.div
            className="fixed w-screen h-screen top-0 z-[1001] bg-n-000 flex flex-col"
            initial={{
              right: "-100vw",
            }}
            animate={{
              right: 0,
            }}
            transition={{
              ease: "linear",
              duration: 0.3,
            }}
          >
            <div className=" h-[72px] flex justify-between items-center px-[40px]">
              <p className="typography-h700 text-n-900">Ecommerce</p>
              <Image
                className="cursor-pointer"
                width={24}
                height={24}
                src={
                  open ? "/navigation/close.svg" : "/navigation/hamburger.svg"
                }
                alt={open ? "close" : "open"}
                onClick={() => setOpen(!open)}
              />
            </div>

            <div className="flex flex-col gap-[16px] mt-[40px]">
              {navigation?.map((item, idx) => {
                const isActive = currentPathname == item?.href;
                return (
                  <Link
                    key={idx}
                    href={item?.href}
                    onClick={() => setOpen(false)}
                  >
                    <div
                      className={`h-[72px] flex flex-row items-center gap-[12px] py-[12px] px-[16px] mx-[14px] rounded-[8px] ${
                        isActive ? "bg-blue-500" : "hover:bg-n-300"
                      }`}
                    >
                      <Image
                        width={20}
                        height={20}
                        src={isActive ? item?.iconActive : item?.icon}
                        alt={`icon-${idx}`}
                      />
                      <p
                        className={`typography-h500 ${
                          isActive ? "text-n-000" : "text-n-800"
                        } `}
                      >
                        {item?.title}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
        )}
      </div>
    </>
  );
};

export default Topbar;
