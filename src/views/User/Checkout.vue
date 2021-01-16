<template>
	<div class="ceheckout">
		<navbar/>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
						<section class="uk-text-center">
							<router-link class="uk-link-muted uk-text-small" to="/cart">
								<span class="uk-margin-xsmall-right" uk-icon="icon: arrow-left; ratio: .75;"></span>Return to cart
							</router-link>
							<h1 class="uk-margin-small-top uk-margin-remove-bottom">Checkout</h1>
						</section>
						<section>
							<div class="uk-grid-medium" uk-grid>
								<form class="uk-form-stacked uk-width-1-1 tm-checkout uk-width-expand@m">
									<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
										<section>
											<h2 class="tm-checkout-title">Contact Information</h2>
											<div class="uk-card uk-card-default uk-card-small uk-card-body tm-ignore-container">
												<div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
													<div>
														<label>
															<div class="uk-form-label uk-form-label-required">First Name</div>
															<input class="uk-input" type="text" v-model="profile.firstname" required>
														</label>
													</div>
													<div>
														<label>
															<div class="uk-form-label uk-form-label-required">Last Name</div>
															<input class="uk-input" type="text" v-model="profile.lastname" required>
														</label>
													</div>
													<div>
														<label>
															<div class="uk-form-label uk-form-label-required">Phone Number</div>
															<input class="uk-input" type="text" v-model="profile.phone_number" required>
														</label>
													</div>
													<div>
														<label>
															<div class="uk-form-label uk-form-label-required">Email</div>
															<input class="uk-input" type="email" v-model="profile.email" required>
														</label>
													</div>
												</div>
												<div class="uk-grid-small" uk-grid>
													<div class="uk-width-expand">
														<label>
															<div class="uk-form-label uk-form-label-required">Street</div>
															<input class="uk-input" type="text" v-model="profile.street">
														</label>
													</div>
													<div class="uk-width-1-3 uk-width-1-6@s">
														<label>
															<div class="uk-form-label uk-form-label-required">Post Code</div>
															<input class="uk-input" type="text" v-model="profile.postcode">
														</label>
													</div>
												</div>
												<div class="uk-grid-small uk-child-width-1-3 uk-child-width-1-4@s" uk-grid>
													<div class="uk-width-1-1">
														<label>
															<div class="uk-form-label">Address Details</div>
															<textarea class="uk-textarea" rows="5" placeholder="Additional information: phone numbers or doorphone code" v-model="profile.addr_details"></textarea>
														</label>
													</div>
												</div>
											</div>
										</section>
										<section>
											<h2 class="tm-checkout-title">Shipping</h2>
											<div class="uk-card uk-card-default uk-card-small uk-card-body tm-ignore-container">
												<div class="uk-grid-small uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-flex-center" uk-switcher="toggle: &gt; * &gt; .tm-choose" uk-grid>
													<div>
														<a class="tm-choose">
															<div class="tm-choose-title">pick up from store</div>
															<div class="tm-choose-description">Free, tomorrow</div>
														</a>
													</div>
													<div>
														<a class="tm-choose" href="#">
															<div class="tm-choose-title">delivery</div>
															<div class="tm-choose-description">According to destination, Tomorrow</div>
														</a>
													</div>
												</div>
												<div class="uk-switcher uk-margin">
													<section>
														<div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
															<div class="uk-text-small">
																<div class="uk-text-bolder">Store Name</div>
																<div>St.&nbsp;Petersburg, Nevsky&nbsp;Prospect&nbsp;28</div>
																<div>Daily 10:00–22:00</div>
															</div>
														</div>
													</section>
													<div>
														<div class="uk-grid-small" uk-grid>
															<div class="uk-width-1-1">
																<label>
																	<div class="uk-form-label uk-form-label-required">Country</div>
																	<select class="uk-select" v-model="profile.country">
																		<option>Choose the country</option>
																		<option value="Indonesia">Indonesia</option>
																	</select>
																</label>
															</div>
														</div>
														<div class="uk-grid-small" uk-grid>
															<div class="uk-width-expand">
																<div class="uk-form-label">Province</div>
																<select class="uk-select" v-model="province_id" @change="getCities">
																	<option>Choose the province</option>
																	<option v-for="(row, index) in provinces" :key="'provinces'+index" :value="row.id">{{ row.name }}</option>
																</select>
															</div>
															<div class="uk-width-1-3@s">
																<div class="uk-form-label">City</div>
																<select class="uk-select" v-model="city_id" @change="getDistricts">
																	<option>Choose the city</option>
																	<option v-for="(row, index) in cities" :key="'cities'+index" :value="row.id">{{ row.name }}</option>
																</select>
															</div>
															<div class="uk-width-1-3@s">
																<div class="uk-form-label">District</div>
																<select class="uk-select" v-model="district_id" @change="getCouriers">
																	<option>Choose the district</option>
																	<option v-for="(row, index) in districts" :key="'districts'+index" :value="row.id">{{ row.name }}</option>
																</select>
															</div>
														</div>
														<div class="uk-grid-small" uk-grid>
															<div class="uk-width-expand">
																<label>
																	<div class="uk-form-label uk-form-label-required">Shipping Cost</div>
																	<select class="uk-select" v-model="courier">
																		<option>Choose the courier</option>
																		<option v-for="(row, index) in couriers" :key="'couriers'+index" :value="row">{{ row.courier }} - {{ row.service }} (Rp {{ row.cost }})</option>
																	</select>
																</label>
															</div>
														</div>
													</div>
												</div>
											</div>
										</section>
										<section>
											<h2 class="tm-checkout-title">Payment</h2>
											<div class="uk-card uk-card-default uk-card-small tm-ignore-container">
												<div class="uk-card-body">
													<div class="uk-grid-small uk-grid-match uk-child-width-1-1 uk-child-width-1-3@s uk-flex-center" uk-switcher="toggle: &gt; * &gt; .tm-choose" uk-grid>
														<div>
															<a class="tm-choose" href="#">
																<div class="tm-choose-title">payment upon receipt</div>
																<div class="tm-choose-description">Cash, Bank Transfer (ATM / Mobile Banking)</div>
															</a>
														</div>
													</div>
												</div>
												<div class="uk-card-footer">
													<label>
													<div class="uk-inline">
															<span class="uk-form-label uk-margin-small-right">Promo Code</span>
														</div>
														<div class="uk-inline">
															<a class="uk-form-icon uk-form-icon-flip"></a>
															<input class="uk-input uk-form-width-small" type="text" v-model="code">
														</div>
													</label>
												</div>
											</div>
										</section>
									</div>
								</form>
								<div class="uk-width-1-1 uk-width-1-4@m tm-aside-column">
									<div class="uk-card uk-card-default uk-card-small tm-ignore-container" uk-sticky="offset: 30; bottom: true; media: @m;">
										<section class="uk-card-body">
											<h4>Items in order</h4>
											<!-- Checkout Product -->
											<div class="uk-grid-small" uk-grid v-for="item in this.$store.state.cart" :key="item.productId">
												<div class="uk-width-expand">
													<div class="uk-text-small">{{ item.productTitle }}</div>
													<div class="uk-text-meta">{{ item.productQuantity }} × {{ item.productPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
												</div>
												<div class="uk-text-right">
													<div>{{ item.productQuantity * item.productPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
												</div>
											</div>
											<!-- Checkout Product End -->
										</section>
										<section class="uk-card-body">
											<div>
												<div class="uk-grid-small" uk-grid>
												<div class="uk-width-expand uk-text-muted">Weight (in Gram)</div>
												<div>{{ this.$store.getters.totalWeight | currency('', 0, { thousandsSeparator: '.' }) }}</div>
												</div>
											</div>
										</section>
										<section class="uk-card-body">
											<div class="uk-grid-small" uk-grid>
												<div class="uk-width-expand">
													<div class="uk-text-muted">Subtotal</div>
												</div>
												<div class="uk-text-right">
													<div>{{ this.$store.getters.totalPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
												</div>
											</div>
											<div class="uk-grid-small" uk-grid>
												<div class="uk-width-expand">
													<div class="uk-text-muted">Shipping</div>
												</div>
												<div class="uk-text-right">
													<div>{{ courier ? courier.cost:0 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
												</div>
											</div>
											<div class="uk-grid-small" uk-grid>
												<div class="uk-width-expand">
													<div class="uk-text-muted">Discount</div>
												</div>
												<div class="uk-text-right">
													<div class="uk-text-danger">{{ discount | currency('- Rp ', 0, { thousandsSeparator: '.' }) }}</div>
												</div>
											</div>
										</section>
										<section class="uk-card-body">
											<div class="uk-grid-small uk-flex-middle" uk-grid>
												<div class="uk-width-expand">
													<div class="uk-text-muted">Total</div>
												</div>
												<div class="uk-text-right">
													<div class="uk-text-lead uk-text-bolder">{{ finalPrice | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
												</div>
											</div>
											<button type="submit" class="uk-button uk-button-primary uk-margin-small uk-width-1-1" @click="checkout(profile)">checkout</button>
										</section>
									</div>
								</div>
							</div>
						</section>
					</div>
				</div>
			</section>
		</main>
		<footernav/>
	</div>
</template>
<script>
	import axios from 'axios';
	import {fb, db} from "../../firebase";
	export default {
	   name: "Checkout",
		props: {
			msg: String
	   },
	   created() {
	      var user = fb.auth().currentUser;
	      this.email = user.email;
	      this.getProvinces()
	   },
	   data() {
	      return {
			invoice_id: 'INV-' + (Date.now().toString(36) + Math.random().toString(36).substr(2, 5)).toUpperCase(),
			api_key: 'ZaAMMD04vP6dfxGy7eHMK59WkzrtEnGebNwwNflF',
			provinces: [],
			province_id: '',
			cities: [],
			city_id: '',
			districts: [],
			district_id: '',
			couriers: [],
            courier: '',
            profile: {},
            weight: '',
            code: '',
			discount: '',
			ticket: {
				name: null,
				phone_number: null,
				email: null,
				shipping: null,
				street: null,
				postcode: null,
				address: null,
				payment: null,
				discount: null,
				products: null,
				total: 0
	        }
	      }
	   },
	   firestore(){
		const user = fb.auth().currentUser;
			return {
				profile: db.collection('users').doc(user.uid),
			}
		},
      // get discount value
	   mounted() {
         if(localStorage.discount) this.discount = localStorage.discount;
      },
	  
	  // save discount to local Storage
      watch: {
         discount(newDiscount) {
            localStorage.discount = newDiscount;
		 },
         code: 'potongan'
      },
      // final Cost (total price + shipping - discount)
	   computed: {
	      finalPrice() {
	         let cost = this.courier ? this.courier.cost:0
	         return (parseFloat(this.$store.getters.totalPrice) + parseFloat(cost)) - parseFloat(this.discount)
	      }
	   },
	   methods: {
         // discount value
         potongan() {
           if (this.code == '50K') {
               this.discount = 50000
            //    this.notif = 'your coupon code is correct'
           } else if (this.code == '100K') {
               this.discount = 100000
            //    this.notif = 'your coupon code is incorrect'
            } else if (this.code == '200K') {
               this.discount = 200000
            //    this.notif = 'your coupon code is incorrect'
            } else if (this.code == '500K') {
               this.discount = 500000
            //    this.notif = 'your coupon code is incorrect'
           } else if(this.code == null ) {
              this.discount = 0
           } else {
			   this.discount = 0
		   }
		 },

	    //   ongkir
	      getProvinces() {
				axios.get('https://ruangapi.com/api/v1/provinces', {
					headers: {
						Authorization: this.api_key
					}
				}).then((response) => {
					let provinces = response.data.data.results
					this.provinces = provinces
				})
			},
			getCities() {
				axios.get('https://ruangapi.com/api/v1/cities', {
					params: {
						province: this.province_id
					},
					headers: {
						Authorization: this.api_key
					}
				}).then((response) => {
					let cities = response.data.data.results
					this.cities = cities
				})
			},
			getDistricts() {
				axios.get('https://ruangapi.com/api/v1/districts', {
					params: {
						city: this.city_id
					},
					headers: {
						Authorization: this.api_key
					}
				}).then((response) => {
					let districts = response.data.data.results
					this.districts = districts
				})
			},
			getCouriers() {
				axios.post('https://ruangapi.com/api/v1/shipping', {
					origin: 419, //sleman
					destination: this.district_id,
					weight: this.$store.getters.totalWeight,
					courier: 'jne,jnt,tiki,sicepat',
				}, {
					headers: {
						Authorization: this.api_key
					}
				}).then((response) => {
					let couriers = response.data.data.results
					this.couriers = couriers
				})
			},
	      // ongkir end
	      checkout(user) {
			// this.info = {}
			this.ticket = {
				user_id: user['.key'],
				invoice_id: this.invoice_id,
				name: this.profile.firstname + " " + this.profile.lastname,
				phone_number: this.profile.phone_number,
				email: this.profile.email,
				street: this.profile.street,
				postcode: this.profile.postcode,
				address: this.profile.addr_details + ', ' + this.profile.country,
				products: this.$store.state.cart,
				totalWeight: this.$store.getters.totalWeight,
				discount: this.discount,
				totalItem: this.$store.getters.totalQuantity,
				total: this.finalPrice,
				order_status: 'waiting for payment',
				time: new Date().toLocaleString('in-ID', { timeZone: 'UTC' }),
				payment: 'bank transfer',
				shipping: this.courier,
			}
			// db.collection('orders').doc(this.invoice_id).set(this.ticket);
			db.collection('users').doc(user['.key']).collection("orders").doc(this.invoice_id).set(this.ticket);

			// db.collection("profiles").doc(user['.key']).collection("details").add(this.ticket);
			// db.collection('orders').doc(user['.key']).collection("details").add(this.ticket);
			this.$store.commit('destroy', this.item);
			this.$router.replace('/orders')
			swal({
				title: "Good job!",
				text: "Your order was successfully added!",
				icon: "success",
			})
			
			.then(() => {
				
			})
			.then(() => {
				window.location.reload();
			})
			
	       }
	   }
	}
</script>