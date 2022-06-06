import { useEffect } from "react"

export default function() {

    useEffect(() => {
        console.log('student');
    }, []);

    return <>Students</>
}
