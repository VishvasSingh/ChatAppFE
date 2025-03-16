export interface LoginPostResponse {
    access_token: string;
    token_type: string;
}

export interface LoginGetResponse {
    user_name: string
    user_id: string
}