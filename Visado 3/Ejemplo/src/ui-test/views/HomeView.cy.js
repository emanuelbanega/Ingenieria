import HomeView from "../../views/HomeView.vue";

describe("Componentes Cargados", () => {
    it("Navbar Cargado", () => {
        cy.mount(HomeView, { props: { isAuthenticated: true } });
    });
});