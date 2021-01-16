<template>
	<div class="blog">
		<navbar></navbar>
		<main>
			<section class="uk-section uk-section-small">
				<div class="uk-container">
					<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
						<div class="uk-text-center">
							<ul class="uk-breadcrumb uk-flex-center uk-margin-remove">
								<li> <a href="/">Home</a>
								</li>
								<li> <span>Blog</span>
								</li>
							</ul>
							<h1 class="uk-margin-small-top uk-margin-remove-bottom">Blog</h1>
						</div>
						<div>
							<div class="uk-grid-medium" uk-grid>
								<section class="uk-width-1-1 uk-width-expand@m">
									<div class="uk-grid-medium uk-child-width-1-1" uk-grid>
										<div v-for="article in articles" :key="article.title">
											<a @click.stop="articleDetail(article)">
												<article class="uk-card uk-card-default uk-card-small uk-article uk-overflow-hidden uk-box-shadow-hover-large uk-height-1-1 tm-ignore-container">
													<div class="tm-ratio tm-ratio-16-9">
														<figure class="tm-media-box uk-cover-container uk-margin-remove">
															<img :src="getImage(article.images)" :alt="article.title" uk-cover="uk-cover" />
														</figure>
													</div>
													<div class="uk-card-body">
														<div class="uk-article-body">
															<div class="uk-article-meta uk-margin-xsmall-bottom">
																<div>{{ article.date }}</div>
															</div> 
															<div>
																<h3 class="uk-margin-remove">{{ article.title }}</h3>
															</div>
															<div class="uk-margin-small-top" >
																<span>{{ article.description | stripTags | truncate(300, '...', true) }}</span>
															</div>
														</div>
													</div>
												</article>
											</a>
										</div>

									</div>
								</section>
								<aside class="uk-width-1-4 uk-visible@m tm-aside-column">
									<section class="uk-card uk-card-default uk-card-small" uk-sticky="offset: 90; bottom: true;">
										<nav>
											<ul class="uk-nav uk-nav-default tm-nav">
												<li> <a href="/about">About</a>
												</li>
												<li> <a href="/contacts">Contacts</a>
												</li>
												<li class="uk-active"> <a>Blog</a>
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
			<marketplace></marketplace>
		</main>
	</div>
</template>
<script>
   import {fb,db} from '../firebase';
   import router from '../router'
	export default {
      name: "Blog",
      props: {
         msg: String,
      },
      data() {
         return {
            key: '',
            article: {},
            articles: [],
            ref: fb.firestore().collection('articles').orderBy('date','desc'),
         }
      },
      created () {
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
		getImage(images) {
			return(images[0])
		},
		articleDetail (article) {
			router.push({ name: 'Articles', params: { id: article.key }})
		},
      }
	}
</script>