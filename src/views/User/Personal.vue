<template>
	<div class="uk-offcanvas-content">
		<navbar></navbar>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium" uk-grid @submit.prevent="updateProfile(profile)">
						<div class="uk-width-1-1 uk-width-1-4@m tm-aside-column">
							<div class="uk-card uk-card-default uk-card-small tm-ignore-container" uk-sticky="offset: 90; bottom: true; media: @m;">
								<div class="uk-card-header">
									<div class="uk-grid-small uk-child-width-1-1" uk-grid>
										<section>
										<div class="uk-width-1-3 uk-width-1-4@s uk-width-1-2@m uk-margin-auto uk-visible-toggle uk-position-relative uk-border-circle uk-overflow-hidden uk-light">
											<img class="uk-width-1-1" :src="profile.image">
										</div>
										<div class="uk-margin uk-text-center">
											<div uk-form-custom>
												<input type="file" @change="uploadImage">
												<span class="uk-link" uk-icon="icon: camera;"></span>
											</div>
										</div>
										</section>
										<div class="uk-text-center">
											<div class="uk-h4 uk-margin-remove">{{profile.firstname}} {{profile.lastname}}</div>
											<div class="uk-text-meta">Joined {{profile.time}}</div>
										</div>
										<div>
											<div class="uk-grid-small uk-flex-center" uk-grid>
												<div>
													<a class="uk-button uk-button-default uk-button-small" href="/personal"><span class="uk-margin-xsmall-right" uk-icon="icon: settings; ratio: .75;"></span><span>Personal</span></a>
												</div>
												<div>
													<button @click="logout" class="uk-button uk-button-default uk-button-small" href="#" title="Log out"><span uk-icon="icon: sign-out; ratio: .75;"></span>
													</button>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div>
									<nav>
										<ul class="uk-nav uk-nav-default tm-nav">
										<li> <a href="/account">Orders<span>(2)</span></a>
										</li>
										<li> <a href="/favorites">Favorites<span>(3)</span></a>
										</li>
										<li> <a href="/settings">Settings</a>
										</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
						<div class="uk-width-1-1 uk-width-expand@m">
							<div class="uk-card uk-card-default uk-card-small tm-ignore-container">
								<header class="uk-card-header">
									<h1 class="uk-h2">Personal Info</h1>
								</header>
								<div class="uk-card-body">
									<!-- Edit Form -->
									<form class="uk-form-stacked">
										<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
											<fieldset class="uk-fieldset">
												<legend class="uk-h4">Contact</legend>
												<div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
													<div>
														<div>
															<div class="uk-form-label">First Name</div>
															<input class="uk-input" type="text" v-model="profile.firstname">
														</div>
													</div>
													<div>
														<div>
															<div class="uk-form-label">Last Name</div>
															<input class="uk-input" type="text" v-model="profile.lastname">
														</div>
													</div>
													<div>
														<div>
															<div class="uk-form-label">Phone Number</div>
															<input class="uk-input" type="text" v-model="profile.phone_number">
														</div>
													</div>
													<div>
														<div>
															<div class="uk-form-label">Date of Birth</div>
															<input class="uk-input" type="date" v-model="profile.date">
														</div>
													</div>
												</div>
											</fieldset>
											<fieldset class="uk-fieldset">
												<legend class="uk-h4">Address</legend>
												<div class="uk-grid-small" uk-grid>
													<div class="uk-width-1-1">
														<div class="uk-form-label">Country</div>
														<select class="uk-select" v-model="profile.country">
															<option>Choose the country</option>
															<option value="Indonesia">Indonesia</option>
														</select>
													</div>
												</div>
												<div class="uk-grid-small" uk-grid>
													<div class="uk-width-expand">
														<div class="uk-form-label">Street</div>
														<input class="uk-input" type="text" v-model="profile.street">
													</div>
													<div class="uk-width-1-6@s">
														<div class="uk-form-label">Post Code</div>
														<input class="uk-input" type="text" v-model="profile.postcode">
													</div>
												</div>
												<div class="uk-grid-small uk-child-width-1-3 uk-child-width-1-4@s" uk-grid>
													<div class="uk-width-1-1">
														<div class="uk-form-label">Details</div>
														<textarea class="uk-textarea" rows="5" v-model="profile.addr_details"></textarea>
													</div>
												</div>
											</fieldset>
										</div>
										<div class="uk-card-footer uk-text-center">
											<button class="uk-button uk-button-primary">save</button>
										</div>
									</form>
								</div>
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
import axios from 'axios';
import "../../assets/scss/style.scss";
import {fb, db} from "../../firebase";
	// @ is an alias to /src
	
	export default {
		name: "Personal",
		props: {
			msg: String
      },

		firestore(){
			const user = fb.auth().currentUser;
			return {
			profile: db.collection('users').doc(user.uid),
			}
		},
		methods: {
			//logout methods
			logout() {
				swal({
					title: "Are you sure to logout?",
					text: "If you press OK, you will exit from your account!",
					icon: "warning",
					buttons: true,
					dangerMode: true,
				})
				//2 condition before log out
				.then((willDelete) => {
					if (willDelete) {
					fb.auth().signOut()
					.then(() => {
						this.$router.replace('/signin')
					})
					.catch((err) => {
						console.log(err);
					});
					swal("Your account has been successfully logged out!", {
					icon: "success",
					
					});
					} else {
					//not showing anything
					}
				});
			},
			updateProfile(user) {
				//update data with user uid
				db.collection("users").doc(user['.key']).update({
					firstname: this.profile.firstname,
					lastname: this.profile.lastname,
					name: this.profile.firstname + " " + this.profile.lastname,
					phone_number: this.profile.phone_number,
					date: this.profile.date,
					country: this.profile.country,
					postcode: this.profile.postcode,
					street: this.profile.street,
					addr_details: this.profile.addr_details,
					image: this.profile.image,
					status: 'user',
				});
				console.log("sucess")
				swal("Good job!", "Your data has been saved!", "success");
			},
			reset() {
			//   Object.assign(this.$data, this.$options.data.apply(this));
			},
			uploadImage(e) {
				// console.log(e[0]);
				let file = e.target.files[0];
				
				var storageRef = fb.storage().ref("images/users/" + file.name);
				let uploadTask = storageRef.put(file);
	
				console.log(e.target.files[0]);
				uploadTask.on('state_changed', (snapshot) => {
					
				}, (error) => {
					// Handle unsuccessful uploads
				}, () => {
					// Handle successful uploads on complete
					// For instance, get the download URL: https://firebasestorage.googleapis.com/...
					uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
					this.profile.image = downloadURL;
	
					console.log('File available at', downloadURL);
					});
				});
			},
		},
	};
</script>