export default class SVGDataModel {
  constructor(tripId, station_name, station_id, reached, station_condition, station_working) {
    this.tripId = tripId;
    this.station_name = station_name;
    this.station_id = station_id;
    this.reached = reached;
    this.station_condition = station_condition;
    this.station_working = station_working;
  }

  /*static fromJson(Json) {
    return new SVGDataModel(Json.trip_id, Json.station_name, Json.station_id, Json.reached, Json.condition, Json.working);
  }*/

  // You can add methods or additional functionality here if needed.
}