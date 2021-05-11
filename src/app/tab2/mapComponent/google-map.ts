import { Component, OnInit, Input, Renderer2, ElementRef, Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Plugins } from '@capacitor/core';
import { EmitterService } from '../../../services/emitter-service';
const { Geolocation, Network, Storage } = Plugins;
declare var google;

@Component({
    selector: 'google-map',
    templateUrl: 'google-map.html'
})

@Injectable()
export class GoogleMapComponent implements OnInit {

    // tslint:disable-next-line:no-input-rename
    @Input('apiKey') apiKey: string;
    @Input() heatMapList: string;

    public map: any;
    public heatmap: any;
    public markers: any[] = [];
    public mapsLoaded = false;
    public networkHandler = null;
    public lat;
    public lng;
    public heatMapPoints: any[] = [];
    rawData: any;



    constructor(
        private renderer: Renderer2,
        private element: ElementRef,
        // tslint:disable-next-line:variable-name
        @Inject(DOCUMENT) private _document) { }

    ngOnInit() {

        EmitterService.setheatMap(this.heatMapList).subscribe(()=>{
            this.asignValues();
            this.init().then((res) => {
                console.log('Google Maps ready.');
            }, (err) => {
                console.log(err);
            });
        })
        
    }

    private async asignValues(): Promise<any>{

        return new Promise(async (resolve, reject) => {

            const { value } = await Storage.get({ key: 'heatMapArray' });
            localStorage.setItem("heatMapArrayLocal", value)
            if(value !== null){
                var emmiterVal = JSON.parse(value);
                emmiterVal.forEach(element => {
                    this.heatMapPoints.push({location: new google.maps.LatLng(element.latitud, element.longitud), weight: 3})
                });
            }

        });
        
    }


    public init(): Promise<any> {

        return new Promise((resolve, reject) => {

            this.loadSDK().then((res) => {

                // tslint:disable-next-line:no-shadowed-variable
                this.initMap().then((res) => {
                    resolve(true);
                }, (err) => {
                    reject(err);
                });

            }, (err) => {

                reject(err);

            });

        });

    }

    public loadSDK(): Promise<any> {

        console.log('Loading Google Maps SDK');

        return new Promise((resolve, reject) => {

            if (!this.mapsLoaded) {

                Network.getStatus().then((status) => {

                    if (status.connected) {

                        this.injectSDK().then((res) => {
                            resolve(true);
                        }, (err) => {
                            reject(err);
                        });

                    } else {

                        if (this.networkHandler == null) {

                            // tslint:disable-next-line:no-shadowed-variable
                            this.networkHandler = Network.addListener('networkStatusChange', (status) => {

                                if (status.connected) {

                                    this.networkHandler.remove();

                                    this.init().then((res) => {
                                        console.log('Google Maps ready.');
                                    }, (err) => {
                                        console.log(err);
                                    });

                                }

                            });

                        }

                        reject('Not online');
                    }

                }, (err) => {

                    // NOTE: navigator.onLine temporarily required until Network plugin has web implementation
                    if (navigator.onLine) {

                        this.injectSDK().then((res) => {
                            resolve(true);
                            // tslint:disable-next-line:no-shadowed-variable
                        }, (err) => {
                            reject(err);
                        });

                    } else {
                        reject('Not online');
                    }

                });

            } else {
                reject('SDK already loaded');
            }

        });


    }

    public injectSDK(): Promise<any> {

        return new Promise((resolve, reject) => {

            // tslint:disable-next-line:no-string-literal
            window['mapInit'] = () => {
                this.mapsLoaded = true;
                resolve(true);
            };

            const script = this.renderer.createElement('script');
            script.id = 'googleMaps';

            if (this.apiKey) {
                script.src = 'https://maps.googleapis.com/maps/api/js?key=' + this.apiKey + '&libraries=visualization&callback=mapInit';
            } else {
                script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
            }

            this.renderer.appendChild(this._document.body, script);

        });

    }

    public initMap(): Promise<any> {

        return new Promise((resolve, reject) => {

            Geolocation.getCurrentPosition().then((position) => {

                console.log(position);

                const latLng = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;

                const mapOptions = {
                    center: latLng,
                    zoom: 15,
                    disableDefaultUI: true
                };


                this.map = new google.maps.Map(this.element.nativeElement, mapOptions);


                var newPoints: any[] = [];
                var emmiterVal = JSON.parse(localStorage.getItem("heatMapArrayLocal"));
                emmiterVal.forEach(element => {
                    newPoints.push({location: new google.maps.LatLng(element.latitud, element.longitud), weight: 3})
                });

                this.heatmap = new google.maps.visualization.HeatmapLayer({
                    data: newPoints
                });

                this.heatmap.setMap(this.map);

                resolve(true);

            }, (err) => {

                reject('Could not initialise map');

            });

        });

    }



}
