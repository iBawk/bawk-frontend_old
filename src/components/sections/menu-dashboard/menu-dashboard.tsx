"use client";

import style from "./menu-dashboard.module.scss";
import React, { useEffect } from "react";
import mainIcon from "@/assets/imgs/icon.svg";
import Link from "next/link";
import HomeIcon from "@mui/icons-material/Home";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import SettingsIcon from "@mui/icons-material/Settings";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import WbIncandescentOutlinedIcon from "@mui/icons-material/WbIncandescentOutlined";
import { useRouter } from "next/router";

import logo from "@/assets/imgs/logo.svg";
import logoDark from "@/assets/imgs/logo-dark.svg";

export type DataSectionMenuDashBoard = {
  initialPage: string;
};

type DataMenuOptionPage = {
  text: string;
  link: string;
  icon: JSX.Element;
  active: boolean;
  setPage: (page: string) => void;
};

function MenuOptionPage({
  icon,
  link,
  text,
  active,
  setPage,
}: DataMenuOptionPage) {
  return (
    <Link
      className={`${style.menuOptionPage} ${active ? style.active : ""}`}
      href={`/painel/${link}`}
      onClick={() => {
        setPage(link);
      }}
    >
      <div className={style.containerIcon}>
        {React.cloneElement(icon, {
          className: `${icon.props} ${style.icon}`,
        })}
      </div>
      <span>{text}</span>
    </Link>
  );
}

type DataAvatar = {
  img?: string;
  name: string;
};

function Avatar({ img, name }: DataAvatar) {
  return <div></div>;
}

export default function SectionMenuDashBoard(data: DataSectionMenuDashBoard) {
  const { initialPage } = data;

  const [page, setPage] = React.useState<string>(initialPage);
  const [themeMode, setThemeMode] = React.useState<"light" | "dark">("dark");

  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "light") {
      root.style.setProperty("--primary-color", "#ff0000");
      root.style.setProperty("--secundary-color", "#1e1e1e");
      root.style.setProperty("--tertiary-color", "#f5f5f5");
      root.style.setProperty("--secundary-color-light", "#343434");
    }

    if (themeMode === "dark") {
      root.style.setProperty("--primary-color", "#ff0000");
      root.style.setProperty("--secundary-color", "#f5f5f5");
      root.style.setProperty("--tertiary-color", "#1e1e1e");
      root.style.setProperty("--secundary-color-light", "#d5d5d5");
    }
  }, [themeMode]);

  return (
    <section id={style.SectionMenuDashBoard}>
      <div className={style.headerMenu}>
        <img className={style.mainIcon} src={mainIcon.src} alt="Icone" />
        <img
          className={style.logo}
          src={themeMode === "light" ? logo.src : logoDark.src}
          alt="Logo"
        />
      </div>

      <div className={style.bodyMenu}>
        {(
          [
            { text: "Home", link: "", icon: <HomeIcon /> },
            { text: "Vendas", link: "vendas", icon: <LocalAtmIcon /> },
            { text: "Produtos", link: "produtos", icon: <StoreIcon /> },
            {
              text: "Marketplace",
              link: "marketplace",
              icon: <LocalGroceryStoreIcon />,
            },
            { text: "Finanças", link: "financas", icon: <AttachMoneyIcon /> },
            {
              text: "Minhas Compras",
              link: "minhas-compras",
              icon: <InventoryIcon />,
            },
            {
              text: "Configurações",
              link: "configuracoes",
              icon: <SettingsIcon />,
            },
          ] as Array<DataMenuOptionPage>
        ).map(({ text, link, icon }, index) => {
          return (
            <MenuOptionPage
              key={index}
              text={text}
              link={link}
              icon={icon}
              active={link === page}
              setPage={setPage}
            />
          );
        })}
      </div>

      <div className={style.footerMenu}>
        <button
          className={style.buttonChangeThemeMode}
          onClick={() => {
            setThemeMode(themeMode === "light" ? "dark" : "light");
          }}
        >
          {themeMode === "dark" && <WbIncandescentIcon />}
          {themeMode === "light" && <WbIncandescentOutlinedIcon />}
        </button>

        <Link href="/painel/perfil"></Link>
      </div>
    </section>
  );
}
