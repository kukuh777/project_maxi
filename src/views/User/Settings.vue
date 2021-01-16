<template>
	<div>
		<!-- menu navigasi -->
		<navbar></navbar>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium" uk-grid>
						<div class="uk-width-1-1 uk-width-1-4@m tm-aside-column">
							<div class="uk-card uk-card-default uk-card-small tm-ignore-container" uk-sticky="offset: 90; bottom: true; media: @m;">
								<div class="uk-card-header">
									<div class="uk-grid-small uk-child-width-1-1" uk-grid>
										<section>
										<div class="uk-width-1-3 uk-width-1-4@s uk-width-1-2@m uk-margin-auto uk-visible-toggle uk-position-relative uk-border-circle uk-overflow-hidden uk-light">
											<img class="uk-width-1-1" :src="profile.image">
										</div>
										</section>
										<div class="uk-text-center">
										<div class="uk-h4 uk-margin-remove">{{profile.firstname}} {{profile.lastname}}</div>
										<div class="uk-text-meta">Joined {{profile.time}}</div>
										</div>
										<div>
										<div class="uk-grid-small uk-flex-center" uk-grid>
											<div> <a class="uk-button uk-button-default uk-button-small" href="/personal"><span class="uk-margin-xsmall-right" uk-icon="icon: settings; ratio: .75;"></span><span>Personal</span></a>
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
										<li> <a href="/order">Orders <span>({{ order }})</span></a>
										</li>
										<li> <a href="/favorites">Favorites <span>({{ this.$store.getters.totalFavorite }})</span></a>
										</li>
										<li class="uk-active"> <a>Settings</a>
										</li>
										</ul>
									</nav>
								</div>
							</div>
						</div>
						<div class="uk-width-1-1 uk-width-expand@m">
							<div class="uk-card uk-card-default uk-card-small tm-ignore-container">
								<header class="uk-card-header">
									<h1 class="uk-h2">Settings</h1>
								</header>
								<div class="uk-card-body">
									<form class="uk-form-stacked">
										<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
											<fieldset class="uk-fieldset">
												<legend class="uk-h4">Email</legend>
												<div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
													<div>
														<div>
															<div class="uk-form-label">Current Email</div> <span class="uk-input uk-disable">{{email}}</span>
														</div>
													</div>
												</div>
												<!-- <div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
													<div>
														<div>
															<div class="uk-form-label">New Email</div>
															<input class="uk-input" type="email">
														</div>
													</div>
												</div>
												<div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
													<div>
														<div>
															<button class="uk-button uk-input uk-button-primary uk-margin-right">update email</button>
														</div>
													</div>
												</div> -->
												<div class="uk-grid-small uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
													<div>
														<div>
															<button class="uk-button uk-input uk-button-primary" @click="resetPassword">reset password</button>
														</div>
													</div>
												</div>
											</fieldset>
											
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- Marketplace -->
			<!-- <marketplace></marketplace> -->
		</main>
		<footernav></footernav>
	</div>
</template>
<script>
	import {fb,db} from "../../firebase";
	
	export default {
	  name: "Settings",
	  props: {
	      msg: String
	  },
	  data() {
	      return {
	          email: null,
	          password: null,
	          retype: null,
	          info: null,
			  show: true,
			  order: '',
			  profile: {}
	      }
	  },
	  created () { 
	    var user = fb.auth().currentUser;
	    this.email = user.email;
	    this.password = user.password;
	//   this.user = fb.auth().currentUser || false;
	  },
	  firestore(){
		const user = fb.auth().currentUser;
			return {
				profile: db.collection('users').doc(user.uid),
			}
		},
		mounted() {
			if(localStorage.order) this.order = localStorage.order;
		},
	  watch: {
	    retype: "insert"
	  },
	  methods: {
	    //check retype password
	    insert() {
	      if (this.retype == this.password) {
	        this.info = "";
	        this.show = false;
	      } else {
	        this.info = "Password doesn't match";
	        this.show = true;
	      }
	    },
	    resetPassword() {
	      swal("Good job!", "Password reset email sent, check your inbox!", "success");
	      const auth = fb.auth();
	
	      auth.sendPasswordResetEmail(auth.currentUser.email).then(() => {
	         console.log('Email sent');
	      }).catch((error) => {
	         console.log(error);
	      });
		},
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
	  },
	  
	};
</script>