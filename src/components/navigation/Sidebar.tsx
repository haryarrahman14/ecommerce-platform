"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { INavigation } from "./Interface";

const Sidebar = ({ navigation }: INavigation) => {
  const currentPathname = usePathname();

  return (
    <div className="w-[300px] flex flex-col gap-[16px] bg-n-000 shadow-lg">
      <div className="h-[72px] flex items-center px-[16px] mx-[14px] gap-[12px] border-b-[1px] border-solid border-[rgba(245, 240, 252, 0.16)]">
        <p className="typography-h700 text-n-900">Ecommerce</p>
      </div>

      <div className="flex flex-col gap-[16px]">
        {navigation?.map((item, idx) => {
          const isActive = currentPathname == item?.href;
          return (
            <Link key={idx} href={item?.href}>
              <div
                className={`flex flex-row gap-[12px] py-[12px] px-[16px] mx-[14px] rounded-[8px]
                ${isActive ? "bg-blue-500" : "hover:bg-n-300"}
              `}
              >
                <Image
                  width={20}
                  height={20}
                  src={isActive ? item?.iconActive : item?.icon}
                  alt={`icon-${idx}`}
                />
                <p
                  className={`typography-h500
                  ${isActive ? "text-n-000" : "text-n-800"}
                `}
                >
                  {item?.title}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
