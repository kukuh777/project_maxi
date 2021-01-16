<template>
  <div class="adinvoice">
    <h3 class="subheading grey--text">Invoice Page</h3>

    <!-- Table Start -->
      <v-data-table :busy="busy" :headers="headers" :items="orders" :single-expand="singleExpand" :expanded.sync="expanded" item-key="id" show-expand sort-by="" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat color="white">
            <v-toolbar-title>Invoice List</v-toolbar-title>
          </v-toolbar>
        </template>
        <template v-slot:item.total="{ item }">
         {{ item.total | currency('Rp ', 0, { thousandsSeparator: '.' }) }}
        </template>
        <template v-slot:item.order_status="{ item }">
          <v-chip :color="getColor(item.order_status)" dark>{{ item.order_status }}</v-chip>
        </template>
        <template v-slot:item.shipping="{ item }">
          <span >{{ getText(item.shipping.courier) }}</span>
        </template>
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            <v-row md12 row wrap class="mt-1 mb-n10">
              <v-col md3 class="mx-3">
                <h4 class="font-weight-bold">Payment Details</h4>
              </v-col>
              <v-spacer></v-spacer>
              <v-col md3 xs12 class="mx-3">
                <div class="d-flex flex-row-reverse">
                  <v-chip color="#ED1D32" label>
                    <span class="white--text overline">Invoice ID: {{ item.id }}</span>
                  </v-chip>
                </div>
              </v-col>
            </v-row>
            <v-divider :inset="item.inset"></v-divider>
            <div >
              <v-layout row wrap>
                <v-flex md3 class="mt-n5 d-flex justify-center px-8">
                  <v-list-item-content>
                    <v-list-item-title class="overline">
                      <span class="d-flex justify-center font-weight-black">[ Proof of Payment ]</span>
                      <template>
                        <v-row justify="center">
                          <v-dialog v-model="dialog" width="450px">
                            <template v-slot:activator="{ on, attrs }">
                              <v-img width="50px" class="px-10" :src="item.acc_image" v-bind="attrs" v-on="on"></v-img>
                            </template>
                            <v-card class="d-flex justify-center">
                              <v-img :src="item.acc_image"></v-img>
                            </v-card>
                          </v-dialog>
                        </v-row>
                      </template>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-flex>
                <!-- edit ini -->
                <v-flex md3 class="mt-n5 pr-4">
                  <v-list-item-content>
                    <v-list-item-title class="overline">
                      <span class="font-weight-black">Transfer Details: </span>
                    </v-list-item-title>
                    <v-list-item-title class="overline">
                      <span class="font-weight-bold">Account Number: </span>
                      <span class="cerbee">{{ item.acc_number }}</span> 
                    </v-list-item-title>
                    <v-list-item-title class="overline">
                      <span class="font-weight-bold">Account Name: </span>
                      <span class="cerbee">{{ item.acc_name }}</span> 
                    </v-list-item-title>
                    <v-list-item-title class="overline">
                      <span class="font-weight-bold">Account Bank: </span>
                      <span class="cerbee">{{ item.acc_bank_name }}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-flex>
              </v-layout>
            </div>
            <v-divider :inset="item.inset"></v-divider>
            <v-row md12 xs12 row wrap class="mt-n6 mb-n10">
              <v-col md3 class="mx-3">
                <h4 class="font-weight-bold">Product Details</h4>
              </v-col>
              
            </v-row>
            
            <v-divider :inset="item.inset"></v-divider>
            
            <div v-for="(product,index) in item.products" :key="index">
              <v-layout row wrap>
                <v-flex md2 xs12 class="d-flex justify-center px-8">
                  <v-img width="50px" :src="product.productImage"></v-img>
                </v-flex>

                <v-flex md4 xs12 class="mt-n4 pr-4">
                  <v-list-item-content>
                    <v-list-item-title class="overline">
                      <span class="font-weight-black">Product Id: </span>
                      <span class="cerbee">{{ product.productId }}</span>
                    </v-list-item-title>
                    <v-list-item-title>
                      <h5 class="font-weight-bold">{{ product.productTitle }}</h5>
                    </v-list-item-title>
                    <div class="mt-n2">
                      <v-chip class="white--text" color="#ED1D32" label>
                        <v-icon left>mdi-label</v-icon>{{ product.productCategory }}
                      </v-chip>
                    </div>
                    <v-list-item-title class="font-weight-bold overline">
                      Note:
                    </v-list-item-title>
                  </v-list-item-content>
                </v-flex>

                <v-flex md2 xs12 class="mt-n4">
                  <v-list-item-content>
                    <v-list-item-title class="overline font-weight-black">
                      Item Detail:
                    </v-list-item-title>
                    <v-list-item-title class="overline">
                      <span class="font-weight-black"> Quantity: </span>
                      <span class="cerbee">{{ product.productQuantity | currency('(pcs)', 0, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true, thousandsSeparator: '.' }) }}</span> 
                    </v-list-item-title>
                    <v-list-item-title class="overline">
                      <span class="font-weight-black">Weight: </span>
                      <span class="cerbee">{{ product.productWeight | currency('gram', 0, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true, thousandsSeparator: '.' }) }}</span> 
                    </v-list-item-title>
                  </v-list-item-content>
                </v-flex>

                <v-flex md2 xs12 class="mt-n4">
                  <v-list-item-content>
                    <v-list-item-title class="overline">
                      <span class="font-weight-black">Price per item:</span>
                    </v-list-item-title>
                    <v-list-item-title class="pr-5">
                      <h4 class="cerbee">{{ product.productPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</h4>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-flex>

                <v-flex md2 xs12 class="mt-n4 pr-8">
                  <v-list-item-content>
                    <v-list-item-title class="overline d-flex flex-row-reverse">
                      <span class="font-weight-black">Sub-total:</span>
                    </v-list-item-title>
                    <v-list-item-title class="d-flex flex-row-reverse">
                      <h4 class="cerbee font-weight-bold">{{ product.productQuantity * product.productPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</h4>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-flex>

              </v-layout>
              <v-divider :inset="item.inset"></v-divider>
            </div>
            <v-row md12 xs12 row wrap class="my-n4">
              <!-- <v-col md3 class="mx-3">
                <h4 v-for="kurir in shipping" :key="kurir">Shipping: {{kurir.courier}}</h4>
              </v-col> -->
              <v-spacer></v-spacer>
              <v-col md3 xs12 class="mx-5 d-flex flex-row-reverse">
                <h4 class="font-weight-bold">Weight Total : 
                  <span class="cerbee1">{{ item.totalWeight / 1000 | currency('Kg', 2, { symbolOnLeft: false, spaceBetweenAmountAndSymbol: true, thousandsSeparator: '.' }) }}</span>
                </h4>
              </v-col>
              <v-col md3 xs12 class="mx-5 d-flex flex-row-reverse">
                <h4 class="font-weight-bold">Total : 
                  <span class="cerbee1">{{ item.total | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</span>
                </h4>
              </v-col>
            </v-row>
          </td>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click.stop="editOrder(item)">mdi-pencil</v-icon>
          <!-- <v-icon small @click.stop="deleteOrder(item.id,item.user_id)">mdi-delete</v-icon> -->
        </template>
      </v-data-table> 
    <!-- Table End -->
  </div>
  
</template>

<script>

import {fb,db} from '../../firebase'
import router from '../../router'
export default {
  name: 'invoice',
  data () {
    return {
      dialog: false,
      expanded: [],
      singleExpand: false,
      busy: true,
      key: '',
      user_id: '',
      // user_id: '',
      order: {},
      orders: [],
      ref: fb.firestore().collectionGroup('orders'),
      headers: [

        { text: 'Customer Name', align: 'start', value: 'name' },
        { text: 'Phone Number', value: 'phone_number' },
        { text: 'Time', value: 'time' },
        { text: 'Status', value: 'order_status' },
        { text: 'Address', value: 'address' },
        { text: 'Shipping', value: 'shipping' },
        { text: 'Details', align: 'center', value: 'data-table-expand' },
        { text: 'Actions', align: 'center', value: 'actions', sortable: false },
      ],
    }
  },
  created () {
    this.ref.onSnapshot((querySnapshot) => {
      this.orders = []
      this.busy = true
      querySnapshot.forEach((doc) => {
        const doc2 = doc.data();
        doc2.id = doc.id
        this.orders.push({
          key: doc.id,
          id: doc.id,
          user_id: doc.data().user_id,
          name: doc.data().name,
          phone_number: doc.data().phone_number,
          time: doc.data().time,
          order_status: doc.data().order_status,
          address: doc.data().address,
          totalWeight: doc.data().totalWeight,
          total: doc.data().total,
          products: doc.data().products,
          shipping: doc.data().shipping,
          acc_number: doc.data().acc_number,
          acc_name: doc.data().acc_name,
          acc_bank_name: doc.data().acc_bank_name,
          acc_image: doc.data().acc_image,
        });
      }) 
      if (this.orders.length) {
        this.busy = false
      } else {
        this.busy = false
      }
    });
  },
  // watch: {
  //   formatDate(timestamp) {
  //     var date = new Date(timestamp);
  //     return formatDate(date, 'yyyy-MM-dd hh:mm');
  //   },
  // },
  methods: {
    getColor (order_status) {
      if (order_status == 'waiting for payment') return 'orange'
      else if (order_status == 'waiting for delivery') return 'primary'
      else if (order_status == 'transaction complete') return 'success'
      else if (order_status == 'cancelled') return 'red'
      else return 'white'
    },
    getText(shipping) {
      if (shipping == null) return 'picked from Store'
      else return shipping
    },
    editOrder (order) {
      console.log(order.user_id)
      router.push({ name: 'EditInvoice', params: { id: order.key, users: order.user_id }})
    },
  }
}
</script>

<style>
  .table {
    width: 96%;
    margin: 0 auto;
  }
</style>
<style>
.cerbee {
   color: #ED1D32;
}
.cerbee1 {
   color: #ff3c00;
}
</style>
