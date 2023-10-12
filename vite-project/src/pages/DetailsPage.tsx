import { useNavigate, useParams } from "react-router-dom";
import useSWR from "swr";
import { fetcher } from "../utils";

export function DetailsPage() {
  const params = useParams();
  const navigate = useNavigate();
  const { data } = useSWR(
    `http://localhost:8000/photos/${params.photo_id}`,
    fetcher,
    {
      fallbackData: null,
      revalidateOnReconnect: false,
      revalidateOnFocus: false,
    }
  );

  return (
    <div className="container auto px-5 py-2">
      <div>
        <h1 className="text-2xl font-bold">Photo Details</h1>
      </div>
      <div className="flex mt-1 gap-1">
        <div>
          <img src={data?.url} alt={data?.title} />
        </div>
        <div>
          <p>{data?.title}</p>
          <p>{data?.created_at}</p>
        </div>
      </div>
      <div className="flex mt-1 gap-1">
        <div>
          <button
            className="border"
            onClick={() => {
              navigate(`/`);
            }}
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}
