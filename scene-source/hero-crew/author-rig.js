/** Builds four original native vector rigs on an empty scene. Requires design.js first.
 * Coordinates are logical 960×640, converted once to native 1200×800 pixels.
 * Every limb is a fixed-topology quadratic spline. No bitmap artwork or background is present.
 */
if(scene.layers.length) throw new Error('Use a separate empty scene for the hero rig.');
scene.composition({width:1200,height:800,durationMs:4800,frameRate:30,backgroundColor:'rgba(0,0,0,0)'});
scene.timelines.forEach(t=>scene.deleteTimeline(t.id));

/** Creates a named unanchored native layer with explicit local placement. */
function item(kind,name,parent,x=0,y=0,w,h,color) {
  const l=scene.add(kind);l.patch({name});if(parent)l.parent(parent);
  l.patch({transform:{x:x*S,y:y*S,anchorX:0,anchorY:0,scaleX:1,scaleY:1,rotationDeg:0}});
  if(w!==undefined)l.size=[w*S,h*S];if(color)l.fill=color;return l;
}
/** Creates a transform-only parent with local origin at its character's feet. */
function group(name,parent,x=0,y=0){return item('group',name,parent,x,y);}
/** Creates a rounded shape; radius and dimensions are in logical pixels. */
function round(name,parent,x,y,w,h,color,r=12){const l=item('roundedRect',name,parent,x,y,w,h,color);l.cornerRadius=r*S;return l;}
/** Creates a native ellipse, preserving editable geometry and color. */
function oval(name,parent,x,y,w,h,color){return item('ellipse',name,parent,x,y,w,h,color);}
/** Creates a fixed-topology custom outline from absolute local Bezier anchors. */
function outline(name,parent,w,h,color,anchors){
  const l=scene.addSpline('line',{x1:0,y1:0,x2:1,y2:1},{name});
  const old=Object.keys(l.spline.data.contours);
  l.spline.addContour(anchors.map(a=>({x:a[0]*S,y:a[1]*S,type:'bezierCorner',in:{x:a[2]*S,y:a[3]*S},out:{x:a[4]*S,y:a[5]*S}})),{closed:true});
  old.forEach(id=>l.spline.removeContour(id));l.parent(parent);
  l.patch({transform:{x:-w/2*S,y:-h*S,anchorX:0,anchorY:0,scaleX:1,scaleY:1,rotationDeg:0},style:{fill:{type:'solid',color},stroke:{width:0}}});
  l.size=[w*S,h*S];return l;
}
/** Builds a bowed spline and independently rotatable glove/shoe at its endpoint.
 * The segment and point IDs remain authoritative in native spline data; motion reads them.
 */
