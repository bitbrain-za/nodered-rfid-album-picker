# nodered-rfid-album-picker

## Disclaimer

This is just a simple project for me to learn node-red with.

Listens for an RFID tag number on MQTT and outputs a corresponding URI when recognised.

## Usage

Configure your broker.
Give the node the topic to listen to.
Let it run.

## JSON Structure Example


```
{
    "Tags":
    [
        {"tag":"0010154676",  "type":"playlist",  "uri": "spotify:album:7xl50xr9NDkd3i2kBbzsNZ", "name": "Stadium Arcadium"},
        {"tag":"0002697902",  "type":"playlist",  "uri": "spotify:album:3zNi5dCpkbm4zv7h1vGOMy", "name": "Djesse vol2"},
        {"tag":"0002087965",  "type":"playlist",  "uri": "spotify:album:7acEciVtnuTzmwKptkjth5", "name": "Fear Inoculum"},
        {"tag":"0002113195",  "type":"playlist",  "uri": "spotify:album:5bbb7E51zaDCuD85uLyFkK", "name": "Rain Dogs" },
        {"tag":"0002133636",  "type":"playlist",  "uri": "spotify:album:3rGvtZqjmB08fbjEqZl0Ui", "name":"Beethoven"},
        {"tag":"0002530785",  "type":"playlist",  "uri": "spotify:album:7MPJRyMFbWbgezRP2Pj4TZ", "name":"Empath"}
    ]
}
```
