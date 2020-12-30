import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const handle = new Vuex.Store({
    state: {
        toolTip: (button) => {
        const toolTip = document.getElementById(button.name + '-tool-tip')
        if (toolTip) {
            toolTip.className = 'tool-tip'

            if (button.income == 0) {
            toolTip.innerHTML = '-' + button.price + ' ' + button.elemLoss;
            } else if (button.price > 0) {
            toolTip.innerHTML = '-' + button.price + ' ' + button.elemLoss + '<br>' + '+' + button.income + ' ' + button.elemGain;
            } else {
            toolTip.innerHTML = '+' + button.income + ' ' + button.elemGain;
            }
        }
        },
        toolTipOff: (button) => {
        if (document.getElementById(button.name + '-tool-tip')) {
            document.getElementById(button.name + '-tool-tip').className = 'null';
        }
        }
    },
    mutations: {
        massIncreas (state, name) {
            let initial = state.Space[name].initial
            state.Space[name].income = initial * state.Elements['mass'].amount
        }
    }
})

export default handle