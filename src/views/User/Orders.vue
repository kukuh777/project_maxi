<template>
	<div>
		<main>
			<navbar></navbar>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium" uk-grid>
						<div class="uk-width-1-1 uk-width-1-4@m tm-aside-column">
							<user-profile></user-profile>
						</div>
						<div class="uk-width-1-1 uk-width-expand@m">
							<div class="uk-card uk-card-default uk-card-small tm-ignore-container">
								<header class="uk-card-header">
									<h1 class="uk-h2">Orders</h1>
								</header>
								<article class="uk-card uk-card-default uk-card-small uk-card-body uk-article tm-ignore-container">
									<ul class="uk-list-divider uk-list-large" uk-accordion="multiple: true" >
										<li v-for="order in orders" :key="order.id">
											<h3 class="uk-accordion-title uk-link-heading">{{ order.invoice_id }}
												<span class="uk-text-muted uk-text-small">{{ order.time }}</span>
											</h3>
											<div class="uk-accordion-content">
												<table class="uk-table uk-table-small uk-table-justify uk-table-responsive uk-table-divider uk-margin-small-top uk-margin-remove-bottom">
													<tbody>
														<tr>
															<th class="uk-width-medium">Total Item</th>
															<td>{{ order.totalItem }} Pcs</td>
														</tr>
														<tr>
															<th class="uk-width-medium">Shipping</th>
															<td>{{ getText(order.shipping.courier) }}</td>
														</tr>
														<tr>
															<th class="uk-width-medium">Payment</th>
															<td class="uk-text-capitalize">{{ order.payment }}</td>
														</tr>
														<tr>
															<th class="uk-width-medium">Total</th>
															<td>{{ order.total | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</td>
														</tr>
														<tr>
															<th class="uk-width-medium">Status</th>
															<td>
																<span class="uk-label" :class="getColor(order.order_status)">{{ order.order_status }}</span>
															</td>
														</tr>
														<tr>
															<th class="uk-width-medium">Proof of Payment</th>
															<td>
																<div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-3@s" uk-grid>
																	<div>
																		<button @click="uploadProof(order)" class="geser uk-button uk-button-primary uk-button-small">UPLOAD</button>
																	</div>
																</div>
															</td>
														</tr>
														<tr>
															<th class="uk-width-medium">Your Items</th>
															<td>
																<ul uk-accordion="multiple: true">
																	<li v-for="(product,index) in order.products" :key="index">
																		<a class="uk-accordion-title" href="#">{{ product.productTitle }}</a>
																		<div v-show="show == order.order_status" class="uk-accordion-content">
																			<div class="uk-grid-small uk-child-width-1-1" uk-grid>
																				<div>
																					<div>
																						<div class="uk-form-label">Add your review</div>
																						<input class="uk-input" type="text" v-model="reviewDescription">
																					</div>
																				</div>
																				<div class="uk-form-label">Score</div>
																				<div class="uk-margin uk-grid-small uk-child-width-auto uk-grid">
																					<label>
																						<input v-model="reviewScore" class="uk-radio" type="radio" name="radio2"
																						value='
																						<span class="uk-text-warning" uk-icon="star"></span>'> 1
																					</label>
																					<label>
																						<input v-model="reviewScore" class="uk-radio" type="radio" name="radio2"
																						value='
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>'> 2
																					</label>
																					<label>
																						<input v-model="reviewScore" class="uk-radio" type="radio" name="radio2"
																						value='
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>'> 3
																					</label>
																					<label>
																						<input v-model="reviewScore" class="uk-radio" type="radio" name="radio2"
																						value='
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>'> 4
																					</label>
																					<label>
																						<input v-model="reviewScore" class="uk-radio" type="radio" name="radio2"
																						value='
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>
																						<span class="uk-text-warning" uk-icon="star"></span>' checked> 5
																					</label>
																					
																				</div>
																			</div>
																			<div class="uk-grid-small uk-child-width-1-1" uk-grid>
																				<div>
																					<div>
																						<button class="uk-button uk-input uk-button-primary" @click="AddReview(order)">submit</button>
																					</div>
																				</div>
																			</div>
																			
																		</div>
																	</li>
																</ul>
															</td>
														</tr>
													</tbody>
												</table>
											</div>
										</li>
									</ul>
								</article>
								
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- Marketplace -->
			<marketplace></marketplace>
		</main>
		<footernav></footernav>
	</div>
</template>
<script>
import {fb, db} from "../../firebase";
import router from '../../router';
export default {
   name: "Orders",
   props: {
         msg: String
   },
   data() {
      return {
		review_id: 'REV-' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
		key: '',
		user_id: '',
		show: 'transaction complete',
		order: {},
		orders: [],
		reviewDescription: '',
		reviewScore: null,
		ref: fb.firestore().collection('users'),
      }
   },

   created () {
	const user = fb.auth().currentUser;
	// this.ref.doc(user.uid).collection('orders').get().then(res => console.log(res.size));
	this.ref.doc(user.uid).collection('orders').get().then(res => {
		window.localStorage.setItem('order', res.size)
	});
    this.ref.doc(user.uid).collection('orders').onSnapshot((querySnapshot) => {
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
		  invoice_id: doc.data().invoice_id,
		  time: doc.data().time,
		  totalItem: doc.data().totalItem,
		  shipping: doc.data().shipping,
		  payment: doc.data().payment,
		  total: doc.data().total,
		  order_status: doc.data().order_status,
		  products: doc.data().products,
		//   opt
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
	})
	
  },
   methods: {
	AddReview(order) {
		this.reviews = {
			review_id: this.review_id,
			user_id: order.user_id,
			reviewName: order.name,
			reviewScore: this.reviewScore,
			reviewDescription: this.reviewDescription,
			time: new Date().toLocaleDateString('in-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
		}
		db.collection('products').doc(order.products[0].productId).collection('reviews').doc(this.review_id).set(this.reviews);
		swal("Good job!", "Thank you for your review!", "success");
		// this.$router.go(0);
	},
	getColor (order_status) {
		if (order_status == 'waiting for payment') return 'uk-label-warning'
		else if (order_status == 'cancelled') return 'uk-label-danger'
		else if (order_status == 'transaction complete') return 'uk-label-success'
		else return 'red'
	},
	getText(shipping) {
      if (shipping == "") return 'picked from Store'
      else return shipping
	},

	uploadProof(order) {
		// console.log(this.order.key)
		const user = fb.auth().currentUser;
		router.push({ name: 'ProofOfPayment', params: { id: user.uid, users: order.key }})
	},
	uploadImage(e) {
		let file = e.target.files[0];
		
		var storageRef = fb.storage().ref("images/transfer/" + file.name);
		let uploadTask = storageRef.put(file);

		console.log(e.target.files[0]);
		uploadTask.on('state_changed', (snapshot) => {
			
		}, (error) => {
			// Handle unsuccessful uploads
		}, () => {
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
			this.profile.image = downloadURL;

			console.log('File available at', downloadURL);
			});
		});
	},
},

};
</script>
<style>
.geser {
	margin-bottom: 20px
}
</style>