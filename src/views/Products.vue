<template>
	<div class="products">
		<navbar></navbar>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
						<div class="uk-text-center">
							<ul class="uk-breadcrumb uk-flex-center uk-margin-remove">
								<li> <router-link to="/">Home</router-link>
								</li>
								<li> <router-link to="/catalog">Catalog</router-link>
								</li>
								<li> <a href="subcategory.html">{{ product.category }}</a>
								</li>
								<li> <span>{{ product.title }}</span>
								</li>
							</ul>
							<h1 class="uk-margin-small-top uk-margin-remove-bottom">{{ product.title }}</h1>
						</div>
						<div>
							<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
								<div>
									<div class="uk-card uk-card-default uk-card-small tm-ignore-container">
										<div class="uk-grid-small uk-grid-collapse uk-grid-match" uk-grid>
											<div class="uk-width-1-1 uk-width-expand@m">
												<div class="uk-grid-collapse uk-child-width-1-1" uk-slideshow="finite: true; ratio: 4:3;" uk-grid>
													<div>
														<ul class="uk-slideshow-items" uk-lightbox>
															<!-- Start Images -->
                                             <li v-for="image in product.images" :key="image">
																<a class="uk-card-body tm-media-box tm-media-box-zoom" :href="image">
																	<figure class="tm-media-box-wrap">
																		<img :src="image" :alt="product.title">
																	</figure>
																</a>
															</li>
                                             <!-- End Images -->
														</ul>
													</div>
													<div>
														<div class="uk-card-body uk-flex uk-flex-center">
															<div class="uk-width-1-2 uk-visible@s">
																<div uk-slider="finite: true">
																	<div class="uk-position-relative">
																		<div class="uk-slider-container">
																			<ul class="tm-slider-items uk-slider-items uk-child-width-1-4 uk-grid uk-grid-small">
																				<!-- Start Images -->
                                                            <li v-for="(image,index) in product.images" :key="index" :uk-slideshow-item="index">
																					<div class="tm-ratio tm-ratio-1-1">
																						<a class="tm-media-box tm-media-box-frame">
																							<figure class="tm-media-box-wrap">
																								<img :src="image" :alt="product.title">
																							</figure>
																						</a>
																					</div>
																				</li>
																				<!-- End Images -->
																			</ul>
																			<div>
																				<a class="uk-position-center-left-out uk-position-small" href="#" uk-slider-item="previous" uk-slidenav-previous></a>
																				<a class="uk-position-center-right-out uk-position-small" href="#" uk-slider-item="next" uk-slidenav-next></a>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
															<ul class="uk-slideshow-nav uk-dotnav uk-hidden@s"></ul>
														</div>
													</div>
												</div>
											</div>
											<div class="uk-width-1-1 uk-width-1-3@m tm-product-info">
												<div class="uk-card-body">
													<div class="uk-margin">
														<div class="uk-grid-small" uk-grid>
															<div>
																<span class="uk-label uk-label-warning uk-margin-xsmall-right">{{ product.top_selling }}</span>
																<span v-if="product.condition==label" class="uk-label uk-label-success uk-margin-xsmall-right">{{ product.condition }}</span>
																<span v-else class="uk-label uk-label-danger uk-margin-xsmall-right">{{ product.condition }}</span>
															</div>
														</div>
													</div>

													<div class="uk-margin">
														<div class="uk-padding-small uk-background-primary-lighten uk-border-rounded">
															<div class="uk-grid-small uk-child-width-1-1" uk-grid>
																<div> <del class="uk-text-meta">{{ product.price1 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</del>
																	<div class="tm-product-price">{{ product.price2 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
																</div>
																<div>
																	<div class="uk-grid-small" uk-grid>
																		
																		<!-- <add-to-cart
																		:pId="product.key"
																		:title="product.title"
																		:image="getImage(product.images)"
																		:price="product.price2"
																		:weight="product.weight"
																		:category="product.category"
																		:order="product.order"
																		> -->
																		<!-- </add-to-cart> -->
																		<!-- <add-to-favorites-from-products
                                                      :pId="product.id"
                                                      :title="product.title"
                                                       /> -->
																	</div>
																</div>
															</div>
														</div>
													</div>
													<div class="uk-margin">
														<div class="uk-padding-small uk-background-muted uk-border-rounded">
															<div class="uk-grid-small uk-child-width-1-1 uk-text-small" uk-grid>
																<div>
																	<div class="uk-grid-collapse" uk-grid> <span class="uk-margin-xsmall-right" uk-icon="cart"></span>
																		<div>
																			<div class="uk-text-bolder">Delivery</div>
																			<div class="uk-text-xsmall uk-text-muted">In stock, free, tomorrow</div>
																		</div>
																	</div>
																</div>
																<div>
																	<div class="uk-grid-collapse" uk-grid> <span class="uk-margin-xsmall-right" uk-icon="location"></span>
																		<div>
																			<div class="uk-text-bolder">Pick up from store</div>
																			<div class="uk-text-xsmall uk-text-muted">In stock, free, tomorrow</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>
													</div>
												</div>
											</div>
											<div class="uk-width-1-1 tm-product-description" id="description">
												<header>
													<nav class="tm-product-nav" uk-sticky="offset: 60; bottom: #description; cls-active: tm-product-nav-fixed;">
														<ul class="uk-subnav uk-subnav-pill js-product-switcher" uk-switcher="connect: .js-tabs">
															<li>
																<a class="js-scroll-to-description" href="#description">Decsriptions</a>
															</li>
															<li>
																<a class="js-scroll-to-description" href="#description">Reviews
                                                    <!-- <span>(2)</span> -->
                                                    </a>
															</li>
														</ul>
													</nav>
												</header>
												<div class="uk-card-body">
													<div class="uk-switcher js-product-switcher js-tabs">
														<section>
															<article class="uk-article">
																<div class="uk-article-body">
																	<div v-html="product.description"></div>
																</div>
															</article>
														</section>
														<section>
															<div class="uk-grid-small uk-grid-divider" uk-grid>
																<!-- <div class="uk-width-1-1 uk-width-1-5@s uk-text-center tm-reviews-column"> -->
																	<!-- <div class="uk-text-meta uk-text-uppercase">average rating</div>
																	<div class="uk-heading-primary">5.0</div>
																	<div class="uk-flex uk-flex-center">
																		<ul class="uk-iconnav tm-rating">
																			<li> <span class="uk-text-warning" uk-icon="star"></span>
																			</li>
																			<li> <span class="uk-text-warning" uk-icon="star"></span>
																			</li>
																			<li> <span class="uk-text-warning" uk-icon="star"></span>
																			</li>
																			<li> <span class="uk-text-warning" uk-icon="star"></span>
																			</li>
																			<li> <span class="uk-text-warning" uk-icon="star"></span>
																			</li>
																		</ul>
																	</div>
																	<div class="uk-margin-small-top uk-text-meta">based on 2 reviews</div> -->
																	<!-- <button class="uk-button uk-button-primary uk-margin-top uk-width-1-1" uk-toggle="target: #review">write a review</button> -->
																<!-- </div> -->
																<div class="uk-width-1-1 uk-width-expand@s">
																	<div class="uk-grid-small uk-grid-divider uk-child-width-1-1" uk-grid>
																		<article v-for="review in reviews" :key="review.id" >
																			<section class="uk-grid-small uk-child-width-1-1" uk-grid>
																				<header>
																					<div class="uk-h4 uk-margin-remove">{{ review.reviewName }}</div>
																					<time class="uk-text-meta">{{ review.time }}</time>
																				</header>
																				<div>
																					<ul class="uk-iconnav uk-margin-bottom tm-rating">
																						<li v-html="review.reviewScore"></li>
                                                               </ul>
                                                            <div>
                                                               <p>{{ review.reviewDescription }}</p>
                                                            </div>
																				</div>
																			</section>
																		</article>
																	</div>
																</div>
															</div>
														</section>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<!-- Related items-->
								<related-products></related-products>
                        <!-- Related items -->
							</div>
							<!-- <div id="review" uk-modal>
								<div class="uk-modal-dialog uk-modal-body">
									<button class="uk-modal-close-outside" type="button" uk-close></button>
									<h2 class="uk-modal-title uk-text-center">Review</h2>
									<form class="uk-form-stacked">
										<div class="uk-grid-small uk-child-width-1-1" uk-grid>
											<div>
												<label>
													<div class="uk-form-label uk-form-label-required">Name</div>
													<input class="uk-input" type="text" required>
												</label>
											</div>
											<div>
												<label>
													<div class="uk-form-label uk-form-label-required">Email</div>
													<input class="uk-input" type="email" required>
												</label>
											</div>
											<div>
												<div class="uk-form-label">Rating</div>
												<ul class="uk-iconnav tm-rating">
													<li>
														<a uk-icon="star"></a>
													</li>
													<li>
														<a uk-icon="star"></a>
													</li>
													<li>
														<a uk-icon="star"></a>
													</li>
													<li>
														<a uk-icon="star"></a>
													</li>
													<li>
														<a uk-icon="star"></a>
													</li>
												</ul>
											</div>
											<div>
												<label>
													<div class="uk-form-label uk-form-label-required">Review</div>
													<textarea class="uk-textarea" rows="5" required></textarea>
												</label>
											</div>
											<div class="uk-text-center">
												<button class="uk-button uk-button-primary">Send</button>
											</div>
										</div>
									</form>
								</div>
							</div> -->
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
	import {fb,db} from '../firebase'
	import router from '../router'
	export default {
	   name: 'Products',
	   props: {
	      msg: String
	   },
	   data() {
	      return {
            key: this.$route.params.id,
            product: {},
            label: 'new',
            review: {},
		      reviews: [],
            ref: fb.firestore().collection('products'),
	      }
      },
      created() {
         var Ref = db.collection("products").doc(this.$route.params.id);
         Ref.get().then((doc) => {
            if (doc.exists) {
               console.log("Document data:", doc.data());
               this.product = doc.data();
            } else {
               // doc.data() will be undefined in this case
               console.log("No such document!");
            }
         }).catch((error) => {
            console.log("Error getting document:", error);
         });
         // ----------------------
         this.ref.doc(this.$route.params.id).collection('reviews').onSnapshot((querySnapshot) => {
            this.reviews = []
            this.busy = true
            querySnapshot.forEach((doc) => {
               const doc2 = doc.data();
               doc2.id = doc.id
               this.reviews.push({
                  // key: doc.id,
                  review_id: doc.data().review_id,
                  user_id: doc.data().user_id,
                  reviewName: doc.data().reviewName,
                  reviewScore: doc.data().reviewScore,
                  reviewDescription: doc.data().reviewDescription,
                  time: doc.data().time,
               });
            }) 
            if (this.reviews.length) {
            this.busy = false
            } else {
            this.busy = false
            }
         })
      },
	   // created () {
		// 	const ref = fb.firestore().collection('products').doc(this.$route.params.id);
		// 	ref.get().then((doc) => {
		// 		if (doc.exists) {
		// 			this.product = doc.data();
		// 		} else {
		// 			alert("No such document!");
		// 		}
		// 	});
      // },
      methods: {
         getImage(images) {
            return(images[0])
         },
      }
	}
</script>
<style>
</style>