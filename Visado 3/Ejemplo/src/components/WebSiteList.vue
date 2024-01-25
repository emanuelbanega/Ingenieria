<template>
    <div class="listado">
        <table v-if="items.length != 0">
            <thead>
                <th>Nombre</th>
                <th>URL</th>
                <th>Modificar</th>
                <th>Eliminar</th>
                <th>Acciones</th>
            </thead>
            <tbody>
                <tr v-for="(item,index) in items">
                    <td>{{ item.name }}</td>
                    <td>{{ item.url }}</td>
                    <td>
                        <button class="boton" @click="() => { modificar(item.id) }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-pencil-square" viewBox="0 0 16 16">
                                <path
                                    d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path fill-rule="evenodd"
                                    d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                            </svg>
                        </button>
                    </td>
                    <td>
                        <button class="boton" @click="() => { borrar(item.id) }">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                class="bi bi-trash" viewBox="0 0 16 16">
                                <path
                                    d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                <path
                                    d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                            </svg>
                        </button>
                    </td>
                    <td style="display: flex;">
                        <button class="boton" @click="() => { mostrarAcciones(index) }">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <g id="Media / Play_Circle">
                                    <g id="Vector">
                                        <path
                                            d="M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z"
                                            stroke="#000000" stroke-width="2" stroke-linecap="round"
                                            stroke-linejoin="round" />
                                        <path d="M10 15V9L15 12L10 15Z" stroke="#000000" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </g>
                                </g>
                            </svg>
                        </button>
                        <div :id="'accion' + index" class="menuoptions" style="display: none;">
                            <ul>
                                <li @click="() => { verCorridas(item.id) }">Ver Corridas</li>
                                <li @click="() => { realizarBusqueda(item.id) }">Realizar Busqueda</li>
                                <li @click="() => { verDetalle(item.id) }">Ver Detalle</li>
                            </ul>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    data(){
        return {
            popupsShowed:this.items.map((e) => false)
        }
    },
    props: ["items", "borrar", "modificar"],
    methods: {
        verDetalle(id){
            this.$router.push('/detalle/' + id)
        },
        verCorridas(id){
            this.$router.push('/corrida/' + id)
        },
        realizarBusqueda(id){
            this.$router.push('/busqueda/' + id)
        },
        mostrarAcciones(index) {
            const popup = document.getElementById('accion'+index)
            if(this.popupsShowed[index]){
                popup.style.display = 'none'
                this.popupsShowed[index] = false
            } else {
                const popupShowedIndex = this.popupsShowed.findIndex((e) => e == true)
                if(popupShowedIndex != -1){
                    const popupToHint = document.getElementById('accion'+popupShowedIndex)
                    this.popupsShowed[popupShowedIndex] = false
                    popupToHint.style.display = 'none'
                }
                popup.style.display = 'block'
                this.popupsShowed[index] = true
            }
        }
    }
}
</script>
<style>
th,
td,
tr {
    padding: 10px;
    margin: 0px;
}

table {
    text-align: left;
    border-spacing: 0px;
    padding: 0px;
    margin: 0px;
    background-color: rgb(210, 206, 206);
    border: 1px solid black;
    font-family: Arial, Helvetica, sans-serif;
}

thead {
    background-color: black;
    color: white;
}

.boton {
    background: none;
    border: none;
    cursor: pointer;
}

.listado {
    display: flex;
    justify-content: center;
    flex-direction: column;
    width: 70%;
}
.menuoptions{
    background-color: white;
    padding: 0%;
    position: absolute;
    margin-left: 40px;
}
.menuoptions ul {
    list-style: none;
    padding: 0%;
    margin: 0%;
}
.menuoptions ul li {
    padding: 10px;
    margin: 0%;
}
.menuoptions ul li:hover {
    background-color: rgb(99, 146, 211);
}
</style>