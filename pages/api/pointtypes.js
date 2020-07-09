export default (req, res) => {
    res.statusCode = 200
    // "Treasure",
    // "POI",
    // "Cave",
    // "Town",
    // "Shipwreck"
    res.json({ types: ['POI','Encounter','Cave','Dungeon','Town','Shipwreck'] })
  }