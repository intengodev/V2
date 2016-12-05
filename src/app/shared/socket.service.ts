
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import * as io from "socket.io-client";

import { ISocketItem } from "./interfaces";

@Injectable()
export class SocketService {
    private name:string;
    private port:number = 8080;
    private host:string = window.location.protocol + "//" + window.location.hostname + ":";
    socket: SocketIOClient.Socket;

    constructor() {}

    // Get items observable
    get(name: string): Observable<any> {
        this.name = name;
        let socketUrl = this.host + this.port + "/api" + this.name;
        console.log('Attempting to connect socket to: ' + socketUrl);
        this.socket = io.connect(socketUrl);

        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            this.socket.on("item:save:success", (item: any) => observer.next({ action: "item:save:success", item: item }) );
            this.socket.on("item:save:error", (item: any) => observer.next({ action: "item:save:error", item: item }) );
            return () => this.socket.close();
        });
    }

    resolveEmissionPrefix(dto){
        let prefix;

        switch(dto.selection_type){
            case 'multi':
            case 'single':
                prefix = 'question';
            break;

            default:
                prefix = 'page';
            break;
        }
        
        return prefix;
    }

    // Create signal
    save(dto: any) {
        let prefix = this.resolveEmissionPrefix(dto)
        let msg    = `${prefix}:save`;

        console.log(`emitting ${msg} with: `, dto);
        this.socket.emit(msg, dto);
    }

    // Remove signal
    remove(name: string) {
        this.socket.emit("remove", name);
    }

    // Handle connection opening
    private connect() {
        window['socket'] = this.socket;
        console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("list");
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}