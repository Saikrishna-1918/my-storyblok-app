import { StoryblokComponent } from "@storyblok/react";

const Page = ({ blok }) => {
  return (
    <main>
      {blok.body?.map((nestedBlok) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
        />
      ))}
    </main>
  );
};

export default Page;
