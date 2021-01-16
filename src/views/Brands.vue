<template>
	<div class="brands">
		<navbar/>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
						<div class="uk-text-center">
							<ul class="uk-breadcrumb uk-flex-center uk-margin-remove">
								<li>
                           <router-link to="/">Home</router-link>
								</li>
								<li> <span>Brands</span>
								</li>
							</ul>
							<h1 class="uk-margin-small-top uk-margin-remove-bottom">Brands</h1>
						</div>
						<div>
							<div class="uk-card uk-card-default tm-ignore-container">
								<!-- <header class="uk-card-header uk-background-default">
									<nav>
										<ul class="uk-subnav uk-flex-center uk-margin-remove">
											<li> <a href="#number">#</a>
											</li>
											<li> <a href="#A">A</a>
											</li>
											<li> <a href="#B">B</a>
											</li>
											<li> <a href="#C">C</a>
											</li>
											<li> <a href="#D">D</a>
											</li>
											<li> <a href="#E">E</a>
											</li>
											<li> <a href="#F">F</a>
											</li>
											<li> <a href="#G">G</a>
											</li>
											<li> <a href="#H">H</a>
											</li>
											<li> <a href="#I">I</a>
											</li>
											<li> <a href="#J">J</a>
											</li>
											<li> <a href="#K">K</a>
											</li>
											<li> <a href="#L">L</a>
											</li>
											<li> <a href="#M">M</a>
											</li>
											<li> <a href="#N">N</a>
											</li>
											<li> <a href="#O">O</a>
											</li>
											<li> <a href="#P">P</a>
											</li>
											<li> <a href="#Q">Q</a>
											</li>
											<li> <a href="#R">R</a>
											</li>
											<li> <a href="#S">S</a>
											</li>
											<li> <a href="#T">T</a>
											</li>
											<li> <a href="#U">U</a>
											</li>
											<li> <a href="#V">V</a>
											</li>
											<li> <a href="#W">W</a>
											</li>
											<li> <a href="#X">X</a>
											</li>
											<li> <a href="#Y">Y</a>
											</li>
											<li> <a href="#Z">Z</a>
											</li>
										</ul>
									</nav>
								</header> -->
								<section class="uk-card-body" id="A">
									<div uk-grid>
										<div class="uk-width-1-1 uk-width-expand@m">
											<ul class="uk-grid-small uk-child-width-1-2 uk-child-width-1-4@s uk-child-width-1-6@m" uk-grid>
												<li v-for="brand in brands" :key="brand.title">
													<span class="uk-link-muted uk-text-center uk-display-block uk-padding-small uk-box-shadow-hover-large" href="#">
														<div class="tm-ratio tm-ratio-4-3">
															<div class="tm-media-box">
																<figure class="tm-media-box-wrap">
																	<img class="item-brand lazyload" :data-src="brand.images" :alt="brand.title">
																</figure>
															</div>
														</div>
														<div class="uk-margin-small-top uk-text-truncate">{{ brand.title }}</div>
													</span>
												</li>
											</ul>
										</div>
									</div>
								</section>
							</div>
						</div>
					</div>
				</div>
			</section>
			<marketplace/>
		</main>
		<footernav/>
	</div>
</template>
<script>
   import {fb} from "../firebase"
	export default {
   name: "Brands",
   props: {

   },
   data() {
      return {
         key: '',
         brand: {},
         brands: [],
         ref: fb.firestore().collection('brands').orderBy('title','asc'),
      }
   },
   created () {
      this.ref.onSnapshot((querySnapshot) => {
         this.brands = [];
         querySnapshot.forEach((doc) => {
         this.brands.push({
            key: doc.id,
            title: doc.data().title,
            images: doc.data().images,
         });
         });
      });
   },
}
</script>