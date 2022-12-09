<template>
    <div>
        <div class="container mt-5">
            <div class="row mb-3">
                <div class="col">
                    <h1>Edit Widget: {{ $route.params.id }}</h1>
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
                                    <input type="text" class="form-control" id="exampleFormControlInput1"
                                        placeholder="My awesome Widget" v-model="apiKey">
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
    mounted() {
        this.axios
            .get(`http://localhost:3000/widgets/${this.$route.params.id}`, {
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(({ data }) => {
                this.name = data.name;
                this.isPublished = data.isPublished;
                this.apiKey = data.apiKey,
                this.style = data.body.style ? atob(data.body.style) : '';
                this.structure = data.body.structure ? atob(data.body.structure) : '';
            })
    },
    methods: {
        handleSubmit(e) {
            e.preventDefault()
            this.axios
                .put(`http://localhost:3000/widgets/${this.$route.params.id}`, {
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
                .then(() => {
                    this.$router.push('/')
                })

        }
    }
}
</script>

