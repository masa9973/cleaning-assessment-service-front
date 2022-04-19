import { Auth } from '@aws-amplify/auth'
import { ChillnnTrainingError, ErrorCode, Scalars } from 'cleaning-assessment-service-abr'

class AuthInteractor {
    public async isSignIn(): Promise<boolean> {
        try {
            await Auth.currentAuthenticatedUser({
                bypassCache: false,
            })
            return true
        } catch (err) {
            return false
        }
    }

    public async signIn(email: Scalars['AWSEmail'], password: string) {
        return await Auth.signIn(email, password)
    }

    public async completeNewPassword(user: any, password: string) {
        return await Auth.completeNewPassword(user, password, {})
    }

    public async signOut() {
        await Auth.signOut()
    }

    public async signUp(email: Scalars['AWSEmail'], password: string) {
        await Auth.signUp({
            username: email,
            password,
        })
    }

    public async signUpConfirmed(
        email: Scalars['AWSEmail'],
        confirmationCode: string
    ) {
        await Auth.confirmSignUp(email, confirmationCode)
    }

    public async signUpResend(email: Scalars['AWSEmail']): Promise<void> {
        await Auth.resendSignUp(email)
    }

    public async resetPassword(
        oldPassword: string,
        newPassword: string
    ): Promise<void> {
        const user = await Auth.currentUserInfo()
        await Auth.changePassword(user, oldPassword, newPassword)
    }

    public async forgotPassword(email: Scalars['AWSEmail']): Promise<void> {
        await Auth.forgotPassword(email)
    }

    public async resetPasswordConfirm(
        email: Scalars['AWSEmail'],
        code: string,
        newPassword: string
    ): Promise<void> {
        await Auth.forgotPasswordSubmit(email, code, newPassword)
    }

    public errorHandle(err: Error): ChillnnTrainingError | string {
        // Auth
        switch (err.name) {
            // Auth
            case "UsernameExistsException":
                return new ChillnnTrainingError(ErrorCode.chillnnTraining_email_already_exists);
            case "CodeMismatchException":
                return new ChillnnTrainingError(ErrorCode.chillnnTraining_code_mismatch);
            case "UserNotConfirmedException":
                return new ChillnnTrainingError(ErrorCode.chillnnTraining_user_not_confirmed);
            case "InvalidParameterException":
                switch (err.message) {
                    case "Cannot reset password for the user as there is no registered/verified email or phone_number":
                        return new ChillnnTrainingError(ErrorCode.chillnnTraining_user_not_confirmed);
                    }
                }
            return "Incorrect Mail or Pass"
    }
}

export const authInteractor = new AuthInteractor()