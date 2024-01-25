<template>
    <input type="text" name="word" id="word" :value="word" @input="e => word = e.target.value">
    <button @click="search()">Buscar</button>
    <ul v-if="items != null">
        <li v-for="i in items">
            <p v-html="i.content"></p>
        </li>
    </ul>
</template>
<script>
import axios from 'axios'
export default {
    data() {
        return {
            url: 'http://[::1]:3000/sitios/',
            items: null,
            word:""
        }
    },
    methods:{
        async search(){
            if(this.word != ""){
                const { data } = await axios.get(this.url + this.$route.params.id + '/' + this.word)
                const newArray = data.map(corrida => {
                    const arrayPalabras = corrida.content.split(' ')
                    const palabraSubrayada = arrayPalabras.map((palabra) => {
                        const palabraSinComas = palabra.replace(',','')
                        const palabraSinPuntos = palabraSinComas.replace('.','')
                        if(palabraSinPuntos == this.word){
                            return `<b>${palabra}</b>`
                        }
                        return palabra
                    }
                    )

                    const textoFinal = palabraSubrayada.join(' ')
                    return {...corrida,content:textoFinal}
                });
                this.items = newArray
            }
        }
    }
}
</script>