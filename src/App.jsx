import { getStoryblokApi } from "@storyblok/react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Myclasses from "./Myclasses";
import MyCalendar from "./MyCalendar";
import Layout from "./Layout";
import ClassSearch from "./ClassSearch";

function App() {
  const [story, setStory] = useState(null);
  const storyblokApi = getStoryblokApi();

  useEffect(() => {
    storyblokApi
      .get("cdn/stories/home", { version: "published" })
      .then(({ data }) => setStory(data.story));
  }, []);

  if (!story) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout story={story} />}>
          <Route path="/" element={<Navigate to="/my-classes" replace />} />
          <Route path="my-classes" element={<Myclasses />} />
          <Route path="my-calendar" element={<MyCalendar />} />
          <Route path="/class-search" element={<ClassSearch />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
