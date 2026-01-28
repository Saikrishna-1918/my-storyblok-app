import { StoryblokComponent } from "@storyblok/react";
import { Outlet } from "react-router-dom";

const Layout = ({ story }) => {
  const body = story.content.body || [];

  const navbar = body.find(b => b.component === "navbar");
  const footer = body.find(b => b.component === "footer");

  return (
    <>
      {navbar && (
        <header>
          <StoryblokComponent blok={navbar} />
        </header>
      )}
      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
      {footer && (
        <footer>
          <StoryblokComponent blok={footer} />
        </footer>
      )}
    </>
  );
};

export default Layout;
