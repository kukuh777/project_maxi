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
							<h1 class="uk-margin-small-top uk-margin-remove-bottom">About</h1>
						</div>
						<div>
							<div class="uk-grid-medium" uk-grid>
								<section>
                           <div>
                              <article class="uk-card uk-card-default uk-card-body uk-article tm-ignore-container">
                                 <div class="uk-article-body">
                                    <p class="uk-text-lead uk-text-center">Maxi Komputer adalah salah satu toko komputer di kota Yogyakarta yang menyediakan kebutuhan komputer untuk anda.</p>
                                    <p class="uk-text-justify"><span class="uk-text-bold">MaxiKomputer.com</span> pun dibentuk sebagai upaya untuk memberikan pelayanan yang lebih baik dengan membuat toko online atau webstore yang bergerak dalam bidang perdagangan komputer dan jasa, dengan produk utama pheriperal komputer new dan second, komputer rakitan beserta jasa service serta networking dengan pangsa pasar seputar DIY dan Jateng.</p>
                                    <p class="uk-text-justify">Webstore online dimaksudkan sebagai upaya pengembangan usaha, keikutsertaan dalam dunia bisnis online dengan tujuan memperluas pangsa pasar serta memberi pelayanan yang memuaskan kepada customer berupa kemudahan untuk mendapatkan informasi pheriperal dengan harga yang terjangkau.</p>
                                    <h2 class="uk-text-center">Our team</h2>
                                    <div class="uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-3@m" uk-grid>
                                       <div>
                                          <div class="uk-grid-small uk-flex-middle" uk-grid>
                                             <div>
                                                <img src="images/about/george.svg" alt="George Clanton" width="80" height="80">
                                             </div>
                                             <div class="uk-width-expand">
                                                <div>Mr. Mukhlis</div>
                                                <div class="uk-text-meta">Founder & Owner</div>
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <div class="uk-grid-small uk-flex-middle" uk-grid>
                                             <div>
                                                <img src="images/about/martin.svg" alt="Martin Cade" width="80" height="80">
                                             </div>
                                             <div class="uk-width-expand">
                                                <div>Mr. Tyas Prasojo</div>
                                                <div class="uk-text-meta">Co-founder, CTO & Technician</div>
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <div class="uk-grid-small uk-flex-middle" uk-grid>
                                             <div>
                                                <img src="images/about/thomas.svg" alt="Thomas Bruns" width="80" height="80">
                                             </div>
                                             <div class="uk-width-expand">
                                                <div>Sir Agung Pambudi</div>
                                                <div class="uk-text-meta">Courier & Tecnician</div>
                                             </div>
                                          </div>
                                       </div>
 
                                       
                                       <div>
                                          <div class="uk-grid-small uk-flex-middle" uk-grid>
                                             <div>
                                                <img src="images/about/carol.svg" alt="Carol Issa" width="80" height="80">
                                             </div>
                                             <div class="uk-width-expand">
                                                <div>Miss Zulfa Annisa</div>
                                                <div class="uk-text-meta">Admin & Sales Marketing</div>
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <div class="uk-grid-small uk-flex-middle" uk-grid>
                                             <div>
                                                <img src="images/about/patricia.svg" alt="Patricia Kirk" width="80" height="80">
                                             </div>
                                             <div class="uk-width-expand">
                                                <div>Madam Fitri Anjani</div>
                                                <div class="uk-text-meta">Casir & Sales Marketing</div>
                                             </div>
                                          </div>
                                       </div>
                                       <div>
                                          <div class="uk-grid-small uk-flex-middle" uk-grid>
                                             <div>
                                                <img src="images/about/nicole.svg" alt="Nicole Yokoyama" width="80" height="80">
                                             </div>
                                             <div class="uk-width-expand">
                                                <div>Miss Laila Chodri</div>
                                                <div class="uk-text-meta">Manager & Casir</div>
                                             </div>
                                          </div>
                                       </div>
                                    </div>
                                    <h2 class="uk-text-center">Some stats</h2>
                                    <div class="uk-child-width-1-1 uk-child-width-1-3@s uk-text-center" uk-grid>
                                       <div>
                                          <div class="uk-heading-primary uk-text-warning">10+</div>
                                          <div class="uk-margin-small-top">years on the market</div>
                                       </div>
                                       <div>
                                          <div class="uk-heading-primary uk-text-warning">50+</div>
                                          <div class="uk-margin-small-top">orders per day</div>
                                       </div>
                                       <div>
                                          <div class="uk-heading-primary uk-text-warning">5000+</div>
                                          <div class="uk-margin-small-top">clients</div>
                                       </div>
                                    </div>
                                    <h2 class="uk-text-center">Store</h2>
                                    <p>{{ maxi.descriptions }}</p>
                                    <figure>
                                       <div class="uk-text-bolder">{{ maxi.name }}</div>
                                       <div>{{ maxi.address3 }}</div>
                                       <div>{{ maxi.time }}</div>
                                    </figure>
                                 </div>
                              </article>
                           </div>
                        </section>
								<aside class="uk-width-1-4 uk-visible@m tm-aside-column">
									<section class="uk-card uk-card-default uk-card-small" uk-sticky="offset: 90; bottom: true;">
										<nav>
											<ul class="uk-nav uk-nav-default tm-nav">
												<li class="uk-active"> <a>About</a>
												</li>
												<li> <a href="/contacts">Contacts</a>
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
import { mapGetters, mapActions } from 'vuex';
export default {
name: "about",
   props: {
      msg: String
   },
   data() {
      return {
         message: {
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
      db.collection("messages").add(this.message)
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
        console.error("Error adding messages: ", error);
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