<template>
    <div class = "recordPadWrap">
        <div>
            <div v-if = "records.length > 0" class = "existRecords">
                <div v-for = "record in records" :key = "record">
                    <div class = "process">
                        {{ record.process.replaceAll(' ', '') }} =
                    </div>
                    <div class = "result">
                        {{ record.result }}
                    </div>  
                </div>
            </div>
            <div v-else class = "noneRecords">
                기록 없음
            </div>
        </div>  
        <div class = "remove" @click = "removeAllRecord">
            <font-awesome-icon icon = "trash" class="icon alt"/>
        </div>
    </div>
</template>

<script lang = "ts">
    interface IData {
        records: string[] | string;
    };

    interface IMethods {
        getRecordVal: () => string[] | string;
    };

    interface IComputed {
        removeAllRecord:() => void;
    };

    type TThis = IData & IMethods & IComputed & { $store: any };

    interface IRecordPad {
        name    : string,
        data    :() => IData,
        methods : IMethods,
        computed: IComputed
    };

    export default {
        name: 'RecordPad',
        data() { 
            return {
                records: (this as unknown as TThis).getRecordVal(),
        }},
        methods: {
            getRecordVal() {
                const { recordVal } = (this as TThis).$store.getters;

                return recordVal.length > 0 ? recordVal.reverse() : '';
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
        padding: 10px;

        background: #272727;
        color: #FFFFFF;
    }

    .noneRecords {
        height: 320px;

        text-align: left;
    }

    .existRecords {
        height: 320px;

        overflow: auto;

        text-align: right;
    }

    .process {
        margin-top: 5px;

        word-break: break-word;
        letter-spacing: 5px;
    }

    .result {
        margin-top: 5px;

        font-size: 25px;
    }

    .remove {
        margin-top: 5px;

        text-align: right;
    }

    .remove svg {
        width: 20px;
        height: 25px;

        cursor: pointer;
    }
</style>