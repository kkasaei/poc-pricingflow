<template>
    <div>
        <div class="container mt-5">
            <div class="row mb-3">
                <div class="col">
                    <h1>New Widget</h1>
                </div>
            </div>
            <div class="row mt-5">
                <div class="col">
                    <div class="card">
                        <div class="card-body">
                            <form @submit="handleSubmit">
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Widget Name</label>
                                    <input type="text" class="form-control" id="exampleFormControlInput1"
                                        placeholder="My awesome Widget" v-model="name">
                                </div>
                                <div class="mb-3">
                                    <label for="exampleFormControlInput1" class="form-label">Widget Api Key</label>
                                    <div class="input-group">
                                        <input type="text" class="form-control" placeholder=""
                                            aria-label="Widget Api Key" aria-describedby="basic-addon2"
                                            v-model="apiKey">
                                        <span class="input-group-text" id="basic-addon2"
                                            @click="generateApiKey">Generate a new Key</span>
                                    </div>
                                </div>


                                <div class="form-check mb-3">
                                    <input class="form-check-input" type="checkbox" id="flexCheckDefault"
                                        v-model="isPublished">
                                    <label class="form-check-label" for="flexCheckDefault">
                                        Is Published
                                    </label>
                                </div>
                                <div class="form-floating mb-3">
                                    <label for="floatingTextarea2">Style</label>
                                    <textarea class="form-control" placeholder="" id="floatingTextarea2"
                                        style="height: 100px" v-model="style"></textarea>
                                </div>
                                <div class="form-floating mb-3">
                                    <label for="floatingTextarea2">Structure</label>
                                    <textarea class="form-control" placeholder="" id="floatingTextarea2"
                                        style="height: 100px" v-model="structure"></textarea>
                                </div>

                                <router-link class="btn btn-secondary btn-lg mr-2" to="/">Cancel</router-link>
                                <button type="submit" class="btn btn-primary btn-lg">Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { v4 } from 'uuid'

export default {
    data() {
        return {
            name: '',
            isPublished: false,
            apiKey: '',
            style: '',
            structure: '',
        }
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.axios
                .post(`http://localhost:3000/widgets/`, {
                    name: this.name,
                    isPublished: this.isPublished,
                    apiKey: this.apiKey,
                    body: {
                        style: this.style ? btoa(this.style) : '',
                        structure: this.structure ? btoa(this.structure) : '',
                    },
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then((response) => {
                    console.log(response.data)
                    this.$router.push('/')
                })

        },
        generateApiKey() {
            console.log(v4())
            this.apiKey = v4()
        }
    }
}
</script>
