export default (req, res) => {
    res.statusCode = 200
    // "Treasure",
    // "POI",
    // "Cave",
    // "Town",
    // "Shipwreck"
    res.json({ visibility: ['DM','Player','Public',"Cats"] })
  }