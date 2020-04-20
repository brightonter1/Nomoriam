import React, { useState, useEffect } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { Grid, Container, Segment } from 'semantic-ui-react'
import gMap from '../../api/gMap'
import pin from '../../asset/icon/point.png'
import { Search, Placeholder } from 'semantic-ui-react'

const MapGoogle = (props) => {

    const [pos, setPos] = useState({
        lat: 13.75398,
        lng: 100.50144
    })

    const [addr, setAddr] = useState('')

    useEffect(() => {
        initMap()
    }, [])

    const initMap = () => {
        var map = new gMap.Map(document.getElementById('map'), {
            zoom: 10,
            center: pos,
            disableDefaultUI: true
        })

        var icon = {
            url: pin,
            scaledSize: new gMap.Size(50, 50)
        }

        var marker = new gMap.Marker({
            position: pos,
            map: map,
            title: 'Hello World!',
            draggable: true,
            animation: gMap.Animation.DROP,
            icon: icon
        });

        if (window.navigator.geolocation) {
            window.navigator.geolocation.getCurrentPosition(function (position) {
                if (position.coords.latitude != pos.lat) {
                    setPos({ lat: position.coords.latitude, lng: position.coords.longitude })
                    infoWindow.setPosition(pos)
                    map.setCenter(pos);
                }
            })
        }

        var infoWindow = new gMap.InfoWindow
        var geocoder = new gMap.Geocoder;
        var input = document.getElementById('search')
        var autocomplete = new gMap.places.Autocomplete(input)
        autocomplete.bindTo('bounds', map)
        autocomplete.setFields(['place_id', 'geometry', 'name', 'formatted_address']);

        autocomplete.addListener('place_changed', function () {
            infoWindow.close()
            var place = autocomplete.getPlace()

            if (!place.place_id) {
                return;
            }

            geocoder.geocode({ 'placeId': place.place_id }, function (results, status) {
                if (status !== 'OK') {
                    return;
                }
                map.setZoom(14)
                map.setCenter(results[0].geometry.location)
                marker.setPosition(results[0].geometry.location)
                setPos({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
            })

        })

        gMap.event.addListener(marker, 'dragend', function () {
            geocoder.geocode({ 'location': marker.getPosition() }, function (results, status) {
                if (status == 'OK') {
                    setAddr(results[0].formatted_address)
                } else {
                    setAddr("Nothing")
                }
            })
            map.setCenter(marker.getPosition())
            setPos({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() })
            map.setZoom(16)
        })

        gMap.event.addListener(map, 'center_changed', function () {
            geocoder.geocode({ 'location': map.center }, function (results, status) {
                if (status == 'OK') {
                    setAddr(results[0].formatted_address)
                } else {
                    setAddr("Nothing")
                }
            })
            marker.setPosition(map.getCenter())
            setPos({ lat: map.getCenter().lat(), lng: map.getCenter().lng() })
        })

        gMap.event.addListener(map, 'click', function (res) {
            geocoder.geocode({ 'location': res.latLng }, function (results, status) {
                if (status == 'OK') {
                    setAddr(results[0].formatted_address)
                } else {
                    setAddr("Nothing")
                }
            })
            marker.setPosition(res.latLng)
            setPos({ lat: res.latLng.lat(), lng: res.latLng.lng() })
        })

    }

    return (
        <div>
            <Segment>
                <Search
                    id="search"
                />
                <div id="map" style={{ width: '100%', height: '450px' }} />
                <h2>Latitude: {pos.lat} , Longitude: {pos.lng}</h2>
                <p>Location: {
                    addr === 'Nothing' ?
                        "Not Found"
                        : addr}
                </p>
            </Segment>
        </div>
    )

}

export default MapGoogle