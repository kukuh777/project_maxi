<template>
	<div class="about">
		<navbar></navbar>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
						<div class="uk-text-center">
							<ul class="uk-breadcrumb uk-flex-center uk-margin-remove">
								<li> <a href="/">Home</a>
								</li>
								<li> <span>Contacts</span>
								</li>
							</ul>
							<h1 class="uk-margin-small-top uk-margin-remove-bottom">Contacts</h1>
						</div>
						<div>
							<div class="uk-grid-medium" uk-grid>
								<section class="uk-width-1-1 uk-width-expand@m">
									<article class="uk-card uk-card-default uk-card-small uk-card-body uk-article tm-ignore-container">
										<div class="uk-child-width-1-1 uk-child-width-1-2@s uk-margin-top" uk-grid>
											<section>
												<h3>Store</h3>
												<ul class="uk-list">
													<li> <a class="uk-link-heading" href="#"><span class="uk-margin-small-right" uk-icon="receiver"></span><span class="tm-pseudo">{{ maxi.call }}</span></a>
													</li>
													<li> <a class="uk-link-heading" href="#"><span class="uk-margin-small-right" uk-icon="mail"></span><span class="tm-pseudo">{{ maxi.email }}</span></a>
													</li>
													<li>
														<div> <span class="uk-margin-small-right" uk-icon="location"></span><span>{{ maxi.address2 }}</span>
														</div>
													</li>
													<li>
														<div> <span class="uk-margin-small-right" uk-icon="clock"></span><span>{{ maxi.time }}</span>
														</div>
													</li>
												</ul>
											</section>
											<section>
												<h3>Feedback</h3>
												<dl class="uk-description-list"> <dt>Cooperation</dt>
													<dd>
                                          <span class="uk-link-muted">{{ maxi.email }}</span>
													</dd> 
                                       <dt>Owner</dt>
													<dd>
                                          <span class="uk-link-muted">{{ maxi.email2 }}</span>
													</dd>
												</dl>
											</section>
											<section class="uk-width-1-1">
												<h2 class="uk-text-center">Contact Us</h2>
												<form @submit.prevent="AddNewMessage">
													<div class="uk-grid-small uk-child-width-1-1" uk-grid>
														<div>
															<label>
																<div class="uk-form-label uk-form-label-required">Name</div>
																<input class="uk-input" type="text" v-model="feedback.name" required>
															</label>
														</div>
														<div>
															<label>
																<div class="uk-form-label uk-form-label-required">Email</div>
																<input class="uk-input" type="email" v-model="feedback.email" required>
															</label>
														</div>
														<div>
															<label>
																<div class="uk-form-label">Topic</div>
																<select class="uk-select" v-model="feedback.topic">
																	<option>Customer service</option>
																	<option>Tech support</option>
                                                   <option>Website</option>
																	<option>Other</option>
																</select>
															</label>
														</div>
														<div>
															<label>
																<div class="uk-form-label">Message</div>
																<textarea class="uk-textarea" rows="5" v-model="feedback.message"></textarea>
															</label>
														</div>
														<div class="uk-text-center">
															<button type="submit" class="uk-button uk-button-primary">Send</button>
														</div>
													</div>
												</form>
											</section>
										</div>
									</article>
								</section>
								<aside class="uk-width-1-4 uk-visible@m tm-aside-column">
									<section class="uk-card uk-card-default uk-card-small" uk-sticky="offset: 90; bottom: true;">
										<nav>
											<ul class="uk-nav uk-nav-default tm-nav">
												<li> <a href="/about">About</a>
												</li>
												<li class="uk-active"> <a>Contacts</a>
												</li>
												<li> <a href="/blog">Blog</a>
												</li>
												<li> <a href="/faq">FAQ</a>
												</li>
												<li> <a href="/delivery">Delivery</a>
												</li>
											</ul>
										</nav>
									</section>
								</aside>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!---->
			<marketplace></marketplace>
		</main>
		<footernav></footernav>
	</div>
</template>
<script>
import {db} from "../firebase";
import { mapGetters, mapActions } from 'vuex';
export default {
name: "Contacts",
   props: {
      msg: String
   },
   data() {
      return {
         feedback: {
            name: '',
            email: '',
            topic: null,
            message: '',
            status: 'have not answered'

         }
      }
   },
   computed: {
      ...mapGetters(["maxi"])
   },
   methods: {
      ...mapActions(["getMaxi"]),
      AddNewMessage() {
      db.collection("feedback").add(this.feedback)
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
        this.reset();
        swal({
          title: "Message added successfully!",
          icon: "success",
          button: "OK",
        });
      })
      .catch(function(error) {
        console.error("Error adding feedback: ", error);
      }); 
    },
    reset() {
      Object.assign(this.$data, this.$options.data.apply(this));
    },
   },
   mounted() {
      this.getMaxi();
  },
}
</script>
<style>
</style>