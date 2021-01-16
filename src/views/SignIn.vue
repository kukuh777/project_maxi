<template>
  <div class="signin">
    <main class="auth-form">
      <div class="container">
        <div class="img-form">
          <img src="images/bg.svg">
        </div>
        <div class="login-content">
          <form name="loginForm" @submit.prevent="login">
            <img src="images/avatar.png">
            <h2 class="title">Welcome</h2>
            <div class="input-div one">
              <div class="i"> <i class="fas fa-user"></i>
              </div>
              <div class="div">
                <input type="text" name="email" v-model="email" class="input" placeholder="Username">
              </div>
            </div>
            <!-- error validasi email --> <small>{{ validation.firstError('email') }}</small>
            <div class="input-div pass">
              <div class="i"> <i class="fas fa-lock"></i>
              </div>
              <div class="div">
                <input type="password" name="password" v-model="password" class="input" placeholder="Password">
              </div>
            </div>
            <!-- error validasi password --> <small>{{ validation.firstError('password') }}</small>
            <!-- <div class="forgot-pass">
				<a href="/forgot">Forgot Password?</a>
            </div> -->
            <button type="submit" class="btn1" v-bind:disabled="!isDisableFixed(email)">Sign In</button>
			<span class="or">Or</span>
            <div class="move">
				<router-link to="/signup">Sign Up</router-link>
            </div>
          </form>
        </div>
      </div>
    </main>
  </div>
</template>
<script>
	import swal from 'sweetalert';
	import "../assets/scss/sign.scss";
	import {fb} from "../firebase";
	import SimpleVueValidation from 'simple-vue-validator';
   	const Validator = SimpleVueValidation.Validator;
	export default {
	  name: "signin",
	  props: {
	      msg: String
	  },
	  data() {
	    return {
	      email: "",
         password: "",
         
	    };
     },
	  validators: {
         email: function(value) {
            return Validator.value(value).required().email();
           
         },
         password: function (value) {
            return Validator.value(value).required().minLength(8);
         },
      },
	  methods: {
        isDisableFixed(email) {
      return email.length > 0;
    },
	    login() {
	        fb.auth().signInWithEmailAndPassword(this.email, this.password)
	            .then(() => {
	                if(
	                    (this.email == 'admin@maxi.com' && this.password == 'admin123') || 
	                    (this.email == 'owner@maxi.com' && this.password == 'owner123')
	                  ) {
	                    this.$router.replace('/admin');
	                } else {
	                    this.$router.replace('/');
	                }
	                swal({
	                    title: "Login successfully!",
	                    icon: "success",
	                    button: "OK",
	                });
	            })
	            
	            .catch(function(error) {
	                // Handle Errors here.
	                var errorCode = error.code;
	                var errorMessage = error.message;
	                if (errorCode === 'auth/wrong-password') {
	                    //if passwrod wrong, showing alert
	                    swal({
	                        title: "The password your entered is incorrect!",
	                        icon: "warning",
	                        button: "OK",
	                    })
	                } else {
	                    alert(errorMessage);
	                }
	                console.log(error);
	            });
		    }
	  }
	};
</script>