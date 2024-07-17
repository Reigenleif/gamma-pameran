import { useRouter } from "next/router";

export const Navigator = ({ url }: { url: string }) => {
  const router = useRouter();
  router.push(url);
  return <div></div>;
};
