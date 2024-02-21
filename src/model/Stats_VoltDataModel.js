export default class StatsVoltDataModel {
  constructor(date, time, voltage, station) {
    this.date = date;
    this.time = time;
    this.voltage = voltage;
    this.station = station;
  }

  /*static fromJson(Json) {
    return new StatsVoltDataModel(Json.date, Json.time, Json.voltage, Json.station);
  }*/

  // You can add methods or additional functionality here if needed.
}

