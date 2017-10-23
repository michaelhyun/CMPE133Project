import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    products: [
      { title: 'something ' },
      { title: 'another thing ' }
    ],
    aisles: [
      { title: 'Baby Care',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Beverages',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Bread & Bakery',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Breakfast & Cereal',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Canned Goods & Soups',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Condiments, Spice & Bake',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Cookies, Snacks & Candy',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Dairy, Eggs & Cheese',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Deli',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Flowers',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Frozen Foods',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Fruits & Vegetables',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Grains, Pasta & Sides',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'International Cuisine',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Meat & Seafood',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Paper, Cleaning & Home',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Personal Care & Health',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Pet Care',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Tobacco',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      },
      { title: 'Wine, Beer & Spirits',
        src: 'https://www.skymetweather.com/themes/skymet/images/gallery/toplists/10-Must-Follow-Baby-Care-Tips-During-Monsoon/3.jpg',
        flex: 4,
        flex2: 12
      }
    ],
    user: {
      id: 'dvnsljbfn'
    }
  },
  mutations: {

  },
  actions: {

  },
  getters: {
    aisles (state) {
      return state.aisles
    },
    products (state) {
      return state.products.sort((prodA, prodB) => {
        return prodA.title > prodB.title
      })
    },
    product (state) {
      return (productTitle) => {
        return state.products.find((product) => {
          return product.title === productTitle
        })
      }
    }
  }
})
