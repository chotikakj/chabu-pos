import store from "../redux/store";

function MiddlewareFunc(component_key: string): boolean {
  const permission = store?.getState().permission_token;
  if (permission.find((item: string) => item === component_key)) {
    return true;
  } else {
    return false;
  }
}

function AdminsFunc() {
  const roles = store?.getState().role_token;
  if (roles === "7fde5ae9-1c38-4bb1-88b7-4fd06d7eef7a") {
    return true;
  } else {
    return false;
  }
}

export { MiddlewareFunc, AdminsFunc };
