import { ChillnnTrainingError } from 'cleaning-assessment-service-abr'
import { IInfoObject } from '~/store/modules/info'

export function errorHandle(err: ChillnnTrainingError): IInfoObject {
    if (process.env.ENV === 'dev' || !process.env.ENV) {
        // tslint:disable-next-line: no-console
        // eslint-disable-next-line no-console
        console.error(err)
    }
    return {
        type: 'ERROR',
        errCode: err.chillnnErrorCode,
        message: err.getMessage(),
    }
}