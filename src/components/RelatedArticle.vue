<template>
   <section>
      <h2 class="uk-text-center">Related Articles</h2>
      <div class="uk-grid-medium uk-grid-match uk-child-width-1-1 uk-child-width-1-2@s uk-child-width-1-4@m" uk-grid>
         <div v-for="article in articles" :key="article.title">
            <a @click.stop="articleDetail(article)">
               <article class="uk-card uk-card-default uk-card-small uk-overflow-hidden uk-link-heading uk-display-block uk-box-shadow-hover-large uk-height-1-1 tm-ignore-container">
                  <div class="uk-card-media-top">
                     <figure class="uk-margin-remove tm-ratio tm-ratio-16-9">
                        <div class="uk-cover-container">
                           <img v-lazy="getImage(article.images)" :alt="article.title" uk-cover>
                        </div>
                     </figure>
                  </div>
                  <div class="uk-card-body">
                     <div class="uk-article-meta uk-margin-xsmall-bottom">
                        <time>{{ article.date }}</time>
                     </div>
                     <h3 class="uk-h4 uk-margin-remove">{{ article.title }}</h3>
                  </div>
               </article>
            </a>
         </div>
      </div>
   </section>
  
</template>

<script>
import {fb} from "../firebase"
import router from '../router'
export default {
name: "related-article",
props: {

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
         date: doc.data().date,
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
      router.replace({ name: 'Articles', params: { id: article.key }});
      router.go(0)
   },
}

}
</script>
