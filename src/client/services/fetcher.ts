import Swal from 'sweetalert2';

type ValidMethods = 'GET' | 'POST' | 'PUT' | 'DELETE';

function fetcher<T = any>(url: string, method: ValidMethods = 'GET', rawData?: any) {
    const headers: HeadersInit = {};

    const options: RequestInit = {
        method,
        headers,
    };

    if (method === 'POST' || method === 'PUT') {
        headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(rawData);
    }

    return new Promise<T>(async (resolve) => {
        try {
            const res = await fetch(process.env.SERVER_URL + '/api/Books', options);
            const data = await res.json();

            if (res.ok) {
                resolve(data);
            } else {
                console.error(`Request to ${url} failed with status ${res.status}`);
                console.error(data);

                Swal.fire({
                    title: 'Server error :(',
                    icon: 'error',
                    text: data.message || 'Unknown error',
                    timer: 6000,
                });
            }
        } catch (error) {
            const err = error as Error;
            console.error(`Network error during request to ${url}`);
            console.error(err);

            Swal.fire({
                title: 'Networking error :(',
                icon: 'error',
                text: err.message || 'Unknown error',
                timer: 6000,
            });
        }
    });
}

export const GET = <T = any>(url: string) => fetcher<T>(url);
export const DELETE = <T = any>(url: string) => fetcher<T>(url, 'DELETE');
export const POST = <T = any>(url: string, data: any) => fetcher<T>(url, 'POST', data);
export const PUT = <T = any>(url: string, data: any) => fetcher<T>(url, 'PUT', data);