function limb(name,parent,x,y,side,hand,color){
  const path=scene.addSpline('line',{x1:0,y1:0,x2:side*12*S,y2:(hand?86:50)*S},{name:name+'.path'});
  path.parent(parent);path.patch({transform:{x:x*S,y:y*S,anchorX:0,anchorY:0},style:{fill:{opacity:0},stroke:{color:limbColor,width:(hand?11:10)*S,lineCap:'round',lineJoin:'round'}}});
  const seg=Object.keys(path.spline.data.segments)[0];path.spline.setQuadraticControl(seg,{x:side*32*S,y:(hand?45:22)*S});
  const end=group(name+'.end',parent,x+side*12,y+(hand?86:50));
  if(hand){
    const glove=round(name+'.palm',end,-19,-22,38,44,paper,name.startsWith('Dot')?11:17);glove.stroke({color:'#6E5C49',width:1.3*S});
    oval(name+'.thumb',end,-24,-2,12,20,paper);
    for(let f=0;f<3;f++)round(name+'.finger'+f,end,-10+f*8,-17,1.5,12,'#D6C9B0',1);
  }else{
    round(name+'.shoe',end,-19,-3,42,18,color,name.startsWith('Dot')?5:9);
    round(name+'.sole',end,-19,10,42,5,paper,2.5);
  }
}
scene.addParam('pointerX',.5,{type:'number',min:0,max:1,name:'Pointer · horizontal'});
scene.addParam('pointerY',.5,{type:'number',min:0,max:1,name:'Pointer · vertical'});
const manifest=[];
specs.forEach((s,i)=>{
  const shadow=oval(s.name+'.shadow',null,s.x-63,542,126,13,'#000000');shadow.opacity=.2;
  const root=group(s.name+'.root',null,s.x,500);
  [-1,1].forEach(side=>limb(s.name+(side<0?'.legL':'.legR'),root,side*s.w*.21,-4,side,false,s.shade));
  const body=group(s.name+'.body',root);
  let silhouette;
  if(s.kind==='pear')silhouette=outline(s.name+'.silhouette',body,s.w,s.h,s.color,[
    [59,0,20,4,96,-2],[144,141,137,71,151,186],[73,211,120,216,24,212],[0,147,-4,190,-3,90]
  ]);
  if(s.kind==='triangle')silhouette=outline(s.name+'.silhouette',body,s.w,s.h,s.color,[
    [87,0,68,0,105,0],[174,251,147,167,183,279],[0,251,-10,282,28,161]
  ]);
  if(s.kind==='puddle')silhouette=outline(s.name+'.silhouette',body,s.w,s.h,s.color,[
    [81,0,42,-3,124,0],[183,45,164,1,201,91],[164,150,190,143,135,165],[30,153,55,166,-3,142],[0,59,-8,102,3,11]
  ]);
  if(s.kind==='robot'){
    silhouette=round(s.name+'.silhouette',body,-s.w/2,-s.h,s.w,s.h,s.color,24);
    round('Dot.side',body,46,-s.h+13,13,s.h-26,s.shade,6);
    round('Dot.screen',body,-56,s.face-33,112,72,'#26374B',17);
    const aerial=group('Dot.aerial',body,0,-s.h+3);
    round('Dot.antenna',aerial,-4,-28,8,32,limbColor,4);
    oval('Dot.signal',aerial,-10,-37,20,20,'#F1C56B');
    for(let j=0;j<3;j++)round('Dot.grill'+j,body,-38,-49+j*9,48-j*7,3,'#D4E7F9',1.5);
    oval('Dot.light',body,29,-42,12,12,'#C1EBBA');
  }
  if(i===0){oval('Pip.belly',body,-35,-67,72,47,'#F59D73');round('Pip.sprout',body,-15,-s.h-12,8,24,paper,4).rotation=-23;}
  if(i===1){
    const pin=item('star','Milo.pin',body,-10,-218,22,22,'#F1C56B');pin.shapeParam('outerRadius',11*S);pin.shapeParam('innerRadius',5*S);
    round('Milo.band',body,-62,-36,124,10,s.shade,5);
  }
  if(i===2){
    oval('Fig.leafL',body,-24,-s.h-18,21,34,'#719D63').rotation=-36;
    oval('Fig.leafR',body,-2,-s.h-25,24,38,'#BEDD9D').rotation=25;
    for(let j=0;j<4;j++)oval('Fig.freckle'+j,body,-50+j*10,-53+(j%2)*7,4,4,'#628A55');
  }
  const face=group(s.name+'.face',body),eyes=group(s.name+'.eyes',face,0,s.face);
  s.eyes.forEach(side=>{
    const eye=group(s.name+'.eye'+side,eyes,side*s.eyeGap,0);
    oval(s.name+'.white'+side,eye,-s.eyeW/2,-s.eyeH/2,s.eyeW,s.eyeH,paper);
    const pupil=oval(s.name+'.pupil'+side,eye,-s.pupilW/2,-s.pupilH/2,s.pupilW,s.pupilH,ink);
    oval(s.name+'.glint'+side,pupil,2,2,3,4,paper);
    scene.wire('pointerX','transform.x',(-s.pupilW/2*S)+' + clamp((source * 1200 - '+s.x*S+') / 300, -1, 1) * 4.5',{targetLayerId:pupil.id});
    scene.wire('pointerY','transform.y',(-s.pupilH/2*S)+' + clamp((source * 800 - '+(500+s.face)*S+') / 260, -1, 1) * 4',{targetLayerId:pupil.id});
  });
  if(i<3)[-1,1].forEach(side=>oval(s.name+'.cheek'+side,face,side*(s.eyeGap+17)-10,s.face+18,21,10,s.shade).opacity=.7);
  const mouth=group(s.name+'.mouth',face,0,s.face+(i===3?48:31));
  const smile=item('arc',s.name+'.smile',mouth,-14,-7,28,17,i===3?paper:ink);
  smile.shapeParam('startAngle',0);smile.shapeParam('endAngle',180);
  smile.patch({style:{fill:{opacity:0},stroke:{color:i===3?paper:ink,width:3.4*S,lineCap:'round'}}});
  [-1,1].forEach(side=>limb(s.name+(side<0?'.armL':'.armR'),body,side*(s.shoulder??(s.w/2-8)),-s.h*.46,side,true,s.shade));
  manifest.push({name:s.name,rootId:root.id,bodyId:body.id,silhouetteId:silhouette.id,pose:'shy-'+s.name.toLowerCase(),eyes:s.eyes,hit:{x:(s.x-s.w/2-20)/960,y:(500-s.h-26)/640,width:(s.w+40)/960,height:(s.h+62)/640}});
});
for(let i=0;i<16;i++){const l=round('Confetti.'+i,null,480,250,5+(i%3)*2,13,['#F1845D','#B1A0F0','#A7CC91','#6EACED','#F1C56B'][i%5],2);l.opacity=0;}
contacts.forEach((c,i)=>{const l=item('star','Contact.'+i,null,c.x-15,c.y-15,30,30,'#F1C56B');l.shapeParam('outerRadius',15*S);l.shapeParam('innerRadius',6*S);l.opacity=0;});
scene.log(JSON.stringify({characters:manifest,contacts,composition:{width:1200,height:800},version:2}));
