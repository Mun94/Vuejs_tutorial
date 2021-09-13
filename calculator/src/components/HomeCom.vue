<template>
    <div class = "wrap">
        <table class = "tableWrap">
            <tr>
                <td><Button></Button></td>
                <td><Button>CE</Button></td>
                <td><Button>C</Button></td>
                <td><Button><font-awesome-icon icon="user-secret" /></Button></td>
            </tr>
            <tr>
                <td><Button></Button></td>
                <td><Button></Button></td>
                <td><Button></Button></td>
                <td><Button><font-awesome-icon icon="user-secret" /></Button></td>
            </tr>
            <tr>
                <td><Button valType = "num">7</Button></td>
                <td><Button valType = "num">8</Button></td>
                <td><Button valType = "num">9</Button></td>
                <td><Button>*</Button></td>
            </tr>
            <tr>
                <td><Button valType = "num">4</Button></td>
                <td><Button valType = "num">5</Button></td>
                <td><Button valType = "num">6</Button></td>
                <td><Button>-</Button></td>
            </tr>
            <tr>
                <td><Button valType = "num">1</Button></td>
                <td><Button valType = "num">2</Button></td>
                <td><Button valType = "num">3</Button></td>
                <td><Button>+</Button></td>
            </tr>
            <tr>
                <td><Button valType = "num">+/-</Button></td>
                <td><Button valType = "num">0</Button></td>
                <td><Button valType = "num">.</Button></td>
                <td><Button>=</Button></td>
            </tr>
        </table>
    </div>
</template>

<script lang = "ts">
    import Button from './common/Button.vue';

    export default {
        name: 'Home',
        data(){
            return {
            }
        },
        components: {Button}
    }
</script>

<style scoped>
    .wrap {
        width: 500px;
    }

    .tableWrap {
        width: 100%;
    }
</style>