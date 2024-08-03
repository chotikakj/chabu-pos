import store from "../redux/store";

function Middleware(props: any) {
  const permission = store?.getState().permission_token;

  if (
    permission.filter((item: any) => item === props.component_key).length !== 0
  ) {
    return <>{props.children}</>;
  } else {
    return null;
  }
}

export default Middleware;
