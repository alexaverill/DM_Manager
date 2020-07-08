let MapPoint = require('../models/MapPoint');
test('1+1 equals 2', ()=>{
    let t =1;
    let y =1;
    let z = t+y;
    expect(z).toBe(2);
});
test('Initialization of MapPoint',()=>{
    let m = new MapPoint.MapPoint();
    expect(m.x).toBe(0);
    expect(m.y).toBe(0);
    expect(m.name).toMatch(/^$/);
});
test('Mappoint X only accepts positive numbers',()=>{
    let m = new MapPoint.MapPoint();
    m.x = 1
    expect(m.x).toBe(1);
    m.x = -1;
    expect(m.x).not.toBe(-1);
    m.x = 0; 
    expect(m.x).toBe(0);
});
test('Mappoint Y only accepts positive numbers',()=>{
    let m = new MapPoint.MapPoint();
    m.y = 1
    expect(m.y).toBe(1);
    m.y = -1;
    expect(m.y).not.toBe(-1);
    m.y = 0; 
    expect(m.y).toBe(0);
});