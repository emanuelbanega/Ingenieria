<template>
    <nav>
        <img id="logo" src="../components/icons/logo.svg" alt="logo">
        <h1 id="tittle">Searchable Sites</h1>
        <button v-if="this.isAuthenticated" @click="logout">Logout</button>
    </nav>
</template>

<script>
export default {
    data(){
        return { isAuthenticated: this.$auth0 != undefined ? this.$auth0.isAuthenticated : true };
    },
    methods: {
        logout() {
            this.$auth0.logout({
                logoutParams: {
                    returnTo: "http://localhost:5173/login"
                }
            })
        }
    }
}
</script>

<style>
#logo {
    width: 50px;
    height: 50px;
    padding-left: 15px;
}

nav {
    background-color: cornflowerblue;
    display: flex;
    align-items: center;
    border-bottom: 1px solid black;
}

#tittle {
    font-family: cursive;
    padding-left: 15px;
    padding-right: 1070px;
}
</style>