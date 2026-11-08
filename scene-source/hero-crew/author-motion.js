/** Authors one named native timeline. Requires design.js, idle-signatures.js and selectedState from the caller.
 * Sampling happens only during MCP authoring. The website uses native tracks, not these functions.
 * Fixed spline topology/IDs are read from the rig. Curves bow at the elbow/knee; feet remain planted in idle.
 */
const duration=durations[selectedState], ids={}, curves={}, tips={};
scene.layers.forEach(l=>ids[l.name]=l.id);
specs.forEach(s=>{
  ['armL','armR','legL','legR'].forEach(part=>{
    const l=scene.find(s.name+'.'+part+'.path'),data=l.spline.data,c=Object.values(data.contours)[0];
    curves[s.name+'.'+part]={layer:l.id,end:c.pointIds[1],segment:c.segmentIds[0]};
  });
  const l=scene.find(s.name+'.silhouette');
  if(l.type==='spline'){
    const data=l.spline.data,point=Object.values(data.points)[0];
    tips[s.name]={layer:l.id,point,handles:Object.values(data.handles).filter(h=>h.pointId===point.id)};
  }
});
/** Stores one scalar track value without changing the scene while computing a frame. */
function put(out,name,path,value){if(!ids[name])throw new Error(name);out['layers.'+ids[name]+'.'+path]=value;}
/** Smoothly samples artist-defined anticipation, impact and recovery beats in milliseconds. */
function sample(t,stops){
  if(t<=stops[0][0])return stops[0][1];
  for(let i=1;i<stops.length;i++)if(t<=stops[i][0]){const a=stops[i-1],b=stops[i],x=(t-a[0])/(b[0]-a[0]),u=x*x*(3-2*x);return a[1]+(b[1]-a[1])*u;}
  return stops[stops.length-1][1];
}
/** Writes a quadratic native path plus its matching independently oriented glove/shoe.
 * Inputs and the bow control are parent-local logical pixels; stored geometry is native pixels.
 */
function curve(out,name,sx,sy,tx,ty,cx,cy,rotation,scale){
  const c=curves[name],prefix='layers.'+c.layer+'.spline.';
  put(out,name+'.path','transform.x',sx*S);put(out,name+'.path','transform.y',sy*S);
  out[prefix+'points.'+c.end+'.x']=(tx-sx)*S;out[prefix+'points.'+c.end+'.y']=(ty-sy)*S;
  out[prefix+'segments.'+c.segment+'.control1.x']=cx*S;out[prefix+'segments.'+c.segment+'.control1.y']=cy*S;
  put(out,name+'.end','transform.x',tx*S);put(out,name+'.end','transform.y',ty*S);
  put(out,name+'.end','transform.rotationDeg',rotation);
  put(out,name+'.end','transform.scaleX',scale);put(out,name+'.end','transform.scaleY',scale);
}
/** Computes a complete pose. Body, face, hands and antenna use different phase offsets.
 * High-five bodies become identity transforms at contact so paired palms meet exactly.
 */
