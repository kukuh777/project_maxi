<template>
	<div class="articles">
      <navbar></navbar>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
						<section class="uk-text-center">
							<ul class="uk-breadcrumb uk-flex-center uk-margin-remove">
								<li>
									<router-link to="/">Home</router-link>
								</li>
								<li>
									<router-link to="/blog">Blog</router-link>
								</li>
								<li> <span></span>
								</li>
							</ul>
						</section>
						<section>
							<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
								<section>
									<article class="uk-card uk-card-default uk-card-body uk-article tm-ignore-container">
										<header class="uk-text-center">
											<h1 class="uk-article-title">{{ article.title }}</h1>
											<div class="uk-article-meta">
												<time>{{ article.date }}</time>
											</div>
										</header>
										<section class="uk-article-body">
                                 <span></span>
                                 <div class="tm-wrapper uk-text-center">
                                    <figure>
                                       <a>
                                          <img width="1100px" :src="article.images[0]" :alt="article.title">
                                       </a>
                                       <figcaption>{{ article.title }}</figcaption>
                                    </figure>
                                 </div>
											<span v-html="article.description"></span>
										</section>
									</article>
								</section>
								<related-article/>
							</div>
						</section>
					</div>
				</div>
			</section>
		</main>
      <footernav></footernav>
	</div>
</template>
<script>
	import {fb,db} from '../firebase'
	import router from '../router'
	export default {
	name: "Articles",
	props: {
	
	},
	data() {
	   return {
	      key: this.$route.params.id,
         article: {
            images: {
               0: ""
            },
         },
         articles: [],
	   }
	},
	created () {
	   const ref = fb.firestore().collection('articles').doc(this.$route.params.id);
	   ref.get().then((doc) => {
	      if (doc.exists) {
	         this.article = doc.data();
	      } else {
	         alert("No such document!");
	      }
	   });
   },
   methods: {
      getImage(images) {
         return (images[0])
      }
   }
	
	}
</script>