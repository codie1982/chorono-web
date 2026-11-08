/** Adds four staggered personality gestures to one closed 8 s idle loop.
 * MCP authoring only. Mutates the supplied parent-local logical-pixel pose, never scene data.
 * Feet/root remain planted; spline limbs and body transforms perform the gestures.
 * Requires the smooth sample(t, stops) helper in author-motion.js.
 */
function decorateIdle(s,i,t,p){
  const centers=[1550,3500,5200,6800];
  p.blink=1-.94*Math.max(0,1-Math.abs(t-centers[i])/80);
  if(i===0){
    const wave=sample(t,[[0,0],[600,0],[950,1],[1650,1],[2100,0],[8000,0]]);
    const bounce=sample(t,[[0,0],[600,0],[850,4],[1050,-5],[1350,3],[1650,-3],[2100,0],[8000,0]]);
    p.bodyY+=bounce;p.sy-=bounce*.007;p.sx+=bounce*.004;
    p.hands[0]=[p.hands[0][0]+(-s.w/2-24-p.hands[0][0])*wave,p.hands[0][1]+(-s.h*.82-p.hands[0][1])*wave];
    p.wrist[0]+=Math.sin((t-950)/95)*24*wave;p.smile+=wave*.18;
  }
  if(i===1){
    const stretch=sample(t,[[0,0],[2400,0],[2800,.7],[3100,1],[3500,.7],[3900,0],[8000,0]]);
    p.sy+=stretch*.065;p.sx-=stretch*.025;p.bodyY-=stretch*3;
    p.hands=p.hands.map((h,j)=>[h[0]+((j===0?-1:1)*(s.w/2+25)-h[0])*stretch,h[1]+(-s.h*.77-h[1])*stretch]);
    p.wrist=[p.wrist[0]-stretch*20,p.wrist[1]+stretch*20];
    p.tip+=sample(t,[[0,0],[2600,0],[2800,-8],[3100,14],[3400,-10],[3650,5],[4100,0],[8000,0]]);
  }
  if(i===2){
    const jelly=sample(t,[[0,0],[4300,0],[4750,1],[5200,1],[5750,0],[8000,0]]);
    p.sx+=jelly*.10;p.sy-=jelly*.075;p.smile+=jelly*.25;
    p.hands=p.hands.map((h,j)=>[h[0]+((j===0?-38:38)-h[0])*jelly,h[1]+(-44-h[1])*jelly]);
    p.leafL+=Math.sin((t-4300)/180)*8*jelly;p.leafR+=Math.sin((t-4300)/180-.7)*7*jelly;
  }
  if(i===3){
    const tap=sample(t,[[0,0],[6050,0],[6400,1],[6900,1],[7300,0],[8000,0]]);
    p.scanX=sample(t,[[0,0],[6000,0],[6200,-7],[6420,-7],[6600,7],[6800,7],[7100,0],[8000,0]]);
    p.hands[1]=[p.hands[1][0]+(12-p.hands[1][0])*tap,p.hands[1][1]+(-44-p.hands[1][1])*tap];
    p.aerial+=sample(t,[[0,0],[6000,0],[6200,-12],[6500,12],[6800,-5],[7100,3],[7300,0],[8000,0]]);
    p.signalOpacity=sample(t,[[0,1],[6050,1],[6350,.35],[6650,1],[6950,.55],[7250,1],[8000,1]]);
  }
  return p;
}
