import Menu from "./Menu";
import React from "react";

const MainMenu: React.FC = () => {
  return (
    <Menu
      title="Odyssey Sapoznikov"
      items={[
        { label: "Home", link: "/" },
        { label: "Architecture", link: "/architecture" },
        { label: "Commercial", link: "/commercial" },
        { label: "About", link: "/about" },
      ]}
    />
  );
};

export default MainMenu;
