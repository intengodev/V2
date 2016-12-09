
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
        //console.log('Attempting to connect socket to: ' + socketUrl);

        this.socket = io.connect(socketUrl);

        this.socket.on("connect", () => this.connect());
        this.socket.on("disconnect", () => this.disconnect());
        this.socket.on("error", (error: string) => {
            console.log(`ERROR: "${error}" (${socketUrl})`);
        });

        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {
            //TODO: Delegate here & improve messages
            let name        = this.name.slice(1);
            let success_msg = `${name}:success`;
            let err_msg     = `${name}:error`;
            
            console.log('listening for: ', success_msg);

            this.socket.on(success_msg, (item: any) => observer.next({ action: success_msg, item: item }) );
            this.socket.on(err_msg, (item: any)     => observer.next({ action: err_msg, item: item }) );
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
    
    //Fetch an asset collection from a socket
    fetch(asset_type: string, project_id){
        let dto:any     = {};
        dto.project_id  = project_id;
        dto.msg         = `fetch:${asset_type}`;

        //console.log('emitting msg: ', dto);
        this.socket.emit(dto.msg, dto);
    }

    // Create signal
    save(dto: any) {
        let prefix = this.resolveEmissionPrefix(dto)
        let msg    = `${prefix}:save`;

        //console.log(`emitting ${msg} with: `, dto);
        this.socket.emit(msg, dto);
    }

    // Remove signal
    remove(name: string) {
        this.socket.emit("remove", name);
    }

    // Handle connection opening
    //TODO: Consider putting the initial fetch here instead of having to do a seperate call
    private connect() {
        window['socket'] = this.socket;
        //console.log(`Connected to "${this.name}"`);

        // Request initial list when connected
        this.socket.emit("list");
    }

    // Handle connection closing
    private disconnect() {
        console.log(`Disconnected from "${this.name}"`);
    }
}