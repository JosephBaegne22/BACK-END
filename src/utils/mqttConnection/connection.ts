import * as mqtt from 'mqtt';

const connectUrl = `mqtt://${process.env.MQTT_HOST}:${process.env.MQTT_PORt}`

export const mqtt_connection = mqtt.connect(connectUrl, {
    clean: true,
});