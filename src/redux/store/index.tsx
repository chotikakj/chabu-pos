import { configureStore } from "@reduxjs/toolkit";
import profile from "../reducers/profile";
import roles from "../reducers/roles";
import permissionToken from "../reducers/permission-token";
import roleToken from "../reducers/role-token";

const store = configureStore({
    reducer: { 
        profile: profile,
        roles: roles,
        permission_token: permissionToken,
        role_token: roleToken
     }
});

export default store;