<template>
    <div>
        <h2>User Profile</h2>
        <button @click="login">Log in</button>
    </div>
</template>
<script>
// Composition API
import { useAuth0 } from '@auth0/auth0-vue';

export default {
    setup() {
        const auth0 = useAuth0();

        return {
            login: () => auth0.loginWithRedirect(),
            logout() {
                auth0.logout({
                    logoutParams: {
                        returnTo: "http://localhost:5173/login"
                    }
                });
            },
            user: auth0.user,
            isAuthenticated: auth0.isAuthenticated,
            isLoading: auth0.isLoading,
        };

    }
};
</script>