import {
    ModelFactory,
    RecordModel,
    RepositoryContainer,
    CleanerUsecase,
    ScoreUsecase,
} from 'cleaning-assessment-service-abr'
import { recordMastRepository } from './modules/GraphqlRecordMastRepository'
import { userMastRepository } from './modules/GraphqlUserMastRepository'
import { s3Repository } from './modules/S3Repository'
import { scoreMastRepository } from './modules/GraphqlScoreMastRepository'
import { hotelMastRepository } from './modules/GraphqlHotelMastRepository'
import { roomMastRepository } from './modules/GraphqlRoomMastRepository'
import { scoreItemMastRepository } from './modules/GraphqlScoreItemMastRepository'

const repositoryContainer = new RepositoryContainer(
    s3Repository,
    userMastRepository,
    recordMastRepository,
    scoreMastRepository,
    hotelMastRepository,
    roomMastRepository,
    scoreItemMastRepository,
)

const modelFactory = new ModelFactory(repositoryContainer)

export const userInteractor = new CleanerUsecase(
    repositoryContainer,
    modelFactory
)

export const scoreInteractorFactory = (recordModel: RecordModel) => {
    return new ScoreUsecase(repositoryContainer, modelFactory, recordModel)
}
