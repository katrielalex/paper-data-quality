import styles from "./Footer.module.css";
import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className={styles.footer}>
        made by&nbsp;<Link href="https://www.katriel.co.uk">katriel</Link>
      </footer>
    </>
  );
}
