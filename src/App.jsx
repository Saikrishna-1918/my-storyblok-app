import { useEffect, useState } from "react";
import {
  getStoryblokApi,
  StoryblokComponent,
  useStoryblokState,
} from "@storyblok/react";

function App() {
  const [story, setStory] = useState(null);

  useEffect(() => {
    const loadStory = async () => {
      const api = getStoryblokApi();
      const { data } = await api.get("cdn/stories/home");
      setStory(data.story);
    };
    loadStory();
  }, []);

  useStoryblokState(story);

  return (
    <div>
      {story ? <StoryblokComponent blok={story.content} /> : "Loading..."}
    </div>
  );
}

export default App;
