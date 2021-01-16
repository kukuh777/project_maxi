<template>
	<div class="favorites">
		<navbar></navbar>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium" uk-grid>
						<div class="uk-width-1-1 uk-width-1-4@m tm-aside-column">
							<!-- user profile -->
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
										<li> <a href="/orders">Orders <span>({{ order }})</span></a>
										</li>
										<li class="uk-active"> <a>Favorites <span>({{ this.$store.getters.totalFavorite }})</span></a>
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
									<h1 class="uk-h2">Favorites</h1>
								</header>
								<div class="uk-grid-collapse tm-products-list" uk-grid>
									<article class="tm-product-card" v-for="item in this.$store.state.favorite" :key="item.id">
										<div class="tm-product-card-media">
											<div class="tm-ratio tm-ratio-4-3">
												<a class="tm-media-box" @click.stop="productDetail(item)">
													<div class="tm-product-card-labels">
                                          <span class="uk-label uk-label-warning">{{ item.favoriteTopSelling }}</span>
                                          <span v-if="item.favoriteCondition==label" class="uk-label uk-label-success">{{ item.favoriteCondition }}</span>
                                          <span v-else class="uk-label uk-label-danger">{{ item.favoriteCondition }}</span>
													</div>
													<figure class="tm-media-box-wrap">
														<img :src="item.favoriteImage" :alt="item.favoriteTitle" />
													</figure>
												</a>
											</div>
										</div>
										<div class="tm-product-card-body">
											<div class="tm-product-card-info">
												<div class="uk-text-meta uk-margin-xsmall-bottom">{{ item.favoriteCategory }}</div>
												<h3 class="tm-product-card-title">
                                       <a class="uk-link-heading" @click.stop="productDetail(item)">{{ item.favoriteTitle }}</a>
                                    </h3>
                                    <span class="uk-margin-auto uk-list uk-text-small tm-product-card-properties">
                                       <li>
                                          <span class="uk-text-muted">Brand: </span>
                                          <span> {{ item.favoriteBrand }}</span>
                                       </li>
                                       <li>
                                          <span class="uk-text-muted">Stock: </span>
                                          <span>{{ item.favoriteStock }}</span>
                                       </li>
                                       <li>
                                          <span class="uk-text-muted">Minimal Order: </span>
                                          <span>{{ item.favoriteQuantity }}</span>
                                       </li>
                                       <li>
                                          <span class="uk-text-muted">Weight: </span>
                                          <span>{{ item.favoriteWeight }}</span>
                                       </li>
                                    </span>
											</div>
											<div class="tm-product-card-shop">
												<div class="tm-product-card-prices">
                                       <del class="uk-text-meta">{{ item.favoritePrice1 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</del>
													<div class="tm-product-card-price">{{ item.favoritePrice2 | currency('Rp ', 0, { thousandsSeparator: '.' }) }}</div>
												</div>
												<div class="tm-product-card-add">
													<div class="uk-text-meta tm-product-card-actions">
                                          <a class="tm-product-card-action js-add-to js-add-to-favorites tm-action-button-active js-added-to" title="Add to favorites">
                                             <span @click="$store.commit('removeFromFavorite',item)" uk-icon="icon: trash; ratio: .75;"></span>
                                             <span @click="$store.commit('removeFromFavorite',item)" class="tm-product-card-action-text">Delete from favorite</span>
                                          </a>
													</div>
													<add-to-cart-from-favorite
													:pId="item.favoriteId"
													:title="item.favoriteTitle"
													:image="item.favoriteImage"
													:price="item.favoritePrice2"
													:weight="item.favoriteWeight"
													:category="item.favoriteCategory"
													:order="item.favoriteQuantity"
													/>
													
												</div>
											</div>
										</div>
									</article>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>
			<!-- marketplace -->
			<marketplace></marketplace>
		</main>
		<footernav></footernav>
	</div>
</template>
<script>
	import {fb,db} from "../../firebase";
   import router from '../../router'
	export default {
      name: "Favorites",
      props: {
         msg: String
      },
      data() {
         return {
            label: 'new',
            favoriteId: '',
            order: '',
         	profile: {}
         }
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
      methods: {
         productDetail (item) {
            router.push({ name: 'Products', params: { id: item.favoriteId }})
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
      
	}
</script>
