import axios from "axios";
import { useEffect } from "react"

export const Test = () => {
    useEffect(() => {
        // const testing()
        axios.post(
            "http://localhost:9999/customer/test",
            {},
            { withCredentials: true }
        ).then(data => {
            console.log(data);
        });

    }, []);
    return <div>
        Testing
    </div>
}