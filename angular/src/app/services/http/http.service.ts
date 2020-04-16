import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class HttpService {
	constructor(
		private _client: HttpClient, 
		private _uri: string
	) {}
	uri_set(uri: string): void {
		this._uri = uri;
	}
	uri_get(): string {
		return this._uri;
	}
	get_async(path: string) {
		return this._client.get(`${this._uri}/${path}`);
	}
	post_async(path: string, body: any) {
		return this._client.post(`${this._uri}/${path}`, body);
	}
	put_async(path: string, body: any) {
		return this._client.put(`${this._uri}/${path}`, body);
	}
	delete_async(path: string) {
		return this._client.delete(`${this._uri}/${path}`);
	}
}