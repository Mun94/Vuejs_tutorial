<template>
    <div class = "recordPadWrap">
        <div>
            <div v-if = "records.length > 0" class = "existRecords">
                <div v-for = "record in records" :key = "record">
                    <div>
                        {{ record }}
                    </div>
                    <div>
                        {{ sum(record) }}
                    </div>  
                </div>
            </div>
            <div v-else class = "noneRecords">
                기록 없음
            </div>
        </div>  
        <div class = "remove" @click = "removeAllRecord">
            지우기
        </div>
    </div>
</template>

<script lang = "ts">
    interface IData {
        records: string[] | string ;
    };

    interface IMethods {
        sum: ( re:string ) => number;
        getRecordVal: () => string[] | string;
    };

    interface IComputed {
        removeAllRecord:() => void;
    };

    type TThis = IData & IMethods & IComputed & {$store: any};

    interface IRecordPad {
        name: string,
        data:() => IData,
        methods: IMethods,
        computed: IComputed
    };

    export default {
        name: 'RecordPad',
        data() { 
            return {
                records: (this as unknown as TThis).getRecordVal(),
        }},
        methods: {
            sum(re) {
                return parseInt(re) ? eval(re) : ''
            },
            getRecordVal() {
                const { recordVal } = (this as TThis).$store.getters;
                return recordVal.length > 0 ? recordVal : '';
            },
        },
        computed: {
            removeAllRecord() {
                (this as TThis).records = '';
                (this as TThis).$store.commit('REMOVE_ALL_RECORD');
            }
        }
    } as IRecordPad;
</script>

<style scoped>
    .recordPadWrap {
        width:100%;
        

        color: #FFFFFF;
        background: #272727;
    }

    .noneRecords {
        height: 335px;

        text-align: left;
    }

    .existRecords {
        height: 335px;

        text-align: right;
    }

    .remove {
        text-align: right;
    }
</style>