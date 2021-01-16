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
									<h1 class="uk-h2">Proof of Payment</h1>
								</header>
                        <form @submit="onSubmit">
                           <section class="uk-card-body">
                              <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-4@s" uk-grid>
                                 <div>
                                    <div>
                                       <div class="uk-form-label">Account Number</div>
                                       <input class="uk-input" type="text" v-model="order.acc_number">
                                    </div>
                                 </div>
                                 <div>
                                    <div>
                                       <div class="uk-form-label">Account Name</div>
                                       <input class="uk-input" type="text" v-model="order.acc_name">
                                    </div>
                                 </div>
                                 <div>
                                    <div>
                                       <div class="uk-form-label">Bank Name</div>
                                       <input class="uk-input" type="text" v-model="order.acc_bank_name">
                                    </div>
                                 </div>
                                 <div class="js-upload" uk-form-custom>
                                    <div class="uk-form-label">Upload in here</div>
                                    <input class="uk-form-label" type="file" @change="uploadImage">
                                    <button class="uk-input" type="button" tabindex="-1">Select</button>
                                 </div>
                                 <div>
                                    <div class="uk-form-label">Your Proof</div>
                                    <img width="120px" class="" :src="order.acc_image">
                                 </div>
                              </div>
                              <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-1@s" uk-grid>
                                    <div>
                                       <button class="uk-input uk-button-primary">SAVE</button>
                                    </div>
                              </div>
                           </section>
                        </form>
								
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
   name: "Account",
   props: {
         msg: String
   },
   data() {
      return {
		   key: this.$route.params.id,
         users: this.$route.params.users,
         order: {},
		//  profile: {},
		
      }
   },
   created () {
      const ref = fb.firestore().collection('users').doc(this.$route.params.id).collection('orders').doc(this.$route.params.users);
      ref.get().then((doc) => {
         if (doc.exists) {
         this.order = doc.data();
         } else {
         alert("No such document!");
         }
      });
   },
   methods: {
	onSubmit (evt) {
      evt.preventDefault()
      const updateRef = fb.firestore().collection('users').doc(this.$route.params.id).collection('orders').doc(this.$route.params.users);
      updateRef.set(this.order).then((docRef) => {
         this.key = ''
         this.order.acc_number = ''
         this.order.acc_name = ''
         this.order.acc_bank_name = ''
         this.order.acc_image = ''
         
         router.push({ name: 'Orders', params: { users: this.$route.params.users }})
         // success update pop up
         swal({
            title: "Good job!",
            text: "Your proof has been updated!",
            icon: "success",
         })
      })
      .catch((error) => {
      alert("Error adding document: ", error);
      });
   },
	uploadImage(e) {
		let file = e.target.files[0];
		
		var storageRef = fb.storage().ref("images/transfer/" + file.name);
		let uploadTask = storageRef.put(file);

		console.log(e.target.files[0]);
		uploadTask.on('state_changed', (snapshot) => {
			
		}, (error) => {
			
		}, () => {
			uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
			this.order.acc_image = downloadURL;

			console.log('File available at', downloadURL);
			});
		});
	},
},

};
</script>
<style>
</style>