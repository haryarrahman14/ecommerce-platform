import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const navigation = [
  {
    title: "Products",
    icon: "/navigation/products.svg",
    iconActive: "/navigation/products-active.svg",
    href: "/",
  },
  {
    title: "Carts",
    icon: "/navigation/carts.svg",
    iconActive: "/navigation/carts-active.svg",
    href: "/carts",
  },
];

const Navigation = () => {
  return (
    <>
      <div className="xl:flex hidden">
        <Sidebar navigation={navigation} />
      </div>

      <div className="xl:hidden flex">
        <Topbar navigation={navigation} />
      </div>
    </>
  );
};

export default Navigation;
