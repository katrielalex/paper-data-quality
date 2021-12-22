import { useRouter } from "next/router";

import Head from "next/head";
import Footer from "@components/Footer";
import Header from "@components/Header";

import Typography from "@mui/material/Typography";
import SvgIcon from "@mui/material/SvgIcon";
import Link from "next/link";

export async function getServerSideProps(context) {
  let uri = new URL("https://api.openaccessbutton.org/metadata");
  uri.searchParams.append("id", "10.1007/s00145-020-09360-1");
  const res = await fetch(uri.href);
  const metadata = await res.json();

  return {
    props: {
      data: { doi: context.params.doia?.join("/"), metadata: metadata },
    },
  };
}

function LightBulbIcon(props) {
  return (
    <SvgIcon {...props}>
      <path d="M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7zm2.85 11.1l-.85.6V16h-4v-2.3l-.85-.6C7.8 12.16 7 10.63 7 9c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.63-.8 3.16-2.15 4.1z" />
    </SvgIcon>
  );
}

const Post = ({ data }) => {
  const router = useRouter();
  const doi = router.query.doia?.join("/");

  return (
    <div className="container">
      <Head>
        <title>pdq doi search</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {doi == null ? (
          "Loading..."
        ) : (
          <>
            <Header title={data.metadata.title} />
            <p>
              <a href={`https://dx.doi.org/${doi}`}>
                <code>{doi}</code>
              </a>{" "}
              ({data.metadata.journal})
            </p>
            <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
              <LightBulbIcon sx={{ mr: 1, verticalAlign: "middle" }} />
              Paper not found in lookup
            </Typography>{" "}
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Post;
