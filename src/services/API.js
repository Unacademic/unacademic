import axios from 'axios';
import R from 'ramda';
import _ from 'lodash';
import Waypoint from '../models/Waypoint';

import way from '../waypoints/find_your_way.yml';
way.id = 1;

import dwell from '../waypoints/learn_to_dwell.yml';
dwell.id = 2;

import reinvent from '../waypoints/prevent_wheel_reinvention.yml';
reinvent.id = 3;

import share from '../waypoints/share_your_stuff.yml';
share.id = 4;

class API {

  constructor(baseUrl){
    this.baseUrl = baseUrl;
    this.get = this.get.bind(this);
    this.waypoints = this._getAll();
    this.resourceUrl = '';
    this.data = '';
  }

  async get(levels){
    let levels = this._getLevels(levels);
    let level = this._filterLevelData(levels);
    return level;
  }

  async getResourceData(url){
    if(url !== this.resourceUrl){
      this.resourceUrl = url;
      let encodedUrl = encodeURIComponent(this.resourceUrl)
      let apiUrl = 'http://api.embed.ly/1/extract?key=5406650948f64aeb9102b9ea2cb0955c&url=' + encodedUrl;
      let response = await axios.get(apiUrl);
      this.data = response.data;
    }
    return this.data;
  }

  _getAll(){
    let apiData = [way, dwell, reinvent, share];

    // let url = `${this.baseUrl}/waypoints.json`;

    // try {
    //   let response = await axios.get(url);
    //   let waypointsData = R.unnest(R.map((userpoints) => R.values(userpoints), R.values(response.data)));
    //   apiData = waypointsData;
    // }

    // catch (e) {
    //   apiData = [unacademic1];
    // }

    return R.map((item) => new Waypoint(item), apiData);
  }

  updateProp(data){

    let one = this._getLevels(data);
    let two = this._filterLevelData(one);

    two.model.complete = two.model.complete ? false : true;

    if(two.type === 'checkpoint') {
      console.log('checkpoint');
      R.map(function (res) {
        // this doesn make much sense... only when set to true...
        res.complete = two.model.complete;
      }, two.model.resources);
    } else if(two.type === 'resource') {
      console.log('resource');
      let all_completed = true;
      R.map(function (res) {
        all_completed = all_completed && (res.complete ? true : false);
      }, one.checkpoint.resources);
      one.checkpoint.complete = all_completed;
    }


    // check if we are fullfiling the 

  }

  updateCriteria({levels, criterium}){
    let levelData = this._getLevels(levels);
    let level = this._filterLevelData(levelData);
    let propName = Object.keys(criterium.property)[0];
    level.model.criteria[propName] = criterium.property[propName];
  }

  _getLevels(levels){
    let waypoints = this.waypoints;
    let waypointId = levels.waypoint && levels.waypoint.id;
    let waypoint = R.find(R.propEq('id', waypointId), waypoints);
    let checkpointId = levels.checkpoint && levels.checkpoint.id;
    let checkpoint = waypoint && R.find(R.propEq('id', checkpointId), waypoint.checkpoints);
    let resourceId = levels.resource && levels.resource.id;
    let resource = checkpoint && R.find(R.propEq('id', resourceId), checkpoint.resources);
    return { waypoints, waypoint, checkpoint, resource };
  }

  _filterLevelData(levels){
    let levelNames = ['resource', 'checkpoint', 'waypoint', 'waypoints'];

    let levelData = R.map((type) => {
      return levels[type] && { type, model: levels[type] }
    }, levelNames);

    return R.reject(R.isNil, levelData)[0];
  }

}

export default API;
