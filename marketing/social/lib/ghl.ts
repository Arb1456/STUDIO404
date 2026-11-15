/**
 * Minimal GHL Social Planner client. Token and location come from .env.local
 * (GHL_PRIVATE_TOKEN, GHL_LOCATION_ID); the token is never logged.
 */
import { readFileSync } from 'node:fs';
import { basename } from 'node:path';

const BASE = 'https://services.leadconnectorhq.com';
/** Andre's GHL user (posts are created on his behalf). */
export const GHL_USER_ID = '4Y0acd57977BsswSio0T';

export type Platform = 'instagram' | 'facebook' | 'google';
export interface PostInput { accountIds: string[]; summary: string; mediaUrls: string[]; scheduleIso: string }

export interface Ghl {
    listAccounts(): Promise<{ id: string; platform: Platform; name: string }[]>;
    uploadMedia(pngPath: string): Promise<string>;
    createPost(p: PostInput, status?: 'scheduled' | 'draft'): Promise<string>;
    updatePost(id: string, p: Partial<PostInput>): Promise<void>;
    deletePost(id: string): Promise<void>;
}

export function makeGhl(cfg: { token: string; locationId: string; userId?: string; fetchImpl?: typeof fetch }): Ghl {
    const f = cfg.fetchImpl ?? fetch;
    const userId = cfg.userId ?? GHL_USER_ID;
    const headers = { Authorization: `Bearer ${cfg.token}`, Version: '2021-07-28', Accept: 'application/json' };

    async function call<T>(method: string, path: string, body?: unknown): Promise<T> {
        const res = await f(BASE + path, {
            method,
            headers: body instanceof FormData ? headers : { ...headers, 'Content-Type': 'application/json' },
            body: body === undefined ? undefined : body instanceof FormData ? body : JSON.stringify(body),
        });
        const text = await res.text();
        if (!res.ok) throw new Error(`GHL ${method} ${path} → HTTP ${res.status}: ${text.slice(0, 300)}`);
        return (text ? JSON.parse(text) : {}) as T;
    }

    const postBody = (p: Partial<PostInput>) => ({
        ...(p.accountIds && { accountIds: p.accountIds }),
        ...(p.summary !== undefined && { summary: p.summary }),
        ...(p.mediaUrls && { media: p.mediaUrls.map((url) => ({ url, type: 'image/png' })) }),
        ...(p.scheduleIso && { scheduleDate: p.scheduleIso }),
        type: 'post',
        userId,
    });

    return {
        async listAccounts() {
            const r = await call<{ results: { accounts: { id: string; platform: Platform; name: string }[] } }>(
                'GET', `/social-media-posting/${cfg.locationId}/accounts`);
            return r.results.accounts.map(({ id, platform, name }) => ({ id, platform, name }));
        },
        async uploadMedia(pngPath) {
            const form = new FormData();
            form.append('file', new Blob([readFileSync(pngPath)], { type: 'image/png' }), basename(pngPath));
            form.append('name', basename(pngPath));
            const r = await call<{ url: string }>('POST', '/medias/upload-file', form);
            return r.url;
        },
        async createPost(p, status = 'scheduled') {
            const r = await call<{ results: { post: { _id: string } } }>(
                'POST', `/social-media-posting/${cfg.locationId}/posts`, { ...postBody(p), status });
            return r.results.post._id;
        },
        async updatePost(id, p) {
            await call('PUT', `/social-media-posting/${cfg.locationId}/posts/${id}`, { ...postBody(p), status: 'scheduled' });
        },
        async deletePost(id) {
            await call('DELETE', `/social-media-posting/${cfg.locationId}/posts/${id}`);
        },
    };
}

/** Client from .env.local (run scripts with --env-file-if-exists=.env.local). */
export function ghlFromEnv(): Ghl {
    const token = process.env.GHL_PRIVATE_TOKEN, locationId = process.env.GHL_LOCATION_ID;
    if (!token || !locationId) throw new Error('GHL_PRIVATE_TOKEN / GHL_LOCATION_ID missing (run via npm run social:*)');
    return makeGhl({ token, locationId });
}
