import { LayoutProps } from "../../Interfaces";
import NavBar from "../NavBar/NavBar";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
}
