<template>
  <div>
    <main>
      <!-- <navbar></navbar> -->
      <br><br><br>
      <section class="uk-section uk-section-small">
          <div class="uk-container">
              <div class="uk-text-center">
                  <h1 class="uk-heading-hero">404</h1>
                  <div class="uk-text-lead">Page not found</div>
                  <div class="uk-margin-top">
                      Looks like the page you're trying to visit doesn't exist.<br>
                      <a href="/">Go back to Homepage</a>
                  </div>
              </div>
          </div>
      </section>

      <!-- Marketplace -->
      <!-- <marketplace></marketplace> -->
    </main>
    <!-- <footernav></footernav> -->
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "pagenotfound",
  props: {
      msg: String
  }
};
</script>

