import { USER_ROLE } from "./user.constant"

export type TUsers = {
    email: string
    role: string
    contactNo: string
}

export type TUserRole = keyof typeof USER_ROLE