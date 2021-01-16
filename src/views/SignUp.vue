<template>
	<div class="signup">
		<main class="auth-form">
			<div class="container">
				<div class="img-form">
					<img src="images/bg.svg">
				</div>
				<div class="login-content">
					<form name="registerForm" @submit.prevent="register">
						<img src="images/avatar.png">
						<h2 class="title">Welcome</h2>
						<div class="input-div one">
							<div class="i"><v-icon>mdi-account-circle</v-icon>
							</div>
							<div class="div">
								<input type="text" name="firstname" v-model="firstname" class="input" placeholder="Your name" >
							</div>
						</div>
						<!-- error validasi name --> <small>{{ validation.firstError('firstname') }}</small>
						<div class="input-div two">
							<div class="i"><v-icon>mdi-at</v-icon>
							</div>
							<div class="div">
								<input type="text" name="email" v-model="email" class="input" placeholder="Username">
							</div>
						</div>
						<!-- error validasi email --> <small>{{ validation.firstError('email') }}</small>
						<div class="input-div pass">
							<div class="i"><v-icon>mdi-lock</v-icon>
							</div>
							<div class="div">
								<input type="password" name="password" v-model="password" class="input" placeholder="Password" >
							</div>
						</div>
						<!-- error validasi password --> <small>{{ validation.firstError('password') }}</small>
						<div class="input-div pass">
							<div class="i"><v-icon>mdi-lock</v-icon>
							</div>
							<div class="div">
								<input type="password" v-model="repeat" name="confirmPassword" class="input" placeholder="Re-type Password">
							</div>
						</div> <small>{{ validation.firstError('repeat') }}</small>
						<br>
						<button type="submit" class="btn1" >Sign Up</button>
						<span class="or">Or</span>
						<div class="move">
							<router-link to="/signin">Sign In</router-link>
						</div>
					</form>
				</div>
			</div>
		</main>
	</div>
</template>
<script>
	import swal from 'sweetalert';
	import "../assets/scss/sign.scss"
	import {fb,db} from "../firebase";
	import SimpleVueValidation from 'simple-vue-validator';
   	const Validator = SimpleVueValidation.Validator;
	
	
	export default {
	  name: "signup",
	  props: {
	    msg: String
	  },
	  
	  data() {
	    return {
	      firstname: "",
	      email: "",
	      status: "user",
	      password: "",
	      repeat: "",
	    //   info: "",
	    //   show: true
	    };
	  },
	  validators: {
		firstname: function(value) {
			return Validator.value(value).required().regex('^[A-Za-z]*$', 'Must only contain alphabetic characters.');
		},
		email: function(value) {
			return Validator.value(value).required().email();
		},
		password: function (value) {
			return Validator.value(value).required().minLength(8);
		},
		'repeat, password': function (repeat, password) {
			if (this.submitted || this.validation.isTouched('repeat')) {
				return Validator.value(repeat).required().match(password);
				}
			}
		},
	  methods: {
		// isDisableFixed(repeat) {
		// 	return repeat.length > 7;
		// },
	    register() {
	      fb.auth().createUserWithEmailAndPassword(this.email, this.password)
	        
	        .then((user) => {
	          db.collection("users").doc(user.user.uid).set({
				  email: this.email,
	              firstname: this.firstname,
	              status: this.status,
	              time: new Date().toLocaleDateString('in-ID', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
	          })
	          .then(function() {
	              console.log("Document successfully written!");
	          })
	          .catch(function(error) {
	              console.error("Error writing document: ", error);
	          });
	
			  this.$router.replace('/signin')
			  swal({
					title: "Your account has been created!",
					icon: "success",
					button: "OK",
				});
	        })
	        .catch(function(error) {
	          // Handle Errors here.
	          var errorCode = error.code;
	          var errorMessage = error.message;
	          if (errorCode == 'auth/weak-password') {
	              alert('Input your password.');
	          } else {
	              alert(errorMessage);
	          }
	          console.log(error);
	      });
	      
	    }
	  }
	};
</script>