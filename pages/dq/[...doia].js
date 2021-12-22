import { useRouter } from "next/router";

import Head from "next/head";
import Footer from "@components/Footer";
import Header from "@components/Header";

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
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Post;
