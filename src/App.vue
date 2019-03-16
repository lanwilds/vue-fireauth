<template>
  <div id="app">
      <!--Navbar-->
    <nav class="navbar navbar-expand-lg navbar-dark primary-color mb-3">

      <!-- Navbar brand -->
      <a class="navbar-brand" href="/"><i class="fa fa-fire"></i> Fire Auth  </a>

      <!-- Collapse button -->
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#basicExampleNav"
        aria-controls="basicExampleNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <!-- Collapsible content -->
      <div class="collapse navbar-collapse" id="basicExampleNav">

        <!-- Links -->
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active" @click="$router.push('/')">
            <a class="nav-link" >Home
              <span class="sr-only">(current)</span>
            </a>
          </li>

        </ul>
        <!-- Links -->
      <ul class="navbar-nav ml-auto nav-flex-icons">
            <!-- <li class="nav-item">
              <a class="nav-link waves-effect waves-light">
                <i class="fab fa-twitter"></i>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link waves-effect waves-light">
                <i class="fab fa-google-plus-g"></i>
              </a>
            </li> -->
            <li class="nav-item dropdown" v-if="isLoggedIn">
              <a class="nav-link dropdown-toggle" id="navbarDropdownMenuLink-333" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                <i class="fas fa-user"></i>
                {{user.email}}
              </a>
              <div class="dropdown-menu dropdown-menu-right dropdown-default" aria-labelledby="navbarDropdownMenuLink-333">
                <a class="dropdown-item" @click="logout"><i class="fa fa-sign-out-alt"></i> Logout</a>
              </div>
            </li>
            <li class="nav-item" v-else>
              <a class="nav-link waves-effect waves-light" @click="$router.push('/login')">
                <i class="fa fa-sign-in-alt"></i> Login
              </a>
            </li>
          </ul>
      </div>
      <!-- Collapsible content -->

    </nav>
    <!--/.Navbar-->
    <div class="container">
    <router-view/>
    </div>

  </div>
</template>

<script>
export default {
  name: 'App',
  computed:{
    user(){
      // console.log(this.$store.getters.currentUser)
      return this.$store.getters.currentUser;
    },
    isLoggedIn(){
      return this.$store.getters.isLoggedIn;      
    }
  },
  methods:{
    logout(){
      this.$store.dispatch('getSignOut').then((res)=>{
         this.$router.go({ path: this.$router.path });
      },(error)=>{
        console.log(error)
      })
    }
  }
}
</script>
<style>
.primary-color,.btn-primary{
  background-color: #00d1b2 !important;
}
</style>


