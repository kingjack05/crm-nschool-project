import { useQuery } from "@tanstack/react-query";
import { orpc } from "../utils/orpcClient";

export const Planets = () => {
  const query = useQuery(orpc.planet.list.queryOptions({ input: {} }));
  if (!query.isSuccess) return null;

  return <>{JSON.stringify(query.data, null, 2)}</>;
};
