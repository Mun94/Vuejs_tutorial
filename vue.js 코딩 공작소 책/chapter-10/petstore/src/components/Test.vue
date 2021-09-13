<script>
    export default {
        name: 'Test',
        data() {
            return {
                welcome: '안녕하세요'
            }
        },
        methods: {
            pressed() {
                alert('클릭 됨')
            }
        },
        render() {
            const onClick = () => {
                console.log('testset');
            };

            return (
                <div>
                    {this.welcome}
                    <button on-click = {this.pressed}>alert</button>
                    <button on-click = {onClick}>버튼</button>
                </div>
            )
        }
    }
</script>