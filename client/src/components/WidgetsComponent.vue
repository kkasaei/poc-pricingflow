<template>
  <div>
    <div class="container mt-5">
      <div class="row mb-3">
        <div class="col-6">
          <h1>Widgets</h1>
        </div>
        <div class="col-6">
          <div class="d-flex flex-row-reverse">
            <router-link to="/new" class="btn btn-primary">New Widget</router-link>
          </div>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col">
          <div class="card">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Id</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="widget in widgets" :key="widget._id">
                  <th><router-link :to="{ name: 'edit', params: { id: widget._id }}">{{ widget.name }}</router-link></th>
                  <td>{{ widget._id }}</td>
                  <td>
                    <ul>
                      <li>
                        <button class="btn btn-link" @click="handleDelete(widget._id)">Delete</button>
                      </li>
                      <li>
                        <div class="form-check form-switch">
                          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                            :value="widget.isPublished"
                            :checked="widget.isPublished"
                            @change="updateCheckbox(widget._id, $event.target.checked)"
                            >
                          <label class="form-check-label" for="flexSwitchCheckDefault">Publish</label>
                        </div>
                      </li>
                      <li>
                        <router-link :to="{ name: 'edit', params: { id: widget._id }}" class="btn btn-link">Edit</router-link>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'WidgetsComponent',
  data() {
    return {
      widgets: [],
    }
  },
  mounted() {
    this.axios
      .get('http://localhost:3000/widgets', {
        headers: {
          "Content-Type": "application/json",
        }
      })
      .then((response) => {
        this.widgets = response.data
      });
  },
  methods: {
    handleDelete(id) {
      this.axios
        .delete(`http://localhost:3000/widgets/${id}`, {
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((response) => {
          console.log(response.data)
        })
        .finally(() => {
          this.axios
            .get('http://localhost:3000/widgets', {
              headers: {
                "Content-Type": "application/json",
              }
            })
            .then((response) => {
              this.widgets = response.data
            });
        })
    },
    updateCheckbox(id, checked) {
      this.axios
        .put(`http://localhost:3000/widgets/${id}`, {
          isPublished: checked,
          headers: {
            "Content-Type": "application/json",
          }
        })
        .then((response) => {
          console.log(response.data)
        })
        .finally(() => {
          this.axios
            .get('http://localhost:3000/widgets', {
              headers: {
                "Content-Type": "application/json",
              }
            })
            .then((response) => {
              this.widgets = response.data
            });
        })
    }

  }
}
</script>
