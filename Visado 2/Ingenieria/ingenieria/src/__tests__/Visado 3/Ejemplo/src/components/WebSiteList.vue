<template>
    <h1>{{ items.length == 0 ? "No hay sitios registrados" : "Listado" }}</h1>
    <table v-if="items.length != 0">
        <thead>
            <th>Nombre</th>
            <th>URL</th>
            <th>Niveles</th>
            <th>Frecuencia</th>
            <th>Extractor</th>
            <th></th>
            <th></th>
        </thead>
        <tbody>
            <tr v-for="item in items">
                <td>{{ item.nombre }}</td>
                <td>{{ item.url }}</td>
                <td>{{ item.niveles }}</td>
                <td>{{ item.frecuencia }}</td>
                <td>{{ item.extractor }}</td>
                <td><button @click="() => { borrar(item.id) }">Borrar</button></td>
                <td><button @click="() => { modificar(item) }">Modificar</button></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: ["items", "borrar", "modificar"]
}
</script>
<style>
    th,td,tr{
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

</style>