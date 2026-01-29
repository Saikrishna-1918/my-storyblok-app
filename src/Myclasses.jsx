import { useEffect, useState } from "react";
import { getStoryblokApi, StoryblokComponent } from "@storyblok/react";
import "./myclasses.css";

function Myclasses() {
    const [blok, setBlok] = useState(null);
    const storyblokApi = getStoryblokApi();
    console.log('blok', blok);

    useEffect(() => {
        storyblokApi
            .get("cdn/stories/home", { version: "published" }) // ✅ home
            .then(({ data }) => {
                const body = data.story.content.body || [];
                const myClassesBlock = body.find(
                    (b) => b.component === "my-classes"
                );
                setBlok(myClassesBlock);
            })
            .catch((err) => console.error(err));
    }, []);

    if (!blok) return <div>Loading My Classes...</div>;

    return (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <span className="myclassesFont">{blok.Title}</span>
        </div>
    );
}

export default Myclasses;
