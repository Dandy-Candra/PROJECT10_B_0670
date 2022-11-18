<template>
   <v-main>
    <v-row>
        <v-col>
            <v-card v-for="item in merchandises" :key="item"
            elevation="3"
        :color = "item.color"
        dark
        class="mt-5 mx-4 float-left" 
        max-width="344"
        >
        <v-card-title class="text-h5">
            {{ item.merchandise }}
        </v-card-title>
        </v-card>
        </v-col>
    </v-row>
    
    
   </v-main>
    
</template>

<script>
import { db } from '../firebase';
import {ref,set,remove,get,push,onValue} from '@firebase/database'

export default {
    name: "MerchandisePage",
    data () {
        return {
            merchandises: [],
            items: [{ message: 'Foo' }, { message: 'Bar' }]
        }
    },

    created() {
        // tambahkan fungsi untuk retrieve data
        onValue(ref(db, 'merchandises'), (snapshot) => {
            this.merchandises = [],
            snapshot.forEach((merchandise) => {
                this.merchandises.push({
                    id: merchandise.key,
                    merchandise: merchandise.val().merchandise,
                    artist: merchandise.val().artist,
                    price: merchandise.val().price,
                    stock: merchandise.val().stock,
                    package: merchandise.val().package,
                    color:"#" + Math.floor(Math.random()*16777215).toString(16)

                });
            })
        })

    },

    methods: {
        saveData() {
            //tambahkan fungsi untuk create dan update data
            if (this.formType == -1) {

                set(ref(db, 'merchandises/' + this.selectedId), this.form)
                .then(() => {
                    this.snackbar = true;
                    this.error_message = 'Update Data Success!';
                    this.color = 'green';
                    this.closeDialog();
                })
                .catch((err) => {
                    this.error_message = "Update Data Failed!" + err;
                    this.color = 'red';
                    this.closeDialog();
                })
            } else {
                push(ref(db, 'merchandises'), this.form)
                .then(() => {
                    this.snackbar = true;
                    this.error_message = 'Add Data Success!';
                    this.color = 'green';
                    this.closeDialog();
                })
                .catch((err) => {
                    this.error_message = "Add Data Failed!" + err;
                    this.color = 'red';
                    this.closeDialog();
                })
            }
            
        },

        editData(item){
            this.dialog = true; 
            this.formType = -1; 
            this.form = Object.assign({}, item);
            this.selectedId = item.id;
        },

        deleteData() {
            //tambahkan fungsi untuk delete data
            remove(ref(db, 'merchandises/' + this.selectedId))
            .then(() => {
                this.dialogConfirm = false;
                this.snackbar = true;
                this.error_message = 'Delete Data Success!';
                this.color = 'green';
            }).catch((err) => {
                this.dialogConfirm = false;
                this.snackbar = true;
                this.error_message = "Delete Data Failed!" + err;
                this.color = 'red';
            })


            
        },

        closeDialog() {
            this.dialog = false;
            this.formType = 0;
            this.$refs.form.reset();
        },

    },

    computed: {
        formTitle() {
            return this.formType === 0 ? "Create Merchandise" : "Update Merchandise";
        },
    },
}


</script>
