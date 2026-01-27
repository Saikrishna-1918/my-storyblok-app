import { storyblokInit, apiPlugin } from "@storyblok/react";
import Hero from "./Hero";
import Page from "./Page";
import NavBar from "./Navbar";

storyblokInit({
  accessToken: import.meta.env.VITE_STORYBLOK_TOKEN,
  use: [apiPlugin],
  components:{
    hero: Hero,
    page: Page,   
    navbar: NavBar,
  },
});
