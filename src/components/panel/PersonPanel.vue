<template>
  <transition name="fade">
    <div v-if="person" v-show="imgLoaded || !imgUrl" class="layout" @click.self="close">
      <div class="panel row-if-large">
        <div class="clickable rnd-large panel-top-left"><a :href="url" target="_blank">🔗</a></div>
        <div class="clickable rnd-large close panel-top-right" @click="close">×</div>

        <div class="panelImg">
          <img v-if="imgUrl" class="person-img" :src="imgUrl" @load="onImgLoad"/>
          <div v-html="label" class="label"></div>
          <perfect-scrollbar style="height: 100px">
            <p v-html="intro" class="intro"></p>
          </perfect-scrollbar>
        </div>

        <div v-if="tabs" class='row properties'>
          <div class='column properties-list properties-list-secondary'>
            <div v-for="propertyKey in tabs.secondary"
                 @click="selectPropertyKey(propertyKey)"
                 class="property-key-item">
              {{charOf(propertyKey)}}
            </div>
          </div>
          <div class='column properties-list'>
            <div v-for="propertyKey in tabs.primary"
                 @click="selectPropertyKey(propertyKey)"
                 :class="classOfPropertyKey(propertyKey)">
              {{charOf(propertyKey)}} {{propertyKey}}
            </div>
          </div>
          <div class='column property-values'>
            <div class="row">
              <template v-for="(propertyValue,i) in currentPropertyValues">
                <div @click="select(propertyValue)" class="clickable hoverable">{{clearValue(propertyValue.title, i)}}&nbsp;</div>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import { groupBy, isPerson } from '../../services/utils'
  import { mapActions, mapState } from 'vuex'
  import { getLogo } from '../../services/properties'
  import { PerfectScrollbar } from 'vue2-perfect-scrollbar'

  export default {
    name: 'PersonPanel',
    components: { PerfectScrollbar },
    data: () => ({
      currentPropertyKey: null,
      imgLoaded: false,
    }),
    methods: {
      ...mapActions('persons', ['hidePerson']),
      ...mapActions('search', ['searchOnProp', 'search']),
      charOf: getLogo,
      close() {
        this.hidePerson()
      },
      select(item) {
        if (isPerson(item) && item.title) {
          this.search({ n: item.title })
        } else {
          this.searchOnProp(item)
        }
      },
      clearValue(value, i) {
        const result = value.indexOf('en:') === 0 ? value.substring(3) : value
        return i + 1 < this.currentPropertyValues.length ? `${result},` : result
      },
      selectPropertyKey(v) {
        this.currentPropertyKey = v
      },
      classOfPropertyKey(pk) {
        return pk === this.currentPropertyKey ?
          'property-key-item-current no-select' : 'property-key-item hoverable'
      },
      onImgLoad() {
        this.imgLoaded = true
      },
    },
    computed: {
      ...mapState('persons', { person: 'displayedPerson', detailledPerson: 'displayedDetailledPerson' }),
      label() {
        if (this.person) {
          return `<span>${this.person.birthYear}</span><span style="padding:3em;">${this.person.name}</span><span>${this.person.deathYear || '...'}</span>`
        }
      },
      intro() {
        return this.detailledPerson && this.detailledPerson.intro
      },
      imgUrl() {
        return this.detailledPerson && this.detailledPerson.imgUrl
      },
      url() {
        return this.detailledPerson && this.detailledPerson.url
      },
      properties() {
        return this.detailledPerson && groupBy(this.detailledPerson.properties, 'type')
      },
      propertyKeys() {
        return this.properties && Object.keys(this.properties)
      },
      tabs() {
        if (!this.propertyKeys) return
        const first = this.propertyKeys.slice(0, 5)
        const second = this.propertyKeys.slice(5)
        return first.includes(this.currentPropertyKey)
          ? { primary: first, secondary: second }
          : { primary: second, secondary: first }
      },
      currentPropertyValues() {
        return this.currentPropertyKey && this.properties[this.currentPropertyKey]
      },
    },
    watch: {
      propertyKeys() {
        this.currentPropertyKey = this.propertyKeys
          && this.propertyKeys.length
          && this.propertyKeys[0]
      },
    },
  }
</script>

<style scoped>

  .properties {
    margin-top: 1em;
    display: flex;
    flex-direction: row;

    border: var(--panel-border);
  }

  .label {
    font-weight: bold;
  }

  .intro {
    overflow-y: hidden;
    margin: 1em 0 0 0;
  }

  .properties-list {
    background-color: var(--back-color);
    border-right: var(--panel-border)
  }

  .properties-list-secondary {
    flex: 0;
  }

  .property-key-item {
    padding: 0.5em;
    cursor: pointer;
  }

  .property-key-item-current {
    padding: 0.5em;

    font-weight: bolder;
    background-color: var(--tile-color);
  }

  .property-values {
    padding: 0.5em;
  }

  .panelImg {
    display: flex;
    align-items: center;
    flex-direction: column;
  }

  .person-img {
    max-width: var(--img-max-width);
    max-height: var(--img-max-height);
  }

</style>