import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom';
import Search from "./components/serch/Search";
import SearchResult from "./components/serch/SearchResult";

const router = createBrowserRouter(
        createRoutesFromElements(
            <Route path="/" element={<Search/>}>
                <Route element={<SearchResult/>}></Route>
            </Route>
        )
    )
;

function App() {
    return <RouterProvider router={router}/>;
}

export default App;
