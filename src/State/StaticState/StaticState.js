import responce from '../../Services/responseService'
import config from '../../config'

class StaticState{

    async getStatistic(){
        const result = await responce.responseApiServer(config.URL_GET_STATISTIC)

        if(!result.warning)
            return result.data
        return []
    }
}

export default new StaticState()