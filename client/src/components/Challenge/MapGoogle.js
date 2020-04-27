import React, { useState, useEffect } from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from 'react-google-maps'
import { Grid, Container, Segment, Accordion, Header, Icon, Label, Form } from 'semantic-ui-react'
import gMap from '../../api/gMap'
import pin from '../../asset/icon/point.png'
import { Search, Placeholder } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'

const MapGoogle = (props) => {

    const [pos, setPos] = useState({
        lat: 13.698309125709724,
        lng: 100.77285383179465
    })

    const [addr, setAddr] = useState('')
    useEffect(() => {
        initMap()
    }, [])

    const initMap = () => {


        var map = new gMap.Map(document.getElementById(`${props.name}.id`), {
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
        var input = document.getElementById(`${props.name}.search`)
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
                map.setZoom(16)
                map.setCenter(results[0].geometry.location)
                marker.setPosition(results[0].geometry.location)
                setAddr(results[0].formatted_address)
                setPos({ lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() })
                props.dispatch(props.change(`${props.name}.latlng`, { lat: results[0].geometry.location.lat(), lng: results[0].geometry.location.lng() }))
            })

        })

        gMap.event.addListener(marker, 'dragend', function () {
            geocoder.geocode({ 'location': marker.getPosition() }, function (results, status) {
                if (status == 'OK') {
                    setAddr(results[0].formatted_address)
                    props.dispatch(props.change(`${props.name}.extra`, { address: results[0].formatted_address }))
                } else {
                    setAddr("Nothing")
                    props.dispatch(props.change(`${props.name}.extra`, ""))
                }
            })
            map.setCenter(marker.getPosition())
            setPos({ lat: marker.getPosition().lat(), lng: marker.getPosition().lng() })
            props.dispatch(props.change(`${props.name}.latlng`, { lat: marker.getPosition().lat(), lng: marker.getPosition().lng() }))
            map.setZoom(16)
        })

        gMap.event.addListener(map, 'center_changed', function () {
            geocoder.geocode({ 'location': map.center }, function (results, status) {
                if (status == 'OK') {
                    setAddr(results[0].formatted_address)
                    props.dispatch(props.change(`${props.name}.extra`, results[0].formatted_address))
                } else {
                    setAddr("Nothing")
                    props.dispatch(props.change(`${props.name}.extra`, ""))
                }
            })
            marker.setPosition(map.getCenter())
            setPos({ lat: map.getCenter().lat(), lng: map.getCenter().lng() })
            props.dispatch(props.change(`${props.name}.latlng`, { lat: map.getCenter().lat(), lng: map.getCenter().lng() }))

        })

        gMap.event.addListener(map, 'click', function (res) {
            geocoder.geocode({ 'location': res.latLng }, function (results, status) {
                if (status == 'OK') {
                    setAddr(results[0].formatted_address)
                    props.dispatch(props.change(`${props.name}.extra`, results[0].formatted_address))
                } else {
                    setAddr("Nothing")
                    props.dispatch(props.change(`${props.name}.extra`, ""))
                }
            })
            marker.setPosition(res.latLng)
            setPos({ lat: res.latLng.lat(), lng: res.latLng.lng() })
            props.dispatch(props.change(`${props.name}.latlng`, { lat: res.latLng.lat(), lng: res.latLng.lng() }))

        })
    }


    return (
        <React.Fragment>
            <div id={`${props.name}`} >

                {
                    props.show ?
                        <React.Fragment>
                            <Field
                                name={`${props.name}.extra`}
                                component='input'
                                label="สถานที่"
                                id={`${props.name}.search`}
                            />
                            <div id={`${props.name}.id`}
                                style={{ width: '100%', height: '350px' }}
                            />
                        </React.Fragment>
                        :
                        <React.Fragment>
                            <Field
                                name={`${props.name}.extra`}
                                component='input'
                                label="สถานที่"
                                id={`${props.name}.search`}
                                style={{ width: '.1px', height: '.1px', visibility: 'hidden' }}
                            />
                            <div id={`${props.name}.id`}
                                style={{ width: '.1px', height: '.1px', visibility: 'hidden' }}
                            />
                        </React.Fragment>
                }




                {/* <h2>Latitude: {pos.lat} , Longitude: {pos.lng}</h2>
                <p>Location: {
                    addr === 'Nothing' ?
                        "Not Found"
                        : addr}
                </p> */}
            </div>
        </React.Fragment>
    )

}

export default reduxForm({
    form: 'challengeForm'
})(MapGoogle)