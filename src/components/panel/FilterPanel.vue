<template>
    <div v-if="expended" class="layout" @click.self="close">
      <div class="filter">
        <input type="text" class="form-element" placeholder="Albert Einstein" v-model="name" v-on:keyup.enter="search"/>
        <input type="number" class="form-element" placeholder="Né à partir de..." v-model="year"
               v-on:keyup.enter="search"/>
        <button type="button" class="form-element" @click="search">🔍 🚀</button>
      </div>
    </div>
    <div v-else class="minifiedFilter" @click="expand">
    </div>
</template>


<script>
  export default {
    name: 'FilterPanel',
    data: () => ({
      expended: false,
      name: null,
      year: null,
    }),
    methods: {
      expand() {
        this.expended = true
      },
      close() {
        this.expended = false
        this.year = null
        this.name = null
      },
      search() {
        const filter = {}
        if (this.year) {
          filter.ba = new Date(this.year)
        }
        if (this.name) {
          filter.n = this.name
        }
        this.$emit('update', filter)
        this.close()
      },
    },
  }
</script>

<style scoped>

  .form-element {
    margin: 5px;
  }

  .filter {
    display: flex;
    flex-direction: column;

    width: 10em;
    border: var(--panel-border);
    border-bottom-right-radius: 4px;
    border-top-right-radius: 4px;
    background-color: #F6F6F6;
    position: absolute;
    top: 50%;
    left: -1px;
  }

  .minifiedFilter {
    width: 1em;
    height: 2.5em;
    border: var(--filter-panel-border);
    border-bottom-right-radius: var(--radius);
    border-top-right-radius: var(--radius);
    background-color: var(--tile-color);
    position: absolute;
    top: 50%;
    left: -1px;
  }

  .minifiedFilter:before {
    content: ' ';
    height: 0;
    position: absolute;
    width: 0;
    top: 11px;
    left: 4px;
    border: 8px solid transparent;
    border-left-color: black;
  }
</style>