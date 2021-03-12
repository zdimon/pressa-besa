import { AuthProvider } from 'ra-core';
export interface Options {
    obtainAuthTokenUrl?: string;
}
declare function tokenAuthProvider(options?: Options): AuthProvider;
export declare function createOptionsFromToken(): {
    user?: undefined;
} | {
    user: {
        authenticated: boolean;
        token: string;
    };
};
export declare function fetchJsonWithAuthToken(url: string, options: object): Promise<{
    status: number;
    headers: Headers;
    body: string;
    json: any;
}>;
export default tokenAuthProvider;
