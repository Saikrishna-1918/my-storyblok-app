import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import { useEffect, useState } from "react";

function App() {
  const [story, setStory] = useState(null);
  const storyblokApi = getStoryblokApi();

  useEffect(() => {
    storyblokApi
      .get("cdn/stories/home", {
        version: "published",
      })
      .then(({ data }) => {
        setStory(data.story);
      });
  }, []);

  if (!story) return <div>Loading...</div>;

  return <StoryblokComponent blok={story.content} />;
}

export default App;
