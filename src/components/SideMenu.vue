<template>
<div class="side-menu">
	<div id="nav-offcanvas" uk-offcanvas="overlay: true">
		<aside class="uk-offcanvas-bar uk-padding-remove">
		<div class="uk-card uk-card-default uk-card-small tm-shadow-remove">
			<header class="uk-card-header uk-flex uk-flex-middle">
			<div>
				<a class="uk-link-muted uk-text-bold" href="#">{{ maxi.call }}</a>
				<div class="uk-text-xsmall uk-text-muted" style="margin-top: -2px;">
					<div>{{ maxi.address3 }}</div>
					<div>{{ maxi.time }}</div>
				</div>
			</div>
			</header>
			<nav class="uk-card-small uk-card-body">
			<ul class="uk-nav-default uk-nav-parent-icon uk-list-divider" uk-nav>
				<li class="uk-parent">
					<a href="/catalog">Catalog</a>
					<ul class="uk-nav-sub uk-list-divider">
						<li v-for="catalog in maxi.catalogs" :key="catalog.id">
							<a :href="catalog.link">{{ catalog.title }}</a>
						</li>
						<li class="uk-text-center">
							<a class="uk-link-muted uk-text-uppercase tm-link-to-all" href="/catalog"><span>see all categories</span>
							<span uk-icon="icon: chevron-right; ratio: .75;"></span>
							</a>
						</li>
					</ul>
				</li>
				<li class="uk-parent">
					<a href="/brands">Brands</a>
					<ul class="uk-nav-sub uk-list-divider">
						<!-- Brands -->
						<li v-for="brand in maxi.brands" :key="brand.title">
							<a :href="brand.link">{{brand.title}}</a>
						</li>
						<li class="uk-text-center">
							<a class="uk-link-muted uk-text-uppercase tm-link-to-all" href="/brands"><span>see all brands</span>
							<span uk-icon="icon: chevron-right; ratio: .75;"></span>
							</a>
						</li>
					</ul>
				</li>
				<li class="uk-parent">
					<a href="#">Pages</a>
					<ul class="uk-nav-sub uk-list-divider">
						<li v-for="page in maxi.pages" :key="page.title">
							<a :href="page.link">{{page.title}}</a>
						</li>
					</ul>
				</li>
				<li>
					<a href="/blog">Blog</a>
				</li>
				<li>
					<a href="/about">About</a>
				</li>
				<li>
					<a href="/contacts">Contacts</a>
				</li>
			</ul>
			</nav>
			<nav class="uk-card-body">
			<ul class="uk-iconnav uk-flex-center">
				<li>
					<a href="#" title="Facebook" uk-icon="facebook"></a>
				</li>
				<li>
					<a href="#" title="Twitter" uk-icon="twitter"></a>
				</li>
				<li>
					<a href="#" title="YouTube" uk-icon="youtube"></a>
				</li>
				<li>
					<a href="#" title="Instagram" uk-icon="instagram"></a>
				</li>
			</ul>
			</nav>
		</div>
		</aside>
	</div>
</div>
</template>
<script>
	import { mapGetters, mapActions } from 'vuex';
		import {fb,db} from '../firebase'
		export default {
		  name: "side-menu",
		  props: {
		    msg: String
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
		        });
		      });
		    });
	     },
	     computed: {
	         ...mapGetters(["maxi"])
         },
         methods: {
            ...mapActions(["getMaxi"]),
         },
         mounted() {
            this.getMaxi();
         },
		};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss"></style>