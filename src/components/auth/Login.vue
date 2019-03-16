<template>
    <div class="row justify-content-md-center">
        <div class="col-md-6">
            
                <!-- Material form login -->
            <div class="card">

            <h5 class="card-header primary-color white-text text-center py-4">
                <strong><i class="fa fa-user"></i> Sign in</strong>
            </h5>

            <!--Card content-->
            <div class="card-body ">

                <div class="alert alert-info" v-if="msg">{{msg}}</div>
                <!-- Form -->
                <form  style="color: #757575;">

                <!-- Email -->
                <div class="md-form">
                <i class="fas fa-user prefix"></i>
                <input type="text" id="inputIconEx2" class="form-control" v-model="form.email">
                <label for="inputIconEx2">E-mail address</label>
                </div>

                <!-- Password -->
                <div class="md-form">
                <i class="fas fa-lock prefix"></i>
                <input type="password" id="inputValidationEx2" class="form-control" v-model="form.password">
                <label for="inputValidationEx2">Type your password</label>
                </div>



                <!-- Sign in button -->
                <button v-if="!loading" class="btn btn-outline-info btn-block" type="button" @click="login"><i class="fa fa-sign-in-alt"></i>  Sign in</button>
                <button v-else class="btn btn-outline-info btn-block disabled" type="button"><i class="fas fa-bus fa-spin"></i> </button>


                </form>
                <!-- Form -->

            </div>

            </div>
            <!-- Material form login -->

        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            form:{
                email:'',
                password:''
            },
            msg:''
        }
    },
    computed:{
        loading(){
            return this.$store.getters.isLoading;
        }
    },
    methods:{
        login(){
            if(this.form.email && this.form.password)
            {
                this.$store.dispatch('login',this.form).then((res)=>{
                    this.$router.push('/');
                },(error)=>{
                    this.setMsg(error.message);
                });
            }
        },
        setMsg(msg){
            this.msg = msg;
            setTimeout(()=>{
                this.msg=''
            },3000)
        }
    }
}
</script>
