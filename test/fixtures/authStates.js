export const initialState = {
    status: 'checking', // 'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined,
}

export const authenticatedState = {
    status: 'authenticated', // 'authenticated', 'not-authenticated'
    user: {
        uid: 'abc',
        name: 'Felipe'
    },
    errorMessage: undefined,
}

export const notAutheticatedState = {
    status: 'not-authenticated', // 'authenticated', 'not-authenticated'
    user: {},
    errorMessage: undefined,
}

