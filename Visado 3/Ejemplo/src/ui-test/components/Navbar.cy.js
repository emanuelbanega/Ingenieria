// Import the Component to mount
import Navbar from "../../components/Navbar.vue";

describe("Se cargo bien la vista", () => {
    it("Navbar Cargado", () => {

        cy.mount(Navbar, { props: { isAuthenticated: true } });
        cy.get('nav').should('be.visible')
    });
});

describe("Titulo Correcto", () => {
    it("El titulo fue seteado correctamente", () => {

        cy.mount(Navbar, { props: { isAuthenticated: true } });
        cy.get('h1').should('contain.text','Searchable Sites')
    });
});