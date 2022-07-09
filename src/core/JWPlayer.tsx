import { useEffect } from "react";
import { JW_PLAYER_LIBRARY } from "./constants/common";
import { isMobileDevice } from "./utils";

declare const jwplayer: any;

interface IJWPlayer {
    mediaId: string;
}

export function JWPlayer({ mediaId }: IJWPlayer) {
    

    const onPlayerLoad = () => {
        jwplayer("jwVideoPlayer").setup({
            "playlist": `https://cdn.jwplayer.com/v2/media/${mediaId}`,
            "height":(!isMobileDevice() ? window.innerHeight - 100 : window.innerHeight - 180),
            "width": "100%",
            "autostart": "viewable",
            "pipIcon": "disabled",
            "controls": true,
            "displayHeading": true,
            "media": {
                "mediaid": mediaId
            },
            "advertising": {}
        })
    };

    useEffect(() => {
        const script = document.createElement('script');
        script.src = JW_PLAYER_LIBRARY;
        script.async = true;
        script.onload = onPlayerLoad;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        }
    }, []);

    return (
        <div id="jwVideoPlayer"></div>
    );
}
