<template>
    <form>
        <label>Nombre:</label>
        <input name="name" type="text" id="name" v-model="item.nombre" />
        <label>URL:</label>
        <input name="url" type="text" id="url" v-model="item.url">
        <label>Niveles:</label>
        <input name="levels" type="text" id="levels" v-model="item.niveles">
        <label>Frecuencia:</label>
        <input name="frequency" type="text" id="frequency" v-model="item.frecuencia">
        <label>Extractor:</label>
        <input name="extractor" type="text" id="extractor" v-model="item.extractor">
        <button @click="guardar">Guardar</button>
        <button @click="cancel">Cancelar</button>
    </form>
</template>

<script>
export default {
    props: ["action","object","cancelar"],
    methods: {
        guardar(e) {
            e.preventDefault()
            this.action()
        },
        cancel(e){
            e.preventDefault()
            this.cancelar()
        }
    },
    data() {
        return {
            item:this.object
        }
    }
}
</script>

<style>
form {
    width: 300px;
    padding: 16px;
    border-radius: 10px;
    margin: auto;
    background-color: #ccc;
}

form label {
    width: 72px;
    font-weight: bold;
    display: inline-block;
}

form input[type="text"],
form input[type="email"] {
    width: 180px;
    padding: 3px 10px;
    border: 1px solid #f6f6f6;
    border-radius: 3px;
    background-color: #f6f6f6;
    margin: 8px 0;
    display: inline-block;
}

form input[type="submit"] {
    width: 100%;
    padding: 8px 16px;
    margin-top: 32px;
    border: 1px solid #000;
    border-radius: 5px;
    display: block;
    color: #fff;
    background-color: #000;
}

form input[type="submit"]:hover {
    cursor: pointer;
}

textarea {
    width: 100%;
    height: 100px;
    border: 1px solid #f6f6f6;
    border-radius: 3px;
    background-color: #f6f6f6;
    margin: 8px 0;
    resize: none;
    display: block;
}
</style>