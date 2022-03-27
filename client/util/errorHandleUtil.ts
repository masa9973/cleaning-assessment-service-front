import { ChillnnTrainingError, ErrorCode } from 'cleaning-assessment-service-abr'
import { authInteractor } from '~/driver/amplify/auth'
import { IInfoObject } from '~/store/modules/info'

export function errorHandle(err: ChillnnTrainingError): IInfoObject {
    if (process.env.ENV === 'dev' || !process.env.ENV) {
        // tslint:disable-next-line: no-console
        // eslint-disable-next-line no-console
        authInteractor.errorHandle(err)
        console.error(err)
    }
    return {
        type: 'ERROR',
        errCode: err.chillnnErrorCode as ErrorCode,
        message: err.getMessage(),
    }
}