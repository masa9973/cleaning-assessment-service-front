import {
    ModelFactory,
    RecordModel,
    RepositoryContainer,
    CleanerUsecase,
    ScoreUsecase,
} from 'stage3-abr'
import { recordMastRepository } from './modules/GraphqlRecordMastRepository'
import { userMastRepository } from './modules/GraphqlUserMastRepository'
import { s3Repository } from './modules/S3Repository'
import { scoreMastRepository } from './modules/GraphqlScoreMastRepository'
import { hotelMastRepository } from './modules/GraphqlHotelMastRepository'
import { roomMastRepository } from './modules/GraphqlRoomMastRepository'

const repositoryContainer = new RepositoryContainer(
    s3Repository,
    userMastRepository,
    recordMastRepository,
    scoreMastRepository,
    hotelMastRepository,
    roomMastRepository
)

const modelFactory = new ModelFactory(repositoryContainer)

export const userInteractor = new CleanerUsecase(
    repositoryContainer,
    modelFactory
)

// export const scoreInteractorFactory = function (postModel: RecordModel) {
//     return new CommentUsecase(repositoryContainer, modelFactory, postModel);
// }

export const scoreInteractorFactory = (recordModel: RecordModel) => {
    return new ScoreUsecase(repositoryContainer, modelFactory, recordModel)
}