function pose(t){
  const out={},mode=selectedState;
  specs.forEach((s,i)=>{
    const phase=t/duration*Math.PI*2+i*.83;
    const sway=Math.sin(phase)-Math.sin(i*.83),lag=Math.sin(phase-.6)-Math.sin(i*.83-.6);
    let dy=0,bodyY=sway*2.8,angle=sway*1.8,sx=1+sway*.016,sy=1-sway*.013,smile=1;
    let faceX=lag*1.7,faceY=lag*.9,wrist=[-8+lag*5,8-lag*5],glove=.9;
    let hands=[[-s.w/2-8,-s.h*.46+83+lag*3],[s.w/2+8,-s.h*.46+86-lag*3]];
    let feet=[[-s.w*.21,48],[s.w*.21,48]],bow=26,tip=sway*(i===1?7:3),tipY=0;
    let idleBlink=1;
    let scanX=0,signalOpacity=1,leafL=-36,leafR=25,aerial=-lag*8;
    if(mode==='idle')({bodyY,angle,sx,sy,smile,faceX,faceY,wrist,glove,hands,feet,bow,tip,blink:idleBlink,scanX,signalOpacity,leafL,leafR,aerial}=decorateIdle(s,i,t,{bodyY,angle,sx,sy,smile,faceX,faceY,wrist,glove,hands,feet,bow,tip,scanX,signalOpacity,leafL,leafR,aerial}));
    const shy=mode==='shy-'+s.name.toLowerCase();
    const blinkCenter=1550+i*490;
    let blink=mode==='idle'?idleBlink:1-.94*Math.max(0,1-Math.abs(t-blinkCenter)/80);
    if(shy){
      const settle=Math.sin(t/115)*Math.exp(-t/560);
      angle=[-7,6,-4,-6][i]+settle*3;bodyY=3+settle*2;
      sx=1+(i===2?.07:.025);sy=1-(i===2?.055:.02);smile=.7;glove=1.15;bow=48;
      hands=[[-(i===3?11:s.eyeGap),s.face+settle*2],[(i===3?11:s.eyeGap),s.face+2-settle*2]];
      wrist=[-12+settle*4,10-settle*3];faceX=0;faceY=0;tip=settle*6;blink=1;
    }
    if(mode==='excited'){
      const q=(t+i*95)%duration/duration*Math.PI*2,up=Math.max(0,Math.sin(q)),down=Math.max(0,-Math.sin(q));
      dy=-up*15+down*3;bodyY=0;sx=1-up*.027+down*.045;sy=1+up*.045-down*.06;
      angle=Math.sin(q)*2.5;smile=1.5;
      hands=[[-s.w/2-25,-s.h-18+Math.sin(q+.4)*7],[s.w/2+27,-s.h-25+Math.sin(q-.4)*7]];
      wrist=[-18+Math.sin(q-.3)*16,18+Math.sin(q+.3)*16];bow=28;blink=1;tip=lag*5;
    }
    if(mode==='curious'){
      angle=[-4,4,-3,5][i]+sway;smile=.75;faceX=-2;faceY=-2;
      hands=i===1?[[-s.w/2-8,-44],[s.w/2-12,-s.h*.72]]:i===2?[[-40,s.face+39],[40,s.face+39]]:[[-s.w/2-8,-35],[30,s.face+37]];
      wrist=[-18,28+lag*5];bow=34;tip=lag*5;
    }
    if(mode==='celebrate'){
      const local=Math.max(0,t-i*28);
      dy=sample(local,[[0,0],[95,7],[260,-52-i*3],[410,-45-i*3],[555,5],[680,-8],[850,0],[1200,0]]);
      sx=sample(local,[[0,1],[95,1.08],[260,.94],[410,.97],[555,1.10],[680,.985],[850,1],[1200,1]]);
      sy=sample(local,[[0,1],[95,.87],[260,1.10],[410,1.04],[555,.84],[680,1.03],[850,1],[1200,1]]);
      bodyY=0;angle=Math.sin(local/90)*Math.exp(-local/480)*4;smile=1.6;blink=1;
      hands=[[-s.w/2-27,-s.h-22],[s.w/2+28,-s.h-30]];
      wrist=[-24+Math.sin(local/110)*12,24-Math.sin(local/110)*12];bow=25;tip=Math.sin((local-70)/130)*Math.exp(-local/650)*9;
    }
    if(mode==='highfive'){
      const reach=side=>{
        const c=contacts[i+(side===0?-1:0)];
        return c?sample(t,[[0,0],[95,-.08],[c.time-35,1],[c.time+35,1],[c.time+180,.25],[c.time+300,0]]):0;
      };
      const reaches=[reach(0),reach(1)],amount=Math.max(...reaches);
      dy=-amount*(9+i*2);bodyY=0;angle=0;sx=1;sy=1;faceX=0;faceY=0;smile=1.4;blink=1;glove=1;bow=24;tip=0;
      hands=hands.map((p,j)=>{
        const c=contacts[i+(j===0?-1:0)],r=reaches[j];
        return c?[p[0]+(c.x-s.x-p[0])*r,p[1]+(c.y-500-dy-p[1])*r]:[p[0],p[1]-45*sample(t,[[0,0],[250,1],[700,1],[1000,0]])];
      });
      wrist=[-12,12];
    }
    if(mode==='sit'){
      dy=29;bodyY=0;sx=1.05+sway*.008;sy=.80;angle=sway*.65;smile=.9;
      hands=[[-s.w*.37,15],[s.w*.37,15]];feet=[[32,34],[-32,34]];wrist=[-22,22];bow=24;tip=lag*3;
    }
    put(out,s.name+'.root','transform.y',(500+dy)*S);
    put(out,s.name+'.body','transform.y',bodyY*S);
    put(out,s.name+'.body','transform.rotationDeg',angle);
    put(out,s.name+'.body','transform.scaleX',sx);put(out,s.name+'.body','transform.scaleY',sy);
    put(out,s.name+'.face','transform.x',faceX*S);put(out,s.name+'.face','transform.y',faceY*S);
    put(out,s.name+'.eyes','transform.scaleY',blink);
    put(out,s.name+'.mouth','transform.scaleX',smile);put(out,s.name+'.mouth','transform.scaleY',smile);
    hands.forEach((p,j)=>{
      const side=j===0?-1:1,ax=side*(s.shoulder??(s.w/2-8)),ay=-s.h*.46,dx=p[0]-ax,ddy=p[1]-ay;
      curve(out,s.name+(j===0?'.armL':'.armR'),ax,ay,p[0],p[1],dx*.5+side*bow,ddy*.5+8,wrist[j],glove);
    });
    feet.forEach((p,j)=>{
      const side=j===0?-1:1,ax=side*s.w*.21,ay=bodyY-4,dx=p[0]-ax,ddy=p[1]-ay;
      curve(out,s.name+(j===0?'.legL':'.legR'),ax,ay,p[0],p[1],mode==='sit'?side*(s.w*.48):dx*.5+side*8,mode==='sit'?-7:ddy*.5-3,mode==='sit'?-side*11:0,1);
    });
    if(tips[s.name]){
      const tipData=tips[s.name],prefix='layers.'+tipData.layer+'.spline.';
      if(i===2){tipY=tip*.6;tip=0;}
      out[prefix+'points.'+tipData.point.id+'.x']=tipData.point.x+tip*S;
      out[prefix+'points.'+tipData.point.id+'.y']=tipData.point.y+tipY*S;
      tipData.handles.forEach(h=>{out[prefix+'handles.'+h.id+'.x']=h.x+tip*S;out[prefix+'handles.'+h.id+'.y']=h.y+tipY*S;});
    }
    put(out,s.name+'.shadow','transform.scaleX',1+Math.min(0,dy)/190);
    put(out,s.name+'.shadow','opacity',.20+Math.min(0,dy)/450);
    if(i===2){put(out,'Fig.leafL','transform.rotationDeg',leafL);put(out,'Fig.leafR','transform.rotationDeg',leafR);}
    if(i===3){
      put(out,'Dot.aerial','transform.rotationDeg',aerial+(shy?-10:0));
      put(out,'Dot.eyes','transform.x',scanX*S);put(out,'Dot.signal','opacity',signalOpacity);
    }
  });
  for(let i=0;i<16;i++){
    const p=mode==='celebrate'?Math.max(0,Math.min(1,(t-110-(i%4)*28)/1000)):0,a=i*2.399;
    put(out,'Confetti.'+i,'opacity',mode==='celebrate'&&t>120?Math.sin(p*Math.PI)*.95:0);
    put(out,'Confetti.'+i,'transform.x',(480+Math.cos(a)*p*430)*S);
    put(out,'Confetti.'+i,'transform.y',(240-Math.sin(p*Math.PI)*185+p*p*315)*S);
    put(out,'Confetti.'+i,'transform.rotationDeg',i*29+p*330);
  }
  contacts.forEach((c,i)=>{
    const pulse=mode==='highfive'?Math.max(0,1-Math.abs(t-c.time)/65):0;
    put(out,'Contact.'+i,'opacity',mode==='highfive'?pulse:0);
    put(out,'Contact.'+i,'transform.scaleX',.8+pulse*.35);put(out,'Contact.'+i,'transform.scaleY',.8+pulse*.35);
  });
  return out;
}
let times;
if(selectedState==='idle')times=[0,300,600,850,950,1050,1200,1350,1470,1550,1630,1650,1800,2100,2400,2600,2800,3100,3400,3420,3500,3580,3650,3900,4100,4300,4500,4750,5000,5120,5200,5280,5500,5750,6000,6050,6200,6350,6420,6600,6650,6720,6800,6880,6950,7100,7250,7300,7600,8000];
else if(selectedState==='celebrate')times=[0,70,95,125,155,185,260,288,316,344,410,440,500,555,583,611,639,680,750,850,1000,1200];
else if(selectedState==='highfive')times=[0,95,180,260,295,330,365,370,405,440,445,480,515,585,660,735,820,1000];
else if(selectedState.startsWith('shy'))times=[0,60,120,210,320,450,620,850,1200,1700,2400,3200];
else times=[0,duration*.125,duration*.25,duration*.375,duration*.5,duration*.625,duration*.75,duration*.875,duration];
const frames=times.map(pose),loop=['idle','excited','curious','sit'].includes(selectedState);
// Re-author in place so state-machine references and unrelated timelines remain valid.
const timelineId='crew-'+selectedState;
const tl=scene.timelines.some(t=>t.id===timelineId)?scene.timeline(timelineId):scene.createTimeline({id:timelineId,durationMs:duration,loop,autoplay:false});
tl.set({durationMs:duration,loop,autoplay:false,layerIds:scene.layers.map(l=>l.id)});
tl.data.tracks.forEach(track=>{if(!(track.target in frames[0]))tl.removeTrack(track.target);});
Object.keys(frames[0]).forEach((target,index)=>{
  const changing=frames.some(f=>Math.abs(f[target]-frames[0][target])>.000001),keys=changing?times.map((_,j)=>j):[0];
  // Native pixel/degree keys retain 0.01 precision; dimensionless scale/opacity retain 0.0001.
  const precision=target.includes('scale')||target.endsWith('opacity')?10000:100;
  tl.track(target,{keyframes:keys.map(j=>({id:selectedState+'-'+index+'-'+j,timeMs:times[j],value:Math.round(frames[j][target]*precision)/precision,easing:{type:'easeInOut'}}))});
});
scene.log(JSON.stringify({state:selectedState,tracks:tl.data.tracks.length,keys:tl.data.tracks.reduce((n,t)=>n+t.keyframes.length,0),duration,loop}));
