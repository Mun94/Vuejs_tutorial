<template>
    <header>
        <div class = "navbar navbar-default">
            <div class = "navbar-header">
                <h1>
                    <router-link :to = "{name: 'iMain'}">{{sitename}}</router-link>
                </h1>
            </div>
            <div class = "nav navbar-nav navbar-right cart">
                <router-link :to = "{name: 'Form'}" active-class = "active" tag = "button" class = "btn btn-default btn-lg">
                    <span class = "glyphicon glyphicon-shopping-cart">
                        {{cartItemCount}}
                    </span>
                    체크아웃
                </router-link>
            </div>
        </div>
    </header>
</template>

<script>
    export default {
        name: 'my-header',
        data() {
            return {
                sitename: 'vue.js 애완용품샵'
            };
        },
        props: ['cartItemCount']   
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: black;
    }
    .router-link-exact-active {
        color: black
    }
</style>