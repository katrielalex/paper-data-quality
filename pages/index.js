import Head from "next/head";
import Header from "@components/Header";
import Footer from "@components/Footer";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { useState } from "react";
import Link from "next/link";

// i have no idea what i'm doing
function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}

export default function Home() {
  const inputProps = useInput();

  return (
    <div className="container">
      <Head>
        <title>paper data quality lookup</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <TextField
          label="search for a doi"
          variant="outlined"
          {...inputProps}
        />
        <p />
        <Link href={inputProps.value ? `/dq/${inputProps.value}` : "#"}>
          <Button variant="contained">Search</Button>
        </Link>
        <p />
        <Link href="/dq/10.1007/s00145-020-09360-1">
          <Button variant="text">Try an example</Button>
        </Link>
      </main>

      <Footer />
    </div>
  );
}
