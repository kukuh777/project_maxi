<template>
	<div class="latest-news">
		<section class="uk-section uk-section-default uk-section-small">
			<div class="uk-container">
				<div class="uk-grid-medium uk-child-width-1-1 uk-child-width-1-2@s" uk-grid>
					<section>
						<h2 class="uk-text-center uk-text-left@s">About</h2>
						<p class="uk-text-justify">MaxiKomputer.com pun dibentuk sebagai upaya untuk memberikan pelayanan yang lebih baik dengan membuat toko online atau webstore yang bergerak dalam bidang perdagangan komputer dan jasa, dengan produk utama pheriperal komputer new dan second, komputer rakitan beserta jasa service serta networking dengan pangsa pasar seputar DIY dan Jateng.</p>
						
						<div class="uk-text-center uk-text-left@s">
							<router-link class="uk-link-mute uk-text-uppercase tm-link-to-all" to="/about"> <span>read more</span>
								<span uk-icon="icon: chevron-right; ratio: .75;"></span>
							</router-link>
						</div>
					</section>
					<section>
						<h2 class="uk-text-center uk-text-left@s">Latest News</h2>
						<ul class="uk-list uk-list-small uk-list-divider">
							<li v-for="article in articles.slice(0,2)" :key="article.title">
								<article class="uk-article">
									<div class="uk-article-body">
										<div class="uk-article-meta uk-margin-xsmall-bottom">
											<time>{{ article.date }}</time>
										</div>
										<h3 class="uk-h4 uk-margin-remove">
                                 <a @click.stop="articleDetail(article)" class="uk-link-heading">{{ article.title }}</a>
                              </h3>
										<div class="uk-margin-xsmall-top uk-text-small">
											<span>{{ article.description | stripTags | truncate(200, '...', true) }}</span>
										</div>
									</div>
								</article>
							</li>
						</ul>
						<div class="uk-margin uk-text-center uk-text-left@s"> 
                     <a class="uk-link-mute uk-text-uppercase tm-link-to-all" href="/blog"><span>see all news</span>
                        <span uk-icon="icon: chevron-right; ratio: .75;"></span>
                     </a>
						</div>
					</section>
				</div>
			</div>
		</section>
	</div>
</template>
<script>
   import {fb,db} from '../firebase';
   import router from '../router';
   import VueFilterList from 'vue2-filter-list'
	export default {
	name: "latest-news",
	mixins: [VueFilterList.mixin],
	props: {
		msg: String
   },
   data() {
      return {
         key: '',
         article: {},
         articles: [],
         ref: fb.firestore().collection('articles').orderBy('date','desc'),
      }
   },
	created() {
		this.ref.onSnapshot((querySnapshot) => {
			this.articles = [];
			querySnapshot.forEach((doc) => {
				this.articles.push({
					key: doc.id,
					title: doc.data().title,
					author: doc.data().author,
					date: doc.data().date,
					description: doc.data().description,
					tags: doc.data().tags,
					images: doc.data().images,
				});
			});
		});
   },
   methods:{
		articleDetail (article) {
			router.push({ name: 'Articles', params: { id: article.key }})
		},
   }
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>