import { useRequest } from "../hooks/useRequest";

const Trade = () => {
    const { data, isPending, error } = useRequest('GET', 'http://localhost:8000/api/trade/get/');

    console.log(data)

    return(
        <div></div>
    )
}

export { Trade };