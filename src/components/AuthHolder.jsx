import { useAuthContext } from "../context/auth";

export default function AuthHolder(props) {
  const { isAuthenticated } = useAuthContext();

  if (isAuthenticated) return <>{props.children}</>;

  if (props.fallback) return props.fallback();

  return null;
}
