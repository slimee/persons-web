<template>
  <flex-column :class="['search-overview', {'hoverable':!inputing}]">
    <div v-if="firstLoading">chargement...</div>
    <flex-column v-else-if="isFiltered" @click="clearFilter" class="clickable no-select">
      <flex-line>
        <span>{{filterIcon}} {{filterLabel}} ({{total}})</span>
        <div class="rnd-large close">×</div>
      </flex-line>
    </flex-column>
    <flex-line v-else>
      <div @mousedown.prevent @click="btnClick" class="icon clickable no-select">🔍</div>
      <input :class="['search-input', inputing?'search-input-activated':'search-input-not-activated']"
             ref="searchInput"
             v-model="value" type="text"
             v-on:keyup.enter="doSearch" v-on:keyup.esc="clear"
             @blur="blur" @input="inputChange"
      />
    </flex-line>
    <perfect-scrollbar :style="scrollBarStyle">
      <list v-if="props.length" class="autocompletion-list" :items="props" @click="listItemClick">
        <template #item="{item}">
          {{getLogo(item.type)}} {{item.title}}
        </template>
      </list>
    </perfect-scrollbar>
    <div v-if="showHand" class="search-something"><span class="hand-arrow">☝</span></div>
  </flex-column>
</template>

<script>
  import { mapActions, mapGetters, mapState } from 'vuex'
  import List from '../List'
  import { getLogo } from '../../services/properties'
  import FlexLine from '../layout/FlexLine'
  import FlexColumn from '../layout/FlexColumn'
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

  export default {
    name: 'SearchOverview',
    components: { PerfectScrollbar, FlexColumn, FlexLine, List },
    data: () => ({
      inputing: false,
      value: null,
      showHand: true,
    }),
    computed: {
      ...mapState('properties', { props: 'results' }),
      ...mapState('search', ['total']),
      ...mapGetters('search', ['firstLoading', 'isFiltered', 'filterIcon', 'filterLabel']),
      scrollBarStyle() {
        const x = 25
        const a = this.props.length
        const height = Math.min(255, a * x)
        return {
          height: height + 'px',
          transition: 'height var(--transition-very-speed)',
        }
      },
    },
    methods: {
      ...mapActions('search', ['clearFilter', 'search']),
      ...mapActions('properties', { clearProp: 'clear', searchProp: 'search' }),
      getLogo,
      btnClick() {
        this.showHand = false;
        if (this.inputing) {
          this.doSearch()
        } else {
          this.inputing = true
          this.$nextTick(() => this.$refs.searchInput.focus())
        }
      },
      clear() {
        this.inputing = false
        this.value = null
        this.clearProp()
      },
      blur() {
        this.clear()
      },
      inputChange() {
        this.searchProp(this.value)
      },
      doSearch() {
        this.search(this.value ? { n: this.value } : {})
        this.clear()
      },
      listItemClick(item) {
        this.search({ pid: item._id })
        this.clear()
      },
    },
  }
</script>

<style>
  .search-overview {
    position: absolute;
    top: var(--overview-margin);
    right: var(--overview-margin);
    background-color: var(--search-color);
    padding: var(--overview-padding);
    border-radius: var(--overview-radius);
    border: var(--search-overview-border);

    display: flex;
    justify-content: center;
    align-items: center;

    transition: background-color var(--transition-speed);
  }

  .search-input {
    transition: width var(--transition-speed);
  }

  .search-input-activated {
    padding-right: 5px;
    width: 240px;
  }

  .search-input-not-activated {
    width: 0;
  }

  .autocompletion-list {
    width: 288px;
  }

  .space-right {
    margin-right: 2em;
  }

  .search-something {
    font-weight: bold;
    font-size: 2em;
    position: absolute;
    top: 1em;
    right: -0.2em;
  }

  .hand-arrow {
    font-size: 3em;
  }
</style>
