
import { mapState } from 'vuex'
const mixin = {
  computed: {
    ...mapState({
      primaryColor: state => state.app.color,
    })
  },
}



export { mixin }
