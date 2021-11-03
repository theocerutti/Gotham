<template>
  <v-card class="container">
      <div v-if="!isUser || editUser">
         <h1>Welcome</h1>
        <p>
            Username :
            <input
            placeholder="User Name"
            id="username"
            v-model="username"
            type="text"
            name="name"
            >
        </p>
        
        <p> 
            Email :
            <input
            placeholder="Email"
            id="email"
            v-model="email"
            type="email"
            name="email"
            >
        </p>
          <v-btn v-if="!editUser" color="blue" outlined @click="createUser">
              Create user
          </v-btn>
          <v-btn v-else-if="editUser" color="blue" outlined @click="saveUpdateUser">
              Save user
          </v-btn>
      </div>
      <div v-else-if="isUser">
        <h1>Welcome {{ username }}</h1>
        <p>
            Username :
            <input
            readonly
            placeholder="User Name"
            id="lastName"
            v-model="username"
            type="text"
            name="name"
            >
        </p>
        
        <p> 
            Email :
            <input
            readonly
            placeholder="Email"
            id="email"
            v-model="email"
            type="email"
            name="email"
            >
        </p>
         <v-btn
            class="mx-2"
            fab
            dark
            color="cyan"
            @click="updateUser"
            >
            <v-icon dark>
                mdi-pencil
            </v-icon>
        </v-btn>
        <v-btn
            class="mx-2"
            fab
            dark
            color="cyan"
            @click="deleteUser"
            >
            <v-icon dark>
                mdi-delete
            </v-icon>
        </v-btn>
      </div>
  </v-card>
</template>

<script>

export default {
  name: 'User',
  props: {
  },
  data() {
      return {
          isUser: false,
          editUser: false,
          username: '',
          email: ''
      }
  },
  methods: {
      createUser(){
        this.isUser = true;
        this.editUser = false;
        console.log("user store infos :", this.$store.getters.getterAllUserInfos)
        this.$store.dispatch('setUser', {
            email: this.email,
            username: this.username
        })
        this.$emit('saveUser', this.lastName)
      },
      saveUpdateUser() {
          this.editUser = false;
          this.$store.dispatch('updateUser', {
            email: this.email,
            username: this.username
          })
      },
      updateUser() {
          this.editUser = true;
      },
      getUser() {

      },
      deleteUser() {
          this.username = ''
          this.email = ''
          this.isUser = false
          this.$store.dispatch('deleteUser')
      }
  },
  async created() {
    const userInfos = this.$store.getters.getterAllUserInfos;
    console.log("userInfos ", userInfos)
    await this.$store.dispatch('getUserById', userInfos.id)
    const user = this.$store.getters.getterAllUserInfos;
    console.log("USER", user)

    if (user.username) {
        this.username = user.username;
        this.email = user.email;
        this.isUser = true;
    }
  }
}
</script>

<style scoped>

input::placeholder {
    color: white;
}

input {
    color: white;
}

.container {
    height: 80%;
    width: 100%;
    background-color: rgb(102, 97, 97) !important;
}
h1 {
    margin: 20px;
}
input {
    padding:10px;
    border:0;
    box-shadow:0 0 15px 4px rgba(0,0,0,0.06);
    border-radius:10px;
    margin: 15px;
}
button {
    margin:20px;
}
</style>