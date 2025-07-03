import Head from "next/head";
import useAuth from "../../data/hooks/useAuth";
import router from "next/router";
import React from "react";

interface ForceAuthenticationProps {
  children: React.ReactNode;
}

export default function ForceAuthentication(props: ForceAuthenticationProps) {
  const { user, loading } = useAuth();

  function renderContent() {
    return (
      <>
        <Head>
          <script
            dangerouslySetInnerHTML={{
              __html: `
                if(!document?.cookie?.includes("mmm-frameport-v2-auth")) {
                    window.location.href = "/"
                }
              `,
            }}
          />
        </Head>
        {props.children}
      </>
    );
  }

  function renderLoading() {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }
  
  if (!loading && user?.token) {
    return renderContent();
  } else if (loading) {
    return renderLoading();
  } else {
    router.push("/");
    return null;
  }
}
