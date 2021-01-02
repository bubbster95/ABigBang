import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const handle = new Vuex.Store({
    state: {
        toolTip: (button) => {
            const toolTip = document.getElementById(button.path + '-tool-tip')
            if (toolTip) {
                toolTip.className = 'tool-tip'

                const gainKeys = Object.keys(button.gain);
                const lossKeys = Object.keys(button.loss);

                let tipText = '';
                lossKeys.map(loss => {
                    tipText += ('-' + button.loss[loss] + ' ' + loss) + '<br>'
                });
                gainKeys.map(gain => {
                    tipText += ('+' + button.gain[gain] + ' ' + gain) + '<br>'
                });
                toolTip.innerHTML = tipText
            }
        },
        toolTipOff: (button) => {
            if (document.getElementById(button.path + '-tool-tip')) {
                document.getElementById(button.path + '-tool-tip').className = 'null';
            }
        }
    }
})

export default handle