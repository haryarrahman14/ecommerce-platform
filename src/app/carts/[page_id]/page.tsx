import Cart from "@/components/carts/details/Cart";
import Image from "next/image";
import Link from "next/link";

const page = ({ params }: { params: { page_id: string } }) => {
  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center  p-[24px]">
        <Link className="inline-flex cursor-pointer gap-[8px]" href="/carts">
          <Image width={14} height={14} src="/arrow-left.svg" alt="back" />
          <p className="typography-h500 text-n-700 ">Back to List Carts</p>
        </Link>
      </div>
      <Cart pageId={params?.page_id} />
    </div>
  );
};

export default page;
