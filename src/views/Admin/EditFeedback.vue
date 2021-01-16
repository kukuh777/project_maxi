<template>
	<div class="adfeedback">
		<h3 class="subheading grey--text">Edit Feedback</h3>
		<v-layout>
			<v-flex md6 class="mx-2">
				<v-card outlined class="rounded-lg">
					<form @submit="onSubmit">
						<v-layout row wrap class="px-4 py-2">
							<!-- left side -->
							<v-flex md12>
								<v-layout row wrap>
									<!-- Feedback Status -->
									<v-flex md12 class="mx-2 mb-n2">
										<v-list-item>
											<v-list-item-content>
												<v-list-item-title class="overline">Status</v-list-item-title>
												<v-select v-model="feed.status" :items="status" :rules="[v => !!v || 'Status is required']" required></v-select>
											</v-list-item-content>
										</v-list-item>
									</v-flex>
								</v-layout>
							</v-flex>
							<!-- Feedback Button -->
							<v-flex md12 class="mb-n2">
								<v-list-item>
									<v-list-item-content>
										<router-link to="/admin/feedback">
											<v-btn type="submit" class="grey--text" block color="default">Cancel</v-btn>
										</router-link>
									</v-list-item-content>
								</v-list-item>
								<v-list-item>
									<v-list-item-content>
										<v-btn type="submit" class="white--text" block color="#ED1D32">Update Feedback</v-btn>
									</v-list-item-content>
								</v-list-item>
							</v-flex>
						</v-layout>
					</form>
				</v-card>
			</v-flex>
		</v-layout>
	</div>
</template>
<script>
	import {fb,db} from '../../firebase'
	import router from '../../router'
	import { VueEditor } from 'vue2-editor'
	import swal from 'sweetalert'
	
	export default {
	  name: 'EditFeedback',
	  components: {
	    VueEditor
	  },
	  data () {
	    return {
	      key: this.$route.params.id,
	      feed: {},
	      // start select
	      select: null,
	      status: [
	        'Have not answered',
	        'Answered'
	      ],
	      // end select
	    }
	  },
	  created () {
	    const ref = fb.firestore().collection('feedback').doc(this.$route.params.id);
	    ref.get().then((doc) => {
	      if (doc.exists) {
	        this.feed = doc.data();
	      } else {
	        alert("No such document!");
	      }
	    });
	  },
	  methods: {
	    
	    // submit event
	    onSubmit (evt) {
	      evt.preventDefault()
	      const updateRef = fb.firestore().collection('feedback').doc(this.$route.params.id);
	      updateRef.set(this.feed).then((docRef) => {
	        this.key = ''
	        this.feed.status = ''
	        router.push({ name: 'feedback', params: { id: this.$route.params.id }})
	        // success update pop up
	        swal({
	          title: "Good job!",
	          text: "Your user feedback has been updated!",
	          icon: "success",
	        })
	      })
	      .catch((error) => {
	        alert("Error adding document: ", error);
	      });
	    },
	  },
	}
</script>
<style lang="scss" scoped>
	.img-wrap {
	  position: relative;
	}
	.img-wrap span.delete-img {
	  position: absolute;
	  top: -17px;
	  right: -13px;
	}
	.img-wrap span.delete-img:hover{
	  cursor: pointer;
	}
</style>