
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { ISocketItem } from "./interfaces";

@Injectable()
export class MockSocketService {
    private name:string;
    private port:number = 8080;
    private host:string = window.location.protocol + "//" + window.location.hostname + ":";
    socket: {};

    constructor() {}

    // Get items observable
    get(name: string): Observable<any> {
        this.name = name;
        let socketUrl = this.host + this.port + "/api" + this.name;
        
        // Return observable which follows "create" and "remove" signals from socket stream
        return Observable.create((observer: any) => {});
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
    }

    // Remove signal
    remove(name: string){}

    private connect(){}
    private disconnect(){}
}