const axios = require('axios');
const eventsUrl = '/events';
const listingsUrl = '/listings';
var uniqid = require('uniqid');
const elasticsearch = require('elasticsearch');
const client = new elasticsearch.Client({
  host: 'localhost:9200'
});

function postClickToEvents(listingId) {
  // axios.post(eventsUrl + '/clicks', {id: listingId})
  //   .catch((err) => '')
  return ''

}
module.exports.postClickToEvents = postClickToEvents;

function postListingToEvents(listingData) {
  // axios.post(eventsUrl + '/add', listingData)
  //   .catch(err => '');
  return ''
}
module.exports.postListingToEvents = postListingToEvents;

function postListingToListings(listingData) {
  axios.post(listingsUrl + '/add', listingData) 
    .catch(err => '');
}
module.exports.postListingToListings = postListingToListings;

function Queue(){
  this.add = function() {
    let storage = [];
    let isSetTimeoutCalled = false;
    return function(item){
      const id = uniqid('listings-');
      const elasticCreateObj = {
        create: {
          _index: 'listings',
          _type: 'doc',
          _id: id
        }
      };
      storage.push(elasticCreateObj);
      storage.push(item);
      if (!isSetTimeoutCalled) {
        isSetTimeoutCalled = true;
        setTimeout(() => {
          const storageCopy = storage;
          storage = [];
          isSetTimeoutCalled = false;
          //send to elasticsearch;
          // console.log('storageCopy: ', storageCopy);
          // console.log('storage: ', storage);
          client.bulk({
            body: storageCopy
          }, function(err, res) {
            if(err) {
             console.log('elastic error!')
            }
          })
        }, 200);
      };
    }
  }();
}
 module.exports.queue = new Queue();

