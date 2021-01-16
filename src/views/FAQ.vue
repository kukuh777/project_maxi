<template>
	<div class="faq">
		<navbar></navbar>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
						<div class="uk-text-center">
							<ul class="uk-breadcrumb uk-flex-center uk-margin-remove">
								<li> <a href="/">Home</a>
								</li>
								<li> <span>FAQ</span>
								</li>
							</ul>
							<h1 class="uk-margin-small-top uk-margin-remove-bottom">FAQ</h1>
						</div>
						<div>
							<div class="uk-grid-medium" uk-grid>
								<section class="uk-width-1-1 uk-width-expand@m">
									<article class="uk-card uk-card-default uk-card-small uk-card-body uk-article tm-ignore-container">
										<ul class="uk-list-divider uk-list-large" uk-accordion="multiple: true">
											<!-- start ng-repeat FAQ -->
											<li v-for="faq in maxi.faqs" :key="faq.id"> 
                                    			<span class="uk-accordion-title">{{faq.question}}</span>
												<div class="uk-accordion-content">
													<p>{{faq.detail}}</p>
												</div>
											</li>
											<!-- end ng-repeat FAQ -->
										</ul>
									</article>
								</section>
								<aside class="uk-width-1-4 uk-visible@m tm-aside-column">
									<section class="uk-card uk-card-default uk-card-small" uk-sticky="offset: 90; bottom: true;">
										<nav>
											<ul class="uk-nav uk-nav-default tm-nav">
												<li> <a href="/about">About</a>
												</li>
												<li> <a href="/contacts">Contacts</a>
												</li>
												<li> <a href="/blog">Blog</a>
												</li>
												<li class="uk-active"> <a>FAQ</a>
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
			<!-- Marketplace -->
			<marketplace></marketplace>
		</main>
		<footernav></footernav>
	</div>
</template>
<script>
   import { mapGetters, mapActions } from 'vuex';
	export default {
	   name: "FAQ",
	   props: {
	      msg: String,
	   },
	   data() {
	      return {
	
	      }
      },
      computed: {
         ...mapGetters(["maxi"])
      },
      methods: {
         ...mapActions(["getMaxi"])
      },
      mounted() {
         this.getMaxi();
      },
      
	}
</script>