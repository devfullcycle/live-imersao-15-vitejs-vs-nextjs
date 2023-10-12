import { Link, useLocation, useNavigate } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils";

export function HomePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const pageParam = new URLSearchParams(location.search).get("page") || 1;
  const searchParam = new URLSearchParams(location.search).get("search") || "";

  const { data, isLoading } = useSWR(
    `http://localhost:8000/photos?_page=${pageParam}&_limit=10&q=${searchParam}`,
    fetcher,
    {
      fallbackData: [],
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="container auto px-5 py-2">
      <div>
        <h1 className="text-2xl font-bold">Vite - Gallery</h1>
      </div>
      <div className="flex mt-1 gap-1">
        <form
          onSubmit={(event) => {
            event.preventDefault();
            const search = event.currentTarget.search.value;
            navigate(`?page=1&search=${search}`);
          }}
        >
          <input
            type="search"
            placeholder="Search"
            className="border"
            name="search"
          />
          <button type="submit" className="border">
            Search
          </button>
        </form>
        <div className="flex gap-1">
          <a
            href="#"
            className="text-blue-500"
            onClick={(event) => {
              event.preventDefault();
              navigate(`?page=${Number(pageParam) - 1}&search=${searchParam}`);
            }}
          >
            Previous
          </a>
          <a
            href="#"
            className="text-blue-500"
            onClick={(event) => {
              event.preventDefault();
              navigate(`?page=${Number(pageParam) + 1}&search=${searchParam}`);
            }}
          >
            Next
          </a>
        </div>
      </div>

      <div className="flex flex-wrap">
        {!isLoading ? (
          data.map((item, key) => (
            <div className="flex w-1/3 p-2" key={key}>
              <Link to={`/photos/${item.id}`}>
                <div className="w-full flex flex-col">
                  <img
                    alt="gallery"
                    className="block h-full w-full rounded-lg object-cover object-center"
                    src={item.url}
                  />
                  <span>{item.title.slice(0, 10)}...</span>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <span>Loading...</span>
        )}
      </div>
    </div>
  );
}
