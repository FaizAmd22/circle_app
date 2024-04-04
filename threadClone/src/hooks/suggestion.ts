import { useDispatch } from "react-redux";
import { IUsers } from "../interfaces/UsersInterface";
import { API } from "../libs/axios";
import { setSuggestion } from "../slices/suggestionSlice";

export const useSuggestionHooks = () => {
    const token = sessionStorage.getItem("token");
    const userId = sessionStorage.getItem("id");
    const dispatch = useDispatch();
    
    const fetchSuggestion = async () => {
        try {
        const response = await API.get("/search", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        const datas = response.data;

        const suggestion = datas
            .filter((user: IUsers) => user.id != userId && user.isFollow == false)
            .slice(0, 7);
        // console.log("suggestion :", suggestion);
        dispatch(setSuggestion(suggestion))
    } catch (error) {
        console.error("Error fetching data:", error);
        }
    };

    return {
        fetchSuggestion
    }
}
